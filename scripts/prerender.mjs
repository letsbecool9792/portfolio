#!/usr/bin/env node
/**
 * Renders every route to a static HTML file after the client build.
 *
 * Why not vite-react-ssg: its peer range wants react-router-dom ^6.14 and vite
 * ^6.4+, and this project is on 7.6 and 6.3. React 19 ships `prerenderToNodeStream`
 * in `react-dom/static`, which waits for Suspense boundaries to settle — so the
 * `React.lazy` routes resolve instead of freezing at the fallback, which is exactly
 * what `renderToString` would have done.
 *
 * What this buys, now that Search Console has shown Googlebot rendering the SPA
 * fine: share cards for social scrapers (they never run JS, so a link to a chapter
 * would otherwise show the generic homepage card), first paint without waiting on
 * the bundle, and independence from Google's deferred render queue.
 *
 * `useIsMobile`'s server snapshot returns `true`, so every file here is the mobile
 * tree — which is what mobile-first indexing wants to read.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { prerenderToNodeStream } from 'react-dom/static'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const { render, ROUTES, NOT_FOUND_ROUTE } = await import(
    pathToFileURL(join(ROOT, 'dist-ssr/entry-server.js')).href
)

// Read before writing anything: the "/" route overwrites this very file.
const template = await readFile(join(DIST, 'index.html'), 'utf8')

if (!template.includes('<div id="root"></div>')) {
    throw new Error('index.html no longer has an empty <div id="root"></div> to fill')
}

const collect = async stream => {
    let html = ''
    for await (const chunk of stream) html += chunk
    return html
}

/**
 * React hoists `<title>`, `<meta>` and `<link>` to the front of the stream when the
 * rendered tree has no `<head>` of its own. Peel them off so they can go into the
 * template's head instead of sitting loose in the body.
 */
const LEADING_HEAD_TAG = /^\s*(<title>[\s\S]*?<\/title>|<meta\b[^>]*?\/?>|<link\b[^>]*?\/?>)/i

const splitHead = html => {
    const head = []
    let body = html

    for (;;) {
        const match = body.match(LEADING_HEAD_TAG)
        if (!match) break
        head.push(match[1])
        body = body.slice(match[0].length)
    }

    return { head, body }
}

/** "/" -> dist/index.html, "/journey" -> dist/journey/index.html. */
const outputPath = path => join(DIST, path === '/' ? 'index.html' : `${path}/index.html`)

const build = async (route, file) => {
    const { prelude } = await prerenderToNodeStream(render(route.path))
    const { head, body } = splitHead(await collect(prelude))

    // A route that renders no <title> means the <Seo> wiring was missed. Failing
    // loudly here beats shipping a page with the wrong metadata.
    if (!head.some(tag => tag.startsWith('<title'))) {
        throw new Error(`${route.path} rendered no <title> — is <Seo> wired into that page?`)
    }

    // Forked pages get head tags and an empty #root. Prerendered markup is always
    // the mobile tree (useIsMobile's server snapshot is `true`), and main.tsx mounts
    // with createRoot rather than hydrateRoot — so on a desktop viewport React
    // discards this markup and re-renders, and the visitor watches the mobile
    // layout paint before it snaps. See the `forked` note in src/content/seo.ts.
    const html = template
        .replace('</head>', `\t\t${head.join('\n\t\t')}\n\t</head>`)
        .replace('<div id="root"></div>', route.forked ? '<div id="root"></div>' : `<div id="root">${body}</div>`)

    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
    return html.length
}

for (const route of ROUTES) {
    const size = await build(route, outputPath(route.path))
    const note = route.forked ? '  (head only — forked layout)' : ''
    console.log(`  ${route.path.padEnd(28)} ${(size / 1024).toFixed(1).padStart(6)} KB${note}`)
}

// Vercel serves dist/404.html with a genuine 404 for anything unmatched, which is
// what finally kills the soft-404s — every unknown URL used to return 200.
const size = await build({ ...NOT_FOUND_ROUTE, path: '/404' }, join(DIST, '404.html'))
console.log(`  ${'404.html'.padEnd(32)} ${(size / 1024).toFixed(1)} KB`)

console.log(`prerendered ${ROUTES.length + 1} pages`)
