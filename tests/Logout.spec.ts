/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */
import {test,expect} from '@playwright/test';
import { TestConfig } from '../test.config';
import { Homepage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';

let config:TestConfig;
let homepage:Homepage;
let myAccountPage:MyAccountPage;
let loginPage:LoginPage;
let logoutPage:LogoutPage;


test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    homepage=new Homepage(page);
    myAccountPage=new MyAccountPage(page);
    loginPage=new LoginPage(page);
    logoutPage=new LogoutPage(page);
});

test.afterEach(async ({page})=>{
   // await page.close();
})
test("Logout User test  @master @regression",async({page})=>{
    // 1) Navigate to the application URL
    await homepage.ClickMyAccount();
    //2) Go to Login page from Home page
    await homepage.clickOnLlogin();
    //3) Login with valid credentials
    await loginPage.performLogin(config.email,config.password);
    // 4) Verify 'My Account' page
    expect(await myAccountPage.isMyAccountpageExists()).toBeTruthy();
    //5) Click on Logout link
    logoutPage=await myAccountPage.clickLogout();

    //verify continue button is visible
    expect(await logoutPage.VerifyContinueButton()).toBeTruthy();

    //Click on Continue button
    homepage=await logoutPage.ClickOnContinuButton();
    //7) Verify user is redirected to Home Page
    expect(await homepage.isHomePageExists()).toBe(true);

});