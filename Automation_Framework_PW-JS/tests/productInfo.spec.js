import{test,expect} from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductsHomePage';
import fs from 'fs'
 
 const testDataPath = 'testData/data.json';
 const testData = JSON.parse(fs.readFileSync(testDataPath,'utf8'));

 for(const user of testData){
 test.beforeEach(`Login to the app with ${user.uid}`, async({page})=>{
  const login = new LoginPage(page);
  await login.navigateToApp();
  await expect(page).toHaveTitle('Swag Labs');
  await login.loginToApp(user.uid,user.pwd);
  await page.screenshot({path:'./Screenshots/Login.png', fullPage:true})
})
 }

 test('Capture all the product details', async({page})=>{
    const product = new ProductPage(page);
    const standardUserProducts=  await product.getProductsNameAndPrice();
    const visualUserProducts = await product.getProductsNameAndPrice();
    await product.compareProductsData(standardUserProducts, visualUserProducts);
    await expect(standardUserProducts).toEqual(visualUserProducts);
    await page.screenshot({path:'./Screenshots/CaptureProducts.png', fullPage:true})
})