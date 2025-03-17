import { Given, When, Then } from '@cucumber/cucumber';
// import { CustomWorld } from '../support/custom-world.ts';
import { expect } from '@playwright/test';
import { RedditRegistrationPage } from '../../page-objects/reddit-registration-page.ts';
import { pageFixture } from "../support/page-fixture.ts"
import { World } from "../support/world.ts"

When('I enter valid registration details', async function (this: World) {
    await this.redditRegistrationPage.signUp("test.user@test.com");
    let abc = await this.redditRegistrationPage.shadowRegisterUsername.innerText();
});

Then('I should be registered successfully', async function () {
    // expect(await this.redditRegistration.isRegistered()).toBeTruthy();
});