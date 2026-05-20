"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const url = "https://www.saucedemo.com/";
//Organize and group similiar test cases coming under the same fucntionality
test_1.test.describe("Verify Saucedemo login flow", () => {
    // run steps common between the test cases comming undr login flow
    test_1.test.beforeEach("Navigate to the Saucedemo webpage", async ({ page }) => {
        await page.goto(url);
        const logInPage = page.getByTitle('Swag Labs');
        console.log(`The login page is routed and loaded, the page shows the title: ${logInPage}`);
    });
    (0, test_1.test)("Verify login with valid username and valid password", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        (0, test_1.expect)(logIn).toBeVisible();
        (0, test_1.expect)(logIn).toBeEnabled();
        logIn.click();
        (0, test_1.expect)(page).toHaveURL(/inventory/);
        //log out from the page
        await page.getByText("Open Menu").click();
        await (0, test_1.expect)(page.getByText("Logout")).toBeVisible();
        await page.getByText("Logout").click();
        (0, test_1.expect)(page).not.toHaveURL(/inventory/);
        console.log("Succesfully logout from saucedemo web");
    });
    (0, test_1.test)("Verify login with locked_out_user and valid password", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        (0, test_1.expect)(logIn).toBeVisible();
        (0, test_1.expect)(logIn).toBeEnabled();
        logIn.click();
        const errMsg = await page.locator("[data-test='error']").textContent();
        (0, test_1.expect)(errMsg).toContain("Epic sadface");
        //log out from the page
        console.log(`FAiled login ${errMsg}`);
    });
});
test_1.test.describe("Verify Saucedemo Checkout flow", () => {
    // run steps common between the test cases comming undr login flow
    test_1.test.beforeEach("Navigate to the Saucedemo webpage", async ({ page }) => {
        await page.goto(url);
        const logInPage = page.getByTitle('Swag Labs');
        console.log(`The login page is routed and loaded, the page shows the title: ${logInPage}`);
    });
    (0, test_1.test)("Place an ecom order for starandard_user", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        (0, test_1.expect)(logIn).toBeVisible();
        (0, test_1.expect)(logIn).toBeEnabled();
        await logIn.click();
        (0, test_1.expect)(page).toHaveURL(/inventory/);
        // get the list of the available products based on their price
        let totalVal = 0;
        const inventoryItems = page
            .locator('.inventory_list')
            .locator('.inventory_item');
        const priceList = [];
        for (let i = 0; i < await inventoryItems.count(); i++) {
            const p = await inventoryItems.nth(i)
                .locator('.inventory_item_description')
                .locator('.pricebar')
                .locator('.inventory_item_price').textContent();
            // add to the cart
            priceList.push(p?.substring(1));
            totalVal += (Number)(p?.substring(1));
        }
        console.log("List size, and content ", priceList.toString(), " value: ", totalVal);
        for (let i = 0; i < await inventoryItems.count(); i++) {
            // add to the cart
            const addToCart = inventoryItems.nth(i)
                .locator('.inventory_item_description')
                .locator('.pricebar')
                .getByText('Add to cart');
            (0, test_1.expect)(addToCart).toBeVisible();
            (0, test_1.expect)(addToCart).toBeEnabled();
            await addToCart.click();
        }
        // Get count of the added products
        const addedProducts = (Number)(await page.locator('.shopping_cart_badge').textContent());
        //compare the value of product added from inventory page with subtoal in shopping cart
        (0, test_1.expect)(priceList.length).toEqual(addedProducts);
        console.log(`Number of product added from inventor: ${priceList.length}`);
        console.log(`Number of products in the cart: ${addedProducts}`);
        //get the price of each added product
        await page.locator('.shopping_cart_badge').click();
        (0, test_1.expect)(page).toHaveURL(/cart/);
        //Get the number off added product at checkout
        const productsInCart = [];
        const cartItems = page
            .locator('.cart_list')
            .locator('.cart_item');
        for (let i = 0; i < await cartItems.count(); i++) {
            const p = await cartItems.nth(i)
                .locator('.cart_item_label')
                .locator('.item_pricebar')
                .getByText('Remove').textContent();
            // add to the cart
            productsInCart.push(p);
        }
        (0, test_1.expect)(priceList.length).toEqual(productsInCart.length);
        // proceed to check
        const checkout = page.getByRole('button', { name: 'checkout' });
        (0, test_1.expect)(checkout).toBeVisible();
        (0, test_1.expect)(checkout).toBeEnabled();
        await checkout.click();
        // fill the customer info form
        await page.getByPlaceholder('First Name').fill("Mohammad");
        await page.getByPlaceholder('Last Name').fill('Asif');
        await page.getByPlaceholder('Zip/Postal Code').fill('76543');
        await page.getByText('Continue').click();
        (0, test_1.expect)(page.getByText('Checkout: Overview')).toBeVisible();
        const subTotal = page.locator('.summary_info').filter({
            has: page.locator('.summary_subtotal_label')
        });
        const tax = page.locator('.summary_info').filter({
            has: page.locator('.summary_tax_label')
        });
        const total = page.locator('.summary_info').filter({
            has: page.locator('.summary_total_label')
        });
        await page.getByRole('button', { name: 'finish' }).click();
        //get the confirmation
        await (0, test_1.expect)(page).toHaveURL(/checkout-complete/);
        await (0, test_1.expect)(page.getByText('Thank you for your order!')).toBeVisible();
        const back = page.getByText('Back Home');
        await (0, test_1.expect)(back).toBeVisible();
        await (0, test_1.expect)(back).toBeEnabled();
        await back.click();
        await (0, test_1.expect)(page).toHaveURL(/inventory/);
        //log out from the page
        await page.getByText("Open Menu").click();
        await (0, test_1.expect)(page.getByText("Logout")).toBeVisible();
        await page.getByText("Logout").click();
        (0, test_1.expect)(page).not.toHaveURL(/inventory/);
        console.log("Succesfully logout from saucedemo web");
    });
    // test("Verify login with locked_out_user and valid password",async ({page})=>{
    //     await page.getByPlaceholder("Username").fill("locked_out_user");
    //     await page.getByPlaceholder("Password").fill("secret_sauce");
    //     const logIn = page.getByRole("button",{name:"Login"});
    //     expect(logIn).toBeVisible();
    //     expect(logIn).toBeEnabled();
    //     logIn.click();
    //     const errMsg = await page.locator("[data-test='error']").textContent();
    //     expect(errMsg).toContain("Epic sadface");
    //     //log out from the page
    //     console.log(`FAiled login ${errMsg}`)
    // });
});
