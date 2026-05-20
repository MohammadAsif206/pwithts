"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const baseUrl = 'https://the-internet.herokuapp.com/windows';
(0, test_1.test)("Handle new Tabs, multiple pages ", { tag: '@sanity' }, async ({ page, context }) => {
    await page.goto(baseUrl);
    const pageCount = context.pages().length;
    (0, test_1.expect)(pageCount).toEqual(1);
    console.log("Number of tabs before going to any pages: ");
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
    (0, test_1.expect)(title).toEqual("New Window");
    await newPage.close();
    (0, test_1.expect)(page).toHaveURL(/windows/);
    console.log(`Current page: ${page.url()}`);
});
(0, test_1.test)("Handle file upload", { tag: '@smoke' }, async ({ page }) => {
    const folderPath = path_1.default.join(__dirname, 'testdata', 'test.txt');
    console.log("The file path:", folderPath);
    fs_1.default.mkdirSync(path_1.default.join(__dirname, 'testdata'), { recursive: true });
    fs_1.default.writeFileSync(folderPath, 'I am fed up with you');
    const data = fs_1.default.readFileSync(folderPath, 'utf-8');
    console.log("The file is:", data);
    await page.goto('https://qaplayground.com/practice/file-upload/');
    console.log(await page.locator("[name='file-upload']").textContent());
    await page.locator("[name='file-upload']").setInputFiles('testdata/test.txt');
    const message = await page.getByText("File selected:").textContent();
    (0, test_1.expect)(message).toContain("test.txt");
    await (0, test_1.expect)(page.locator("[name='file-upload']")).toHaveCount(1);
    await page.locator('#file-upload').setInputFiles([]);
    await (0, test_1.expect)(page.locator('#file-upload')).toHaveValue('');
});
(0, test_1.test)("Handle file download", { tag: "@smoke" }, async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/file-upload/');
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole('button', {
            name: /Download PDF/
        }).click(),
    ]);
    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`);
    (0, test_1.expect)(download.suggestedFilename()).toContain(/test.pdf/);
});
