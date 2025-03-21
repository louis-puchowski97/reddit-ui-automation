import { expect } from '@playwright/test';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page';

export class RedditSelectedPostAsserters {
    /**
     * Asserts that the user is on a valid Reddit post page.
     * The URL should match the expected pattern for post pages.
     */
    async assertPostPageOpened(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.page).toHaveURL(/\/r\/.+\/comments\/.+/);
    }
    
    /**
     * Asserts that key post elements (title, comments, voting buttons, etc.) are visible.
     */
    async assertPostIsDisplayed(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.communityInformation).toBeVisible();
        await expect(redditSelectedPostPage.postTitle).toBeVisible();
        await expect(redditSelectedPostPage.commentTree).toBeVisible();
        await expect(redditSelectedPostPage.sortCommentDropdown).toBeVisible();
        await expect(redditSelectedPostPage.upvoteButton).toBeVisible();
        await expect(redditSelectedPostPage.downvoteButton).toBeVisible();
        await expect(redditSelectedPostPage.commentsButton).toBeVisible();
        await expect(redditSelectedPostPage.giveAwardButton).toBeVisible();
        await expect(redditSelectedPostPage.shareButton).toBeVisible();
    }

    /**
     * Asserts that all subreddit header elements (name, join button, subscriber count, etc.) are visible.
     */
    async assertSubredditHeaderIsDisplayed(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.subredditHeader).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderName).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderJoinButton).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderTitle).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderSubscribers).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderOnline).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderPosition).toBeVisible();
    }
}
