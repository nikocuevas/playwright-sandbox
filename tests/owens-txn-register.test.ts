import { chromium, expect, test } from "@playwright/test"
import RegisterPage from "../pages/owens-registerPage"
import CookieHandle from "../pages/owens-cookie"
import GatorBEPage from "../pages/owens-gatorBEPage"
import LoginPage from "../pages/owens-loginPage"
import TACPage from "../pages/owens-tacPage"
import HomePage from "../pages/owens-homePage";
import CountriesPage from "../pages/owens-countriesPage";
import AdmiraltyIslandsPage from "../pages/owens-countries/country-AdmiraltyIslands";
import OrderingPage from "../pages/owens-ordering"
import MailSlurp from "mailslurp-client"
import { faker } from "@faker-js/faker"
require('dotenv').config()
const XLSX = require('xlsx');
const readlineSync = require('readline-sync');

test.only("Owens Taxation E2E", async({ page }) => {
    test.slow();

    // Load the Excel file
    const filePath = '/Users/kylecuevas/Documents/playwright-sandbox/data/owens-txn.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'Taxation Test Data';
    const worksheet = workbook.Sheets[sheetName];
    
    // Prompt for state input
    const state = readlineSync.question('Choose a State: ');
    
    // Find corresponding row in the Excel sheet
    const addressRow = XLSX.utils.sheet_to_json(worksheet).find(row => row.State === state);

    if (!addressRow) {
        console.error('No data found for the selected state.');
        return;
    }

    // Extract data from the row
    const orgAddress1: string = addressRow['Address 1'];
    const orgCity: string = addressRow.City;
    const orgZip: string = addressRow.Zip;

    if (!orgAddress1) {
        console.error('No address found for the selected state.');
        return;
    }

    const orgName = `QAOrg_${state}_01`;
    const contactPrefix = "Mr."
    const contactFN = faker.person.firstName('male');
    const contactLN = faker.person.lastName('male');
    const contactJob = faker.person.jobTitle();
    const phone = faker.phone.number();
    const username = `QA_${state}_01`;
    const password = "Test1234!";


    const apiKey = process.env.MAILSLURP_API_KEY || 'your_default_api_key';
    expect(apiKey).toBeDefined();
    
    // create a new inbox
    const mailslurp = new MailSlurp({ apiKey })
    const { id, emailAddress } = await mailslurp.inboxController.createInbox({
        expiresIn: 5 * 60 * 1000, // expire in 5 minutes
    })
    
    const register = new RegisterPage(page);
    const cookie = new CookieHandle(page);
    const gatorbe = new GatorBEPage(page);
    await page.goto(`https://api-uaa.uat1.owens.io/register`);
    await cookie.acceptCookies();
    await register.fillOrganizationDetailsUS(
        orgName,
        phone,
        "United States",
        orgAddress1,
        orgCity,
        state,
        orgZip
    );
    await register.checkReseller();
    await register.fillContactDetails(
        contactPrefix,
        contactFN,
        contactLN,
        contactJob,
        phone
    )
    await register.fillAccountSetupDetails(
        emailAddress,
        username,
        password,
        "A",
        "B",
        "C"
    )
    await register.checkReCaptcha(page);
    await register.clickNext(page);

    const email = await mailslurp.waitForLatestEmail(id)

    let match: any;
    if (email.body !== undefined && email.body !== null) {
        match = /\b\d{5}\b/.exec(email.body);
    } else {

    }

    let code: string = match ? match[0] : '';
    
    await page.locator("//label[contains(text(), 'Activation Code')]/following::input").fill(code);
    await page.click("//button[contains(text(), 'Submit')]");

    console.log(`Registration is successful\nOrganization: ${orgName}\nEmail: ${emailAddress}\nAccount Username: ${username}`)

    await page.waitForTimeout(10000);

    await page.goto(`http://pt-ool-be.uat1.owens.io:8080/ttsvr/servlet/tooltwist.basic.LoginServlet`);
    await gatorbe.enterUserID();
    await gatorbe.enterPassword();
    await gatorbe.clickLogin();
    await gatorbe.addInvoiceToOrg(
        orgName,
        contactPrefix,
        contactFN,
        contactLN,
        emailAddress,
        orgAddress1,
        orgCity,
        state,
        orgZip
    )

    const login = new LoginPage(page);
    const tac = new TACPage(page);
    const home = new HomePage(page);
    const countries = new CountriesPage(page);
    const admiraltyislands = new AdmiraltyIslandsPage(page)
    const ordering = new OrderingPage(page);

    await page.goto(`https://api-uaa.uat1.owens.io/login`);
        //await cookie.acceptCookies();
        await login.login(
            username,
            password
        );
        await tac.acceptTAC();
        await home.clickHeaderCountries();
        await countries.clickAdmiraltyIslands();
        await admiraltyislands.clickOrderNowBCreditReportSuperflash();
        await ordering.fillOrderFormBCreditReportSuperflash(
            "QA Org",
            "address",
            "city",
        );
        await ordering.placeOrder();
        await home.logout();
});
