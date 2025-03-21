import { Page, Locator } from '@playwright/test';
import { randomBytes as cryptoRandomBytes } from 'crypto';

export class RedditLoginPage {
    private readonly page: Page;

    // Login locators
    private readonly loginUsernameInput: Locator;
    private readonly loginPasswordInput: Locator;
    private readonly loginButton: Locator;

    // Registration locators
    private readonly emailInput: Locator;
    private readonly skipVerificationButton: Locator;
    private readonly registerUsernameInput: Locator;
    private readonly registerPasswordInput: Locator;
    readonly registerUsernameValidIcon: Locator;
    readonly registerPasswordValidIcon: Locator;
    readonly registerUsernameInvalidIcon: Locator;
    readonly registerPasswordInvalidIcon: Locator;
    private readonly registerEmailContinueButton: Locator;
    readonly registerUserContinueButton: Locator;

    // Navigation & action buttons
    private readonly signUpLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Login locators
        this.loginUsernameInput = this.page.locator('input[name="username"]');
        this.loginPasswordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button.login:not([disabled])');

        // Registration locators
        this.emailInput = this.page.locator('input[name="email"]');
        this.skipVerificationButton = this.page.locator('button[name="skip"]:not([disabled])');
        this.registerUsernameInput = this.page.locator('#register-username input[name="username"]');
        this.registerPasswordInput = this.page.locator('#register-password input[name="password"]');
        this.registerUsernameValidIcon = this.page.locator('#register-username #trailing-icons-validation .valid');
        this.registerPasswordValidIcon = this.page.locator('#register-password #trailing-icons-validation .valid');
        this.registerUsernameInvalidIcon = this.page.locator('#register-username #trailing-icons-validation .invalid');
        this.registerPasswordInvalidIcon = this.page.locator('#register-password #trailing-icons-validation .invalid');
        this.registerEmailContinueButton = this.page.locator('button.continue');
        this.registerUserContinueButton = this.page.getByRole('button', { name: 'Continue' });

        // Navigation buttons
        this.signUpLink = this.page.locator('auth-flow-link[step="register"]');
    }

    async saveStorageState() {
        await this.page.context().storageState({ path: 'tests/auth/auth.json' });
    }

    async navigateToReddit() {
        await this.page.goto('https://www.reddit.com/login');
    }

    async openSignupModal() {
        await this.signUpLink.click();
    }

    async enterEmail() {
        const email = `${this.generateRandomString()}@test.com`;
        await this.emailInput.fill(email);
        await this.registerEmailContinueButton.click();
    }

    async skipEmailVerification() {
        await this.skipVerificationButton.waitFor({ state: 'visible' });
        await this.skipVerificationButton.click();
    }

    async fillUsernameAndPassword(username: string = this.generateRandomString(), password: string = this.generateRandomString()) {
        await this.registerUsernameInput.fill(' ');
        await this.registerUsernameInput.fill(username);
        await this.registerUsernameInput.blur();
        await this.registerPasswordInput.fill(password);
        await this.registerPasswordInput.blur();
        return true;
    }

    async login(retries = 5) {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');

        if (retries === 0) {
            throw new Error('Login failed after multiple attempts.');
        }

        await this.loginUsernameInput.waitFor({state: 'visible', timeout: 5000});
        await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
        await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');
        await this.loginButton.click();
        
        try {
            await this.page.waitForURL(/^(?!.*login).*$/, { timeout: 5000 });
            
        } catch (error) {
            if (retries > 0) {
                console.log(`Login attempt failed. Retries left: ${retries - 1}`);
                await this.login(retries - 1); // Retry with one less attempt
            } else {
                console.log('Max retries reached. Login attempt failed.');
            }
        }
    }

    // Generate a random string
    private generateRandomString(length = 15): string {
        return cryptoRandomBytes(length).toString('hex').slice(0, length);
    }
}