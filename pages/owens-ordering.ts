import { Page, expect } from "@playwright/test";

export default class OrderingPage {

    constructor(public page: Page){
        
    }

    async fillOrderFormBCreditReportSuperflash(companyName:string, companyAddress1:string, companyCity:string) {
        await this.fillCompanyName(companyName)
        await this.fillCompanyAddress1(companyAddress1);
        await this.fillCompanyCity(companyCity);
        await this.clickSameAsAbove();
        await this.clickNext();
    }

    async placeOrder() {
        await this.selectInvoice();
        await this.clickPlaceOrder();
        await this.confirmSuccessOrder();
    }

    async fillCompanyName(companyName:string) {
        const companyNameField = await this.page.waitForSelector(
            "//label[not(@id) and contains(text(), \"Company's Name\")]/parent::div//following-sibling::div//input",
        {timeout: 60000}
        );
        await companyNameField.fill(companyName);
    }

    async fillCompanyAddress1(companyAddress1:string) {
        await this.page.locator("//input[@placeholder='Address 1']")
        .fill(companyAddress1);
    }

    async fillCompanyCity(companyCity:string) {
        await this.page.locator("//label[contains(text(), 'City')]/parent::div/following-sibling::div//input")
        .fill(companyCity);
    }

    async clickSameAsAbove() {
        await this.page.locator("//span[text()='Same as Above']")
        .click();
    }

    async clickNext() {
        await this.page.locator("//button[text()=' Next ']")
        .click();
    }

    async selectInvoice() {
        const paymentMethod = await this.page.waitForSelector(
            "//label[contains(text(), 'Payment Method')]/parent::div/following-sibling::div//input",
        {timeout: 60000}
        );
        await paymentMethod.click();
        await paymentMethod.fill("Invoice");
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async clickPlaceOrder() {
        await this.page.locator("//button[contains(text(), 'Place Order')]")
        .click();
    }

    async confirmSuccessOrder() {
        await this.page.waitForSelector("//h3[@class='center-header']",
        {timeout: 60000});
        const successMsg = await this.page.locator("//h3[@class='center-header']")
        expect(successMsg).toHaveText("Thank you for your order!");
    }

}

