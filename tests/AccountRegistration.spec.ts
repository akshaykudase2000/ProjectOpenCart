/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import {test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataUtils } from '../utils/randomdatagenerator';

let homePage:Homepage;
let registerpage:RegistrationPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);
    homePage=new Homepage(page);
    registerpage=new RegistrationPage(page);
});

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
})

test("user Registration test @master @sanity @regression",async()=>{

     //goto my account and click register
     await homePage.ClickMyAccount();
     await homePage.ClickRegister();

     await registerpage.setFirstName(RandomDataUtils.getFirstName());
     await registerpage.setLastName(RandomDataUtils.getLastName());
     await registerpage.setEmail(RandomDataUtils.getEmail());
     await registerpage.setTelephoneNumber(RandomDataUtils.getPhoneNumber());

     const passoword=RandomDataUtils.getPassword();
     await registerpage.setPassword(passoword);
     await registerpage.setCinfirmPassword(passoword);

     await registerpage.checkePrivacyPolicy();
     await registerpage.ClickOnContinue();
     
     const confirmationMsg=registerpage.getConfirmationMsg();
     expect(await confirmationMsg).toContain('Your Account Has Been Created!');
})