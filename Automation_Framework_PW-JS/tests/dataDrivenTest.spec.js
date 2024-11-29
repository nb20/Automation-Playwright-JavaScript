import{test,expect} from '@playwright/test'
import fs from 'fs'

const testDataPath = 'testData/data.json';
const testData = JSON.parse(fs.readFileSync(testDataPath,'utf8'));

for(const user of testData){
    test.beforeEach(`Login with ${user.uid}`, async({page})=>{
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').click();
        await page.fill('#user-name',user.uid);
        await page.locator('#password').click();
        await page.fill('#password',user.pwd);
        await page.locator('[data-test="login-button"]').click();
        await page.waitForTimeout(2000);
    } 
)}

test('Verify products', async({page})=>{
    const productList = await page.$$('[data-test="inventory-list"]');
        for (const products of productList){
      await console.log(`${products}`);
//  if (productName== await productList.textContent){
//     console.log(products.productName + products.productPrice);
//  }
}
})


      
        


      
    
    
        
    
    
    

