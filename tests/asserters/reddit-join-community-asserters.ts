import { expect } from '@playwright/test';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page';

export class RedditJoinCommunityAsserters {
  async assertCommunityHasBeenJoined(redditExplorePage: RedditExplorePage) {
    await expect(redditExplorePage.firstJoinButton).toHaveText('Joined');
  }
}