import {test, expect, Browser,Page} from 'playwright/test';
import {chromium} from 'playwright'
console.log('Test started');

test("test 1", async () => {
    //Launch the browser
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log('Test new page opened');
    // Navigate to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    // Fill in the username and password fields
    await page.fill('#username','student');
    await page.fill('#password','Password123');
    // click the submit button
    await page.click('#submit');
    // verify the URL after login
    const currentURL = page.url();
    if(currentURL === 'https://practicetestautomation.com/logged-in-successfully/'){
        console.log('Test passed: Login functionality works as epxected.')
    }else{
        console.log('Test failed: URL mismatch after login')
    }
    //take screenshot
    await page.screenshot({path:'pic/screenshot.png'});
  
    await page.goto('https://practicetestautomation.com/practice-test-login/')
    
    await page.fill('#username','incorrectUser');
    await page.fill('#password','Password123');
    // click the submit button
    await page.click('#submit');
    // verify the URL after login
    const p = page.locator('#error').textContent();
   
    await page.screenshot({path:'pic/screenshot.png'});
    if(await p === 'Your username is invalid!'){
        console.log(`Test passed: Login functionality works as epxected. The error message is ${p}`)
    }else{
        console.log('Test failed: URL mismatch after login')
    }
    //close the browser
    await browser.close();
});

test("test 2", async () => {
    //Launch the browser
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log('Test new page opened');
    // Navigate to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    // Fill in the username and password fields
    await page.fill('#username','incorrectUser');
    await page.fill('#password','Password123');
    // click the submit button
    await page.click('#submit');
    // verify the URL after login
    const p =page.locator('#error').getByText('Your username is invalid!')
    //const currentURL = page.url();
    if(await p.textContent() === 'Your username is invalid!'){
        console.log(`Test passed: Login functionality works as epxected. The error message is ${p.textContent}`)
    }else{
        console.log('Test failed: URL mismatch after login')
    }
    //close the browser
    await browser.close();
});