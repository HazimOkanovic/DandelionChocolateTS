import { defineConfig } from '@playwright/test';
import  devices from '@playwright/test'
export default defineConfig({
  testDir: "./tests",
  timeout: 5 * 60 * 9000,
  use: {
    baseURL: "https://www.dandelionchocolate.com",
    headless: false,
    viewport: { width: 1320, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: "on",
    video: "on",
    launchOptions: {
      slowMo: 3000,
    },
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "jsonReports/jsonReport.json" }],
    [
      "html",
      {
        open: "never",
      },
    ],
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
