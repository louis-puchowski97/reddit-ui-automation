import { expect } from '@playwright/test';
import { RedditHomePage } from '../../page-objects/reddit-home-page.ts';

export class RedditRegistrationAsserters {
  async assertAccountHasBeenCreated(redditHomePage: RedditHomePage) {
    await expect(redditHomePage.userIcon).toBeVisible();
    await expect(redditHomePage.sortByButtonLocator("Best")).toBeVisible();
  }
}
