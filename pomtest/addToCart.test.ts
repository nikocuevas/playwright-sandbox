import { expect, test } from "@playwright/test"
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import MegaMenuPage from "../pages/megaMenuPage"

const email = "kyle.automation.test+11@gmail.com"
const password = "Test1234!"

test.describe("Page Object Test Demo", async() => {

    test("Register test_01", async({ page, baseURL }) => {
        const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
        await register.enterFirstName("Kyle");
        await register.enterLastName("Cuevas");
        await register.entereEmail(email);
        await register.enterPhone("1234567890");
        await register.enterePassword(password);
        await register.entereConfirmPassword(password);
        expect(register.isSubscribeUnChecked()).toBeChecked();
        await register.clickTermsAndConditions();
        await register.clickSubmit();
        await page.waitForSelector("//h1[text()=' Your Account Has Been Created!']");
        console.log("Account has been successfully created!");
    });
    
    test("Login test_02", async({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await login.login(email,password);
        expect(await page.title()).toBe("My Account");
        console.log("Successful login!");
    });
    
    test("Add to cart test_03", async({ page,baseURL}) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const megaMenu = new MegaMenuPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await login.login(email,password);
        expect(await page.title()).toBe("My Account");
        await homePage.hoverOnMegaMenu();
        await homePage.clickApple();
        await megaMenu.addFirstiPodTouch();
        const isCartVisible = await megaMenu.isVisible();
        expect(isCartVisible).toBeVisible();
        console.log("Add To Cart, successful!");
    });
});