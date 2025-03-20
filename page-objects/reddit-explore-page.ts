import { Page, Locator } from '@playwright/test';

export class RedditExplorePage {
    private page: Page;

    // Locators
    readonly firstJoinButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialise locators with specific types
        this.firstJoinButton = this.page
        .locator('community-recommendation')
        .first()
        .getByRole('button', { name: 'Join' });
    }

    // Method to join the community
    async joinCommunity(): Promise<void> {
        // Wait for the 'Join' button to be visible
        await this.firstJoinButton.waitFor({ state: 'visible' });

        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        
        // Wait for the 'Join' button to be visible
        await this.firstJoinButton.waitFor({ state: 'visible' });

        // If needed, you could add a check here before reloading
        // For instance, only reload if the button isn't visible or disabled
        if (await this.firstJoinButton.isVisible()) {
            // If the button is visible, click on it to join the community
            await this.firstJoinButton.click();
        } else {
            // Handle cases where the button is not visible (e.g., try again, log error, etc.)
            console.log('Join button is not visible or disabled.');
        }
    }
}