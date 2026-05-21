# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/api/ChapterAPIReq.spec.ts >> mock product API calls - fetch all
- Location: tests/api/ChapterAPIReq.spec.ts:22:5

# Error details

```
Error: ENOENT: no such file or directory, open '/home/runner/work/pwithts/pwithts/fixtures/product.json'
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import path from 'path'
  3  | import fs from 'fs'
  4  | test('fetch product API calls', async ({page}) =>{  
  5  |     // fetch requests
  6  |     page.on('request', request => console.log(request.method(),
  7  |     request.url()
  8  | ))
  9  |  await page.goto('/products')
  10 | 
  11 | });
  12 | 
  13 | test('fetch product API calls - fetch all', async ({page}) =>{  
  14 |     // fetch requests
  15 |     page.on('request', request => console.log(request.method(),
  16 |     request.url()
  17 | ))
  18 |  await page.goto('/products')
  19 |  await page.waitForLoadState('networkidle')
  20 | 
  21 | });
  22 | test('mock product API calls - fetch all', async ({ page }) => {  
  23 |     const filePath = path.resolve(__dirname,'../../fixtures/product.json')
> 24 |     const mockProduct = JSON.parse(fs.readFileSync(filePath,'utf-8'))
     |                                       ^ Error: ENOENT: no such file or directory, open '/home/runner/work/pwithts/pwithts/fixtures/product.json'
  25 |     
  26 | ;
  27 | 
  28 |   // ✅ Register route FIRST
  29 |   await page.route('https://api.valentinos-magic-beans.click/products', async (route) => {
  30 |     await route.fulfill({
  31 |       status: 200, // good to include
  32 |       contentType: 'application/json',
  33 |       body: JSON.stringify(mockProduct)
  34 |     });
  35 |   });
  36 | 
  37 |   // Optional: log requests
  38 |   page.on('request', request =>
  39 |     console.log(request.method(), request.url())
  40 |   );
  41 | 
  42 |   // Then navigate
  43 |   await page.goto('/products');
  44 | 
  45 |   // Optional assertion (recommended)
  46 |   await page.getByText('Mocha coffee').waitFor();
  47 | });
```