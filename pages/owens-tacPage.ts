import { Page, expect } from "@playwright/test";

export default class TACPage {

    constructor(public page: Page){
        
    }

    async acceptTAC() {
        const tacCheckbox = await this.page.waitForSelector(
            "//span[text()='Yes, I have read and agree to the above terms and conditions and to the agreement for service incorporated therein.']",
            { timeout: 60000 })
        await tacCheckbox.click();
        await this.page.locator("//button[contains(text(), 'Continue')]").click();
        await this.page.waitForSelector("//span[contains(text(), 'Hi,')]",
            { timeout: 60000 }
        );
    }

    async declineTAC() {
        const cancelButton = await this.page.waitForSelector(
            "//button[contains(text(), 'Cancel')]",
            { timeout: 60000 }
        )
        await cancelButton.click();
    }
    
}

