import { When, Then } from '@cucumber/cucumber';
import { World } from "../support/world.ts";

When('I order the posts by top voted', async function (this: World) {
});

When('I click the first post', async function (this: World) {
    await this.redditHomePage.sortPostsBySelection();
    await this.redditHomePage.goToTopPostFromHomePage();
});

Then('I am on the page for the top post', async function (this: World) {
    await this.redditSelectedPostAsserters.assertPostPageOpened(this.redditSelectedPostPage);
});

Then('the post is displayed', async function (this: World) {
    await this.redditSelectedPostAsserters.assertPostIsDisplayed(this.redditSelectedPostPage);
});

Then('the subreddit header is displayed', async function (this: World) {
    await this.redditSelectedPostAsserters.assertSubredditHeaderIsDisplayed(this.redditSelectedPostPage);
});