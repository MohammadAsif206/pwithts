import {test, expect} from '@playwright/test'
import * as cart from '../actions/Cart'
import * as product from '../actions/Products'

test ('Add to cart functionality ', async ({page})=>{
    await page.goto('/products');

    const addedProduct = await product.addToCart(page,1);

    await cart.checkAddedProduct(page,addedProduct.name!);

    const subtotal = await cart.checkSubTotal(page);
    expect(subtotal).toEqual(addedProduct.price);





})



