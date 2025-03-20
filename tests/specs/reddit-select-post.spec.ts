import { test } from '../utils/test-setup';
import { RedditHomePage } from '../../page-objects/reddit-home-page';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page';
import { RedditSelectedPostAsserters } from '../asserters/reddit-selected-post-asserters';

test.describe('Joining a Reddit Community', () => {
  
  // Declare the page object variables to hold instances of the page objects and asserters
  let redditHomePage: RedditHomePage;
  let redditSelectedPostPage: RedditSelectedPostPage;
  let redditSelectedPostAsserters: RedditSelectedPostAsserters;

  // Setup before each test case to instantiate the page objects
  test.beforeEach(async ({ page }) => {
    redditHomePage = new RedditHomePage(page);
    redditSelectedPostPage = new RedditSelectedPostPage(page);
    redditSelectedPostAsserters = new RedditSelectedPostAsserters();
  });

  test('User clicks on the first post when sorted by Top', async ({ redditLoginPage }) => {
    
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