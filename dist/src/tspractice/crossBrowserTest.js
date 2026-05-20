"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
console.log('Test started');
(async () => {
    //Launch the browser
    const browsers = ['chrome', 'msedge'];
    for (const browserType of browsers) {
        const browser = await playwright_1.chromium.launch({
            headless: false,
            channel: browserType
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        console.log('Test started on: ', browserType.toUpperCase());
        // Navigate to the login page
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        // Fill in the username and password fields
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');
        // click the submit button
        await page.click('#submit');
        // verify the URL after login
        const currentURL = page.url();
        if (currentURL === 'https://practicetestautomation.com/logged-in-successfully/') {
            console.log('Test passed: Login functionality works as epxected.');
        }
        else {
            console.log('Test failed: URL mismatch after login');
        }
        //take screenshot
        await page.screenshot({ path: 'pic/screenshot.png' });
        //logout
        //await page.waitForTimeout(2000);
        // page.locator('//*[@id="loop-container"]/div/article/div[2]/div/div/div/a').click;
        // await page.fill('#username','incorrectUser');
        // await page.fill('#password','Password123');
        // // click the submit button
        // await page.click('#submit');
        // // verify the URL after login
        // const p = page.getByText('Your username is invalid!');
        // //const currentURL = page.url();
        // await page.screenshot({path:'pic/screenshot.png'});
        // if(await p.textContent() === 'Your username is invalid!'){
        //     console.log(`Test passed: Login functionality works as epxected. The error message is ${p.textContent}`)
        // }else{
        //     console.log('Test failed: URL mismatch after login')
        // }
        await browser.close();
    }
    //close the browser
    // await browsers.close();
})();
