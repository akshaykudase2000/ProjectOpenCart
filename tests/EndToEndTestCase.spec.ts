/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */
import { test, expect, Page } from '@playwright/test';
import { Config } from '@playwright/test';
import { RandomDataUtils } from '../utils/randomdatagenerator';
import { Homepage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoopingCartPage } from '../pages/ShoopingCartPage';
import { emit } from 'node:cluster';
import { TestConfig } from '../test.config';

// This is the main test block that runs the entire flow
test('execute end-to-end test flow @end-to-end', async ({ page }) => {
    const config = new TestConfig();

    // Navigate to the application's home page
    await page.goto(config.appUrl);

    // Step 1: Register a new account and capture the generated email
    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Step 2: Logout after successful registration
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Step 3: Login with the registered email
    await performLogin( registeredEmail,page);
    console.log("✅ Login is completed!");

    // Step 4: Search for a product and add it to the cart
    await addProductToCart(page);
    console.log("✅ Product added to cart!");

    // Step 5: Verify the contents of the shopping cart
    await verifyShoopingCart(page);
    console.log("✅ Shopping cart verification completed!");

    // Step 6: Perform checkout (skipped for demo site)
    // await performCheckout(page);
});



// Function to register a new user account
async function performRegistration(page: Page): Promise<string> {
    const homePage = new Homepage(page);
    await homePage.ClickMyAccount();
    await homePage.ClickRegister();

    const registrationPage = new RegistrationPage(page);
    await registrationPage.setFirstName(RandomDataUtils.getFirstName());
    await registrationPage.setLastName(RandomDataUtils.getLastName());

    const email: string = RandomDataUtils.getEmail();
    await registrationPage.setEmail(email);
    await registrationPage.setTelephoneNumber(RandomDataUtils.getPhoneNumber());

    await registrationPage.setPassword("sachu@123");
    await registrationPage.setCinfirmPassword("sachu@123");

    await registrationPage.checkePrivacyPolicy();
    await registrationPage.ClickOnContinue();

    // Validate that the registration was successful
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email;

}

// Function to log out the current user
async function performLogout(page: Page) {
    const myAccountPage = new MyAccountPage(page);
    const logoutPage: LogoutPage = await myAccountPage.clickLogout();

    // Ensure the "Continue" button is visible
    expect(await logoutPage.VerifyContinueButton()).toBe(true);
    // Click "Continue" and verify redirection to HomePage
    const homepage = await logoutPage.ClickOnContinuButton();
    expect(await homepage.isHomePageExists()).toBe(true);
}

// Function to log in using the registered email
async function performLogin(email: string, page: Page) {
    const config = new TestConfig();
    await page.goto(config.appUrl);

    const homepage=new Homepage(page);
    await homepage.ClickMyAccount();
    await homepage.clickOnLlogin();

    const loginpage=new LoginPage(page);
    await loginpage.performLogin(email,"sachu@123");

    // Verify login by checking My Account page
    const myAccountPage=new MyAccountPage(page);
    expect(await myAccountPage.isMyAccountpageExists()).toBeTruthy();

}

// Function to search for a product and add it to cart

async function addProductToCart(page:Page)
{
    const homepage=new Homepage(page);
    const config=new TestConfig();
   const productName:string=config.productName;
   const productQuantity:string=config.productQuantity;

   await homepage.EnterProductName(productName);
   await homepage.clickOnSearch();

   const searchResultsPage=new SearchResultsPage(page);
    // Validate search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    // Validate that the desired product exists in the results
    expect (await searchResultsPage.isProductExist(productName)).toBeTruthy();

     // Select product and set quantity
     const productPage=await searchResultsPage.selectProduct(productName);
     await productPage?.setQuantity(productQuantity);
     await productPage?.addToCart();

     await page.waitForTimeout(3000);

       // Confirm product was added
       expect(await productPage?.isConfirmationMessageVisible()).toBe(true);

}

//// Function to verify the shopping cart details

async function verifyShoopingCart(page:Page){
    const productPage=new ProductPage(page);
    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigateToCart();

    const shoppingCartPage:ShoopingCartPage=await productPage.clickViewCart();
    console.log("🛒 Navigated to shopping cart!");

    const config=new TestConfig();
     // Validate that total price is correct (based on config)
     expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}