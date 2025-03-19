import { Page, Locator } from '@playwright/test';
import { randomBytes as cryptoRandomBytes } from 'crypto';

export class RedditRegistrationPage {
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
        this.skipVerificationButton = this.page.locator('button[name="skip"]');
        this.registerUsernameInput = this.page.locator('#register-username').locator('input[name="username"]');
        this.registerPasswordInput = this.page.locator('#register-password').locator('input[name="password"]');
        this.registerEmailContinueButton = this.page.locator('button.continue');
        this.registerUserContinueButton = this.page.locator('button[type="submit"]');

        // Login locators
        this.loginUsernameInput = this.page.locator('input[name="username"]');
        this.loginPasswordInput = this.page.locator('input[name="password"]');
        this.signInButton = this.page.locator('button.login');

        // Navigation buttons
        this.loginButton = this.page.locator('#login-button');
        this.signUpLink = this.page.locator('auth-flow-link[step="register"]');
        this.firstInterestButton = this.page.locator('#topics button').first();
        this.registerError = this.page.locator('faceplate-banner[msg="Something went wrong. Please try again."]')
    }

    // Navigate to Reddit homepage
    async navigate(): Promise<void> {
        await this.page.goto('https://www.reddit.com/');
        await this.page.waitForLoadState('load');
        await this.loginButton.waitFor({ state: 'visible' });
    }

    // Generate a random string
    private generateRandomString(length: number): string {
        return cryptoRandomBytes(length).toString('hex').slice(0, length);
    }

    // Register a new account with a retry mechanism for username uniqueness
    async register(): Promise<void> {
        let registerError = true;
        let username = this.generateRandomString(10);
        let password = this.generateRandomString(12);

        while (registerError) {
            let success = false;
            
            await this.loginButton.click();
            await this.signUpLink.click();
            await this.emailInput.fill(`${username}@example.com`);
            await this.registerEmailContinueButton.click();
            await this.skipVerificationButton.click();
            await this.registerUsernameInput.fill(username);
            await this.registerPasswordInput.fill(password);
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
        
        await this.firstInterestButton.click();
        await this.registerUserContinueButton.click();

        // Store credentials in environment variables for later use
        process.env.REDDIT_USERNAME = username;
        process.env.REDDIT_PASSWORD = password;
    }

    async signIn(): Promise<void> {
        let isSignedIn = false;
        let i = 0;
    
        await this.acceptAllCookiesButton.click();
    
        while (!isSignedIn) {
    
            if (!(await this.loginButton.isVisible())) {
                console.log("Already signed in. Reloading...");
                await this.page.reload();
                isSignedIn = true;
                break;
            }
    
            console.log("Attempting login...");
    
            await this.loginButton.click();
            await this.page.waitForTimeout(500);
    
            await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
            await this.page.waitForTimeout(500);
    
            await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');
            await this.page.waitForTimeout(500);
    
            // Check if button is enabled instead of using waitForFunction
            if (await this.signInButton.isEnabled()) {
                await this.signInButton.click();
            } else {
                console.log("Sign-in button is disabled. Retrying...");
            }
    
            await this.page.waitForTimeout(5000); // Allow time for login to process
    
            if (!(await this.loginButton.isVisible())) {
                console.log("Login successful!");
                isSignedIn = true;
            } else {
                console.log("Login failed. Retrying...");
                await this.page.reload();
            }
    
            i++;
            if (i >= 10) {
                console.log("Max login attempts reached. Exiting...");
                throw new Error("Login failed after multiple attempts.");
            }
        }
    }
    

    // Sign in using stored credentials
    // async signIn(): Promise<void> {
    //     let isSignedIn = false;
    //     let i = 0;
    //     await this.acceptAllCookiesButton.click();

    //     while (!isSignedIn) {
    //         // console.log(await this.page.content());
    //         if (!(await this.loginButton.isVisible())) {
    //             await this.page.reload();
    //             isSignedIn = true;
    //         } else {
    //             await this.loginButton.click();
    //             // await this.page.waitForTimeout(1000);
    //             await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
    //             // await this.page.waitForTimeout(1000);
    //             await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');
    //             // await this.page.waitForTimeout(1000);

                
    //             await this.page.waitForFunction(
    //                 `document.querySelector("button.login") && !document.querySelector("button.login").disabled`,
    //                 { timeout: 2000 }
    //             );
                
    //             await this.signInButton.click();
    //             await this.page.waitForTimeout(4000);
    //         }
            
    //         await this.page.screenshot({ path: `screenshot${i}.png`, fullPage: true });
    //         i++;
    //         // console.log(await this.page.content());

    //         await this.page.reload();
    //     }
    // }
}
