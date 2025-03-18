import { Page, Locator } from '@playwright/test';

export class RedditSelectedPostPage {
  readonly page: Page;
  readonly postTitle: Locator;
  readonly commentComposerHost: Locator;
  readonly commentComposerButton: Locator;
  readonly commentTree: Locator;
  readonly sortCommentDropdown: Locator;
  readonly upvoteButton: Locator;
  readonly downvoteButton: Locator;
  readonly shareButton: Locator;
  readonly userPostActionsButton: Locator;
  readonly saveAction: Locator;
  readonly hideAction: Locator;
  readonly reportAction: Locator;
  readonly hideButton: Locator;
  readonly reportButton: Locator;
  
  readonly subredditHeader: Locator;
  readonly subredditHeaderName: Locator;
  readonly subredditHeaderJoinButton: Locator;
  readonly subredditHeaderTitle: Locator;
  readonly subredditHeaderDescription: Locator;
  readonly subredditHeaderShowMoreButton: Locator;
  readonly subredditHeaderSubscribers: Locator;
  readonly subredditHeaderOnline: Locator;
  readonly subredditHeaderPosition: Locator;

  constructor(page: Page) {
    this.page = page;

    // Post-related elements
    this.postTitle = page.locator('h1[slot="title"]');

    // Comment-related elements
    this.commentComposerHost = page.locator('comment-composer-host');
    this.commentComposerButton = page.locator('comment-composer-host button[data-testid="trigger-button"]');
    this.commentTree = page.locator('shreddit-comment-tree#comment-tree');
    this.sortCommentDropdown = page.locator('button[aria-label="Sort by: Best"]');
    this.subredditHeader = page.locator('shreddit-subreddit-header');
    this.subredditHeaderName = page.locator('div.prefixedName:has-text("r/")');
    this.subredditHeaderJoinButton = page.locator('button[data-post-click-location="join"]');
    this.subredditHeaderTitle = page.locator('#title');
    this.subredditHeaderDescription = page.locator('#description');
    this.subredditHeaderShowMoreButton = page.locator('');
    this.subredditHeaderSubscribers = page.locator('#subscribers');
    this.subredditHeaderOnline = page.locator('#online');
    this.subredditHeaderPosition = page.locator('#position');

    // Action buttons
    this.upvoteButton = page.getByRole('button', { name: 'Upvote' });
    this.downvoteButton = page.getByRole('button', { name: 'Downvote' });
    this.shareButton = page.getByRole('button', { name: 'Share' });
  }
}