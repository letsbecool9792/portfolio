#!/usr/bin/env node
/**
 * Regenerates `public/sitemap.xml` from the route table and the journey content.
 *
 * Runs as npm's `prebuild`, so the chapter list can never drift from
 * `journey.json` — adding a story to the JSON puts it in the sitemap on the
 * next build with nothing else to remember.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://suparno.me'

// Mirrors src/routes.tsx minus the `*` NotFound route. Listed by hand rather
// than parsed out of the JSX — a regex over a component file would break in
// quieter ways than a stale line here.
const STATIC_ROUTES = [
    '/',
    '/journey',
    '/projects',
    '/sidequests',
    '/artifacts',
    '/contact',
    '/resume',
]

const journey = JSON.parse(await readFile(join(ROOT, 'src/content/journey.json'), 'utf8'))
const paths = [...STATIC_ROUTES, ...journey.map(entry => `/journey/${entry.slug}`)]

// No <lastmod>: no content here carries a real modification date yet, and Google
// discounts a file's lastmod entirely once it catches one that was invented.
// <changefreq> and <priority> are ignored outright, so they're left out too.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `    <url><loc>${ORIGIN}${path}</loc></url>`).join('\n')}
</urlset>
`

await writeFile(join(ROOT, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml  ${paths.length} URLs`)
