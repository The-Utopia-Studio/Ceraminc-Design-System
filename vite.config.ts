import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) return 'charts'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/@radix-ui')) return 'radix'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react'
          return undefined
        },
      },
    },
  },
  server: {
    port: 3002,
  },
})
