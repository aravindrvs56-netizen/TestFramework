import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { ROUTES, MESSAGES } from '../utils/constants.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.locators = {
      usernameInput: page.getByRole('textbox', { name: 'username' }),
      passwordInput: page.getByRole('textbox', { name: 'password' }),
      loginButton: page.getByRole('button', { name: 'Login' }),
      loginHeading: page.getByRole('heading', { name: 'Login' }),
      companyBranding: page.getByRole('img', { name: 'company-branding' }),
      errorAlert: page.locator('.oxd-alert-content-text'),
    };
  }

  async open() {
    await this.goto(ROUTES.LOGIN);
    await expect(this.locators.usernameInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.loginButton).toBeVisible();
  }

  async fillUsername(username) {
    await this.locators.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.locators.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.locators.loginButton.click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await Promise.all([
      this.page.waitForURL(/dashboard\/index/, { timeout: 30000 }),
      this.clickLogin(),
    ]);
  }

  async loginExpectingFailure(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async expectLoginPageDisplayed() {
    await this.expectUrlContains('auth/login');
    await this.expectTitleContains('OrangeHRM');
    await expect(this.locators.loginHeading).toBeVisible();
    await expect(this.locators.usernameInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.loginButton).toBeVisible();
    await expect(this.locators.companyBranding).toBeAttached();
  }

  async expectInvalidCredentialsError() {
    await expect(this.locators.errorAlert).toBeVisible();
    await expect(this.locators.errorAlert).toHaveText(MESSAGES.INVALID_CREDENTIALS);
  }

  async expectRequiredFieldErrors() {
    const requiredErrors = this.page
      .locator('.oxd-input-field-error-message')
      .filter({ hasText: MESSAGES.REQUIRED });
    await expect(requiredErrors.first()).toBeVisible();
  }
}
