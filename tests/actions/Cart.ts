import { Page,expect} from '@playwright/test'
export async function checkAddedProduct(page: Page, heading:string){
    //assert on first pname 
    const pinTheCart = page.getByRole('heading',{name:'Colombian Supreme'})
    await expect(pinTheCart).toBeVisible();

}
export async function checkSubTotal(page: Page){
    await page.locator('//*[@id="root"]/div[2]/header/div/div/a').click();
    // assert product price with subtotal
    const subtotal =  await page.locator('//*[@id="root"]/div[2]/main/div/div/div/div[2]/div/div[2]/div[1]/span[2]').textContent();
    return Number(subtotal?.substring(1))
    
}