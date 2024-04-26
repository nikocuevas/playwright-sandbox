import { Page, expect } from "@playwright/test";

export default class CountriesPage {

    constructor(public page: Page){
        
    }

    async clickAdmiraltyIslands() {
        const admiraltyIslands = await this.page.waitForSelector("//a[@href='/country/admiralty-islands/2']",
        {timeout: 60000}
        );
        await admiraltyIslands.click();
    }
}

