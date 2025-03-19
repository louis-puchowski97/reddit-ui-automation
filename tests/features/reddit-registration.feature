@reddit-registration_feature @first
Feature: Reddit Registration

  @reddit-registration_register-account
  Scenario: User registers a new account
    Given I navigate to the Reddit registration page
    When I enter valid registration details
    Then I should be registered successfully