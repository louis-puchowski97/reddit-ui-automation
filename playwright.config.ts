import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',  // Directory where tests will be stored
  workers: 1,  // Limit the number of parallel workers to 1 (run tests one at a time)
  globalSetup: require.resolve('./tests/global-setup.ts'),  // Specify global setup file to run before tests
  globalTeardown: require.resolve('./tests/global-teardown'),  // Specify global teardown file to run after tests
  timeout: 60000,  // Set a global timeout for each test to 60 seconds
  use: {
    baseURL: 'https://www.reddit.com',  // Base URL for all tests (can be used as a relative path in your tests)
    headless: false,  // Run the browser in headless mode or not, depending on the HEADLESS env variable
    screenshot: 'only-on-failure',  // Capture screenshot only when a test fails
    trace: 'on',  // Record traces to help with debugging
    browserName: 'chromium',  // Use Chromium browser for the tests (you can change it to firefox or webkit)
  },
});