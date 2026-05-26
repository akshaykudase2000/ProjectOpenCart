import{Page,Locator} from '@playwright/test';

export class LoginPage
{
    private readonly page:Page;
    private readonly txtEmail:Locator;
    private readonly txtPass:Locator;
    private readonly btnLogin:Locator;
    private readonly errormsg:Locator;


    constructor(page:Page){
        this.page=page;
        this.txtEmail=page.locator("#input-email");
        this.txtPass=page.locator("#input-password");
        this.btnLogin=page.locator("input[value='Login']");
        this.errormsg=page.locator(".alert.alert-danger.alert-dismissible");
    }

    //set email 
    async setEmail(email:string)
    {
        await this.txtEmail.fill(email);
    }

    //set password
    async setPassword(pass:string)
    {
        await this.txtPass.fill(pass);
    }

    //click on login 
    async clickOnLogin()
    {
        await this.btnLogin.click();
    }

    //perform Login 
    async performLogin(email:string,pass:string)
    {
        await this.setEmail(email);
        await this.setPassword(pass);
        await this.clickOnLogin();
        
    }

    //get error msg when login is failed
    async geterrormsg():Promise<null | string>
    {
        return (await this.errormsg.textContent());
    }
}