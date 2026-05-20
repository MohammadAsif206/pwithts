"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
//Task 1: Handle Cofirm Alert
const baseUrl = 'https://qaplayground.com/practice';
test_1.test.describe("Handle Alert: ", () => {
    test_1.test.beforeEach("Navigate to the homepage", async ({ page }) => {
        await page.goto(baseUrl);
        await (0, test_1.expect)(page).toHaveURL(/practice/);
    });
    test_1.test.afterEach("Close the page ", async ({ page }) => {
        await page.close();
    });
    (0, test_1.test)("Handle Alert; simple alert", async ({ page }) => {
        await openAlertDialogPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByTestId('btn-simple-alert').click();
    });
    (0, test_1.test)("Handle Confirm alert: accep it", async ({ page }) => {
        await openAlertDialogPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByTestId('btn-confirm-alert').click();
        await (0, test_1.expect)(page.getByTestId('result-confirm')).toContainText('Result: Accepted');
    });
    (0, test_1.test)("Handle Confirm alert: dismiss it", async ({ page }) => {
        await openAlertDialogPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/alerts-dialogs/);
        page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept('Mohammad');
        });
        await page.getByTestId('btn-prompt-alert').click();
        await (0, test_1.expect)(page.getByTestId('result-prompt')).toBeVisible();
        await (0, test_1.expect)(page.getByTestId('result-prompt')).toContainText('Your name is — Mohammad');
    });
    (0, test_1.test)("Handle Prompt alert: Accept it", async ({ page }) => {
        await openAlertDialogPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await page.locator('//*[@id="btn-prompt-alert"]').click();
    });
    (0, test_1.test)("Select and validate Checkbox-Checked", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/radio-checkbox/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        const checkBox = page.getByTestId('checkbox-remember-me');
        await checkBox.scrollIntoViewIfNeeded();
        console.log("The button name is: ", await checkBox.textContent());
        await checkBox.check();
        await (0, test_1.expect)(checkBox).toBeChecked();
    });
    (0, test_1.test)("Select and validate Checkbox- Unchecked", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/radio-checkbox/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        const checkBox = page.getByTestId('checkbox-remember-me');
        await checkBox.scrollIntoViewIfNeeded();
        console.log("The button name is: ", await checkBox.textContent());
        await checkBox.check();
        await (0, test_1.expect)(checkBox).toBeChecked();
        await checkBox.uncheck();
        await (0, test_1.expect)(checkBox).not.toBeChecked();
    });
    (0, test_1.test)("Select and validate Radio Button- Select", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await (0, test_1.expect)(page).toHaveURL(/radio-checkbox/);
        const radioButton = page.locator('.space-y-2').filter({
            has: page.getByText('Scenario 1: Select Any One Radio Button'),
        });
        const yesButton = radioButton.getByTestId('radio-yes-1');
        await yesButton.scrollIntoViewIfNeeded();
        console.log("The button name is: ", await yesButton.textContent());
        const noButton = radioButton.getByTestId('radio-no-1');
        await yesButton.check();
        await (0, test_1.expect)(yesButton).toBeChecked();
        await (0, test_1.expect)(noButton).not.toBeChecked();
        await noButton.check();
        await (0, test_1.expect)(noButton).toBeChecked();
        await (0, test_1.expect)(yesButton).not.toBeChecked();
    });
});
async function openRadioCheckboxPractice(page) {
    const cardGrid = page.getByTestId('practice-card-grid');
    const alert = page
        .getByTestId('practice-card-radio-checkbox')
        .getByText('Practice Now');
    await (0, test_1.expect)(alert).toBeVisible();
    await (0, test_1.expect)(alert).toBeEnabled();
    await alert.click();
}
;
async function openAlertDialogPractice(page) {
    const cardGrid = page.getByTestId('practice-card-grid');
    const alert = page
        .getByTestId('practice-card-alerts-dialogs')
        .getByText('Practice Now');
    await (0, test_1.expect)(alert).toBeVisible();
    await (0, test_1.expect)(alert).toBeEnabled();
    await alert.click();
}
;
