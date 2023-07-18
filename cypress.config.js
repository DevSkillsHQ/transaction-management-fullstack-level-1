const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    apiUrl: 'http://host.docker.internal:8080',
  },
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
})