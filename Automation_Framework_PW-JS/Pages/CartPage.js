import{expect} from '@playwright/test'
exports.CartPage=

class CartPage{
    constructor(page){
        this.page=page;
        this.cartLink= '.shopping_cart_link';
        this.cartItemsList = '[data-test="cart-list"]';
        this.checkoutBtn = 'button',{name:'Checkout'};
        this.cartTitle = '.title';
    }

    async verifyCartItems(){
        await this.page.click(this.cartLink);
       // await expect(this.cartTitle).toContainText('Your Cart');
        const cartList = await this.page.$$(this.cartItemsList);
           for (const items of cartList){
              console.log(items)
           }
           await this.page.getByRole(this.checkoutBtn).last().click();
      }
}