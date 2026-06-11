import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { ROUTES } from '../utils/constants.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.locators = {
      dashboardHeader: page.locator('.oxd-topbar-header-breadcrumb'),
      sidePanel: page.locator('.oxd-sidepanel'),
      userDropdown: page.locator('.oxd-userdropdown-tab'),
      logoutLink: page.getByRole('menuitem', { name: 'Logout' }),
      dashboardWidget: page.locator('.orangehrm-dashboard-widget'),
    };
  }

  async expectDashboardDisplayed() {
    await this.expectUrlContains('dashboard/index');
    await this.expectTitleContains('OrangeHRM');
    await expect(this.locators.dashboardHeader).toBeVisible();
    await expect(this.locators.sidePanel).toBeVisible();
    await expect(this.locators.dashboardHeader).toContainText('Dashboard');
  }

  async openUserMenu() {
    await this.locators.userDropdown.click();
  }

  async logout() {
    await this.openUserMenu();
    await Promise.all([
      this.page.waitForURL(/auth\/login/, { timeout: 30000 }),
      this.locators.logoutLink.click(),
    ]);
  }

  async expectRedirectedToLogin() {
    await this.expectUrlContains(ROUTES.LOGIN.replace('/', '\\/'));
  }
}
