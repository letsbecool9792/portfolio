import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import youtube from './api/youtube'

// Vercel handles two things locally-invisible: the /resume rewrite from
// vercel.json, and serving api/*.ts as functions. Both are mounted here so the
// local servers behave like production.
//
// Registered on `configureServer` *and* `configurePreviewServer` — the first only
// covers `vite dev`. Without the second, `npm run preview` serves dist/ as dumb
// static files and /api/youtube 404s, which looks exactly like a broken feature.
const emulateVercel = (): Plugin => {
	const resume = (req: IncomingMessage, _res: ServerResponse, next: () => void) => {
		if (req.url === '/resume') {
			req.url = '/resume.pdf'
		}
		next()
	}

	const latestVideo = async (_req: IncomingMessage, res: ServerResponse) => {
		const response = await youtube()
		res.statusCode = response.status
		res.setHeader('Content-Type', 'application/json')
		res.end(await response.text())
	}

	const mount = (middlewares: Connect.Server) => {
		middlewares.use(resume)
		middlewares.use('/api/youtube', latestVideo)
	}

	return {
		name: 'emulate-vercel',
		configureServer: server => mount(server.middlewares),
		configurePreviewServer: server => mount(server.middlewares),
	}
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), emulateVercel()],
})
