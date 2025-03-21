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
        
        // Wait for the 'Join' button to be visible
        await this.firstJoinButton.click();
    }
}