import { IWorldOptions, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page.ts';
import { RedditHomePage } from '../../page-objects/reddit-home-page.ts';
import { RedditRegistrationAsserters } from '../asserters/reddit-registration-asserters.ts';
import { RedditSelectedPostAsserters } from '../asserters/reddit-selected-post-asserters.ts';
import { pageFixture } from './page-fixture.ts';

export class World {

  redditRegistrationPage: RedditRegistrationPage;
  redditSelectedPostPage: RedditSelectedPostPage;
  redditHomePage: RedditHomePage;
  redditRegistrationAsserters: RedditRegistrationAsserters;
  redditSelectedPostAsserters: RedditSelectedPostAsserters;
  username: string;

  /**
   * @param {IWorldOptions=} opts
   */
  constructor(opts: IWorldOptions) {
    this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    this.redditSelectedPostPage = new RedditSelectedPostPage(pageFixture.page);
    this.redditHomePage = new RedditHomePage(pageFixture.page);
    this.redditRegistrationAsserters = new RedditRegistrationAsserters();
    this.redditSelectedPostAsserters = new RedditSelectedPostAsserters();
  }
}

setWorldConstructor(World);
setDefaultTimeout(60000);