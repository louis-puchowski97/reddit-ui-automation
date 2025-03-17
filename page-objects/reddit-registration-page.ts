import type { Locator, Page } from '@playwright/test';

export class RedditRegistrationPage {
    page: Page;
    shadowEmail: Locator;
    shadowSkip: Locator;
    shadowUsername: Locator;
    shadowPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shadowEmail = page.locator('#register-email').locator('input[name="email"]');
        this.shadowSkip = page.locator('auth-flow-modal[pagename="register_email_verification"]').locator('button[name="skip"]');
        this.shadowUsername = page.locator('#register-username').locator('input[name="username"]');
        this.shadowPassword = page.locator('#register-password').locator('input[name="password"]');
    }

    loginButton = '#login-button'
    signUpLink = 'auth-flow-link[step="register"]'
    emailInput = '#register-email';
    continue = 'button.continue';
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    submit = '#login > auth-flow-modal > div.w-100 > faceplate-tracker > button'
    submitButton = 'button[type="submit"]';
    searchBar = '[data-testid="search-bar"]';

    async navigate() {
        await this.page.goto('https://www.reddit.com/');
    }

    async signUp(email: string) {
        await this.page.click(this.loginButton);
        await this.page.click(this.signUpLink);
        await this.shadowEmail.fill(email);
        await this.page.click(this.continue);
        await this.shadowSkip.click();
    }

    async fillEmail(email: string) {
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.submitButton);
    }

    async fillCredentials(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }

    async isRegistered() {
        await this.page.waitForSelector(this.searchBar, { timeout: 10000 });
        return await this.page.isVisible(this.searchBar);
    }
}