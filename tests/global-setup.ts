import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { RedditLoginPage } from '../page-objects/reddit-login-page';
import fs from 'fs';

async function globalSetup() {
    const browser: Browser = await chromium.launch({ headless: false });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    
    const redditLoginPage = new RedditLoginPage(page);
    
    console.log('Registering a new Reddit account...');
    await redditLoginPage.navigate();
    const credentials = await redditLoginPage.register();

    // Save credentials to a temporary file for teardown
    fs.writeFileSync('test-account.json', JSON.stringify(credentials));

    // Save authentication state
    await context.storageState({ path: 'tests/auth/auth.json' });
    await browser.close();
}

export default globalSetup;