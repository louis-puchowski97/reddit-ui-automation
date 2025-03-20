import { test } from '@playwright/test';
import { RedditHomePage } from '../../page-objects/reddit-home-page';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';
import { RedditRegistrationAsserters } from '../asserters/reddit-registration-asserters';

test.describe('Joining a Reddit Community', () => {
  
  // Declare variables for the page objects and asserters
  let redditHomePage: RedditHomePage;
  let redditLoginPage: RedditLoginPage;
  let redditRegistrationAsserters: RedditRegistrationAsserters;

  // Setup before each test: Initialise page objects and navigate to the registration page
  test.beforeEach(async ({ page }) => {
    redditHomePage = new RedditHomePage(page);
    redditLoginPage = new RedditLoginPage(page);
    redditRegistrationAsserters = new RedditRegistrationAsserters();
    
    // Navigate to the Reddit registration page before each test
    await redditLoginPage.navigate();
  });

  // Test case: Register a new account and verify account creation
  test.only('User verifies account creation', async () => {
    
    // Register a new Reddit account
    // await redditLoginPage.register();
    
    // Assert that the account has been successfully created
    await redditRegistrationAsserters.assertAccountHasBeenCreated(redditHomePage);
  });
});