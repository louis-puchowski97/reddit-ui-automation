import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { pageFixture } from './page-fixture.ts';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page.ts';
import { RedditHomePage } from '../../page-objects/reddit-home-page.ts';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page.ts';
import { RedditRegistrationAsserters } from '../asserters/reddit-registration-asserters.ts';
import { RedditSelectedPostAsserters } from '../asserters/reddit-selected-post-asserters.ts';
import { RedditJoinCommunityAsserters } from '../asserters/reddit-join-community-asserters.ts';

export class World {

  redditRegistrationPage: RedditRegistrationPage;
  redditSelectedPostPage: RedditSelectedPostPage;
  redditHomePage: RedditHomePage;
  redditExplorePage: RedditExplorePage;
  redditRegistrationAsserters: RedditRegistrationAsserters;
  redditSelectedPostAsserters: RedditSelectedPostAsserters;
  redditJoinCommunityAsserters: RedditJoinCommunityAsserters;

  constructor() {
    // this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    // this.redditSelectedPostPage = new RedditSelectedPostPage(pageFixture.page);
    // this.redditHomePage = new RedditHomePage(pageFixture.page);
    // this.redditExplorePage = new RedditExplorePage(pageFixture.page);
    this.redditRegistrationAsserters = new RedditRegistrationAsserters();
    this.redditSelectedPostAsserters = new RedditSelectedPostAsserters();
    this.redditJoinCommunityAsserters = new RedditJoinCommunityAsserters();
  }
}

setWorldConstructor(World);
setDefaultTimeout(60000);