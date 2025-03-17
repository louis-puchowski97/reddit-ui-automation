import { Given, When, Then } from '@cucumber/cucumber';
// import { CustomWorld } from '../support/custom-world.ts';
import { expect } from '@playwright/test';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { pageFixture } from "../support/page-fixture.ts"
import { World } from "../support/world.ts"
import { loginReddit } from '../../utils/reddit-auth.ts';

Given('I navigate to Reddit registration page', async function (this: World) {
    // await pageFixture.page.goto("https://www.reddit.com/")
    // this.page = await this.browser.newPage();
    this.redditRegistrationPage = new RedditRegistrationPage(pageFixture.page);
    await this.redditRegistrationPage.navigate();
});

Given('hello', async function (this: World) {
    console.log("Hellooooooooooo");
});

Given('I sign in', async function (this: World) {
    await loginReddit("username", "password");
});

When('I enter valid registration details', async function (this: World) {
    await this.redditRegistrationPage.signUp("test.user@test.com");
    let abc = await this.redditRegistrationPage.shadowUsername.innerText();
});

Then('I should be registered successfully', async function () {
    // expect(await this.redditRegistration.isRegistered()).toBeTruthy();
});