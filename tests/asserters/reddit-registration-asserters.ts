import { expect } from '@playwright/test';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';

export class RedditRegistrationAsserters {
   redditRegistrationPage: RedditRegistrationPage

  constructor(redditRegistrationPage: RedditRegistrationPage) {
    this.redditRegistrationPage = redditRegistrationPage;
  }

  async assertAccountHasBeenCreated() {
  }
}
