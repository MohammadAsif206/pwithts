"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
(() => __awaiter(void 0, void 0, void 0, function* () {
    //Launch the browser
    const browser = yield playwright_1.chromium.launch({ headless: false });
    const context = yield browser.newContext();
    const page = yield context.newPage();
    // Navigate to the login page
    yield page.goto('https://practicetestautomation.com/practice-test-login/');
    // Fill in the username and password fields
    yield page.fill('#username', 'student');
    yield page.fill('#password', 'Password123');
    // click the submit button
    page.click('#submit');
    // verify the URL after login
    const currentURL = page.url();
    if (currentURL === 'https://practicetestautomation.com/logged-in-successfully/') {
        console.log('Test passed: Login functionality works as epxected.');
    }
    else {
        console.log('Test failed: URL mismatch after login');
    }
    //close the browser
    yield page.close();
}));
