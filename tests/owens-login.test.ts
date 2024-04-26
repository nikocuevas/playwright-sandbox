import { expect, test } from "@playwright/test"
import LoginPage from "../pages/owens-loginPage"
import CookiePage from "../pages/owens-cookie"
import TACPage from "../pages/owens-tacPage"
import HomePage from "../pages/owens-homePage";
import CountriesPage from "../pages/owens-countriesPage";
import AdmiraltyIslandsPage from "../pages/owens-countries/country-AdmiraltyIslands";
import OrderingPage from "../pages/owens-ordering"

    test("Owens Login Test", async({ page }) => {
        test.slow();

        const cookie = new CookiePage(page);
        const login = new LoginPage(page);
        const tac = new TACPage(page);
        const home = new HomePage(page);
        const countries = new CountriesPage(page);
        const admiraltyislands = new AdmiraltyIslandsPage(page)
        const ordering = new OrderingPage(page);

        await page.goto(`https://api-uaa.uat1.owens.io/login`);
        await cookie.acceptCookies();
        await login.login(
            "QAKyle_mongodbpt2",
            "Test1234@"
        );
        await tac.acceptTAC();
        await home.clickHeaderCountries();
        await countries.clickAdmiraltyIslands();
        await admiraltyislands.clickOrderNowBCreditReportSuperflash();
        await ordering.fillOrderFormBCreditReportSuperflash(
            "QA Org",
            "address",
            "city",
        );
        await ordering.placeOrder();
        await home.logout();
});