import { Page } from "@playwright/test";

export default class MegaMenuPage {

    constructor(public page: Page){
        
    }

    async addFirstiPodTouch() {
        
        await this.page.hover("(//img[@class='lazy-load'])[1]", {
            strict: false
        })
        await this.page.locator("(//button[@title='Add to Cart'])[1]").click();
    }

    async isVisible() {
        const toast = this.page.locator("//a[contains(.,'View Cart')]")
        await toast.waitFor({state:"visible"})
        return toast;
    }
}