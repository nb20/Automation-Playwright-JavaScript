import{expect} from '@playwright/test'
exports.CheckoutPage=

class CheckoutPage{
    constructor(page){
        this.page = page;
        this.summaryInfoList = '.summary_info';
        this.itemPrice = '[data-test="subtotal-label"]';
        this.itemFinalPrice = '.summary_total_label';
        this.continueBtn = '#continue';
        this.finishBtn = 'button',{name:'Finish'};
        this.checkoutCompleteTitle = 'data-test="title"';
        this.checkoutSuccessMsg= '#checkout_complete_container';

    }

    async checkOutProduct(){
        //await expect(this.page).toHaveTitle('Checkout: Your Information');
        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill('Test');
        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill('Test');
        await this.page.getByPlaceholder('Zip/Postal Code').click();
        await this.page.getByPlaceholder('Zip/Postal Code').fill('230000');
        await this.page.click(this.continueBtn);
     }

     async verifyTaxRate(){
        //await expect(this.page).toHaveTitle('Checkout: Overview');
           const summaryInfo = await this.page.$$(this.summaryInfoList);
           for (let summary of summaryInfo){
              console.log(summary)
           }
           let itemTotal =  await this.page.locator(this.itemPrice).textContent();
           let taxRate = 8;
           let taxCalc = itemTotal * (taxRate /100);
           let finalPrice = itemTotal * (1 + (taxRate /100));
           //await expect(this.page.locator(this.itemFinalPrice),finalPrice);
           if(finalPrice==await this.page.locator(this.itemFinalPrice)){
            await expect(success).toBeTruthy();
           }
           await this.page.getByRole(this.finishBtn).last().click();
     }

     async verifyCheckoutSuccessMsg(){
      const msg = await this.page.$$(this.checkoutSuccessMsg);
      for (displayMsg of msg){
          const thankyouMsg = await displayMsg.allTextContent();
          await console.log(thankyouMsg);
      }
     }
}