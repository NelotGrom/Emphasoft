const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.cy.js",   
    baseUrl: "https://automationintesting.online",

    setupNodeEvents(on, config) {
      allureCypress(on, {
        resultsDir: "./allure-results",
      });
      return config;
    },
  },
});
