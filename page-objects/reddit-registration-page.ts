import { type Locator, type Page } from '@playwright/test';

export class RedditRegistrationPage {
    page: Page;
    shadowEmail: Locator;
    shadowSkip: Locator;
    shadowRegisterUsername: Locator;
    shadowRegisterPassword: Locator;
    shadowLoginUsername: Locator;
    shadowLoginPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shadowEmail = page.locator('#register-email').locator('input[name="email"]');
        this.shadowSkip = page.locator('auth-flow-modal[pagename="register_email_verification"]').locator('button[name="skip"]');
        this.shadowRegisterUsername = page.locator('#register-username').locator('input[name="username"]');
        this.shadowRegisterPassword = page.locator('#register-password').locator('input[name="password"]');
        this.shadowLoginUsername = page.locator('#login-username').locator('input[name="username"]');
        this.shadowLoginPassword = page.locator('#login-password').locator('input[name="password"]');
    }

    loginButton = '#login-button'
    signUpLink = 'auth-flow-link[step="register"]'
    emailInput = '#register-email';
    continue = 'button.continue';
    submit = '#login > auth-flow-modal > div.w-100 > faceplate-tracker > button'
    submitButton = 'button[type="submit"]';
    searchBar = '[data-testid="search-bar"]';
    signInButton = 'button.login';

    async navigate() {
        await this.page.goto('https://www.reddit.com/');
        await this.page.waitForLoadState('load');
    }

    async signUp(email: string) {
        await this.page.click(this.loginButton);
        await this.page.click(this.signUpLink);
        await this.shadowEmail.fill(email);
        await this.page.click(this.continue);
        await this.shadowSkip.click();
    }

    async signIn() {
        let isSignedIn = false;
        // await this.page.waitForLoadState('load');

        while(!isSignedIn) {
            if((await this.page.isVisible(this.loginButton) == false)) {
                await this.page.reload();
                isSignedIn = true;
            } else {
                await this.page.click(this.loginButton);
                await this.shadowLoginUsername.fill(process.env.REDDIT_USERNAME);
                await this.shadowLoginPassword.fill(process.env.REDDIT_PASSWORD);
                await this.page.waitForFunction(
                    `document.querySelector("${this.signInButton}") && !document.querySelector("${this.signInButton}").disabled`,
                    { timeout: 2000 }
                );

                await this.page.click(this.signInButton);
                await this.page.waitForTimeout(2000);
            }

            await this.page.reload();
        }
    }
}