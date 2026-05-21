import { test, expect, Page } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

let baseUrl: string = 'https://qa-automation-practice.netlify.app/';

test("Handle file upload", { tag: '@smoke2' }, async ({ page }) => {

    const folderPath = path.resolve(__dirname, 'testdata', 'test.txt');
    let data = fs.readFileSync(folderPath, 'utf-8');
    if (!fs.existsSync(folderPath)) {
        console.log("The file path:", folderPath);
        fs.mkdirSync(path.join(__dirname, 'testdata'), { recursive: true });
        fs.writeFileSync(folderPath, 'I am fed up with you');
        data = fs.readFileSync(folderPath, 'utf-8');

        console.log("The file is:", data);

    }
    console.log("The file is:", data);
    await page.goto(baseUrl + 'file-upload.html');
    console.log("Th file text is: ", await page.locator("#file_upload").innerText());

    await page.locator("#file_upload").setInputFiles(folderPath);
    expect(await page.locator('#file_upload').inputValue()).toContain('test.txt');
    console.log(`Name of the chosen file: ${await page.locator('#file_upload').inputValue()}`)
    await page.getByRole('button', { name: ' Submit ' }).click();
    const message = await page.locator("#file_upload_response").textContent();
    console.log(`Upload confermation message: ${message}`)
    expect(message).toContain("successfully");
    await expect(page.locator("#file_upload")).toHaveCount(1);

});

test("Handle file download- text file", { tag: "@smoke3" }, async ({ page }) => {
    const folderPath = path.resolve(__dirname, 'testdata', 'test.txt');
    await page.goto('https://demo.automationtesting.in/FileDownload.html');

    const data = fs.readFileSync(folderPath, 'utf-8');
    const textBox = page.locator("#textbox");
    await textBox.scrollIntoViewIfNeeded();
    await textBox.pressSequentially(data, { delay: 100 });

    const generateButton = page.locator("#createTxt");
    await generateButton.click();
    expect(page.locator("#link-to-download")).toBeVisible();

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator('[id="link-to-download"]').click(),
    ]);

    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`)
    expect(download.suggestedFilename()).toContain("info.txt");

});
test("Handle file download- PDF file", { tag: "@smoke4" }, async ({ page }) => {
    const folderPath = path.resolve(__dirname, 'testdata', 'test.txt');
    await page.goto('https://demo.automationtesting.in/FileDownload.html');

    const data = fs.readFileSync(folderPath, 'utf-8');
    const textBox = page.locator("#pdfbox");
    await textBox.scrollIntoViewIfNeeded();
    await textBox.pressSequentially(data, { delay: 100 });

    const generateButton = page.locator("#createPdf");
    await generateButton.click();
    expect(page.locator("#pdf-link-to-download")).toBeVisible();

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator('[id="pdf-link-to-download"]').click(),
    ]);

    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`)
    expect(download.suggestedFilename()).toContain("info.pdf");
});

test.describe("Login validation", () => {
    const folderPath = path.resolve(__dirname, 'testdata', 'login.xlsx');
    const data = readExcel(folderPath, 'login') as LoginData[];
    test.beforeEach("Launch the website", async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
    });
    for (const datum of data) {
        test(datum.testName, async ({ page }) => {
            switch (datum.testName) {
                case 'Valid Login':
                    await logIn(page, datum);
                    break;
                case 'Invalid Password':
                    await logIn(page, datum);
                    break;
                case 'Locked User':
                    await logIn(page, datum);
                    break;
                case 'Empty Username':
                    await logIn(page, datum);
                    break;
                case 'Empty Password':
                    await logIn(page, datum);
                    break;
            }

        });
    }

});

//Excel reader util
export function readExcel(filePath: string, sheetName: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);

};
type LoginData = {
    testName: string;
    username: string;
    password: string;
    expectedUrl: string;
    expectedError: string;
};

export async function logIn(page: Page, datum: LoginData) {

    if (!datum.username) {
        await page.getByPlaceholder("Password").fill(datum.password);
    } else if (!datum.password) {
        await page.getByPlaceholder("Username").fill(datum.username);
    } else {
        await page.getByPlaceholder("Username").fill(datum.username);
        await page.getByPlaceholder("Password").fill(datum.password);
    }
    const logIn = page.getByRole("button", { name: "Login" });
    expect(logIn).toBeVisible();
    expect(logIn).toBeEnabled();
    logIn.click();
    if (datum.testName === 'Valid Login') {
        await expect(page).toHaveURL(datum.expectedUrl);
    } else {
        const errMsg = await page.locator("[data-test='error']").textContent();
        expect(errMsg).toEqual(datum.expectedError);
        console.log(`FAiled login ${errMsg}`)
    }
};