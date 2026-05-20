import {test, expect, Page} from '@playwright/test';

// test.describe("Handle Key and Mouse Interactions ", async () =>{
//     test.beforeEach("Navigate to the testing webpage", async ({page})=>{
//         page.goto("https://qa-automation-practice.netlify.app/");
//         await expect(page).toHaveURL(/.netlify/);
//     })
//     test("Perform Double Click ", async({page}) =>{
//         await page.getByText("Btn actions").click();
//         await page.getByText("Double click btn").click();
//         expect(page).toHaveURL(/double-click/);
//         const doubleClick = page.getByText("Double click me");
//         await doubleClick.dblclick();
//         const result = await page.locator("#double-click-result").textContent();
//         expect(result).toContain("Congrats");
//         console.log(`The double click resut is: ${result}`);
//     });
//     test("Perform scrolling ", async({page}) =>{
//         await page.getByText("Btn actions").click();
//         await page.getByText("Scrolling").click();
//         expect(page).toHaveURL(/scroll/);
//         const scrollToElement = page.getByText("THE END");
//         await scrollToElement.scrollIntoViewIfNeeded();
    
//         const result = await scrollToElement.textContent();
//         expect(result).toContain("THE END");
//         console.log(`The double click resut is: ${result}`);
//     });
//     test("Perform Mouse-Hover ", async({page}) =>{
//         await page.getByText("Btn actions").click();
//         await page.getByText("Mouse Hover").click();
//         expect(page).toHaveURL(/mouse-hover/);
//         const toHoverEelement = page.locator("#button-hover-over");
//         await toHoverEelement.hover();
        
    
//         const result = await page.getByText("I am shown when someone hovers over the text above.").textContent();
//         expect(result).toContain("I am shown");
//         console.log(`The double click resut is: ${result}`);
//     });
//     test("Perform toggling Show/Hide ", async({page}) =>{
//         await page.getByText("Btn actions").click();
//         await page.getByText("Show / Hide Element").click();
//         expect(page).toHaveURL(/show-hide-element/);
//         const showHide = page.locator("#showHideBtn");
//         //by default the text "This text will hidden"is displayed
//         //perfor hide
//         const text = "This text will be hidden";
//         await showHide.click();
//         const hiddenText = page.locator("#hiddenText").textContent();
//         expect(await hiddenText).toEqual(text);

//         //perfor show
//         //const text = "This text will be hidden";
//         await showHide.click();
//         const visibleText = await page.locator("#hiddenText").textContent();
//         expect(visibleText).toContain(text);
       
//     });
    test("Handle tabel", async({page})=>{
        page.goto('https://playground.bondaracademy.com/pages/extra-components');
        const btn = page.locator('.ng2-smart-action-add-add');
        await btn.click();
        const row = page.locator("thread tr[ng2-st-thread-form-row]");
        await row.getByPlaceholder("ID").fill('32');
        await row.getByPlaceholder("First Name").fill("Mohammd");
        await row.getByPlaceholder("Last Name").fill("Asif");
        await row.getByPlaceholder("Username").fill("mohammadasif");
        await row.getByPlaceholder("E-mail").fill("mohammad@yopmail.com");
        await row.getByPlaceholder("Age").fill("45");

        await page.locator('.ng2-smart-action-add-create').click();
   // })
})