import { Page, Locator } from '@playwright/test';
import { randomBytes as cryptoRandomBytes } from 'crypto';
import { RedditHomePage } from './reddit-home-page';


export class RedditLoginPage {
    private readonly page: Page;
    private readonly acceptAllCookiesButton: Locator;

    // Registration locators
    private readonly emailInput: Locator;
    private readonly skipVerificationButton: Locator;
    private readonly registerUsernameInput: Locator;
    private readonly registerPasswordInput: Locator;
    private readonly registerEmailContinueButton: Locator;
    private readonly registerUserContinueButton: Locator;

    // Login locators
    private readonly loginUsernameInput: Locator;
    private readonly loginPasswordInput: Locator;
    private readonly signInButton: Locator;
    private readonly welcomBackMessage: Locator;

    // Navigation & action buttons
    private readonly loginButton: Locator;
    private readonly signUpLink: Locator;
    private readonly firstInterestButton: Locator;
    private readonly registerError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptAllCookiesButton = this.page.locator('#accept-all-cookies-button');

        // Registration locators
        this.emailInput = this.page.locator('input[name="email"]');
        this.skipVerificationButton = this.page.locator('button[name="skip"]:not([disabled])');
        this.registerUsernameInput = this.page.locator('#register-username').locator('input[name="username"]');
        this.registerPasswordInput = this.page.locator('#register-password').locator('input[name="password"]');
        this.registerEmailContinueButton = this.page.locator('button.continue');
        // this.registerUserContinueButton = this.page.locator('button[type="submit"]:not([disabled])');
        this.registerUserContinueButton = this.page.getByRole('button', { name: 'Continue' });
        // getByRole('button', { name: 'Continue' })

        // Login locators
        this.loginUsernameInput = this.page.locator('input[name="username"]');
        this.loginPasswordInput = this.page.locator('input[name="password"]');
        this.signInButton = this.page.locator('button.login');
        this.welcomBackMessage = this.page.locator('h1:has-text("Welcome back!"]');

        // Navigation buttons
        this.loginButton = this.page.locator('#login-button');
        this.signUpLink = this.page.locator('auth-flow-link[step="register"]');
        this.firstInterestButton = this.page.locator('#topics button').first();
        this.registerError = this.page.locator('faceplate-banner[msg="Something went wrong. Please try again."]')
    }

    // Navigate to Reddit homepage
    async navigate(): Promise<void> {
        await this.page.goto('http://www.reddit.com/login');
        await this.page.waitForLoadState('networkidle');
        await this.loginUsernameInput.waitFor({ state: 'visible' });
    }

    // Generate a random string
    private generateRandomString(length: number): string {
        return cryptoRandomBytes(length).toString('hex').slice(0, length);
    }

    // Register a new account with a retry mechanism for username uniqueness
    async register(): Promise<{ username: string, password: string }> {
        let registerError = true;
        let username = this.generateRandomString(10);
        let password = this.generateRandomString(12);

        while (registerError) {
            let success = false;
            
            await this.signUpLink.click();
            await this.emailInput.fill(`${username}@example.com`);
            await this.registerEmailContinueButton.click();
            await this.skipVerificationButton.click();
            await this.registerUsernameInput.fill(username);
            await this.registerPasswordInput.fill(password);

            await this.registerUserContinueButton.waitFor({state: 'visible', timeout: 5000});
            await this.registerUserContinueButton.click();

            const usernameError = await this.page.locator('text=Username is taken').isVisible();

            if (!usernameError) {
                success = true;
            }

            while (!success) {
                username = this.generateRandomString(10);

                await this.registerUsernameInput.fill(username);
                await this.registerPasswordInput.fill(password);
                await this.registerUserContinueButton.click();

                // Check if the username is taken (wait for error message or continue)
                const usernameError = await this.page.locator('text=Username is taken').isVisible();

                if (!usernameError) {
                    success = true;
                }
            }
            
            await this.page.waitForTimeout(2000);
            registerError = await this.registerError.isVisible();
            
            if (registerError) {
                await this.page.reload();
                username = this.generateRandomString(10);
                password = this.generateRandomString(12);
            }
        }

        await this.skipVerificationButton.waitFor({state: 'visible', timeout: 10000});
        await this.skipVerificationButton.click();
        
        await this.firstInterestButton.waitFor({state: 'visible', timeout: 10000});
        await this.firstInterestButton.click();

        await this.registerUserContinueButton.waitFor({state: 'visible', timeout: 10000});
        await this.registerUserContinueButton.click();

        await this.page.waitForFunction(() => {
            const isOnLoginPage = window.location.href.includes('login'); // Use `window.location.href` instead of `this.page.url()`
            return !isOnLoginPage; // Return the result to avoid break usage
        }, { timeout: 5000 });

        // Store credentials in environment variables for later use
        process.env.REDDIT_USERNAME = username;
        process.env.REDDIT_PASSWORD = password;

        return { username, password };
    }

    async signIn(retries = 3) {
        if (retries === 0) {
            throw new Error('Login failed after multiple attempts.');
        }
        
        // await this.page.goto(`${this.page.context().baseURL()}/login`);
        await this.page.goto('https://www.reddit.com/login');
        await this.page.waitForLoadState('networkidle');
        await this.acceptAllCookiesButton.click();

        await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
        await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');

        
        await this.page.waitForFunction(
            `document.querySelector("button.login") && !document.querySelector("button.login").disabled`,
            { timeout: 2000 }
        );
        
        await this.signInButton.click();
        
        try {
            await this.page.waitForFunction(() => {
                const isOnLoginPage = window.location.href.includes('login'); // Use `window.location.href` instead of `this.page.url()`
                return !isOnLoginPage; // Return the result to avoid break usage
            }, { timeout: 5000 });
        } catch (error) {
            if (retries > 0) {
                console.log(`Login attempt failed. Retries left: ${retries - 1}`);
                await this.signIn(retries - 1); // Retry with one less attempt
            } else {
                console.log('Max retries reached. Login attempt failed.');
            }
        }

        // await this.page.waitForURL(/^(?!.*login).*$/);
    }

    // Method to navigate to the home page
    async goToHomePage(): Promise<RedditHomePage> {
        await this.welcomBackMessage.waitFor({state: 'visible', timeout: 5000});
        await this.page.goto('');

        // Wait for the home page's post sort by element to be visible
        const homePage = new RedditHomePage(this.page);
        await homePage.waitForHomePageToLoad();

        return homePage;
    }
}