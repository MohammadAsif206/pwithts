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
exports.signUpData = void 0;
exports.signUp = signUp;
exports.addConfirmationCode = addConfirmationCode;
exports.signUpData = {
    firstName: 'someFirstName',
    lastName: 'someLastName',
    pass: '1234567zxcGJr!'
};
function signUp(page, email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.locator('[data-test-id="signup-firstname-input"]').fill(exports.signUpData.firstName);
        yield page.locator('[data-test-id="signup-lastname-input"]').fill(exports.signUpData.lastName);
        yield page.locator('[data-test-id="signup-email-input"]').fill(email);
        yield page.locator('[data-test-id="signup-password-input"]').fill(exports.signUpData.pass);
        yield page.locator('[data-test-id="signup-submit-button"]').click();
    });
}
function addConfirmationCode(page, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = page.locator('input[inputmode="numeric"]');
        yield input.fill(code);
        yield page.locator('[data-test-id="confirm-signup-submit-button"]').click();
    });
}
