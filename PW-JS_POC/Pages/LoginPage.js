exports.LoginPage = 

class LoginPage{
constructor(page){
    this.page = page;
    this.userName= '#user-name';
    this.passWord = '#password';
    this.loginBtn = '[data-test="login-button"]'
    
}
async navigateToApp(){
    await this.page.goto(process.env.APP_URL); 
 } 

 async loginToApp(uname,pword){
    await this.page.locator(this.userName).click();
    await this.page.fill(this.userName,uname);
    await this.page.locator(this.passWord).click();
    await this.page.fill(this.passWord,pword);
    await this.page.locator(this.loginBtn).click();
    await this.page.waitForTimeout(2000);
 }
}
