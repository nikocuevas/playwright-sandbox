import { expect, test } from "@playwright/test"
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"

const email = "kyle.automation.test+02@gmail.com"
const password = "Test1234!"

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
    console.log("Account has been successfully created");
})