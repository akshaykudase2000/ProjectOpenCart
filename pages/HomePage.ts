import { Page, Locator } from '@playwright/test';

export class Homepage {
    private readonly page: Page;
    private readonly lnkMyaccount: Locator;
    private readonly lnkregister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearch: Locator;
    private readonly btnsearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lnkMyaccount = page.locator('span:has-text("My Account")');
        this.lnkregister = page.locator('a:has-text("Register")');
        this.lnkLogin = page.locator('a:has-text("Login")');
        this.txtSearch = page.locator("input[placeholder='Search']");
        this.btnsearch = page.locator("button[class='btn btn-default btn-lg']");
    };

    //verify home page is exists
    async isHomePageExists() {
        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    //click on My Account link
    async ClickMyAccount(): Promise<void> {
        try {
            await this.lnkMyaccount.click();
        } catch (error) {
            console.log(`Exception occurs while clicking 'My Account' ${error}`);
            throw error;
        }
    }

    //click on register link
    async ClickRegister(): Promise<void> {
        try {
            await this.lnkregister.click();
        } catch (error) {
            console.log(`Exception occurs while clicking 'Register' ${error}`);
            throw error;
        }
    }

    //click on login link
    async clickOnLlogin() {
        try {
            await this.lnkLogin.click();
        } catch (error) {
            console.log(`Exception occurs while clicking 'Login' ${error}`);
            throw error;
        }
    }

    //Enter prodcutName in search  box
    async EnterProductName(pName: string) {
        try {
            await this.txtSearch.fill(pName)
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }

    //click on search button
    async clickOnSearch() {
        try {
            await this.btnsearch.click();
        } catch (error) {
            console.log(`Exception occurring when click on search button ${error}`);
            throw error;
        }
    }
}