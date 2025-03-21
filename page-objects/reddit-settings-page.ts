import { Page, Locator } from '@playwright/test';

export class RedditSettingsPage {
    private page: Page;
    private readonly deleteAccountButton: Locator;
    private readonly reasonForLeavingInput: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly deleteAccountCheckbox: Locator;
    private readonly confirmDeleteAccountButton: Locator;

    // Locators
    readonly firstJoinButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialise locators with specific types
        this.deleteAccountButton = this.page.locator('div[data-testid="delete-account"]');
        this.reasonForLeavingInput = this.page.locator('span.input-boundary-box');
        this.usernameInput = this.page.locator('faceplate-text-input[type="username"]');
        this.passwordInput = this.page.locator('auth-text-input[type="username"]');
        this.deleteAccountCheckbox = this.page.locator('faceplate-form faceplate-checkbox-input[role="checkbox"]');
        this.confirmDeleteAccountButton = this.page.locator('rpl-modal-card button[slot="primary-button"]:not([disabled]');
    }

    // Navigate to Reddit homepage
    async navigate(): Promise<void> {
        await this.page.goto('https://www.reddit.com/settings/account');
        await this.deleteAccountButton.waitFor({ state: 'visible' });
    }

    // Navigate to Reddit homepage
    async deleteAccount(): Promise<void> {
        await this.deleteAccountButton.waitFor({ state: 'visible' });
        await this.deleteAccountButton.click();

        await this.reasonForLeavingInput.waitFor({ state: 'visible' });
        await this.reasonForLeavingInput.fill('Testing is complete');
        await this.usernameInput.fill(process.env.REDDIT_USERNAME);
        await this.passwordInput.fill(process.env.REDDIT_PASSWORD);
        await this.deleteAccountCheckbox.click();
        await this.confirmDeleteAccountButton.click();

    }
}