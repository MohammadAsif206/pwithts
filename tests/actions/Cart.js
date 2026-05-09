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
exports.checkAddedProduct = checkAddedProduct;
exports.checkSubTotal = checkSubTotal;
const test_1 = require("@playwright/test");
function checkAddedProduct(page, heading) {
    return __awaiter(this, void 0, void 0, function* () {
        //assert on first pname 
        const pinTheCart = page.getByRole('heading', { name: 'Colombian Supreme' });
        yield (0, test_1.expect)(pinTheCart).toBeVisible();
    });
}
function checkSubTotal(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.locator('//*[@id="root"]/div[2]/header/div/div/a').click();
        // assert product price with subtotal
        const subtotal = yield page.locator('//*[@id="root"]/div[2]/main/div/div/div/div[2]/div/div[2]/div[1]/span[2]').textContent();
        return Number(subtotal === null || subtotal === void 0 ? void 0 : subtotal.substring(1));
    });
}
