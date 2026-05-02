import { test, expect, Page} from '@playwright/test';
import * as products from '../actions/Products'
import * as cart from '../actions/Cart';
import * as checkout from '../actions/CheckOut'
import * as contact from '../actions/Contacts'
import * as data from '../fixtures/test-data'

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products');

    const addedProduct = await products.addToCart(page, 1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.checkAddedProduct(page, addedProduct.name!)

    const subtotal = await cart.checkSubTotal(page)  

    expect(subtotal).toBe(addedProduct.price)

});
const inputData = data.getSignupData();
console.log('-----------',inputData)


test('Complete workflow for product order', async ({ page }) => {
    const actions = new checkout.CheckoutActions(page);


    await page.goto('/products');
    const addedProduct = await products.addToCart(page, 1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    await actions.addContactInfo(inputData)
     await actions.addShippingAddress(inputData)
    await actions.addPaymentInfo(inputData)
    await actions.placeOrder()

    // get orderId:
    const orderWrapper = page.getByText('Your Order ID is:').locator('..')
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent()

    // open the contact page:
    await page.getByRole('button', { name: 'Track Your Order' }).click();
    await contact.fillOrderIdAndEmail(page, orderId!, inputData.email)
    await contact.clickTrackOrder(page)

    // check if ordered item is returned:
    const firstOrder = page.getByText(addedProduct.name!)
    await expect(firstOrder).toBeVisible()
})

test('Complete workflow for product order - with steps', async ({ page }) => {
    await page.goto('/products');

    let addedProduct: Awaited<ReturnType<typeof products.addToCart>> = {} as any;

    await test.step('add product to cart', async () => {
        addedProduct = await products.addToCart(page, 1);
    })

    await test.step('go to checkout page', async () => {
        await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    })

    await test.step('complete checkout information', async () => {
        const actions = new checkout.CheckoutActions(page)
        await actions.addContactInfo(inputData)
         await actions.addShippingAddress(inputData)
        await actions.addPaymentInfo(inputData)
        await actions.placeOrder()
    })

    let orderId: string | null;

    await test.step('get the orderID', async () => {
        const orderWrapper = page.getByText('Your Order ID is:').locator('..')
        orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent()
    })

    await test.step('open the contact page', async () => {
        await page.getByRole('button', { name: 'Track Your Order' }).click();
        await contact.fillOrderIdAndEmail(page, orderId!, inputData.email)
        await contact.clickTrackOrder(page)
    })

    await test.step('check if ordered item is returned', async () => {
        const firstOrder = page.getByText(addedProduct.name!)
        await expect(firstOrder).toBeVisible()
    })
})
