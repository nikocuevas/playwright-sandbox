import { Page, expect } from "@playwright/test";

export default class HomePage {

    constructor(public page: Page){
        
    }

    async clickHeaderCountries() {
        const countriesHeader = await this.page.waitForSelector("//div[@class='header-nav-container countries']",
        {timeout: 60000}
        );
        await countriesHeader.click();
    }

    async logout() {
        const accountBtn = await this.page.waitForSelector("//span[@class='login-btn']",
        {timeout: 60000}
        );
        await accountBtn.hover();
        await this.page.locator("(//a[contains(text(), 'Log Out')])[2]").click();
        await this.page.waitForSelector("//span[@class='login-bar-ellipsis']//a[1]",
        {timeout: 60000}
        );
    }
    
}

