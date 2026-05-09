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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
(0, test_1.test)('fetch product API calls', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    // fetch requests
    page.on('request', request => console.log(request.method(), request.url()));
    yield page.goto('/products');
}));
(0, test_1.test)('fetch product API calls - fetch all', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    // fetch requests
    page.on('request', request => console.log(request.method(), request.url()));
    yield page.goto('/products');
    yield page.waitForLoadState('networkidle');
}));
(0, test_1.test)('mock product API calls - fetch all', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const filePath = path_1.default.resolve(__dirname, '../../fixtures/product.json');
    const mockProduct = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    // ✅ Register route FIRST
    yield page.route('https://api.valentinos-magic-beans.click/products', (route) => __awaiter(void 0, void 0, void 0, function* () {
        yield route.fulfill({
            status: 200, // good to include
            contentType: 'application/json',
            body: JSON.stringify(mockProduct)
        });
    }));
    // Optional: log requests
    page.on('request', request => console.log(request.method(), request.url()));
    // Then navigate
    yield page.goto('/products');
    // Optional assertion (recommended)
    yield page.getByText('Mocha coffee').waitFor();
}));
