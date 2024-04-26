import {chromium, firefox, test} from "@playwright/test";
import { waitForDebugger } from "inspector";


test("Login test demo", async() => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@data-toggle='dropdown']//span[contains(., 'My account')]");
    await page.click("'Login'");


    await page.fill("input[name='email']", "kyle.automation.test@gmail.com");
    await page.fill("input[name='password']", "Pass123");
    await page.click("input[value='Login']");

    // await page.waitForTimeout(5000);

    // const newContext = await browser.newContext();
    // const newPage = await newContext.newPage();

    // await newPage.goto("https://ecommerce-playground.lambdatest.io/");
    // await newPage.hover("//a[@data-toggle='dropdown']//span[contains(., 'My account')]");
    // await newPage.click("'Login'");
    
    // await newPage.waitForTimeout(5000);
})