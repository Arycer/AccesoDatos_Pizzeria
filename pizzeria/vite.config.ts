import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['88b5-79-144-44-19.ngrok-free.app'],
    proxy: {
      '/backend': {
        target: 'https://a051-79-144-44-19.ngrok-free.app',
        changeOrigin: true,
        secure: false, // Si el certificado SSL de ngrok no es válido, usa false
        rewrite: (path) => path.replace(/^\/backend/, '') // Quita el prefijo "/api" si es necesario
      }
    }
  }
})