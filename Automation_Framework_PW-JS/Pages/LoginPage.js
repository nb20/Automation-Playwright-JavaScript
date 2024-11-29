import { expect } from '@playwright/test'
exports.LoginPage =

    class LoginPage {
        constructor(page) {
            this.page = page;
            this.userName = '#user-name';
            this.passWord = '#password';
            this.loginBtn = '[data-test="login-button"]'
            this.loginErrorMsg = "//h3[@data-test='error']";
            this.productHeaderText = "span[data-test='title']";

        }
        async navigateToApp() {
            await this.page.goto(process.env.APP_URL);
        }

        async loginToApp(uname, pword) {
            await this.page.locator(this.userName).click();
            await this.page.fill(this.userName, uname);
            await this.page.locator(this.passWord).click();
            await this.page.fill(this.passWord, pword);
            await this.page.locator(this.loginBtn).click();
            await this.page.waitForTimeOut(1000);

            const errorMsg = await this.page.locator(this.loginErrorMsg).textContent();
            if (errorMsg) {
                if (errorMsg.includes('locked out')) {
                    await expect(this.page).toHaveText('Epic sadface: Sorry, this user has been locked out.')
                } else {
                    await expect(this.page).toHaveText('Epic sadface: Username and password do not match any user in this service');
                }
                return errorMsg;
            }
            await expect(this.page.locator(this.productHeaderText)).toHaveText('Products');
        }

    }


