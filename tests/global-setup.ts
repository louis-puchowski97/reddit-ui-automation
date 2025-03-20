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
        await loginPage.navigate();
        await loginPage.register();

    // // Save authentication state
    await loginPage.page.context().storageState({ path: 'tests/auth/auth.json' });
    await browser.close();
}

export default globalSetup;