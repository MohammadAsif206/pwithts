import {test, expect} from '@playwright/test'


test('Add to shopping cart', async ({page}) =>{
await page.goto('https://valentinos-magic-beans.click/products')

const firstProductWrapper = page.locator('.p-6').first();
const firstPName = await firstProductWrapper.getByRole('heading').first().textContent();
const firstPPrice = await firstProductWrapper.locator('.font-bold').first().textContent();
const firstPBttn = firstProductWrapper.getByRole('button',{name:'Add to Cart'})
await firstPBttn.click();
const checkPinCart = await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()
//await checkPinCart.click();

//assert on first pname 
const pinTheCart = page.getByRole('heading',{name:'Brazilian Santos'})
expect(firstPName).toEqual(await pinTheCart.textContent())

// assert product price with subtotal
const subtotal =  await page.getByText('Subtotal').textContent();
expect(firstPPrice).toEqual()




console.log(firstPName, firstPPrice)


})