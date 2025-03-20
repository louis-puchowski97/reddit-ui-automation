import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';


let browser: Browser;
let context: BrowserContext;
let page: Page;

export const test = base.extend<{ redditLoginPage: RedditLoginPage }>({
  redditLoginPage: async ({ page }, use) => {
    const registrationPage = new RedditLoginPage(page);
    await registrationPage.navigate();  // Ensure user is signed in before tests
    await use(registrationPage);
  },
});

export async function setup() {
  // Launch the browser once for all tests
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    storageState: 'tests/auth/auth.json',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    // Add other headers that a normal browser might send
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  });

  // Add the script to modify the navigator.webdriver to false to avoid detection
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  page = await context.newPage();
  await page.setViewportSize({ width: 1366, height: 768 });

  console.log('Browser launched and page created');
}

export { expect };