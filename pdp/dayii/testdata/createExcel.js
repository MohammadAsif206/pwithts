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
const XLSX = __importStar(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const folderPath = path_1.default.join(process.cwd(), 'testdata');
if (!fs_1.default.existsSync(folderPath)) {
    fs_1.default.mkdirSync(folderPath);
}
// Write file
XLSX.writeFile(workbook, path_1.default.join(folderPath, 'loginData.xlsx'));
console.log('Excel file created successfully');
