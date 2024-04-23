import { Page } from "@playwright/test";

export default class LoginPage {

    constructor(public page: Page){
        
    }

    async login(email,password) {
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.clickLogin();
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
        await Promise.all([
            this.page.waitForNavigation({waitUntil:"networkidle"}),
            this.page.click("input[type='submit']")
        ])
    }
}