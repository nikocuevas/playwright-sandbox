import { Page } from "@playwright/test";

export default class LoginPage {

    constructor(public page: Page){
        
    }

    async enterEmail(email:string) {
        await this.page.locator("#input-email")
            .fill(email)
    }

    async enterPassword(password:string) {
        await this.page.locator("#input-password")
            .fill(password)
    }

    async clickLogin() {
        await this.page.click("input[type='submit']");
    }
}