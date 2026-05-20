import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Test data
const data = [
    {
        testName: 'Valid Login',
        username: 'standard_user',
        password: 'secret_sauce',
        expectedUrl: 'https://www.saucedemo.com/inventory.html',
        expectedError: ''
    },
    {
        testName: 'Invalid Password',
        username: 'standard_user',
        password: 'wrongpass',
        expectedUrl: '',
        expectedError: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        testName: 'Locked User',
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedUrl: '',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.'
    }
];

// Convert JSON to worksheet
const worksheet = XLSX.utils.json_to_sheet(data);

// Create workbook
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, 'LoginData');

// Create folder if not exists
const folderPath = path.join(process.cwd(), 'testdata');

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Write file
XLSX.writeFile(
    workbook,
    path.join(folderPath, 'loginData.xlsx')
);

console.log('Excel file created successfully');