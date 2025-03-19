// import { type Locator, type Page } from '@playwright/test';
// import { randomBytes as cryptoRandomBytes } from 'crypto';

// export class RedditRegistrationPage {
//     page: Page;
//     email: Locator;
//     skip: Locator;
//     registerUsername: Locator;
//     registerPassword: Locator;
//     registerContinue: Locator;
//     loginUsername: Locator;
//     loginPassword: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.email = page.locator('#register-email').locator('input[name="email"]');
//         this.skip = page.locator('auth-flow-modal[pagename="register_email_verification"]').locator('button[name="skip"]');
//         this.registerUsername = page.locator('input[name="username"]');
//         this.registerPassword = page.locator('input[name="password"]');
//         this.registerContinue = page.locator('button[type="submit"]');
//         this.loginUsername = page.locator('input[name="username"]');
//         this.loginPassword = page.locator('input[name="password"]');

//     }

//     loginButton = '#login-button'
//     signUpLink = 'auth-flow-link[step="register"]'
//     emailInput = '#register-email';
//     continue = 'button.continue';
//     submit = '#login > auth-flow-modal > div.w-100 > faceplate-tracker > button'
//     submitButton = 'button[type="submit"]';
//     searchBar = '[data-testid="search-bar"]';
//     signInButton = 'button.login';

//     async navigate() {
//         await this.page.goto('https://www.reddit.com/');
//         await this.page.waitForLoadState('load');
//     }

//     // Helper function to generate random username and password
//     private generateRandomString(length: number): string {
//         const randomData = cryptoRandomBytes(length); // Generate random bytes
//         return randomData.toString('base64').slice(0, length); // Convert to base64 and slice to the desired length
//     }

//     // Register with random username and password
//     async register(): Promise<void> {
//         const username = this.generateRandomString(10);
//         const password = this.generateRandomString(10);

        
//         await this.page.click(this.loginButton);
//         await this.page.click(this.signUpLink);
//         await this.email.fill(`${username}@example.com`); // Use a dummy email or generate one if needed
//         // await this.page.click(this.continue);
//         // await this.skip.click();

//         // Store the credentials in environment variables
//         process.env.REDDIT_USERNAME = username;
//         process.env.REDDIT_PASSWORD = password;
//     }

//     async signUp(email: string) {
//         await this.page.click(this.loginButton);
//         await this.page.click(this.signUpLink);
//         await this.email.fill(email);
//         await this.page.click(this.continue);
//         await this.skip.click();
//     }

//     async signIn() {
//         let isSignedIn = false;
//         // await this.page.waitForLoadState('load');

//         while(!isSignedIn) {
//             if((await this.page.isVisible(this.loginButton) == false)) {
//                 await this.page.reload();
//                 isSignedIn = true;
//             } else {
//                 await this.page.click(this.loginButton);
//                 await this.loginUsername.fill(process.env.REDDIT_USERNAME);
//                 await this.loginPassword.fill(process.env.REDDIT_PASSWORD);
//                 await this.page.waitForFunction(
//                     `document.querySelector("${this.signInButton}") && !document.querySelector("${this.signInButton}").disabled`,
//                     { timeout: 2000 }
//                 );

//                 await this.page.click(this.signInButton);
//                 await this.page.waitForTimeout(2000);
//             }

//             await this.page.reload();
//         }
//     }
// }







import { Page, Locator } from '@playwright/test';
import { randomBytes as cryptoRandomBytes } from 'crypto';

export class RedditRegistrationPage {
    private readonly page: Page;

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

    // Sign in using stored credentials
    async signIn(): Promise<void> {
        let isSignedIn = false;

        while (!isSignedIn) {
            if (!(await this.loginButton.isVisible())) {
                await this.page.reload();
                isSignedIn = true;
            } else {
                await this.loginButton.click();
                await this.loginUsernameInput.fill(process.env.REDDIT_USERNAME || '');
                await this.loginPasswordInput.fill(process.env.REDDIT_PASSWORD || '');

                await this.page.waitForFunction(
                    `document.querySelector("button.login") && !document.querySelector("button.login").disabled`,
                    { timeout: 2000 }
                );

                await this.signInButton.click();
                await this.page.waitForTimeout(2000);
            }

            await this.page.reload();
        }
    }
}
