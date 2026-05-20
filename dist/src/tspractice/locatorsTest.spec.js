"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const url = 'https://practicetestautomation.com/practice-test-login/';
const url1 = 'https://www.saucedemo.com/';
test_1.test.describe(" Practice PW Locator/Selectors - getByText", () => {
    (0, test_1.test)('Practice using getByLabel locator/selector', async ({ page }) => {
        page.goto('https://www.wikipedia.com/');
        const farsiLink = page.getByText('Search', { exact: true });
        await farsiLink.click();
        await (0, test_1.expect)(page).toHaveURL(/wikipedia/);
    });
});
test_1.test.describe(" Practice PW Locator/Selectors - getByRole", () => {
    (0, test_1.test)('Practice using getByRole locator/selector', async ({ page }) => {
        page.goto('https://www.wikipedia.com/');
        const farsiLink = page.getByRole('button', { name: 'Search' });
        await farsiLink.click();
        await (0, test_1.expect)(page).toHaveURL(/wikipedia/);
    });
});
test_1.test.describe(" Practice PW Locator/Selectors - getByLabel", () => {
    (0, test_1.test)('Practice using getByLabel locator/selector', async ({ page }) => {
        page.goto(url);
        const userName = page.getByLabel('Username');
        await userName.fill('Mohammad');
        const inputValue = await userName.inputValue();
        console.log(`Entered User Name is: ${inputValue}`);
        (0, test_1.expect)(inputValue).toBe('Mohammad');
    });
});
test_1.test.describe(" Practice PW Locator/Selectors - getByPlaceholder", () => {
    (0, test_1.test)('Practice using getByPlaceholder locator/selector', async ({ page }) => {
        page.goto(url1);
        const userName = page.getByPlaceholder('Username');
        await userName.fill('Mohammad');
        const inputValue = await userName.inputValue();
        console.log(`Entered User Name for saucedemo user fieild is: ${inputValue}`);
        (0, test_1.expect)(inputValue).toBe('Mohammad');
    });
});
test_1.test.describe(" Practice PW Locator/Selectors - getByTestId", () => {
    (0, test_1.test)('Practice using getByTestId locator/selector', async ({ page }) => {
        await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
        const getTestId = await page.getByTestId('submit-btn').textContent();
        console.log(`Entered User Name for saucedemo user fieild is: ${getTestId}`);
        (0, test_1.expect)(getTestId).toBe('Submit');
        await page.close();
    });
});
test_1.test.describe(" Practice PW Locator/Selectors - Shadow DOM with shadoHost", () => {
    (0, test_1.test)('Practice using getByTestId locator/selector', async ({ page }) => {
        await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
        const shadoHost = page.locator('#shadowHost');
        const shadowHostBtn = await shadoHost.locator('#shadowBtn').textContent();
        console.log(`Entered User Name for saucedemo user fieild is: ${shadowHostBtn}`);
        (0, test_1.expect)(shadowHostBtn).toBe('Shadow Button');
        await page.close();
    });
});
