import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// During `npm run dev`, the client runs on its own dev server (default :5173)
// with hot reload, and proxies API + websocket calls to the Express server
// on :3000 so you never have to deal with CORS while developing.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
