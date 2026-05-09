import {test, expect} from '@playwright/test';
// User defined , it is good to have displayed for report
test.describe('Login functionality', () =>{
    // set the hook which will run before each test in this describe block
    test.beforeEach(async ({page}) => {
        await page.goto("https://practicetestautomation.com/practice-test-login/");
    });
    test.afterEach(async ({page}) =>{
        page.close();
    })
    test("Verify login with valid username and password", async({page}) =>{
        await page.fill('#username','student');
        await page.fill('#password','Password123');
        await page.click('#submit');

        await expect(page).toHaveURL(/successfully/)
    });
    test("Verify login with valid username and invalid password", async({page}) =>{
        await page.fill('#username','student');
        await page.fill('#password','Password1234');
        await page.click('#submit');

        expect(await page.locator('#error').textContent()==='Your username is invalid!');
       
    });

    test("Verify login with invalid username and valid password", async({page}) =>{
        await page.fill('#username','studentw');
        await page.fill('#password','Password123');
        await page.click('#submit');

        expect(await page.locator('#error').textContent()==='Your password is invalid!');
       
    }); 
})