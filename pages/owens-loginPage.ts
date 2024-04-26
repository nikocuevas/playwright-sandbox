import { Page, expect } from "@playwright/test";

export default class LoginPage {

    constructor(public page: Page){
        
    }

    async enterUsername(username:string) {
        await this.page.locator("//input[@placeholder='Username']")
            .fill(username)
    }

    async enterPassword(password:string) {
        await this.page.locator("//input[@placeholder='Password']")
            .fill(password)
    }

    async clickLogin() {
        await this.page.click("//button[contains(text(), 'Log In')]")
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.page.click("//button[contains(text(), 'Log In')]")
    }
    
}

