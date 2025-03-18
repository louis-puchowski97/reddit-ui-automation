@reddit-join-community_feature @second
Feature: Joining a Reddit Community

  Background: User is logged in
    Given I navigate to the Reddit registration page
    And I sign in

  @reddit-join-community_user-can-subscribe
  Scenario: User joins a community
    When I go to the explore page
    And I join a community
    Then I should see that I have successfully joined the community