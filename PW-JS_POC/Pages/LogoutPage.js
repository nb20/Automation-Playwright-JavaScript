exports.LogoutPage=

class LogoutPage{
    constructor(page){
        this.page = page;
        this.productMenu= 'button', { name: 'Open Menu' };
        this.logOutLink = '[data-test="logout-sidebar-link"]';

    }

    async logout(){
        await this.page.getByRole(this.productMenu).click();
        await this.page.locator(this.logOutLink).click();
    }
}