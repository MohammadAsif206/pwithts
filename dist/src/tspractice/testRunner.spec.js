"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
// User defined , it is good to have displayed for report
test_1.test.describe('Login functionality', () => {
    // set the hook which will run before each test in this describe block
    test_1.test.beforeEach(async ({ page }) => {
        await page.goto("https://practicetestautomation.com/practice-test-login/");
    });
    test_1.test.afterEach(async ({ page }) => {
        page.close();
    });
    (0, test_1.test)("Verify login with valid username and password", async ({ page }) => {
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');
        await page.click('#submit');
        await (0, test_1.expect)(page).toHaveURL(/successfully/);
    });
    (0, test_1.test)("Verify login with valid username and invalid password", async ({ page }) => {
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password1234');
        await page.click('#submit');
        (0, test_1.expect)(await page.locator('#error').textContent() === 'Your username is invalid!');
    });
    (0, test_1.test)("Verify login with invalid username and valid password", async ({ page }) => {
        await page.fill('#username', 'studentw');
        await page.fill('#password', 'Password123');
        await page.click('#submit');
        (0, test_1.expect)(await page.locator('#error').textContent() === 'Your password is invalid!');
    });
});
