import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["pomtest/addToCart.test.ts"],
  use: {
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?",
    headless: false,
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 1000,
    }
  },
  retries: 1,
  timeout: 30000,
  reporter: [["dot"], 
  // ["json", {
  //   outputFile: "jsonReports/jsonReport.json"
  // }], 
  ["html", {
    open: "always"
  }]],
};

export default config;