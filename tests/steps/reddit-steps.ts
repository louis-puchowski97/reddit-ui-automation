import { Given, When } from '@cucumber/cucumber';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { pageFixture } from "../support/page-fixture.ts"
import { World } from "../support/world.ts"

Given('I navigate to the Reddit registration page', async function (this: World) {
    this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    await this.redditRegistrationPage.navigate();
});

Given('I sign in', async function (this: World) {
    await this.redditRegistrationPage.signIn();
});

When('I enter valid registration details', async function (this: World) {
    await this.redditRegistrationPage.signUp("test.user@test.com");
});