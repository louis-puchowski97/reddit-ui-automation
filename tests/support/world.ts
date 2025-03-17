import { IWorldOptions, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, firefox, webkit, BrowserContext, Page } from 'playwright';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { RedditRegistrationAsserters } from '../asserters/reddit-registration-asserters.ts';
import { pageFixture } from './page-fixture.ts';

export class World {


  // browser: Browser | null = null;
  // context: BrowserContext | null = null;
  // page: Page | null = null;


  redditRegistrationPage: RedditRegistrationPage;
  redditRegistrationAsserters: RedditRegistrationAsserters;
  username: string;

  /**
   * @param {IWorldOptions=} opts
   */
  constructor(opts: IWorldOptions) {
    this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    this.redditRegistrationAsserters = new RedditRegistrationAsserters(this.redditRegistrationPage);
  }
}

setWorldConstructor(World);
setDefaultTimeout(60000);