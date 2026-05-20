"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe("Perform Drag & Drop  ", async () => {
    test_1.test.beforeEach('Navigate to the testing page', async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/extra-components/drag-drop');
        (0, test_1.expect)(page).toHaveURL(/drag-drop/);
    });
    (0, test_1.test)('Verify target contains the dragged element text - Drag a specific item', async ({ page }) => {
        const source = page.getByText("Feed the dog");
        const target = page.locator("#drop-list").first();
        const toDoItem = await source.textContent();
        await source.dragTo(target);
        console.log("Source text: ", toDoItem);
        console.log("Done text: ", await target.locator('[data-cy="done-item"]').textContent());
        (0, test_1.expect)(await target.locator('[data-cy="done-item"]').textContent()).toContain(toDoItem);
    });
    (0, test_1.test)('Verify target contains the dragged element text - Drag all items', async ({ page }) => {
        const todoItems = page.locator('#todo-list .example-box');
        const dropList = page.locator('#drop-list');
        const listSize = await todoItems.count();
        console.log('Size of the lsit: ', listSize);
        for (let i = 0; i < listSize; i++) {
            const item = todoItems.first();
            const itemText = await item.textContent();
            await item.dragTo(dropList);
            await (0, test_1.expect)(dropList).toContainText(itemText);
            console.log(`Dragged Item: ${itemText}`);
        }
    });
});
test_1.test.describe("Select options from dropdown menu  ", () => {
    test_1.test.beforeEach('Navigate to the testing page', async ({ page }) => {
        await page.goto('https://demoqa.com/select-menu');
        (0, test_1.expect)(page).toHaveURL(/select-menu/);
    });
    (0, test_1.test)('Select value from old style dropdown ', async ({ page }) => {
        const selectMenu = page.locator('#oldSelectMenu');
        const allOptions = await selectMenu.locator('option').allTextContents();
        let i = 0;
        for (const option of allOptions) {
            await selectMenu.selectOption({ label: option });
            console.log(`Option selected is: ${option} `);
            await (0, test_1.expect)(selectMenu).toContainText(option);
            (0, test_1.expect)(await selectMenu.locator('option').nth(i).textContent()).toEqual(option);
            i++;
        }
    });
    (0, test_1.test)('Verify multi select dropdown- select one option', async ({ page }) => {
        const dropdown = page.locator('#react-select-4-input');
        const container = page.locator('#selectMenuContainer');
        dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();
        await selectMenuOptions(page, "Green");
        const selectedOptions = await page.locator('.css-9jq23d').allTextContents();
        console.log(`Selected Option: ${selectedOptions}`);
        (0, test_1.expect)(selectedOptions.toString()).toEqual('Green');
    });
    (0, test_1.test)('Verify multi select dropdown- select all options, then remove one', async ({ page }) => {
        // Get all options to pass them for selection
        await page.getByRole('combobox').nth(3).click();
        const options = await getOptions(page);
        console.log("All options before selecting: ", options);
        // Select options one by one
        for (const option of options) {
            await selectMenuOptions(page, option);
        }
        //after selecting all options
        await page.getByRole('combobox').nth(3).click();
        const noUnselectedOption = await getOptions(page);
        //expect if any option left, the array size should not be greater than 0
        (0, test_1.expect)(noUnselectedOption.length).not.toBeGreaterThan(0);
        //Get all the selected options, and expec it against options
        const selectedOptions = await page.locator('.css-9jq23d').allTextContents();
        (0, test_1.expect)(options).toEqual(selectedOptions);
        console.log(`All slected options: ${selectedOptions}`);
        //Remove one of the selected options
        await page.locator('.css-v7duua').nth(1).click();
        const selectedOptions1 = await page.locator('.css-9jq23d').allTextContents();
        console.log(`All slected options after removing one element: ${selectedOptions1}`);
        (0, test_1.expect)(selectedOptions.length).toBeGreaterThan(selectedOptions1.length);
        // Clear all selected options: css-1xc3v61-indicatorContainer
        const clearButton = await page.locator('.css-15lsz6c-indicatorContainer > .css-8mmkcg > path').first().click();
        const selectedOptions2 = await page.locator('.css-9jq23d').allTextContents();
        (0, test_1.expect)(selectedOptions2.length).toEqual(0);
    });
});
async function getOptions(page) {
    const options = page.locator('#react-select-4-listbox [role="option"]');
    return await options.allTextContents();
}
async function selectMenuOptions(page, color) {
    await page.getByRole('combobox').nth(3).click();
    const option = page
        .locator('#react-select-4-listbox')
        .getByText(color, { exact: true });
    console.log('The value is: ', await option.textContent());
    await option.click();
}
