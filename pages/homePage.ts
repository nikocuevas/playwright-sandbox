import { Page } from "@playwright/test";

export default class HomePage {

    constructor(public page: Page){
        
    }

    async clickHomeMenu() {
        await Promise.all([
            this.page.waitForNavigation({waitUntil:"networkidle"}),
            await this.page.click("'Home'")
        ])
    }

    async hoverOnMegaMenu() {
        await this.page.hover("'Mega Menu'")
    }

    async clickApple() {
        await Promise.all([
            this.page.waitForNavigation({waitUntil:"networkidle"}),
            await this.page.click("'Apple'")
        ])
    }
}