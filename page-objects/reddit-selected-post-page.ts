import { Page, Locator } from '@playwright/test';

export class RedditSelectedPostPage {
    private readonly page: Page;

    readonly postTitle: Locator;
    readonly communityInformation: Locator;

    readonly commentTree: Locator;
    readonly sortCommentDropdown: Locator;
    readonly upvoteButton: Locator;
    readonly downvoteButton: Locator;
    readonly commentsButton: Locator;
    readonly giveAwardButton: Locator;
    readonly shareButton: Locator;

    readonly subredditHeader: Locator;
    readonly subredditHeaderName: Locator;
    readonly subredditHeaderJoinButton: Locator;
    readonly subredditHeaderTitle: Locator;
    readonly subredditHeaderSubscribers: Locator;
    readonly subredditHeaderOnline: Locator;
    readonly subredditHeaderPosition: Locator;


    constructor(page: Page) {
        this.page = page;

        // High-level elements
        this.postTitle = page.locator('h1[slot="title"]');
        this.communityInformation = page.locator('aside[aria-label="Community information"]');

        // Comment-related elements
        this.commentTree = page.locator('shreddit-comment-tree#comment-tree');
        this.sortCommentDropdown = page.locator('button[aria-label="Sort by: Best"]');

        // Subreddit information-related elements
        this.subredditHeader = page.locator('shreddit-subreddit-header');
        this.subredditHeaderName = page.locator('div.prefixedName:has-text("r/")');
        this.subredditHeaderJoinButton = page
            .locator('shreddit-join-button[subscribe-label="Join"]')
            .locator('button[data-post-click-location="join"]');
        this.subredditHeaderTitle = page.locator('#title');
        this.subredditHeaderSubscribers = page.locator('#subscribers');
        this.subredditHeaderOnline = page.locator('#online');
        this.subredditHeaderPosition = page.locator('#position');
        this.subredditHeaderPosition = page.locator('#position');

        // Action buttons
        this.upvoteButton = page.getByRole('button', { name: 'Upvote' }).first();
        this.downvoteButton = page.getByRole('button', { name: 'Downvote' }).first();
        this.commentsButton = page.locator('button[name="comments-action-button"]');
        this.giveAwardButton = page.getByRole('button', { name: 'Give award' }).first();
        this.shareButton = page.getByRole('button', { name: 'Share' }).first();
    }

    public async getPageURL(): Promise<string> {
        return this.page.url();
    }
}