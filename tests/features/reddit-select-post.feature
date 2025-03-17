@reddit-select-post_feature
Feature: Reddit Registration

Background: User is logged in
    Given I navigate to Reddit registration page
    And I sign in

@reddit-select-post_post-can-be-selected
Scenario: User registers a new account
#   Given I navigate to Reddit registration page
  When I enter valid registration details
  Then I should be registered successfully