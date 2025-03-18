@reddit-select-post_feature
Feature: Reddit Registration

Background: User is logged in
    Given I navigate to Reddit registration page
      And I sign in

@reddit-select-post_post-can-be-selected
Scenario: User registers a new account
  When I order the posts by top voted
    And I click the first post
  Then I am on the page for the top post
    And the post is displayed
    And the subreddit header is displayed