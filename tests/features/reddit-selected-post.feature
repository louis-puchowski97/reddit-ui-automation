@reddit-select-post_feature @third
Feature: Reddit Selecting the Top Post

  Background: User is logged in
      Given I navigate to the Reddit registration page
        And I sign in

  @reddit-select-post_post-can-be-selected
  Scenario: User clicks on the first post when srted by Top
    When I order the posts by top voted
      And I click the first post
    Then I am on the page for the top post
      And the post is displayed
      And the subreddit header is displayed