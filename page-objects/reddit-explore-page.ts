import { Page, Locator } from '@playwright/test';

export class RedditExplorePage {
    private page: Page;

    // Locators
    readonly firstJoinButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with specific types
        this.firstJoinButton = this.page.locator('community-recommendation')
            .first()
            .locator('shreddit-join-button')
            .locator('button');
    }

    // Method to sort posts by a given selection (default: 'Best')
    async joinCommunity(): Promise<void> {
        await this.firstJoinButton.waitFor({ state: 'visible' });
        await this.firstJoinButton.click();
    }
}