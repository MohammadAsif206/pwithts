import { type Page} from '@playwright/test';
export async function addToCart(page: Page, index: number) {
    const ProductWrapper = page.locator('.p-6').nth(index);
    const PName = await ProductWrapper.getByRole('heading').first().textContent();
    const PPrice = await ProductWrapper.locator('.font-bold').first().textContent();
    const PBttn = ProductWrapper.getByRole('button',{name:'Add to Cart'})
    await PBttn.click();

    return {
        name: PName,
        price: Number(PPrice?.substring(1))
    }
    
}