import { test, expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

test.describe('Scenario: Tax Calculation for 8%', () => {

   test.beforeEach('Login to the app', async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigateToApp();
      await expect(page).toHaveTitle('Swag Labs');
      await login.loginToApp(process.env.USER_NAME, process.env.PASSWORD);
      await page.waitForTimeout(1000);
      await page.screenshot({ path: './Screenshots/Login.png', fullPage: true })
   })

   test('Select the product & Add to Cart', async ({ page }) => {
      const product = new ProductPage(page);
      await product.addProductToCart('Sauce Labs Backpack');
      await page.screenshot({ path: './Screenshots/AddToCart.png', fullPage: true })
   })

   test('Checkout from Cart & verify Tax Rate calculated on Summary Page', async ({ page }) => {
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);
      await cart.verifyCartItems();
      await checkout.checkOutProduct();
      await checkout.verifyTaxRate();
      await page.screenshot({ path: './Screenshots/VerifyCartItems.png', fullPage: true });
   })

   test.afterEach('tear down', async ({ page }) => {
      await page.close();
   })

})




















