import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows Vite to listen on all interfaces inside Docker
    port: 5173,        // Ensure Vite listens on the correct port
    strictPort: true,  // If port 5173 is occupied, fail instead of randomly choosing another
    watch: {
      usePolling: true, // Necessary for file watching to work in Docker
    },
    hmr: {
      overlay: false,  // Disables error overlay to keep logs visible
    },
  },
})
