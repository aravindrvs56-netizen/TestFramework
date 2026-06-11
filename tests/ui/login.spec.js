import { test, expect } from '@playwright/test';
import { users } from '../../test-data/index.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe.configure({ mode: 'serial' });

test.describe('OrangeHRM Login Module', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.open();
    await loginPage.expectLoginPageDisplayed();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page
        .screenshot({ fullPage: true, timeout: 5000 })
        .catch(() => null);

      if (screenshot) {
        await testInfo.attach('failure-screenshot', {
          body: screenshot,
          contentType: 'image/png',
        });
      }
    }
  });

  test('TC-LOGIN-001: Successful login with valid admin credentials @smoke @positive', async () => {
    const { username, password } = users.validAdmin;

    await loginPage.login(username, password);
    await dashboardPage.expectDashboardDisplayed();
    await expect(dashboardPage.locators.userDropdown).toBeVisible();
  });

  test('TC-LOGIN-007: Invalid login with wrong username and password @negative', async () => {
    const { username, password } = users.invalidUser;

    await loginPage.loginExpectingFailure(username, password);

    await loginPage.expectUrlContains('auth/login');
    await loginPage.expectTitleContains('OrangeHRM');
    await loginPage.expectInvalidCredentialsError();
    await expect(dashboardPage.locators.dashboardHeader).not.toBeVisible();
  });

  test('TC-LOGIN-002: Successful logout after valid login @smoke @positive', async () => {
    const { username, password } = users.validAdmin;

    await loginPage.login(username, password);
    await dashboardPage.expectDashboardDisplayed();

    await dashboardPage.logout();

    await loginPage.expectLoginPageDisplayed();
    await expect(loginPage.locators.errorAlert).not.toBeVisible();
  });
});
