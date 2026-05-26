import { Page,Locator } from "@playwright/test";
import { ShoopingCartPage } from "./ShoopingCartPage";

export class ProductPage
{
     private readonly page: Page;
    
    // Locators using CSS selectors
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.txtQuantity=page.locator("#input-quantity");
        this.btnAddToCart=page.locator("#button-cart");
        this.cnfMsg=page.locator(".alert.alert-success.alert-dismissible");
        this.btnItems=page.locator("#cart");
        this.lnkViewCart=page.locator('strong:has-text("View Cart")')
    }

    async setQuantity(qty:string):Promise<void>
    {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    async addToCart():Promise<void>
    {
        await this.btnAddToCart.click();
    }

    async isConfirmationMessageVisible():Promise<boolean>
    {
        try{
            if(this.cnfMsg!=null)
            {
                return true;
            }else
            {
                return false;
            }
        }catch(error)
        {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    async clickItemsToNavigateToCart():Promise<void>
    {
       await  this.btnItems.click();
    }

    async clickViewCart():Promise<ShoopingCartPage>
    {
        await this.lnkViewCart.click();
        return new ShoopingCartPage(this.page);
    }
    async addProductToCart(quantity: string): Promise<void> {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }

}