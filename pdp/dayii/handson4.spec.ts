import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const baseUrl: string = 'https://the-internet.herokuapp.com/windows';

test("Handle new Tabs, multiple pages ", { tag: '@sanity' }, async ({ page, context }) => {
    await page.goto(baseUrl);
    const pageCount = context.pages().length;
    expect(pageCount).toEqual(1);
    console.log("Number of tabs before going to any pages: ")

    // capture the number of events
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByText("Click Here").click()
    ]);

    // wait for the new tab to load
    await newPage.waitForLoadState();
    //get all open pages
    const allPages = context.pages();
    console.log("All pages: ", allPages.length);
    const title = await newPage.getByText("New Window").textContent();
    expect(title).toEqual("New Window");
    await newPage.close();
    expect(page).toHaveURL(/windows/);
    console.log(`Current page: ${page.url()}`)

});

test("Handle file upload", { tag: '@smoke' }, async ({ page }) => {

    const folderPath = path.join(__dirname, 'testdata', 'test.txt');
    console.log("The file path:", folderPath);
    fs.mkdirSync(path.join(__dirname, 'testdata'), { recursive: true });
    fs.writeFileSync(folderPath, 'I am fed up with you');
    const data = fs.readFileSync(folderPath, 'utf-8');

    console.log("The file is:", data);
    await page.goto('https://qaplayground.com/practice/file-upload/');
    console.log(await page.locator("[name='file-upload']").textContent());
    await page.locator("[name='file-upload']").setInputFiles('testdata/test.txt');
    const message = await page.getByText("File selected:").textContent();
    expect(message).toContain("test.txt");
    await expect(page.locator("[name='file-upload']")).toHaveCount(1);
    await page.locator('#file-upload').setInputFiles([]);
    await expect(page.locator('#file-upload')).toHaveValue('');
});

test("Handle file download", { tag: "@smoke" }, async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/file-upload/');


    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole('button', {
            name: /Download PDF/

        }).click(),
    ]);

    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`)
    expect(download.suggestedFilename()).toContain(/test.pdf/);


})

