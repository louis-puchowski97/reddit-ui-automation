import { Browser, BrowserContext, chromium, Page, test } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';
import { RedditHomePage } from '../../page-objects/reddit-home-page';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page';
import { RedditSelectedPostAsserters } from '../asserters/reddit-selected-post-asserters';
import { RedditSettingsPage } from '../../page-objects/reddit-settings-page';

test.describe('Joining a Reddit Community', () => {
  
  // Declare the page object variables to hold instances of the page objects and asserters
  let redditLoginPage: RedditLoginPage;
  let redditHomePage: RedditHomePage;
  let redditSelectedPostPage: RedditSelectedPostPage;
  let redditSelectedPostAsserters: RedditSelectedPostAsserters;

  // Setup before each test: Initialise page objects and navigate to the registration page
  test.beforeEach(async ({ page }) => {
    redditLoginPage = new RedditLoginPage(page);
    redditHomePage = new RedditHomePage(page);
    redditSelectedPostPage = new RedditSelectedPostPage(page);
    redditSelectedPostAsserters = new RedditSelectedPostAsserters();
  });

  // // Setup before each test case to instantiate the page objects
  // test.beforeEach(async () => {
  //   let browser: Browser;
  //   let context: BrowserContext;
  //   let page: Page;
    
  //   browser = await chromium.launch({ headless: false });
  //   context = await browser.newContext();
  //   page = await context.newPage();
    


    // console.log('Signing in to Reddit account...');
    // await redditLoginPage.navigate();
    // await redditLoginPage.signIn();
    
  test.only('User clicks on the first post when sorted by Top', async () => {
    await redditHomePage.navigate()
    // Sort the posts on the home page by 'Top'
    await redditHomePage.sortPostsBySelection();
    
    // Go to the first post from the home page (Top post)
    await redditHomePage.goToTopPostFromHomePage();
    
    // Assert that the selected post page is opened correctly
    await redditSelectedPostAsserters.assertPostPageOpened(redditSelectedPostPage);
    
    // Assert that the post content is displayed
    await redditSelectedPostAsserters.assertPostIsDisplayed(redditSelectedPostPage);
    
    // Assert that the subreddit header is displayed on the post page
    await redditSelectedPostAsserters.assertSubredditHeaderIsDisplayed(redditSelectedPostPage);
  });
});