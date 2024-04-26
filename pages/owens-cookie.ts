import { Page, expect } from "@playwright/test";

export default class CookiePage {

    constructor(public page: Page){
        
    }

    async acceptCookies() {
        await this.page.waitForSelector("//div[@id='cookiescript_injected']", { timeout: 60000 });
        await this.page.click("//div[@id='cookiescript_accept']");
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector("//div[@id='cookiescript_badgeimage']", { timeout: 60000 });
        await this.page.locator("//div[@id='cookiescript_injected']").isHidden();
    }

    async declineCookies() {
        await this.page.waitForSelector("//div[@id='cookiescript_injected']",
        { timeout: 60000 });
        await this.page.click("//div[@id='cookiescript_accept']");
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector("//div[@id='cookiescript_badgeimage']",
        { timeout: 60000 });
        await this.page.locator("//div[@id='cookiescript_injected']").isHidden();
    }
       
}
