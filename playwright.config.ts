import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["sample-tests/basicActions.test.ts", "tests/owens-register.test.ts", "tests/owens-login.test.ts", "tests/owens-txn-register.test.ts"],
  use: {
    actionTimeout: 0, // temporary for email testing
    baseURL: "https://fe.uat1.owens.io/",
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 1500,
    }
  },
  //retries: 1,
  timeout: 300000, //5mins test timeout
  reporter: [["dot"], 
  // ["json", {
  //   outputFile: "jsonReports/jsonReport.json"
  // }], 
  ["html", {
    open: "on-failure"
  }]],
};

export default config;