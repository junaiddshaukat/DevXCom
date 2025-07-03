import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['react-redux', '@reduxjs/toolkit'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          icons: ['react-icons'],
          utils: ['axios', 'react-toastify']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'https://your-backend-url.vercel.app' 
          : 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
