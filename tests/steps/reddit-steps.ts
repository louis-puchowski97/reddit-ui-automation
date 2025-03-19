import { Given, When } from '@cucumber/cucumber';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page.ts';
import { RedditHomePage } from '../../page-objects/reddit-home-page.ts';
import { RedditExplorePage } from '../../page-objects/reddit-explore-page.ts';
import { pageFixture } from "../support/page-fixture.ts"
import { World } from "../support/world.ts"

Given('I navigate to the Reddit registration page', async function (this: World) {
    this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    this.redditSelectedPostPage = new RedditSelectedPostPage(pageFixture.page);
    this.redditHomePage = new RedditHomePage(pageFixture.page);
    this.redditExplorePage = new RedditExplorePage(pageFixture.page);
    await this.redditRegistrationPage.navigate();
});

Given('I sign in', async function (this: World) {
    await this.redditRegistrationPage.signIn();
});