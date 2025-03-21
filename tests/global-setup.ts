import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { RedditLoginPage } from '../page-objects/reddit-login-page';

async function globalSetup() {
        let browser: Browser;
        let context: BrowserContext;
        let page: Page;
    
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
    
        // Now, call the deleteAccount function
        const loginPage = new RedditLoginPage(page);
        await loginPage.navigateToReddit();
        await loginPage.login();

    // // Save authentication state
    await loginPage.saveStorageState();
    await browser.close();
}

export default globalSetup;