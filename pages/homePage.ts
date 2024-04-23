import { Page } from "@playwright/test";

export default class HomePage {

    constructor(public page: Page){
        
    }

    async clickOnSpecialHotMenu(email:string) {
        await this.page.click("'Special Hot'")
    }

    async addFirstiMacToCart() {
        await this.page.hover("(//img[@alt='iMac'])[1]", {
            strict: false
        })
        await this.page.locator("(//button[@title='Add to Cart']//i)[1]").click();
    }

    async isVisible() {
        const toast = this.page.locator("//a[contains(.,'View Cart')]")
        await toast.waitFor({state:"visible"})
        return toast;
    }

}