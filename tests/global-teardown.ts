import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import fs from 'fs';
import { RedditSettingsPage } from '../page-objects/reddit-settings-page';
import { RedditLoginPage } from '../page-objects/reddit-login-page';

async function globalTeardown() {
    console.log('Running Global Teardown...');

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    // Now, call the deleteAccount function
    const loginPage = new RedditLoginPage(page);
    const settingsPage = new RedditSettingsPage(page);
    console.log('Deleting Reddit account...');
    await loginPage.navigate();
    await loginPage.signIn();
    
    await settingsPage.navigate();
    await settingsPage.deleteAccount();
    
    if (globalThis.__BROWSER__) {
      await globalThis.__BROWSER__.close();
      console.log('Browser closed.');
    }
}

export default globalTeardown;