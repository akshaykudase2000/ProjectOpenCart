import {Page,Locator, expect} from '@playwright/test';
import { Homepage } from './HomePage';

export class LogoutPage{
    private readonly page:Page;
    private readonly continueButton:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.continueButton=page.locator(".btn.btn-primary");
    }

    async ClickOnContinuButton():Promise<Homepage>
    {
        await this.continueButton.click();
        return new Homepage(this.page);
    }

    async VerifyContinueButton():Promise<boolean>
    {
         return await this.continueButton.isVisible();
       
    }
}