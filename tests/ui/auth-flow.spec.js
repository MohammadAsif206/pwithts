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
const test_1 = require("@playwright/test");
const EmailUtil_1 = require("../utils/EmailUtil");
const signUpPage = __importStar(require("../actions/Signup"));
const loginPage = __importStar(require("../actions/Login"));
const fs_1 = require("fs");
const path_1 = require("path");
const testSignUp = process.env.SIGN_UP_FLOW;
(0, test_1.test)('Sign up', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    test_1.test.skip(testSignUp == 'true', 'Skipping sign up test');
    const emailUtils = new EmailUtil_1.EmailUtils();
    const inbox = yield emailUtils.createInbox();
    console.log(inbox);
    yield page.goto('/signup');
    yield signUpPage.signUp(page, inbox.emailAddress);
    const email = yield emailUtils.waitForLatestEmail(inbox.id);
    // get the code\ from the email body:
    const code = /([0-9]{6})$/.exec(email === null || email === void 0 ? void 0 : email.body)[1];
    yield signUpPage.addConfirmationCode(page, code);
    yield loginPage.login(page, inbox.emailAddress, signUpPage.signUpData.pass);
    yield loginPage.verifySuccessfulLogin(page);
    // persist login data:
    const loginData = {
        email: inbox.emailAddress,
        pass: signUpPage.signUpData.pass
    };
    const authDir = (0, path_1.resolve)(__dirname, '../playwright/.auth');
    if (!(0, fs_1.existsSync)(authDir)) {
        (0, fs_1.mkdirSync)(authDir, { recursive: true });
    }
    (0, fs_1.writeFileSync)((0, path_1.join)(authDir, 'loginData.json'), JSON.stringify(loginData, null, 2));
}));
