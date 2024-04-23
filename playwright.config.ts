import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["pomtest/addToCart.test.ts", "tests/basicActions.test.ts"],
  use: {
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?",
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 1000,
    }
  },
  //retries: 1,
  timeout: 30000,
  reporter: [["dot"], 
  // ["json", {
  //   outputFile: "jsonReports/jsonReport.json"
  // }], 
  ["html", {
    open: "on-failure"
  }]],
};

export default config;