import { expect } from '@playwright/test';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page';

export class RedditJoinCommunityAsserters {
  /**
   * Asserts that the user has successfully joined a Reddit community.
   * It checks if the "Join" button text changes to "Joined".
   * 
   * @param redditExplorePage - The Reddit explore page instance
   */
  async assertCommunityHasBeenJoined(redditExplorePage: RedditExplorePage) {
    await expect(redditExplorePage.firstJoinButton).toHaveText('Joined');
  }
}
