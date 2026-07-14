import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        saasSolutionHomepage: 'templates/saas-solution-homepage/index.html',
        saasSolutionProduct: 'templates/saas-solution-homepage/product/index.html',
        saasSolutionAgents: 'templates/saas-solution-homepage/agents/index.html',
        saasSolutionIntegrations: 'templates/saas-solution-homepage/integrations/index.html',
        saasSolutionIntegrationDetail: 'templates/saas-solution-homepage/integrations/slack/index.html',
        saasSolutionCustomers: 'templates/saas-solution-homepage/customers/index.html',
        saasSolutionCustomerStory: 'templates/saas-solution-homepage/customers/aster-labs/index.html',
        saasSolutionPricing: 'templates/saas-solution-homepage/pricing/index.html',
        saasSolutionChangelog: 'templates/saas-solution-homepage/changelog/index.html',
        saasSolutionContactSales: 'templates/saas-solution-homepage/contact-sales/index.html',
      },
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
