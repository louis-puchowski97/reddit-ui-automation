import { Page, Locator } from '@playwright/test';

export class RedditHomePage {
    readonly page: Page;

    // Locators
    readonly userIcon: Locator;
    private readonly sortByTopLocator: Locator;
    private readonly sortByButtonLocator: (selection: string) => Locator;
    private readonly topPostLocator: Locator;
    private readonly exploreButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialise locators with specific types
        this.userIcon = this.page.locator('#expand-user-drawer-button');
        this.sortByTopLocator = this.page.locator('div[slot="dropdown-items"] a', {
            has: this.page.locator('span', { hasText: 'Top' })
        });

        // Function to get sort button locator based on the selection
        this.sortByButtonLocator = (selection: string) => 
            this.page.locator('shreddit-sort-dropdown')
                .locator('faceplate-tooltip')
                .locator('faceplate-tracker')
                .locator(`button[aria-label="Sort by: ${selection}"]`);

        // Top post locator, assuming it selects the first post
        this.topPostLocator = this.page.locator('shreddit-post[feedindex="0"] a[slot="full-post-link"] faceplate-screen-reader-content');

        // Link to go to explore page
        this.exploreButton = this.page.locator('#explore-communities a');
    }

    // Method to sort posts by a given selection (default: 'Best')
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    // Method to sort posts by a given selection (default: 'Best')
    async waitForHomePageToLoad(selection: string = "Best"): Promise<void> {
        await this.sortByButtonLocator(selection)
            .waitFor({ state: 'visible' });
    }

    // Method to sort posts by a given selection (default: 'Best')
    async sortPostsBySelection(selection: string = "Best"): Promise<void> {
        const sortButton = this.sortByButtonLocator(selection);
        await sortButton.waitFor({ state: 'visible' });
        await sortButton.click();
        await this.sortByTopLocator.click();
        await this.page.reload();
        await this.topPostLocator.waitFor({ state: 'visible' });
    }

    // Method to navigate to the top post after sorting
    async goToTopPostFromHomePage(): Promise<void> {
        await this.topPostLocator.click();
    }

    // Method to navigate to the top post after sorting
    async goToExplorePage(): Promise<void> {
        await this.exploreButton.waitFor({ state: 'visible' })
        await this.exploreButton.click();
    }
}