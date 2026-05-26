/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */


import{test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';
import { MyAccountPage } from '../pages/MyAccountPage';

let config:TestConfig;
let homePage:Homepage;
let loginpage:LoginPage;
let myAccount:MyAccountPage;

test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    homePage=new Homepage(page);
    loginpage=new LoginPage(page);
    myAccount=new MyAccountPage(page);
});

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
});

test("User login test @master @sanity @regression",async()=>{
 //2) Navigate to Login page via Home page
 await homePage.ClickMyAccount();
 await homePage.clickOnLlogin();

 await loginpage.setEmail(config.email);
 await loginpage.setPassword(config.password);
 await loginpage.clickOnLogin();

 //await loginpage.performLogin(config.email,config.password);

 //Verify successful login by checking 'My Account' page presence
 const isLoggedIn=await myAccount.isMyAccountpageExists();
 expect(isLoggedIn).toBeTruthy(); 

})