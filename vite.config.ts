import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Mirrors the /resume -> /resume.pdf rewrite in vercel.json so it also works
// on the local dev server (vercel.json rewrites only apply on Vercel).
const resumeRewrite = (): Plugin => ({
	name: 'resume-rewrite',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			if (req.url === '/resume') {
				req.url = '/resume.pdf'
			}
			next()
		})
	},
})

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), resumeRewrite()],
})
