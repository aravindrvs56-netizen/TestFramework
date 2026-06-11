import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/', maxAttempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 45000 });
        return;
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          await this.page.reload({ waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
        }
      }
    }

    throw lastError;
  }

  async getTitle() {
    return this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async expectUrlContains(fragment) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async expectTitleContains(text) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }

  async expectVisibleText(text) {
    await expect(this.page.getByText(text, { exact: false })).toBeVisible();
  }
}
