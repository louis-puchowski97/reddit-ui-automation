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
        this.deleteAccountButton = this.page.locator('community-recommendation');
        this.reasonForLeavingInput = this.page.locator('community-recommendation');
        this.usernameInput = this.page.locator('community-recommendation');
        this.passwordInput = this.page.locator('community-recommendation');
        this.deleteAccountCheckbox = this.page.locator('community-recommendation');
        this.confirmDeleteAccountButton = this.page.locator('community-recommendation');
    }

    // Navigate to Reddit homepage
    async navigate(): Promise<void> {
        await this.page.goto('https://www.reddit.com/settings/account');
        await this.page.waitForLoadState('networkidle');
    }

    // Navigate to Reddit homepage
    async deleteAccount(username: string, password: string): Promise<void> {
        await this.deleteAccountButton.waitFor({ state: 'visible' });
        await this.deleteAccountButton.click();

        await this.reasonForLeavingInput.waitFor({ state: 'visible' });
        await this.reasonForLeavingInput.fill('Testing is complete');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.deleteAccountCheckbox.click();
        await this.confirmDeleteAccountButton.click();

    }
}