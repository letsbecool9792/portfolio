import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import youtube from './api/youtube'

// Mirrors the /resume -> /resume.pdf rewrite in vercel.json so it also works
// on the local dev server (vercel.json rewrites only apply on Vercel).
const resumeRewrite = (): Plugin => ({
	name: 'resume-rewrite',
	configureServer(server) {
		server.middlewares.use((req: IncomingMessage, _res: ServerResponse, next: () => void) => {
			if (req.url === '/resume') {
				req.url = '/resume.pdf'
			}
			next()
		})
	},
})

// Vercel serves /api as functions in production; Vite knows nothing about them,
// so the same handler is mounted here to keep dev and production behaving alike.
const apiRoutes = (): Plugin => ({
	name: 'api-routes',
	configureServer(server) {
		server.middlewares.use('/api/youtube', async (_req: IncomingMessage, res: ServerResponse) => {
			const response = await youtube()
			res.statusCode = response.status
			res.setHeader('Content-Type', 'application/json')
			res.end(await response.text())
		})
	},
})

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), resumeRewrite(), apiRoutes()],
})
