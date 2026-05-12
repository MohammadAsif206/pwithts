import {test, expect} from '@playwright/test'
const url = 'https://practicetestautomation.com/practice-test-login/';
const url1 ='https://www.saucedemo.com/'
test.describe(" Practice PW Locator/Selectors - getByText", () =>{
    test('Practice using getByLabel locator/selector', async({page}) =>{
        page.goto('https://www.wikipedia.com/');
        const farsiLink = page.getByText('Search',{exact: true});
        await farsiLink.click();
        await expect(page).toHaveURL(/wikipedia/);

    });
});
test.describe(" Practice PW Locator/Selectors - getByRole", () =>{
    test('Practice using getByRole locator/selector', async({page}) =>{
        page.goto('https://www.wikipedia.com/');
        const farsiLink = page.getByRole('button',{name:'Search'});
        await farsiLink.click();
        await expect(page).toHaveURL(/wikipedia/);

    });
});

test.describe(" Practice PW Locator/Selectors - getByLabel", () =>{
    test('Practice using getByLabel locator/selector', async({page}) =>{
        page.goto(url);
        const userName = page.getByLabel('Username');
        await userName.fill('Mohammad');
        const inputValue = await userName.inputValue();
        console.log(`Entered User Name is: ${inputValue}`);
        expect(inputValue).toBe('Mohammad');

    });
});
test.describe(" Practice PW Locator/Selectors - getByPlaceholder", () =>{
    test('Practice using getByPlaceholder locator/selector', async({page}) =>{
        page.goto(url1);
        const userName = page.getByPlaceholder('Username');
        await userName.fill('Mohammad');
        const inputValue = await userName.inputValue();
        console.log(`Entered User Name for saucedemo user fieild is: ${inputValue}`);
        expect(inputValue).toBe('Mohammad');

    });
});
test.describe(" Practice PW Locator/Selectors - getByTestId", () =>{
    test('Practice using getByTestId locator/selector', async({page}) =>{
        await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
        const getTestId = await page.getByTestId('submit-btn').textContent();
        
        console.log(`Entered User Name for saucedemo user fieild is: ${getTestId}`);
        expect(getTestId).toBe('Submit');

         await page.close();

    });
    
});

test.describe(" Practice PW Locator/Selectors - Shadow DOM with shadoHost", () =>{
    test('Practice using getByTestId locator/selector', async({page}) =>{
        await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
        const shadoHost = page.locator('#shadowHost');
        const shadowHostBtn = await shadoHost.locator('#shadowBtn').textContent();
        
        console.log(`Entered User Name for saucedemo user fieild is: ${shadowHostBtn}`);
        expect(shadowHostBtn).toBe('Shadow Button');

         await page.close();

    });
    
});