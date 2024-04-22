import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["tests/basicActions.test.ts"],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      slowMo: 1000,
    }
  },
  retries: 1,
  timeout: 60000,
  reporter: [["dot"], 
  // ["json", {
  //   outputFile: "jsonReports/jsonReport.json"
  // }], 
  ["html", {
    open: "always"
  }]],
};

export default config;