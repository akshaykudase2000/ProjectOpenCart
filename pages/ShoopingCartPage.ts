import { Page, Locator } from "@playwright/test";

export class ShoopingCartPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.btnCheckout = page.locator("a[class='btn btn-primary']");
    }

    async getTotalPrice(): Promise<string | null> {
        try {
            return this.lblTotalPrice.textContent();
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }

    async clickOnCheckout(): Promise<void> {
        await this.btnCheckout.click();
    }

    async isPageLoaded(): Promise<boolean> {
        try {
            return await this.btnCheckout.isVisible();
        } catch (error) {
            return false;
        }
    }
}