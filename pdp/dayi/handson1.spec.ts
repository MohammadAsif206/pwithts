import { test, expect,Page } from '@playwright/test';
//Task 1: Handle Cofirm Alert
const baseUrl = 'https://qaplayground.com/practice';
test.describe("Handle Alert: ", () => {
    test.beforeEach("Navigate to the homepage", async ({ page }) => {
        await page.goto(baseUrl);
        await expect(page).toHaveURL(/practice/)
    });
    test.afterEach("Close the page ", async ({ page }) => {
        await page.close();
    })
    test("Handle Alert; simple alert", async ({ page }) => {
        await openAlertDialogPractice(page);
        await expect(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByTestId('btn-simple-alert').click();
    });

    test("Handle Confirm alert: accep it", async ({ page }) => {
        await openAlertDialogPractice(page);
        await expect(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByTestId('btn-confirm-alert').click();
        await expect(page.getByTestId('result-confirm')).toContainText('Result: Accepted');
    });

    test("Handle Confirm alert: dismiss it", async ({ page }) => {
       await openAlertDialogPractice(page);
        await expect(page).toHaveURL(/alerts-dialogs/);
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept('Mohammad');
        });
        await page.getByTestId('btn-prompt-alert').click();
        await expect(page.getByTestId('result-prompt')).toBeVisible();
        await expect(page.getByTestId('result-prompt')).toContainText('Your name is — Mohammad');

    });

    test("Handle Prompt alert: Accept it", async ({ page }) => {
        await openAlertDialogPractice(page);
        await expect(page).toHaveURL(/alerts-dialogs/);
        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await page.locator('//*[@id="btn-prompt-alert"]').click();
      });

    test("Select and validate Checkbox-Checked", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await expect(page).toHaveURL(/radio-checkbox/);

        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        const checkBox = page.getByTestId('checkbox-remember-me');
        await checkBox.scrollIntoViewIfNeeded();
        console.log("The button name is: ",await checkBox.textContent());

        await checkBox.check();
        await expect(checkBox).toBeChecked();

    });
    test("Select and validate Checkbox- Unchecked", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await expect(page).toHaveURL(/radio-checkbox/);

        page.on('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        const checkBox = page.getByTestId('checkbox-remember-me');
        await checkBox.scrollIntoViewIfNeeded();
        console.log("The button name is: ",await checkBox.textContent());

        await checkBox.check();
        await expect(checkBox).toBeChecked();
        await checkBox.uncheck();
        await expect(checkBox).not.toBeChecked();

    });
    test("Select and validate Radio Button- Select", async ({ page }) => {
        await openRadioCheckboxPractice(page);
        await expect(page).toHaveURL(/radio-checkbox/);

        const radioButton = page.locator('.space-y-2').filter({
            has: page.getByText('Scenario 1: Select Any One Radio Button'),
        });
        const yesButton = radioButton.getByTestId('radio-yes-1');
        await yesButton.scrollIntoViewIfNeeded();
        console.log("The button name is: ",await yesButton.textContent());
        const noButton = radioButton.getByTestId('radio-no-1');
        await yesButton.check();
        await expect(yesButton).toBeChecked();
        await expect(noButton).not.toBeChecked();
        
        await noButton.check();
        await expect(noButton).toBeChecked();
        await expect(yesButton).not.toBeChecked();

    });
   
});
async function openRadioCheckboxPractice(page: Page) {
    const cardGrid = page.getByTestId('practice-card-grid');
    const alert = page
        .getByTestId('practice-card-radio-checkbox')
        .getByText('Practice Now');
    await expect(alert).toBeVisible();
    await expect(alert).toBeEnabled();
    await alert.click();
};
async function openAlertDialogPractice(page: Page) {
    const cardGrid = page.getByTestId('practice-card-grid');
    const alert = page
        .getByTestId('practice-card-alerts-dialogs')
        .getByText('Practice Now');
    await expect(alert).toBeVisible();
    await expect(alert).toBeEnabled();
    await alert.click();
};


