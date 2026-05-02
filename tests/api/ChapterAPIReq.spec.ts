import {test, expect} from '@playwright/test';
import path from 'path'
import fs from 'fs'
test('fetch product API calls', async ({page}) =>{  
    // fetch requests
    page.on('request', request => console.log(request.method(),
    request.url()
))
 await page.goto('/products')

});

test('fetch product API calls - fetch all', async ({page}) =>{  
    // fetch requests
    page.on('request', request => console.log(request.method(),
    request.url()
))
 await page.goto('/products')
 await page.waitForLoadState('networkidle')

});
test('mock product API calls - fetch all', async ({ page }) => {  
    const filePath = path.resolve(__dirname,'../../fixtures/product.json')
    const mockProduct = JSON.parse(fs.readFileSync(filePath,'utf-8'))
    
;

  // ✅ Register route FIRST
  await page.route('https://api.valentinos-magic-beans.click/products', async (route) => {
    await route.fulfill({
      status: 200, // good to include
      contentType: 'application/json',
      body: JSON.stringify(mockProduct)
    });
  });

  // Optional: log requests
  page.on('request', request =>
    console.log(request.method(), request.url())
  );

  // Then navigate
  await page.goto('/products');

  // Optional assertion (recommended)
  await page.getByText('Mocha coffee').waitFor();
});