import { expect, test } from "@playwright/test"
import RegisterPage from "../pages/owens-registerPage"
import CookieHandle from "../pages/owens-cookie"
import MailSlurp from "mailslurp-client"
import { faker } from "@faker-js/faker"
require('dotenv').config()


test("Owens End User Register Test", async({ page }) => {
        test.slow();

        const orgName = `QAOrg_${faker.company.name()}`;
        const orgAddress1 = faker.location.streetAddress();
        const orgCity = faker.location.city();
        const orgState = faker.location.state();
        const orgZip = faker.location.zipCode('#####');

        const contactFN = faker.person.firstName('male');
        const contactLN = faker.person.lastName('male');
        const contactJob = faker.person.jobTitle();
        const phone = faker.phone.number();

        const username = `QA_${faker.internet.userName()}`;
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
        await page.goto(`https://api-uaa.uat1.owens.io/register`);
        await cookie.acceptCookies();
        await register.fillOrganizationDetails(
            orgName,
            phone,
            "Philippines",
            orgAddress1,
            orgCity,
            orgState,
            orgZip
        );
        await register.checkEndUser();
        await register.fillContactDetails(
            "Mr.",
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

        console.log(`Registration is successful\nOrganization: ${orgName}\nAccount Username: ${username}`)

        await page.waitForTimeout(10000);
});

test("Owens Reseller Register Test", async({ page }) => {
    test.slow();

    // const randomNum = faker.datatype.number(1000);
    const orgName = `QAOrg_${faker.company.name()}`;
    const orgAddress1 = faker.location.streetAddress();
    const orgCity = faker.location.city();
    const orgState = faker.location.state();
    const orgZip = faker.location.zipCode('#####');

    const contactFN = faker.person.firstName('male');
    const contactLN = faker.person.lastName('male');
    const contactJob = faker.person.jobTitle();
    const phone = faker.phone.number();

    const username = `QA_${faker.internet.userName()}`;
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
    await page.goto(`https://api-uaa.uat1.owens.io/register`);
    await cookie.acceptCookies();
    await register.fillOrganizationDetails(
        orgName,
        phone,
        "Philippines",
        orgAddress1,
        orgCity,
        orgState,
        orgZip
    );
    await register.checkEndUser();
    await register.fillContactDetails(
        "Mr.",
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

    console.log(`Registration is successful\nOrganization: ${orgName}\nAccount Username: ${username}`)

    await page.waitForTimeout(10000);
});