const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    //apiUrl: 'http://localhost:8080',
    apiUrl: 'http://localhost:3000/api', // Updated for Next.js
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
})
