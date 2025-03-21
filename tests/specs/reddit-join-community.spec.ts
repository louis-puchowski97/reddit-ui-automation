import { Browser, BrowserContext, chromium, Page, test } from '@playwright/test';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page';
import { RedditJoinCommunityAsserters } from '../asserters/reddit-join-community-asserters';
import { RedditHomePage } from '../../page-objects/reddit-home-page';

test.describe('Joining a Reddit Community', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // Declare the page object variables to hold instances of the page objects and asserters
  let redditHomePage: RedditHomePage;
  let redditExplorePage: RedditExplorePage;
  let redditJoinCommunityAsserters: RedditJoinCommunityAsserters;

  // Setup before each test case to instantiate the page objects
  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      storageState: 'tests/auth/auth.json'  // Load the auth state from the saved JSON file
    });
    page = await context.newPage();

    redditHomePage = new RedditHomePage(page);
    redditExplorePage = new RedditExplorePage(page);
    redditJoinCommunityAsserters = new RedditJoinCommunityAsserters();
  });

  test.afterEach(async () => {
    // Clean up by closing the page and context after each test
    await page.close();
    await context.close();
    await browser.close();
  });

  test('User joins a community', async () => {
    await test.step('Navigate to the home page', async () => {
      await redditHomePage.navigate();
    });

    await test.step('Navigate to the explore page', async () => {
      await redditHomePage.goToExplorePage();
    });

    await test.step('Join the community', async () => {
      await redditExplorePage.joinCommunity();
    });

    await test.step('Assert the community has been joined', async () => {
      await redditJoinCommunityAsserters.assertCommunityHasBeenJoined(redditExplorePage);
    });
  });
});
