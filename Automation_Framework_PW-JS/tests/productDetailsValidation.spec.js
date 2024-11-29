import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductsHomePage } from '../Pages/ProductsHomePage';
import { ProductsDetailsPage } from '../Pages/ProductDetailsPage';
import{LogoutPage} from '../Pages/LogoutPage';
import fs from 'fs'

const testDataPath = 'testData/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

test.describe('Validating and Comparing ProductDetails on both HomePage Vs ProductDetailsPage', () => {
  test.use({ viewport: { width: 1366, height: 768 } });

  for (const user of testData) {
    test(`Login to the app with ${user.uid}`, async ({ page }) => {
      const login = new LoginPage(page);
      const homepage = new ProductsHomePage(page);
      const product = new ProductsDetailsPage(page);

    await login.navigateToApp();
    await expect(page).toHaveTitle('Swag Labs');

      await login.loginToApp(user.uid, user.pwd);
      await page.screenshot({ path: `./Screenshots/Login for${user.uid}.png`, fullPage: true });

      const productsOnHomePage = await homepage.getAllProductsDetails();
      //const productDiscrepancies = [];

      for (let i = 0; i < productsOnHomePage.length; i++) {
        const homePageProduct = productsOnHomePage[i];

        await homepage.clickOnProductName(i);
        await page.screenshot({ path: `./Screenshots/clickedProduct for${user.uid}.png`, fullPage: true })

        const productDetails = await product.getEachProductDetails();
        console.log(productDetails)
        await page.goBack();

        expect.soft(homePageProduct.name).toBe(productDetails.name);
        // expect.soft(homePageProduct.price).toBe(productDetails.price);
        // expect.soft(homePageProduct.description).toBe(productDetails.description);
        // expect.soft(homePageProduct.img).toBe(productDetails.img);

        // if (homePageProduct.name !== productDetails.name ||
        //   homePageProduct.price !== productDetails.price ||
        //   homePageProduct.description !== productDetails.description ||
        //   homePageProduct.img !== productDetails.img) {
        //   productDiscrepancies.push(` ${homePageProduct.name} does not match ${productDetails.name} for ${user.uid}`)
        //   productDiscrepancies.push(` ${homePageProduct.price} does not match ${productDetails.price} for ${user.uid}`)
        //   productDiscrepancies.push(` ${homePageProduct.description} does not match ${productDetails.description} for ${user.uid}`)
        //   productDiscrepancies.push(` ${homePageProduct.img} does not match ${productDetails.img} for ${user.uid}`)
        // }
      }
      await page.screenshot({ path: `./Screenshots/CompareProducts for${user.uid}.png`, fullPage: true })

      // if (productDiscrepancies.length > 0) {
      //   console.log(`discrepancies found for ${user.uid}`);
      //   productDiscrepancies.forEach(discrepancy => console.log(discrepancy));
      // } else {
      //   console.log(`No discrepancies found for the ${user.uid}`);
      // }
    })
    }

    test.skip('Logout of the application', async ({ page }) => {
      const logout = new LogoutPage(page);
      await logout.logoutApplication();
      await page.screenshot({ path: `./Screenshots/LogoutApplication`, fullPage: true })
      await page.close();
    })
})
