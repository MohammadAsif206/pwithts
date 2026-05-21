# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src/tspractice/locatorsTest.spec.ts >>  Practice PW Locator/Selectors - Shadow DOM with shadoHost >> Practice using getByTestId locator/selector
- Location: src/tspractice/locatorsTest.spec.ts:60:9

# Error details

```
Error: page.goto: net::ERR_FILE_NOT_FOUND at file:///C:/pwp/pwithts/src/tspractice/locator-practice.html
Call log:
  - navigating to "file:///C:/pwp/pwithts/src/tspractice/locator-practice.html", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test'
  2  | const url = 'https://practicetestautomation.com/practice-test-login/';
  3  | const url1 ='https://www.saucedemo.com/'
  4  | test.describe(" Practice PW Locator/Selectors - getByText", () =>{
  5  |     test('Practice using getByLabel locator/selector', async({page}) =>{
  6  |         page.goto('https://www.wikipedia.com/');
  7  |         const farsiLink = page.getByText('Search',{exact: true});
  8  |         await farsiLink.click();
  9  |         await expect(page).toHaveURL(/wikipedia/);
  10 | 
  11 |     });
  12 | });
  13 | test.describe(" Practice PW Locator/Selectors - getByRole", () =>{
  14 |     test('Practice using getByRole locator/selector', async({page}) =>{
  15 |         page.goto('https://www.wikipedia.com/');
  16 |         const farsiLink = page.getByRole('button',{name:'Search'});
  17 |         await farsiLink.click();
  18 |         await expect(page).toHaveURL(/wikipedia/);
  19 | 
  20 |     });
  21 | });
  22 | 
  23 | test.describe(" Practice PW Locator/Selectors - getByLabel", () =>{
  24 |     test('Practice using getByLabel locator/selector', async({page}) =>{
  25 |         page.goto(url);
  26 |         const userName = page.getByLabel('Username');
  27 |         await userName.fill('Mohammad');
  28 |         const inputValue = await userName.inputValue();
  29 |         console.log(`Entered User Name is: ${inputValue}`);
  30 |         expect(inputValue).toBe('Mohammad');
  31 | 
  32 |     });
  33 | });
  34 | test.describe(" Practice PW Locator/Selectors - getByPlaceholder", () =>{
  35 |     test('Practice using getByPlaceholder locator/selector', async({page}) =>{
  36 |         page.goto(url1);
  37 |         const userName = page.getByPlaceholder('Username');
  38 |         await userName.fill('Mohammad');
  39 |         const inputValue = await userName.inputValue();
  40 |         console.log(`Entered User Name for saucedemo user fieild is: ${inputValue}`);
  41 |         expect(inputValue).toBe('Mohammad');
  42 | 
  43 |     });
  44 | });
  45 | test.describe(" Practice PW Locator/Selectors - getByTestId", () =>{
  46 |     test('Practice using getByTestId locator/selector', async({page}) =>{
  47 |         await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
  48 |         const getTestId = await page.getByTestId('submit-btn').textContent();
  49 |         
  50 |         console.log(`Entered User Name for saucedemo user fieild is: ${getTestId}`);
  51 |         expect(getTestId).toBe('Submit');
  52 | 
  53 |          await page.close();
  54 | 
  55 |     });
  56 |     
  57 | });
  58 | 
  59 | test.describe(" Practice PW Locator/Selectors - Shadow DOM with shadoHost", () =>{
  60 |     test('Practice using getByTestId locator/selector', async({page}) =>{
> 61 |         await page.goto("file:///C:/pwp/pwithts/src/tspractice/locator-practice.html");
     |                    ^ Error: page.goto: net::ERR_FILE_NOT_FOUND at file:///C:/pwp/pwithts/src/tspractice/locator-practice.html
  62 |         const shadoHost = page.locator('#shadowHost');
  63 |         const shadowHostBtn = await shadoHost.locator('#shadowBtn').textContent();
  64 |         
  65 |         console.log(`Entered User Name for saucedemo user fieild is: ${shadowHostBtn}`);
  66 |         expect(shadowHostBtn).toBe('Shadow Button');
  67 | 
  68 |          await page.close();
  69 | 
  70 |     });
  71 |     
  72 | });
```