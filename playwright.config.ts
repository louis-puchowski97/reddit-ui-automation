import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',  // Directory where tests will be stored,
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown'),
  timeout: 60000,
  use: {
    baseURL: 'https://www.reddit.com',  // Base URL for all tests
    headless: process.env.HEADLESS === 'true', // Use HEADLESS env variable
    screenshot: 'only-on-failure',  // Capture screenshot on failure
    trace: 'on',  // Record trace for debugging
    browserName: 'chromium',  // Use Chromium browser for the tests
  },
});