import { Page, expect } from "@playwright/test";

export default class RegisterPage {

    constructor(public page: Page){
        
    }

    async enterFirstName(firstname:string) {
        await this.page.locator("#input-firstname")
            .fill(firstname)
    }

    async enterLastName(lastname:string) {
        await this.page.locator("#input-lastname")
            .fill(lastname)
    }

    async entereEmail(email:string) {
        await this.page.locator("#input-email")
            .fill(email)
    }

    async enterPhone(phone:string) {
        await this.page.locator("#input-telephone")
            .fill(phone)
    }

    async enterePassword(password:string) {
        await this.page.locator("#input-password")
            .fill(password)
    }

    async entereConfirmPassword(password:string) {
        await this.page.locator("#input-confirm")
            .fill(password)
    }

    async isSubscribeChecked() {
        await this.page.locator("#input-newsletter-yes").click();
    }

    isSubscribeUnChecked() {
        return this.page.locator("#input-newsletter-no")
    }

    async clickTermsAndConditions() {
        await this.page.locator("//label[@for='input-agree']").click();
    }
    
    async clickSubmit() {
        await Promise.all([
            this.page.waitForNavigation({waitUntil:"networkidle"}),
            this.page.click("input[type='submit']")
        ])
    }
}