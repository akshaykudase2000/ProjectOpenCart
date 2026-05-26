/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */

import {Page,test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { TestConfig } from '../test.config';

let homePage:Homepage;
let searchResultsPage:SearchResultsPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    searchResultsPage=new SearchResultsPage(page);
    homePage=new Homepage(page);
});

test.afterEach(async({page})=>{
    await page.close();
});

test("Search Product Result Test  @master @regression",async()=>{
    const productName=config.productName;

    // Step 2 & 3: Enter product name and click Search
    await homePage.EnterProductName(productName);
    await homePage.clickOnSearch();

    // Step 4: Verify that the search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Step 5: Validate if the searched product appears in results
    const isProductFound=await searchResultsPage.isProductExists(productName);
    expect( isProductFound).toBeTruthy();

})