import { test, Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';
import { RedditRegistrationAsserters } from '../asserters/reddit-registration-asserters';

test.describe('Reddit registration automation', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async () => {

    // Ensure we start fresh for each test
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      // storageState: { cookies: [], localStorage: [] } // Clear everything
    });
    page = await context.newPage();
    
    const loginPage = new RedditLoginPage(page);
    await loginPage.navigateToReddit();
    await loginPage.openSignupModal();
  });

  test.afterEach(async () => {
    // Clean up by closing the page and context after each test
    await page.close();
    await context.close();
    await browser.close();
  });

  test('Fill registration form with valid data', async () => {
    const loginPage = new RedditLoginPage(page);
    const registrationAsserters = new RedditRegistrationAsserters();

    await test.step('Enter email and proceed', async () => {
      await loginPage.enterEmail();
    });

    await test.step('Skip email verification', async () => {
      await loginPage.skipEmailVerification();
    });

    await test.step('Enter username and password', async () => {
      await loginPage.fillUsernameAndPassword();
    });

    await test.step('Assert credentials are valid', async () => {
      await registrationAsserters.assertRegistrationDataIsValid(loginPage);
    });
  });

  test('Fill registration form with invalid data', async () => {
    const loginPage = new RedditLoginPage(page);
    const registrationAsserters = new RedditRegistrationAsserters();

    await test.step('Enter email and proceed', async () => {
      await loginPage.enterEmail();
    });

    await test.step('Skip email verification', async () => {
      await loginPage.skipEmailVerification();
    });

    await test.step('Enter invalid username and password', async () => {
      await loginPage.fillUsernameAndPassword(" ", "Short"); // Invalid username and short password
    });

    await test.step('Assert credentials are invalid', async () => {
      await registrationAsserters.assertRegistrationDataIsInvalid(loginPage);
    });
  });
});
