import { When, Then } from '@cucumber/cucumber';
import { World } from "../support/world.ts";

When('I enter valid registration details', async function (this: World) {
    await this.redditRegistrationPage.register();
});

Then('I should be registered successfully', async function (this: World) {
    await this.redditRegistrationAsserters.assertAccountHasBeenCreated(this.redditHomePage);
});