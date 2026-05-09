import {test,expect,BrowserContext, Browser,Page } from '@playwright/test'
import path from 'node:path';
import {chromium, webkit} from 'playwright'

test('Page navigate to Playwright uRL and verify the navigation is correct', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
})
test('Verify if Get started link is visible', async ({page}) =>{
     await page.goto('https://playwright.dev/');
     await page.getByRole('link', {name:'Get started'}).click();
     
    await expect(page.getByRole('heading',{name:'Installation'})).toBeVisible();

});

test('Broswer instance Safari browser: ', async () =>{
    // Open the browser instance
    const b: Browser = await webkit.launch({headless: true});
    const page: Page = await b.newPage();
    const c: Browser = await chromium.launch({headless: true});
    const page1: Page = await c.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await page1.goto('https://www.youtube.com/');
    console.log(await page1.title());
    //Close the browser
    await b.close();
    await c.close();

});

test('Browser Context,on1 window', async () =>{
     const b: Browser = await webkit.launch({headless: true});
     const broserContext = await b.newContext();
     const page: Page = await broserContext.newPage();
     await page.goto('https://www.google.com');
     console.log(await page.title());
     await broserContext.close();
     await b.close();
});

test('Browser Context, multipe windows', async () =>{
     const b: Browser = await webkit.launch({headless: true});
     const broserContext1 = await b.newContext();
     const page1: Page = await broserContext1.newPage();

     const c: Browser = await webkit.launch({headless: true});
     const broserContext2 = await c.newContext();
     const page2: Page = await broserContext2.newPage();

     const d: Browser = await webkit.launch({headless: true});
     const broserContext3 = await d.newContext();
     const page3: Page = await broserContext3.newPage();

     await page1.goto('https://www.google.com');
     console.log(await page1.title());
     await page1.screenshot({path:'pic/C1.png'});

     await page2.goto('https://github.com/login');
     console.log(await page2.title());
     await page2.locator('input#login_field').fill('test.november29@gmail.com');
    await page2.locator('input#password').fill('Admin@102938');
    await page2.locator('//input[@type="submit"]').click();
    await page2.screenshot({path: 'pic/C2.png'});

     await page3.goto('https://github.com/login');
     console.log(await page3.title());
     
    await page3.screenshot({path: 'pic/C3.png'});

    await broserContext1.close();
    await broserContext2.close();
    await broserContext3.close();


     await b.close();
     await c.close();
     await d.close();
})

test("Handle Windows/ tabs ", async () => {
    const b: Browser = await chromium.launch({headless: true});
     const broserContext = await b.newContext();
     const page1: Page = await broserContext.newPage();
     page1.goto("https://the-internet.herokuapp.com/windows");
     const[newWindow] = await Promise.all([
        page1.waitForEvent('popup'),
        page1.getByText('Click Here').click(),
     ]);
     console.log(`Old page Title ------> ${await page1.title()}`);
     console.log(`New page/Tab Title ------> ${await newWindow.title()}`);

    await broserContext.close();
     await b.close();

});
test("Handle Windows Navigation ", async () => {
    const b: Browser = await chromium.launch({headless: false});
     const broserContext = await b.newContext();
     const page1: Page = await broserContext.newPage();
     page1.goto("https://www.fidelity.com/");
     await page1.waitForLoadState('domcontentloaded');
     page1.on('load',() => {
        console.log('Page has loaded. ')
     });

    //  await page.goto('https://www.fidelity.com/');

    //  await page.getByRole('link', { name: 'Log in' }).click();

     expect(page1.url()==='https://www.fidelity.com/')
     await page1.getByRole('link', { name: 'Log in' }).click();
     await page1.goto('https://digital.fidelity.com/prgw/digital/signin/retail');
     expect (await page1.getByRole('heading',{name:'Log in'}).textContent()==='Log in')
    //  page1.on('domcontentloaded', () =>{
    //     console.log("DOM contents have loaded")
    //  });
     await page1.goBack()
     expect(page1.url()==='https://www.fidelity.com/');
     await page1.goForward();
     expect (await page1.getByRole('heading',{name:'Log in'}).textContent()==='Log in')
     await page1.reload();
     expect (await page1.getByRole('heading',{name:'Log in'}).textContent()==='Log in')
     console.log(`Old page Title ------> ${await page1.title()}`);
     
     const data = await page1.evaluate(() => {
    return {
        title: document.title,
        url: location.href
    };
});

console.log(data);

     await broserContext.close();
     await b.close();

});