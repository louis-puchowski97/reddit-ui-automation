import { expect } from '@playwright/test';
import { RedditSelectedPostPage } from '../../page-objects/reddit-selected-post-page.ts';

export class RedditSelectedPostAsserters {
    async assertPostPageOpened(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.page).toHaveURL(/\/r\/.+\/comments\/.+/);
    }
    
    async assertPostIsDisplayed(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.postTitle).toBeVisible();
        await expect(redditSelectedPostPage.commentComposerHost).toBeVisible();
        await expect(redditSelectedPostPage.commentComposerButton).toBeVisible();
        await expect(redditSelectedPostPage.commentTree).toBeVisible();
        await expect(redditSelectedPostPage.sortCommentDropdown).toBeVisible();
        await expect(redditSelectedPostPage.upvoteButton).toBeVisible();
        await expect(redditSelectedPostPage.downvoteButton).toBeVisible();
        await expect(redditSelectedPostPage.shareButton).toBeVisible();
    }


    async assertSubredditHeaderIsDisplayed(redditSelectedPostPage: RedditSelectedPostPage) {
        await expect(redditSelectedPostPage.subredditHeader).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderName).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderJoinButton).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderTitle).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderDescription).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderShowMoreButton).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderSubscribers).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderOnline).toBeVisible();
        await expect(redditSelectedPostPage.subredditHeaderPosition).toBeVisible();
    }

}