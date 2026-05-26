/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */

import{Page,test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';
import { TestConfig } from '../test.config';

let homePage:Homepage;
let searchResultsPage:SearchResultsPage;
let productPage:ProductPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    homePage=new Homepage(page);
    searchResultsPage=new SearchResultsPage(page);
    productPage=new ProductPage(page);

});

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000)
    await page.close();
});

test("Add to Cart Products",async()=>{
    const productName=config.productName;
    // Step 2: Enter product name in search box
    await homePage.EnterProductName(config.productName);
    // Step 3: Click the search button
    await homePage.clickOnSearch();
    // Step 4: Verify search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    // Step 6-7-8: Select product → Set quantity → Add to cart → Verify confirmation
   if(await searchResultsPage.isProductExist(productName)){
    await searchResultsPage.selectProduct(productName)
    await productPage.setQuantity(config.productQuantity);
    await productPage.addToCart();

    expect(await productPage.isConfirmationMessageVisible());
   }
})