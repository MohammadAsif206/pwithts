import { Page } from '@playwright/test';
import { SignupData } from '../fixtures/test-data';

export class CheckoutActions {
  constructor(private page: Page) {}

   async addContactInfo(data: SignupData) {
    await this.page.fill('[data-test-id="checkout-firstname-input"]', data.firstName);
    await this.page.fill('[data-test-id="checkout-lastname-input"]', data.lastName);
    await this.page.fill('[data-test-id="checkout-email-input"]', data.email);
  //  await this.page.locator('[data-test-id="checkout-firstname-input"]').fill(data.firstName);
  //    await this.page.locator('[data-test-id="checkout-lastname-input"]').fill(data.lastName);
  //   await this.page.locator('[data-test-id="checkout-email-input"]').fill(data.email);
   }

  async addPaymentInfo(data: SignupData) {
   
     await this.page.locator('[data-test-id="checkout-cardname-input"]').fill(data.payment.nameOnCard);
     await this.page.locator('[data-test-id="checkout-cardnumber-input"]').fill(data.payment.cardNumber);
     await this.page.locator('[data-test-id="checkout-cardexpiry-input"]').fill(data.payment.expiry);
     await this.page.locator('[data-test-id="checkout-cardcvc-input"]').fill(data.payment.cardcvc);
  }

  async addShippingAddress(data: SignupData) {
    await this.page.locator('[data-test-id="checkout-address-input"]').fill(data.address);
    await this.page.locator('[data-test-id="checkout-city-input"]').fill(data.city);
    await this.page.locator('[data-test-id="checkout-zipcode-input"]').fill(data.zipCode);
    await this.page.locator('[data-test-id="checkout-country-input"]').fill(data.country);
    // await this.page.fill('[data-test-id="address"]', data.address);
    // await this.page.fill('[data-test-id="city"]', data.city);
    // await this.page.fill('[data-test-id="zip"]', data.zipCode);
  }

  async placeOrder() {
    await this.page.locator('[data-test-id="place-order-button"]').click();
  }
}

