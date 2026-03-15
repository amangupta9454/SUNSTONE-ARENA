import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy /api calls to the Node backend during development
      '/api': {
        target: 'https://sunstone-arena.vercel.app',
        changeOrigin: true,
      },
    },
  },
})
