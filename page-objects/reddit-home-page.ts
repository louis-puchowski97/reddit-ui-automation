import { type Locator, type Page } from '@playwright/test';

export class RedditHomePage {
    page: Page;
    sortByTop: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortByTop = page
            .locator("shreddit-async-loader")
            .locator("shreddit-sort-dropdown")
            .locator("faceplate-tooltip")
            .locator("faceplate-tracker")
            .locator("button");
    }
    
    sortByButton = "shreddit-feed[reload-url='/svc/shreddit/feeds/home-feed?sort=BEST'${}";
    sortByTops = 'li:nth-child(4) a'

    async goToTheTopPost() {
        const sortButton = this.page
            .locator('shreddit-sort-dropdown')
            .locator('faceplate-tooltip')
            .locator('faceplate-tracker')
            .locator('button[aria-label="Sort by: Best"]');

        await sortButton.click();

        const sortChoiceButton = this.page
        .locator('div[slot="dropdown-items"] a', {
            has: this.page.locator('span', { hasText: 'Top'})
        });

        await sortChoiceButton.click();

        const firstPost = this.page
        .locator('article', {
            has: this.page.locator('shreddit-post[feedindex="0"]')
        });

        await this.page.evaluate(() => {
            const link = document.querySelector('a[href="/target-page"]') as HTMLAnchorElement;
            link?.click();
          });
          
        await this.page.locator('shreddit-post[feedindex="0"]').locator('a[slot="full-post-link"] faceplate-screen-reader-content').click();
    }
}