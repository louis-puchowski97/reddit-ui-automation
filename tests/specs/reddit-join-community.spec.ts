import { test } from '../utils/test-setup';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page';
import { RedditJoinCommunityAsserters } from '../asserters/reddit-join-community-asserters';
import { RedditHomePage } from '../../page-objects/reddit-home-page';

test.describe('Joining a Reddit Community', () => {

  // Declare the page object variables to hold instances of the page objects and asserters
  let redditHomePage: RedditHomePage;
  let redditExplorePage: RedditExplorePage;
  let redditJoinCommunityAsserters: RedditJoinCommunityAsserters;

  // Setup before each test case to instantiate the page objects
  test.beforeEach(async ({ page }) => {
    redditHomePage = new RedditHomePage(page);
    redditExplorePage = new RedditExplorePage(page);
    redditJoinCommunityAsserters = new RedditJoinCommunityAsserters();
  });

  test('User joins a community', async ({ redditLoginPage }) => {
    // Navigate to explore page
    await redditHomePage.goToExplorePage();

    // Join the community
    await redditExplorePage.joinCommunity();

    // Assert the community was successfully joined
    await redditJoinCommunityAsserters.assertCommunityHasBeenJoined(redditExplorePage);
  });
});