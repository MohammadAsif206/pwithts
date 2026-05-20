"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const playwright_1 = require("playwright");
(0, test_1.test)('Page navigate to Playwright uRL and verify the navigation is correct', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await (0, test_1.expect)(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
});
(0, test_1.test)('Verify if Get started link is visible', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await (0, test_1.expect)(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
(0, test_1.test)('Broswer instance Safari browser: ', async () => {
    // Open the browser instance
    const b = await playwright_1.webkit.launch({ headless: true });
    const page = await b.newPage();
    const c = await playwright_1.chromium.launch({ headless: true });
    const page1 = await c.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await page1.goto('https://www.youtube.com/');
    console.log(await page1.title());
    //Close the browser
    await b.close();
    await c.close();
});
(0, test_1.test)('Browser Context,on1 window', async () => {
    const b = await playwright_1.webkit.launch({ headless: true });
    const broserContext = await b.newContext();
    const page = await broserContext.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await broserContext.close();
    await b.close();
});
(0, test_1.test)('Browser Context, multipe windows', async () => {
    const b = await playwright_1.webkit.launch({ headless: true });
    const broserContext1 = await b.newContext();
    const page1 = await broserContext1.newPage();
    const c = await playwright_1.webkit.launch({ headless: true });
    const broserContext2 = await c.newContext();
    const page2 = await broserContext2.newPage();
    const d = await playwright_1.webkit.launch({ headless: true });
    const broserContext3 = await d.newContext();
    const page3 = await broserContext3.newPage();
    await page1.goto('https://www.google.com');
    console.log(await page1.title());
    await page1.screenshot({ path: 'pic/C1.png' });
    await page2.goto('https://github.com/login');
    console.log(await page2.title());
    await page2.locator('input#login_field').fill('test.november29@gmail.com');
    await page2.locator('input#password').fill('Admin@102938');
    await page2.locator('//input[@type="submit"]').click();
    await page2.screenshot({ path: 'pic/C2.png' });
    await page3.goto('https://github.com/login');
    console.log(await page3.title());
    await page3.screenshot({ path: 'pic/C3.png' });
    await broserContext1.close();
    await broserContext2.close();
    await broserContext3.close();
    await b.close();
    await c.close();
    await d.close();
});
(0, test_1.test)("Handle Windows/ tabs ", async () => {
    const b = await playwright_1.chromium.launch({ headless: true });
    const broserContext = await b.newContext();
    const page1 = await broserContext.newPage();
    page1.goto("https://the-internet.herokuapp.com/windows");
    const [newWindow] = await Promise.all([
        page1.waitForEvent('popup'),
        page1.getByText('Click Here').click(),
    ]);
    console.log(`Old page Title ------> ${await page1.title()}`);
    console.log(`New page/Tab Title ------> ${await newWindow.title()}`);
    await broserContext.close();
    await b.close();
});
(0, test_1.test)("Handle Windows Navigation ", async () => {
    const b = await playwright_1.webkit.launch({ headless: true });
    const broserContext = await b.newContext();
    const page1 = await broserContext.newPage();
    page1.goto("https://www.fidelity.com/");
    console.log('Page has loaded.');
    (0, test_1.expect)(page1.url() === 'https://www.fidelity.com/');
    await page1.getByRole('link', { name: 'Log in' }).click();
    await page1.goto('https://digital.fidelity.com/prgw/digital/signin/retail');
    (0, test_1.expect)(await page1.getByRole('heading', { name: 'Log in' }).textContent() === 'Log in');
    await page1.goBack();
    (0, test_1.expect)(page1.url() === 'https://www.fidelity.com/');
    await page1.goForward();
    (0, test_1.expect)(await page1.getByRole('heading', { name: 'Log in' }).textContent() === 'Log in');
    await page1.reload();
    (0, test_1.expect)(await page1.getByRole('heading', { name: 'Log in' }).textContent() === 'Log in');
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
