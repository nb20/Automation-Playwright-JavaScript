exports.LogoutPage=

class LogoutPage{
    constructor(page){
        this.page = page;
        this.productMenu= "['.bm-burger-button']";
        this.logOutLink = '[data-test="logout-sidebar-link"]';

    }

    async logoutApplication(){
        await this.page.getByRole(this.productMenu).click();
        await this.page.locator(this.logOutLink).click();
    }
}