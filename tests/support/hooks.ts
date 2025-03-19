import { BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';
import { request, test, expect, Browser, Page, chromium, BrowserContext } from '@playwright/test';
import { pageFixture } from './page-fixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
});

Before(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });

  context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  console.log('This runs once before all tests');
  
  const page = await context.newPage();
  await page.setViewportSize({ width: 1366, height: 768 });
  pageFixture.page = page;
});

After({ timeout: 10000 }, async function () {
  // Close the page and context after each scenario
  await pageFixture.page.close();
  await context.close();
}); 

AfterAll({ timeout: 10000 }, async function () {
  await browser.close();
});

async function loginReddit() {
  const apiRequest = await request.newContext();
  
  const response = await apiRequest.post('https://www.reddit.com/api/login', {
      form: {
          user: 'your_username',
          passwd: 'your_password',
          api_type: 'json'
      },
      headers: {
          'User-Agent': 'Playwright-Automation'
      }
  });

  if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()} - ${await response.text()}`);
  }

  const cookies = await apiRequest.storageState();
  await apiRequest.dispose();

  return cookies;
}