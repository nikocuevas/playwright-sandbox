import { Page, expect } from "@playwright/test";

export default class GatorBEPage {

    constructor(public page: Page){
        
    }

    async enterUserID() {
        await this.page.waitForSelector("//input[@name='accountNo']",
        {timeout: 60000});
        await this.page.locator("//input[@name='accountNo']").fill("adm");
    }
    
    async enterPassword() {
        await this.page.locator("//input[@name='password']").fill("demosystem");
    }

    async clickLogin() {
        await this.page.locator("//input[@name='login']").click();
    }

    async addInvoiceToOrg(orgName: string, 
        contactPrefix: string, 
        contactFName: string, 
        contactLName: string, 
        emailAddress: string, 
        orgAddress1: string, 
        orgCity: string, 
        state: string, 
        orgZip: string) {
        await this.page.waitForSelector("//span[text()[normalize-space()='Resource Manager']]",
        {timeout: 60000}
        )
        await this.page.waitForTimeout(7000);
        await this.page.locator("//span[text()[normalize-space()='Resource Manager']]").click();
        await this.page.locator("//span[text()[normalize-space()='Organization Manager']]").click();
        await this.page.waitForSelector("//td[contains(text(), 'Organization Name')]//following-sibling::td//input",
        {timeout: 60000}
        )
        await this.page.locator("//td[contains(text(), 'Organization Name')]//following-sibling::td//input")
        .fill(orgName)
        await this.page.locator("//input[@type='image'][@src='/ttsvr/images/b/gator/icons/search.png']")
        .click();
        await this.page.waitForSelector("//input[@type='image'][@src='/ttsvr/images/b/gator/icons/select_square.png']",
        {timeout: 60000}
        )
        await this.page.locator("//input[@type='image'][@src='/ttsvr/images/b/gator/icons/select_square.png']")
        .click();
        await this.page.waitForSelector("//h1[contains(text(), 'Client Information')]",
        {timeout: 60000}
        )
        await this.page.locator("//h1[contains(text(), 'Client Information')]")
        .click();
        await this.page.locator("//h1[contains(text(), 'Accounting')]")
        .click();
        await this.page.locator("//input[@value='Get New #']")
        .click();
        
        const billingContactSelector = "//select[@name='section8_billingContact']";
        const fullName = `${contactPrefix} ${contactFName} ${contactLName}`;
        await this.page.selectOption(billingContactSelector, fullName);

        await this.page.locator("//input[@name='section8_billingEmail']").fill(emailAddress);

        const billingAddressSelector = "//select[@name='section8_billingAddress']";
        const fullAddress = `${orgAddress1}, ${orgCity}, ${state}, ${orgZip}, United States`;
        await this.page.selectOption(billingAddressSelector, fullAddress);

        await this.page.selectOption("//select[@name='section8_invoiceIntervalId']", 'Daily');
        await this.page.selectOption("//select[@name='section8_termId']", 'Due Upon Receipt');
        await this.page.locator("//a[@id='lmenuSave']").click();

        await this.page.waitForTimeout(10000)
    }
    
}
