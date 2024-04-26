import { Page, expect } from "@playwright/test";

export default class AdmiraltyIslandsPage {

    constructor(public page: Page){
        
    }

    async clickOrderNowBCreditReportSuperflash() {
        const orderNow = await this.page.waitForSelector(
            "//span[text() = 'Business Credit Report (Superflash Speed)']/parent::li/parent::ul//span[contains(text(), 'Order Now')]",
        {timeout: 60000}
        );
        await orderNow.click();
    }
}

