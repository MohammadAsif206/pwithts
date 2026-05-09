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
exports.login = login;
exports.verifySuccessfulLogin = verifySuccessfulLogin;
const test_1 = require("@playwright/test");
function login(page, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.locator('[data-test-id="login-email-input"]').fill(email);
        yield page.locator('[data-test-id="login-password-input"]').fill(password);
        yield page.locator('[data-test-id="login-submit-button"]').click();
    });
}
function verifySuccessfulLogin(page) {
    return __awaiter(this, void 0, void 0, function* () {
        // After successful login, user should be redirected to home page
        yield (0, test_1.expect)(page).toHaveURL('/');
    });
}
