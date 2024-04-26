import { Page, expect } from "@playwright/test";

export default class RegisterPage {

    constructor(public page: Page){
        
    }

    async enterOrgName(orgName:string) {
        await this.page.locator("//label[contains(text(), 'Organization')]/parent::div/following-sibling::div/input")
            .fill(orgName)
    }

    async checkNoOrgURL() {
        await this.page.locator("//label[text()=' Not Applicable ']")
            .click();
    }

    async enterOrgURL(orgURL:string) {
        await this.page.locator("//label[contains(text(), 'URL')]/parent::div/following-sibling::div/input")
            .fill(orgURL);
    }

    async enterOrgPhone(orgPhone:string) {
        await this.page.locator("//label[contains(text(), 'Main Phone')]/parent::div/following-sibling::div/input")
            .fill(orgPhone);
    }

    async enterOrgCountry(orgCountry:string) {
        await this.page.locator("(//label[contains(text(), 'Country')]/parent::div/following-sibling::div//input)[1]")
            .click();
        await this.page.locator("(//label[contains(text(), 'Country')]/parent::div/following-sibling::div//input)[1]")
            .type(orgCountry);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterOrgAddress1(orgAddress1:string) {
        await this.page.locator("(//label[contains(text(), 'Address 1')]/parent::div/following-sibling::div/input)[1]")
            .fill(orgAddress1);
    }

    async enterOrgAddress2(orgAddress2:string) {
        await this.page.locator("(//label[contains(text(), 'Address 2')]/parent::div/following-sibling::div/input)[1]")
            .fill(orgAddress2);
    }

    async enterOrgCity(orgCity:string) {
        await this.page.locator("(//label[contains(text(), 'City')]/parent::div/following-sibling::div/input)[1]")
            .fill(orgCity);
    }

    async enterOrgState(orgState:string) {
        await this.page.locator("(//label[contains(text(), 'State / Province')]/parent::div/following-sibling::div/input)[1]")
            .fill(orgState);
    }

    async enterOrgStateDropdown(orgState:string) {
        const orgStateDropdown = await this.page.locator(
            "(//label[contains(text(), 'State')]/parent::div/following-sibling::div//input)[1]"
            )
        await orgStateDropdown.click();
        await orgStateDropdown.type(orgState);
        await orgStateDropdown.press('ArrowDown');
        await orgStateDropdown.press('Enter');
    }

    async enterOrgZip(orgZip:string) {
        await this.page.locator("(//label[contains(text(), ' ZIP / Postal Code ')]/parent::div/following-sibling::div/input)[1]")
            .fill(orgZip);
    }

    async checkEndUser() {
        await this.page.locator("//strong[text()=' End User ']")
            .click();
    }

    async checkReseller() {
        await this.page.locator("//strong[text()=' Reseller ']")
            .click();
    }

    async enterContactPrefix(contactPrefix:string) {
        await this.page.locator("//label[contains(text(), 'Prefix')]/parent::div/following-sibling::div//input")
            .click();
        await this.page.locator("//label[contains(text(), 'Prefix')]/parent::div/following-sibling::div//input")
            .type(contactPrefix);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterContactFName(contactFName:string) {
        await this.page.locator("//label[contains(text(), 'First Name')]/parent::div/following-sibling::div/input")
            .fill(contactFName);
    }

    async enterContactMName(contactMName:string) {
        await this.page.locator("//label[contains(text(), 'Middle Name')]/parent::div/following-sibling::div/input")
            .fill(contactMName);
    }

    async enterContactLName(contactLName:string) {
        await this.page.locator("//label[contains(text(), 'Last Name')]/parent::div/following-sibling::div/input")
            .fill(contactLName);
    }

    async enterContactSuffix(contactSuffx:string) {
        await this.page.locator("//label[contains(text(), 'Suffix')]/parent::div/following-sibling::div//input")
            .click();
        await this.page.locator("//label[contains(text(), 'Suffix')]/parent::div/following-sibling::div//input")
            .type(contactSuffx);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterContactJob(contactJob:string) {
        await this.page.locator("//label[contains(text(), 'Job Title')]/parent::div/following-sibling::div/input")
            .fill(contactJob);
    }

    async enterContactPhone(contactPhone:string) {
        await this.page.locator("//label[contains(text(), 'Work Phone')]/parent::div/following-sibling::div/input")
            .fill(contactPhone);
    }

    async enterContactExt(contactExt:string) {
        await this.page.locator("//label[contains(text(), 'Ext')]/parent::div/following-sibling::div/input")
            .fill(contactExt);
    }

    async checkSameAsOrgAddress() {
        await this.page.locator("//span[text()='Same as Organization address']")
            .click();
    }

    async checkEnterNewAddress() {
        await this.page.locator("//span[text()='Enter a new address']")
            .click();
    }

    async enterContactCountry(orgCountry:string) {
        await this.page.locator("(//label[contains(text(), 'Country')]/parent::div/following-sibling::div//input)[2]")
            .click();
        await this.page.locator("(//label[contains(text(), 'Country')]/parent::div/following-sibling::div//input)[2]")
            .type(orgCountry);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterContactAddress1(contactAddress1:string) {
        await this.page.locator("(//label[contains(text(), 'Address 1')]/parent::div/following-sibling::div/input)[2]")
            .fill(contactAddress1);
    }

    async enterContactAddress2(contactAddress2:string) {
        await this.page.locator("(//label[contains(text(), 'Address 2')]/parent::div/following-sibling::div/input)[2]")
            .fill(contactAddress2);
    }

    async enterContactCity(contactCity:string) {
        await this.page.locator("(//label[contains(text(), 'City')]/parent::div/following-sibling::div/input)[2]")
            .fill(contactCity);
    }

    async enterContactState(contactState:string) {
        await this.page.locator("(//label[contains(text(), 'State / Province')]/parent::div/following-sibling::div/input)[2]")
            .fill(contactState);
    }

    async enterContactZip(contactZip:string) {
        await this.page.locator("(//label[contains(text(), ' ZIP / Postal Code ')]/parent::div/following-sibling::div/input)[2]")
            .fill(contactZip);
    }

    async enterEmail(email:string) {
        await this.page.locator("(//label[contains(text(), 'Work Email')]/parent::div/following-sibling::div/input)[1]")
            .fill(email);
    }

    async reenterEmail(email:string) {
        await this.page.locator("(//label[contains(text(), 'Work Email')]/parent::div/following-sibling::div/input)[2]")
            .fill(email);
    }

    async enterUsername(username:string) {
        await this.page.locator("//label[contains(text(), 'Username')]/parent::div/following-sibling::div/input")
            .fill(username);
    }

    async enterPassword(password:string) {
        await this.page.locator("(//label[contains(text(), 'Password')]/parent::div/following-sibling::div/input)[1]")
            .fill(password);
    }

    async reenterPassword(password:string) {
        await this.page.locator("//label[contains(text(), 'Re-enter Password')]/parent::div/following-sibling::div/input")
            .fill(password);
    }

    async selectSecurityQ1() {
        await this.page.locator("(//label[contains(text(), 'Security Question')]/following-sibling::mat-form-field)[1]")
            .click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterSecurityA1(answer1:string) {
        await this.page.locator("(//label[contains(text(), 'Security Answer')]/parent::div/following-sibling::div/input)[1]")
            .fill(answer1);
    }

    async selectSecurityQ2() {
        await this.page.locator("(//label[contains(text(), 'Security Question')]/following-sibling::mat-form-field)[2]")
            .click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterSecurityA2(answer2:string) {
        await this.page.locator("(//label[contains(text(), 'Security Answer')]/parent::div/following-sibling::div/input)[2]")
            .fill(answer2);
    }

    async selectSecurityQ3() {
        await this.page.locator("(//label[contains(text(), 'Security Question')]/following-sibling::mat-form-field)[3]")
            .click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterSecurityA3(answer3:string) {
        await this.page.locator("(//label[contains(text(), 'Security Answer')]/parent::div/following-sibling::div/input)[3]")
            .fill(answer3);
    }

    async checkReCaptcha(page: Page) {
        const reCaptchaFrame = page.frameLocator("//iframe[@title='reCAPTCHA']")
        await reCaptchaFrame.locator("#recaptcha-anchor-label").click();
        await page.waitForTimeout(10000);
    }

    async clickCancel(page: Page) {
            await page.click("//button[contains(text(), 'Cancel')]")
    }

    async clickNext(page: Page) {
            await page.mainFrame().click("//button[contains(text(), 'Next')]")
            await page.locator("//label[contains(text(), 'Activation Code')]/following::input").isVisible();
    }

    async fillOrganizationDetails(orgName: string, orgPhone: string, orgCountry: string, orgAddress1: string, orgCity: string, orgState: string, orgZip: string) {
        await this.enterOrgName(orgName);
        await this.checkNoOrgURL();
        await this.enterOrgPhone(orgPhone);
        await this.enterOrgCountry(orgCountry);
        await this.enterOrgAddress1(orgAddress1);
        await this.enterOrgCity(orgCity);
        await this.enterOrgState(orgState);
        await this.enterOrgZip(orgZip);
    }
    async fillOrganizationDetailsUS(orgName: string, 
        orgPhone: string, 
        orgCountry: string, 
        orgAddress1: string, 
        orgCity: string, 
        orgState: string, 
        orgZip: string) {
        await this.enterOrgName(orgName);
        await this.checkNoOrgURL();
        await this.enterOrgPhone(orgPhone);
        await this.enterOrgCountry(orgCountry);
        await this.enterOrgAddress1(orgAddress1);
        await this.enterOrgCity(orgCity);
        await this.enterOrgStateDropdown(orgState);
        await this.enterOrgZip(orgZip);
    }

    async fillContactDetails(contactPrefix: string, contactFName: string, contactLName: string, contactJob: string, contactPhone: string) {
        await this.enterContactPrefix(contactPrefix);
        await this.enterContactFName(contactFName);
        await this.enterContactLName(contactLName);
        await this.enterContactJob(contactJob);
        await this.enterContactPhone(contactPhone);
    }
    
    async fillAccountSetupDetails(email: string, username: string, password: string, answer1: string, answer2: string, answer3: string) {
        await this.enterEmail(email);
        await this.reenterEmail(email); // Assuming reentering email is the same as the initial email
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.reenterPassword(password); // Assuming reentering password is the same as the initial password
        await this.selectSecurityQ1();
        await this.enterSecurityA1(answer1);
        await this.selectSecurityQ2();
        await this.enterSecurityA2(answer2);
        await this.selectSecurityQ3();
        await this.enterSecurityA3(answer3);
    }
    
}