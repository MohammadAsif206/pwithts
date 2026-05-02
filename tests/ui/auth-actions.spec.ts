import {test,expect} from '@playwright/test';
test('test', async ({page}) =>{
    await page.goto('/')
    await page.getByRole('button').first().click();
    const welcomeMsg = page.getByText('Welcome!');
    await expect(welcomeMsg).toBeVisible();

})