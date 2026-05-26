import{Page,Locator, expect} from '@playwright/test';

export class RegistrationPage
{
    private readonly page:Page;
    private readonly txtFirstName:Locator;
    private readonly txtLastName:Locator;
    private readonly txtTelephone:Locator;
    private readonly txtEmail:Locator;
    private readonly txtPassword:Locator;
    private readonly txtConfirmPassword:Locator;
    private readonly checkprivacy:Locator;
    private readonly btnContinue:Locator;
    private readonly confirmMsg:Locator;

    constructor(page:Page){
        this.page=page;
        this.txtFirstName=page.locator("#input-firstname");
        this.txtLastName=page.locator("#input-lastname");
        this.txtEmail=page.locator("#input-email");
        this.txtTelephone=page.locator("#input-telephone");
        this.txtPassword=page.locator("#input-password");
        this.txtConfirmPassword=page.locator("#input-confirm");
        this.checkprivacy=page.locator("input[value='1'][name='agree']");
        this.btnContinue=page.locator("input[value='Continue']");
        this.confirmMsg=page.locator('h1:has-text("Your Account Has Been Created!")');
    }

    //set first name with param
    async setFirstName(fname:string):Promise<void>
    {
        await this.txtFirstName.fill(fname);
    }
    //set last name with param
    async setLastName(lname:string):Promise<void>
    {
        await this.txtLastName.fill(lname);
    }
    //set email
    async setEmail(email:string):Promise<void>
    {
        await this.txtEmail.fill(email);
    }
    //set Telephone
    async setTelephoneNumber(telephone:string):Promise<void>
    {
        await this.txtTelephone.fill(telephone);
    }
    //set password
    async setPassword(pass:string):Promise<void>
    {
        await this.txtPassword.fill(pass);
    }
    //set confirm password
    async setCinfirmPassword(pass:string):Promise<void>
    {
        await this.txtConfirmPassword.fill(pass);
    }

    //check privacy policy
    async checkePrivacyPolicy():Promise<void>{
        await this.checkprivacy.check();
    }

    //click on continue
    async ClickOnContinue():Promise<void>
    {
        await this.btnContinue.click();
    }

    //get confirmation message

    async getConfirmationMsg():Promise<string>
    {
        return await this.confirmMsg.textContent()?? '';
    }

    //Complete registration WorkFolow

    async completeRegistration(userData:{
          firstname:string;
          lastname:string;
          email:string;
          telephone:string;
          password:string;

    }):Promise<void>
    {
         await this.setFirstName(userData.firstname);
         await this.setLastName(userData.lastname);
         await this.setEmail(userData.email);
         await this.setTelephoneNumber(userData.telephone);
         await this.setPassword(userData.password);
         await this.setCinfirmPassword(userData.password);
         await this.checkePrivacyPolicy();
         await this.ClickOnContinue();
         await expect(this.confirmMsg).toBeVisible();
    }

}