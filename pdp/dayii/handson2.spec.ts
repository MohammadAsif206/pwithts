import { test, expect, Page } from '@playwright/test';

test.describe("Perform Drag & Drop  ", () => {
    test.beforeEach('Navigate to the testing page', async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/extra-components/drag-drop');
        expect(page).toHaveURL(/drag-drop/);
    });
    test('Verify target contains the dragged element text - Drag a specific item', async ({ page }) => {
        const source = page.getByText("Feed the dog");
        const target = page.locator("#drop-list").first();
        const toDoItem = await source.textContent();
        await source.dragTo(target);

        console.log("Source text: ", toDoItem);
        console.log("Done text: ", await target.locator('[data-cy="done-item"]').textContent());
        expect(await target.locator('[data-cy="done-item"]').textContent()).toContain(toDoItem);


    });
    test('Verify target contains the dragged element text - Drag all items', async ({ page }) => {

        const todoItems = page.locator('#todo-list .example-box');
        const dropList = page.locator('#drop-list');

        const listSize = await todoItems.count();
        console.log('Size of the lsit: ', listSize)

        for (let i = 0; i < listSize; i++) {
            const item = todoItems.first();
            const itemText = await item.textContent();
            await item.dragTo(dropList);
            await expect(dropList).toContainText(itemText!);
            console.log(`Dragged Item: ${itemText}`);
        }
    });
});


test.describe("Select options from dropdown menu  ", () => {
    test.beforeEach('Navigate to the testing page', async ({ page }) => {
        await page.goto('https://demoqa.com/select-menu');
        expect(page).toHaveURL(/select-menu/);
    });
    test('Select value from old style dropdown ', async ({ page }) => {
        const selectMenu = page.locator('#oldSelectMenu');
        const allOptions = await selectMenu.locator('option').allTextContents();
        let i = 0;
        for (const option of allOptions) {
            await selectMenu.selectOption({ label: option });
            console.log(`Option selected is: ${option} `);
            await expect(selectMenu).toContainText(option);
            expect(await selectMenu.locator('option').nth(i).textContent()).toEqual(option);
            i++;

        }
    });
    test('Verify multi select dropdown- select one option', async ({ page }) => {


        const dropdown = page.locator('#react-select-4-input');
        const container = page.locator('#selectMenuContainer');
        dropdown.scrollIntoViewIfNeeded();
        await dropdown.click()

        await selectMenuOptions(page, "Green");
        const selectedOptions = await page.locator('.css-9jq23d').allTextContents()
        console.log(`Selected Option: ${selectedOptions}`)
        expect(selectedOptions.toString()).toEqual('Green');


    });
    test('Verify multi select dropdown- select all options, then remove one', async ({ page }) => {

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
        expect(noUnselectedOption.length).not.toBeGreaterThan(0);

        //Get all the selected options, and expec it against options
        const selectedOptions = await page.locator('.css-9jq23d').allTextContents();
        expect(options).toEqual(selectedOptions);
        console.log(`All slected options: ${selectedOptions}`)
        //Remove one of the selected options
        await page.locator('.css-v7duua').nth(1).click();
        const selectedOptions1 = await page.locator('.css-9jq23d').allTextContents();
        console.log(`All slected options after removing one element: ${selectedOptions1}`)
        expect(selectedOptions.length).toBeGreaterThan(selectedOptions1.length);

    });

});

async function getOptions(page: Page): Promise<string[]> {
    const options = page.locator(
        '#react-select-4-listbox [role="option"]'
    );

    return await options.allTextContents();
}
async function selectMenuOptions(page: Page, color: string) {

    await page.getByRole('combobox').nth(3).click();
    const option = page
        .locator('#react-select-4-listbox')
        .getByText(color, { exact: true });
    console.log('The value is: ', await option.textContent())
    await option.click();
}


