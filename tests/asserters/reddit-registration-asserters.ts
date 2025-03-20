import { expect } from '@playwright/test';
import { RedditHomePage } from '../../page-objects/reddit-home-page';

export class RedditRegistrationAsserters {
    async assertPostPageOpened(redditHomePage: RedditHomePage) {
      await redditHomePage.page.waitForURL(/^(?!.*login).*$/);
    }

  async assertAccountHasBeenCreated(redditHomePage: RedditHomePage) {
    await expect(redditHomePage.userIcon).toBeVisible();
    await expect(redditHomePage.sortByButtonLocator("Best")).toBeVisible();
  }
}
