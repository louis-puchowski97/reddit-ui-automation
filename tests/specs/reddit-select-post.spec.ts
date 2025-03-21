import { Browser, BrowserContext, chromium, Page, test } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';
import { RedditHomePage } from '../../page-objects/reddit-home-page';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page';
import { RedditSelectedPostAsserters } from '../asserters/reddit-selected-post-asserters';

test.describe('Joining a Reddit Community', () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // Declare the page object variables to hold instances of the page objects and asserters
  let redditLoginPage: RedditLoginPage;
  let redditHomePage: RedditHomePage;
  let redditSelectedPostPage: RedditSelectedPostPage;
  let redditSelectedPostAsserters: RedditSelectedPostAsserters;

  test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      storageState: 'tests/auth/auth.json'  // Load the auth state from the saved JSON file
    });
    page = await context.newPage();

    // Initialize page objects and asserters
    redditLoginPage = new RedditLoginPage(page);
    redditHomePage = new RedditHomePage(page);
    redditSelectedPostPage = new RedditSelectedPostPage(page);
    redditSelectedPostAsserters = new RedditSelectedPostAsserters();
    
    // Navigate to the home page after login
    await redditLoginPage.navigateToReddit();
  });

  test.afterEach(async () => {
    // Clean up by closing the page and context after each test
    await page.close();
    await context.close();
    await browser.close();
  });

  test('User clicks on the first post when sorted by Top', async () => {
    // Use test.step() to describe actions clearly
    await test.step('Navigate to the homepage', async () => {
      await redditHomePage.navigate();
    });

    await test.step('Sort posts by Top', async () => {
      await redditHomePage.sortPostsBySelection();
    });

    await test.step('Go to the first post from the homepage (Top post)', async () => {
      await redditHomePage.goToTopPostFromHomePage();
    });

    await test.step('Assert that the selected post page is opened correctly', async () => {
      await redditSelectedPostAsserters.assertPostPageOpened(redditSelectedPostPage);
    });

    await test.step('Assert that the post content is displayed', async () => {
      await redditSelectedPostAsserters.assertPostIsDisplayed(redditSelectedPostPage);
    });

    await test.step('Assert that the subreddit header is displayed on the post page', async () => {
      await redditSelectedPostAsserters.assertSubredditHeaderIsDisplayed(redditSelectedPostPage);
    });
  });
});
