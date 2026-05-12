import { test, expect } from '@playwright/test'
const url = "https://www.saucedemo.com/";
//Organize and group similiar test cases coming under the same fucntionality
test.describe("Verify Saucedemo login flow", () => {
    // run steps common between the test cases comming undr login flow
    test.beforeEach("Navigate to the Saucedemo webpage", async ({ page }) => {
        await page.goto(url);
        const logInPage = page.getByTitle('Swag Labs');
        console.log(`The login page is routed and loaded, the page shows the title: ${logInPage}`)
    });
    test("Verify login with valid username and valid password", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        expect(logIn).toBeVisible();
        expect(logIn).toBeEnabled();
        logIn.click();

        expect(page).toHaveURL(/inventory/);

        //log out from the page
        await page.getByText("Open Menu").click();
        await expect(page.getByText("Logout")).toBeVisible();
        await page.getByText("Logout").click();
        expect(page).not.toHaveURL(/inventory/);
        console.log("Succesfully logout from saucedemo web")


    });
    test("Verify login with locked_out_user and valid password", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("locked_out_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        expect(logIn).toBeVisible();
        expect(logIn).toBeEnabled();
        logIn.click();
        const errMsg = await page.locator("[data-test='error']").textContent();

        expect(errMsg).toContain("Epic sadface");

        //log out from the page

        console.log(`FAiled login ${errMsg}`)
    });



});

test.describe("Verify Saucedemo Checkout flow", () => {
    // run steps common between the test cases comming undr login flow
    test.beforeEach("Navigate to the Saucedemo webpage", async ({ page }) => {
        await page.goto(url);
        const logInPage = page.getByTitle('Swag Labs');
        console.log(`The login page is routed and loaded, the page shows the title: ${logInPage}`)
    });
    test("Place an ecom order for starandard_user", async ({ page }) => {
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        const logIn = page.getByRole("button", { name: "Login" });
        expect(logIn).toBeVisible();
        expect(logIn).toBeEnabled();
        await logIn.click();

        expect(page).toHaveURL(/inventory/);

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
        for (let i  = 0; i < await inventoryItems.count(); i++) {
            // add to the cart
            const addToCart = inventoryItems.nth(i)
                .locator('.inventory_item_description')
                .locator('.pricebar')
                .getByText('Add to cart');
            expect(addToCart).toBeVisible();
            expect(addToCart).toBeEnabled();
            await addToCart.click();
            

        }
        // Get count of the added products
        const addedProducts = (Number)(await page.locator('.shopping_cart_badge').textContent());
       //compare the value of product added from inventory page with subtoal in shopping cart
        expect(priceList.length).toEqual(addedProducts);
        console.log(`Number of product added from inventor: ${priceList.length}`)
        console.log(`Number of products in the cart: ${addedProducts}`)
        
        //get the price of each added product
        await page.locator('.shopping_cart_badge').click();
        expect(page).toHaveURL(/cart/)
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
        expect(priceList.length).toEqual(productsInCart.length);
        
        // proceed to check
        const checkout = page.getByRole('button',{name:'checkout'})
        expect(checkout).toBeVisible(); expect(checkout).toBeEnabled();
        await checkout.click();

        // fill the customer info form
        await page.getByPlaceholder('First Name').fill("Mohammad");
        await page.getByPlaceholder('Last Name').fill('Asif');
        await page.getByPlaceholder('Zip/Postal Code').fill('76543');
        await page.getByText('Continue').click();

        expect(page.getByText('Checkout: Overview')).toBeVisible();
        const subTotal = page.locator('.summary_info').filter({
            has: page.locator('.summary_subtotal_label')
        });
        const tax = page.locator('.summary_info').filter({
            has: page.locator('.summary_tax_label')
        });
        const total = page.locator('.summary_info').filter({
            has: page.locator('.summary_total_label')
        });
        await page.getByRole('button',{name:'finish'}).click();
        //get the confirmation
        await expect(page).toHaveURL(/checkout-complete/)
        await expect(page.getByText('Thank you for your order!')).toBeVisible();

        const back = page.getByText('Back Home');
        await expect(back).toBeVisible();
        await expect(back).toBeEnabled();
        await back.click();


        await expect(page).toHaveURL(/inventory/);



        //log out from the page
        await page.getByText("Open Menu").click();
        await expect(page.getByText("Logout")).toBeVisible();
        await page.getByText("Logout").click();
        expect(page).not.toHaveURL(/inventory/);
        console.log("Succesfully logout from saucedemo web")


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