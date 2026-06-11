import { defineConfig, devices } from '@playwright/test';
import { config as envConfig } from './config/env.js';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: envConfig.ui.timeout,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: envConfig.ui.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui',
      testMatch: /ui\/.*\.spec\.js/,
      fullyParallel: false,
      timeout: 90000,
      retries: process.env.CI ? 2 : 1,
      use: {
        ...devices['Desktop Chrome'],
        navigationTimeout: 45000,
        actionTimeout: 20000,
      },
    },
  ],
  outputDir: 'test-results',
});
