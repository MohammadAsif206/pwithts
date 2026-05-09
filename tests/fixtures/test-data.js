"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignupData = getSignupData;
function getSignupData() {
    return {
        firstName: "John",
        lastName: "Doe",
        email: `test_${Date.now()}@mail.com`,
        address: "123 Main St",
        city: "Dallas",
        zipCode: "75001",
        country: "USA",
        payment: {
            nameOnCard: "John Doe",
            cardNumber: "4111 1111 1111 1111",
            expiry: "12/30",
            cardcvc: "123"
        }
    };
}
