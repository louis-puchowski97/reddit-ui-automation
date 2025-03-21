import { expect } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';

export class RedditRegistrationAsserters {
  /**
   * Asserts that the registration form contains valid username and password inputs.
   * Checks for visible validation icons and an enabled continue button.
   */
  async assertRegistrationDataIsValid(loginPage: RedditLoginPage) {
    await expect(loginPage.registerUsernameValidIcon).toBeVisible();
    await expect(loginPage.registerPasswordValidIcon).toBeVisible();
    await expect(loginPage.registerUserContinueButton).toBeVisible();
  }
  
  /**
   * Asserts that the registration form contains invalid username or password inputs.
   * Checks for visible error icons and a disabled continue button.
   */
  async assertRegistrationDataIsInvalid(loginPage: RedditLoginPage) {
    await expect(loginPage.registerUsernameInvalidIcon).toBeVisible();
    await expect(loginPage.registerPasswordInvalidIcon).toBeVisible();
    await expect(loginPage.registerUserContinueButton).toBeDisabled();
  }
}
