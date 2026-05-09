import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',

  /* Run tests in parallel in CI */
  fullyParallel: true,

  /* Fail CI faster if something is broken */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests in CI */
  retries: process.env.CI ? 2 : 0,

  /* Limit workers in CI for stability */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter */
  reporter: process.env.CI
  ? [
      ['list'],
      ['html', { open: 'never' }]
    ]
  : [
      ['list'],
      ['html'],
      ['allure-playwright']
    ],
  use: {
    baseURL: 'https://valentinos-magic-beans.click',

    /* CI-friendly settings */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',

    /* Always use clean browser context */
    storageState: undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});