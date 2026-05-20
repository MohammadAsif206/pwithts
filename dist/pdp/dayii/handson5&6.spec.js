"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = readExcel;
const test_1 = require("@playwright/test");
const XLSX = __importStar(require("xlsx"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let baseUrl = 'https://qa-automation-practice.netlify.app/';
(0, test_1.test)("Handle file upload", { tag: '@smoke2' }, async ({ page }) => {
    const folderPath = path_1.default.resolve(__dirname, 'testdata', 'test.txt');
    let data = fs_1.default.readFileSync(folderPath, 'utf-8');
    if (!fs_1.default.existsSync(folderPath)) {
        console.log("The file path:", folderPath);
        fs_1.default.mkdirSync(path_1.default.join(__dirname, 'testdata'), { recursive: true });
        fs_1.default.writeFileSync(folderPath, 'I am fed up with you');
        data = fs_1.default.readFileSync(folderPath, 'utf-8');
        console.log("The file is:", data);
    }
    console.log("The file is:", data);
    await page.goto(baseUrl + 'file-upload.html');
    console.log("Th file text is: ", await page.locator("#file_upload").innerText());
    await page.locator("#file_upload").setInputFiles(folderPath);
    await page.waitForTimeout(300);
    (0, test_1.expect)(await page.locator('#file_upload').inputValue()).toContain('test.txt');
    console.log(`Name of the chosen file: ${await page.locator('#file_upload').inputValue()}`);
    await page.getByRole('button', { name: ' Submit ' }).click();
    const message = await page.locator("#file_upload_response").textContent();
    await page.waitForTimeout(300);
    console.log(`Upload confermation message: ${message}`);
    (0, test_1.expect)(message).toContain("successfully");
    await (0, test_1.expect)(page.locator("#file_upload")).toHaveCount(1);
});
(0, test_1.test)("Handle file download- text file", { tag: "@smoke3" }, async ({ page }) => {
    const folderPath = path_1.default.resolve(__dirname, 'testdata', 'test.txt');
    await page.goto('https://demo.automationtesting.in/FileDownload.html');
    const data = fs_1.default.readFileSync(folderPath, 'utf-8');
    const textBox = page.locator("#textbox");
    await textBox.scrollIntoViewIfNeeded();
    await textBox.pressSequentially(data, { delay: 100 });
    const generateButton = page.locator("#createTxt");
    //expect(generateButton).toBeVisible();
    await generateButton.click();
    (0, test_1.expect)(page.locator("#link-to-download")).toBeVisible();
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator('[id="link-to-download"]').click(),
    ]);
    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`);
    (0, test_1.expect)(download.suggestedFilename()).toContain("info.txt");
});
(0, test_1.test)("Handle file download- PDF file", { tag: "@smoke4" }, async ({ page }) => {
    const folderPath = path_1.default.resolve(__dirname, 'testdata', 'test.txt');
    await page.goto('https://demo.automationtesting.in/FileDownload.html');
    const data = fs_1.default.readFileSync(folderPath, 'utf-8');
    const textBox = page.locator("#pdfbox");
    await textBox.scrollIntoViewIfNeeded();
    await textBox.pressSequentially(data, { delay: 100 });
    const generateButton = page.locator("#createPdf");
    await generateButton.click();
    (0, test_1.expect)(page.locator("#pdf-link-to-download")).toBeVisible();
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator('[id="pdf-link-to-download"]').click(),
    ]);
    await download.saveAs('./downloads/' + download.suggestedFilename());
    console.log(`Downloaded: ${download.suggestedFilename()}`);
    (0, test_1.expect)(download.suggestedFilename()).toContain("info.pdf");
});
//Excel reader util
function readExcel(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}
