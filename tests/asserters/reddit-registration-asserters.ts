import { expect } from '@playwright/test';
import { RedditLoginPage } from '../../page-objects/reddit-login-page';

export class RedditRegistrationAsserters {
  async assertRegistrationDataIsValid(loginPage: RedditLoginPage) {
    await expect(loginPage.registerUsernameValidIcon).toBeVisible();
    await expect(loginPage.registerPasswordValidIcon).toBeVisible();
    await expect(loginPage.registerUserContinueButton).toBeVisible();
  }
  
  async assertRegistrationDataIsInvalid(loginPage: RedditLoginPage) {
    await expect(loginPage.registerUsernameInvalidIcon).toBeVisible();
    await expect(loginPage.registerPasswordInvalidIcon).toBeVisible();
    await expect(loginPage.registerUserContinueButton).toBeDisabled();
  }
}
