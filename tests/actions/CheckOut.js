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
exports.CheckoutActions = void 0;
class CheckoutActions {
    constructor(page) {
        this.page = page;
    }
    addContactInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.fill('[data-test-id="checkout-firstname-input"]', data.firstName);
            yield this.page.fill('[data-test-id="checkout-lastname-input"]', data.lastName);
            yield this.page.fill('[data-test-id="checkout-email-input"]', data.email);
            //  await this.page.locator('[data-test-id="checkout-firstname-input"]').fill(data.firstName);
            //    await this.page.locator('[data-test-id="checkout-lastname-input"]').fill(data.lastName);
            //   await this.page.locator('[data-test-id="checkout-email-input"]').fill(data.email);
        });
    }
    addPaymentInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator('[data-test-id="checkout-cardname-input"]').fill(data.payment.nameOnCard);
            yield this.page.locator('[data-test-id="checkout-cardnumber-input"]').fill(data.payment.cardNumber);
            yield this.page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(data.payment.expiry);
            yield this.page.locator('[data-test-id="checkout-cardcvc-input"]').fill(data.payment.cardcvc);
        });
    }
    addShippingAddress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator('[data-test-id="checkout-address-input"]').fill(data.address);
            yield this.page.locator('[data-test-id="checkout-city-input"]').fill(data.city);
            yield this.page.locator('[data-test-id="checkout-zipcode-input"]').fill(data.zipCode);
            yield this.page.locator('[data-test-id="checkout-country-input"]').fill(data.country);
            // await this.page.fill('[data-test-id="address"]', data.address);
            // await this.page.fill('[data-test-id="city"]', data.city);
            // await this.page.fill('[data-test-id="zip"]', data.zipCode);
        });
    }
    placeOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.locator('[data-test-id="place-order-button"]').click();
        });
    }
}
exports.CheckoutActions = CheckoutActions;
