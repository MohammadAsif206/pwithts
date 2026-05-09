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
const products = __importStar(require("../actions/Products"));
const cart = __importStar(require("../actions/Cart"));
const checkout = __importStar(require("../actions/CheckOut"));
const contact = __importStar(require("../actions/Contacts"));
const data = __importStar(require("../fixtures/test-data"));
(0, test_1.test)('Item is added to the shopping cart', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto('/products');
    const addedProduct = yield products.addToCart(page, 1);
    yield page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    yield cart.checkAddedProduct(page, addedProduct.name);
    const subtotal = yield cart.checkSubTotal(page);
    (0, test_1.expect)(subtotal).toBe(addedProduct.price);
}));
const inputData = data.getSignupData();
console.log('-----------', inputData);
(0, test_1.test)('Complete workflow for product order', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const actions = new checkout.CheckoutActions(page);
    yield page.goto('/products');
    const addedProduct = yield products.addToCart(page, 1);
    yield page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
    yield page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    yield actions.addContactInfo(inputData);
    yield actions.addShippingAddress(inputData);
    yield actions.addPaymentInfo(inputData);
    yield actions.placeOrder();
    // get orderId:
    const orderWrapper = page.getByText('Your Order ID is:').locator('..');
    const orderId = yield orderWrapper.getByRole('paragraph').nth(1).textContent();
    // open the contact page:
    yield page.getByRole('button', { name: 'Track Your Order' }).click();
    yield contact.fillOrderIdAndEmail(page, orderId, inputData.email);
    yield contact.clickTrackOrder(page);
    // check if ordered item is returned:
    const firstOrder = page.getByText(addedProduct.name);
    yield (0, test_1.expect)(firstOrder).toBeVisible();
}));
(0, test_1.test)('Complete workflow for product order - with steps', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    yield page.goto('/products');
    let addedProduct = {};
    yield test_1.test.step('add product to cart', () => __awaiter(void 0, void 0, void 0, function* () {
        addedProduct = yield products.addToCart(page, 1);
    }));
    yield test_1.test.step('go to checkout page', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();
        yield page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    }));
    yield test_1.test.step('complete checkout information', () => __awaiter(void 0, void 0, void 0, function* () {
        const actions = new checkout.CheckoutActions(page);
        yield actions.addContactInfo(inputData);
        yield actions.addShippingAddress(inputData);
        yield actions.addPaymentInfo(inputData);
        yield actions.placeOrder();
    }));
    let orderId;
    yield test_1.test.step('get the orderID', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderWrapper = page.getByText('Your Order ID is:').locator('..');
        orderId = yield orderWrapper.getByRole('paragraph').nth(1).textContent();
    }));
    yield test_1.test.step('open the contact page', () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.getByRole('button', { name: 'Track Your Order' }).click();
        yield contact.fillOrderIdAndEmail(page, orderId, inputData.email);
        yield contact.clickTrackOrder(page);
    }));
    yield test_1.test.step('check if ordered item is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstOrder = page.getByText(addedProduct.name);
        yield (0, test_1.expect)(firstOrder).toBeVisible();
    }));
}));
