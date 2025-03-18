import { BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';
import { request, test, expect, Browser, Page, chromium } from '@playwright/test';
import { pageFixture } from './page-fixture';

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  pageFixture.page = page;
  console.log('This runs once before all tests');
});

AfterAll({ timeout: 10000 }, async function () {
  await pageFixture.page.close();
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