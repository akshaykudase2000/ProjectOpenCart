import { Page, test, expect } from '@playwright/test';
import { Config } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { Homepage } from '../pages/HomePage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';


//load json data form logindata.json
const jsonPath = 'testdata/logindata.json';
const jsonTestData = DataProvider.getDataFromJson(jsonPath);

for (const data of jsonTestData) {
    test(`Login with json data from:${data.testName} @datadriven`, async ({ page }) => {


        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new Homepage(page);
        await homePage.ClickMyAccount();
        await homePage.clickOnLlogin();

        const loginpage = new LoginPage(page);
        await loginpage.performLogin(data.email, data.password);
        if (data.expected.toLowerCase() === 'sucess') {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountpageExists();
            expect(isLoggedIn).toBeTruthy();
        } else {
            const errorMessage = await loginpage.geterrormsg();
            expect(errorMessage).toContain("Warning: No match");
        }

    });
}

//load CSV data form logindata.csv file

const csvPath='testdata/logindata.csv';
const csvTestData=DataProvider.getTestDataFromCsv(csvPath);

for(const data of csvTestData){
test.only(`Login with CSV data from : ${data.testName} @datadriven`,async({page})=>{
     const config=new TestConfig();
     await page.goto(config.appUrl);
     
    const homePage=new Homepage(page);
    await homePage.ClickMyAccount();
    await homePage.clickOnLlogin();

    const loginpage=new LoginPage(page);
    await loginpage.performLogin(data.email,data.password);
    if(data.expected.toLowerCase()==='sucess'){
        const myAccountPage=new MyAccountPage(page);
       const isLoggedIn=await myAccountPage.isMyAccountpageExists();
       expect(isLoggedIn).toBeTruthy();
    }
    else
    {
        const errorMessage=await loginpage.geterrormsg();
        expect(errorMessage).toContain('Warning: No match');
    }


});
}
