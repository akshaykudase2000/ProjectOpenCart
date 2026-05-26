import{Page,Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage{
    private readonly page:Page;
    private readonly msgHeading:Locator;
    private readonly  lnkLogout:Locator;

    constructor(page:Page){
        this.page=page;
        this.msgHeading=page.locator('h2:has-text("My Account")');
        this.lnkLogout= page.locator('text=Logout').nth(1);
    }

    //verify my account page is exists
    async isMyAccountpageExists():Promise<boolean>
    {
        try{
             const heading=await this.msgHeading.isVisible();
             return heading;
        }catch(error)
        {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
       
    }

    //click on logout
     async clickLogout(): Promise<LogoutPage> {
        try {
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        } catch (error) {
            console.log(`Unable to click Logout link: ${error}`);
            throw error; // Re-throw the error to fail the test
        }
    }
}