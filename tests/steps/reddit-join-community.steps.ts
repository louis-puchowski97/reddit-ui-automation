import { When, Then } from '@cucumber/cucumber';
import { World } from "../support/world.ts";

When('I go to the explore page', async function (this: World) {
    await this.redditHomePage.goToExplorePage();
});

When('I join a community', async function (this: World) {
    await this.redditExplorePage.joinCommunity();
});

Then('I should see that I have successfully joined the community', async function (this: World) {
    // await this.redditExplorePage.firstJoinButton.text
    await this.redditJoinCommunityAsserters.assertCommunityHasBeenJoined(this.redditExplorePage);
});