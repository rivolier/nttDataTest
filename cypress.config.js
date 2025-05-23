const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 30000,
    fixturesFolder: false,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1440,
  },
});
