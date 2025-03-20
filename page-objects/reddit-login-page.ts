import { Page, Locator } from '@playwright/test';
import { randomBytes as cryptoRandomBytes } from 'crypto';
import { RedditHomePage } from './reddit-home-page';


export class RedditLoginPage {
    readonly page: Page;
    private readonly acceptAllCookiesButton: Locator;

    // Registration locators
    private readonly emailInput: Locator;
    private readonly skipVerificationButton: Locator;
    private readonly registerUsernameInput: Locator;
    private readonly registerPasswordInput: Locator;
    private readonly registerEmailContinueButton: Locator;
    private readonly registerUserContinueButton: Locator;
    private readonly emailSentMessage: Locator;

    // Login locators
    private readonly loginUsernameInput: Locator;
    private readonly loginPasswordInput: Locator;
    private readonly signInButton: Locator;
    private readonly welcomeBackMessage: Locator;

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
        this.emailSentMessage = this.page.locator('faceplate-toast:text-is("Email sent.")');
        // getByRole('button', { name: 'Continue' })

        // Login locators
        this.loginUsernameInput = this.page.locator('input[name="username"]');
        this.loginPasswordInput = this.page.locator('input[name="password"]');
        this.signInButton = this.page.locator('button.login:not([disabled])');
        this.welcomeBackMessage = this.page.locator('h1:has-text("Welcome back!"]');

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

    async acceptAllCookies() {
        await this.acceptAllCookiesButton.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(2000);
        await this.acceptAllCookiesButton.click();
    }

    // Register a new account with a retry mechanism for username uniqueness
    async register(): Promise<{ username: string, password: string }> {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');

        let registerError = true;
        let username = this.generateRandomString(10);
        let password = this.generateRandomString(12);

        while (registerError) {
            let success = false;
            
            await this.signUpLink.waitFor({ state: 'visible', timeout: 5000 });
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
                
                await this.page.waitForLoadState('networkidle');

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

        await this.skipVerificationButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.skipVerificationButton.click();
        
        await this.firstInterestButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.firstInterestButton.click();

        await this.registerUserContinueButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.registerUserContinueButton.click();

        await this.page.waitForFunction(() => {
            const isOnLoginPage = window.location.href.includes('login');
            return !isOnLoginPage;
        }, { timeout: 5000 });

        // Store credentials in environment variables for later use
        process.env.REDDIT_USERNAME = username;
        process.env.REDDIT_PASSWORD = password;

        return { username, password };
    }



    async signIn(retries = 2) {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');

        if (retries === 0) {
            throw new Error('Login failed after multiple attempts.');
        }

        await this.loginUsernameInput.waitFor({state: 'visible', timeout: 5000});
        await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
        await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');
        await this.signInButton.click();
        
        try {
            // const url = await this.page.url().includes('login');
            // await this.page.waitForFunction(url), { timeout: 5000 });
            await this.page.waitForURL(/^(?!.*login).*$/, { timeout: 5000 });
            
        } catch (error) {
            if (retries > 0) {
                console.log(`Login attempt failed. Retries left: ${retries - 1}`);
                await this.page.reload();
                await this.page.waitForLoadState('networkidle');
                await this.signIn(retries - 1); // Retry with one less attempt
            } else {
                console.log('Max retries reached. Login attempt failed.');
            }
        }
    }

    // Method to navigate to the home page
    async goToHomePage(): Promise<RedditHomePage> {
        await this.welcomeBackMessage.waitFor({state: 'visible', timeout: 5000});
        await this.page.goto('');

        // Wait for the home page's post sort by element to be visible
        const homePage = new RedditHomePage(this.page);
        await homePage.waitForHomePageToLoad();

        return homePage;
    }

    private async waitForUrlToChange(timeout: number) {
        const startTime = Date.now();
        let currentUrl = this.page.url();
      
        while (currentUrl.includes('login') && Date.now() - startTime < timeout) {
          await this.page.waitForTimeout(500); // Wait for 500ms before checking again
          currentUrl = this.page.url(); // Re-check the URL
        }
      
        if (!currentUrl.includes('login')) {
          console.log('URL is no longer on the login page');
        } else {
          console.log('Timed out while waiting for URL to change');
        }
      }

    // Generate a random string
    private generateRandomString(length: number): string {
        return cryptoRandomBytes(length).toString('hex').slice(0, length);
    }
}