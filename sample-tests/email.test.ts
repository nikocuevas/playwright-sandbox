import { test, expect, chromium } from "@playwright/test";
import MailSlurp from "mailslurp-client";
require('dotenv').config()

test.describe('test email login with playwright', () => {

test("email code retrieval", async({}) => {
    test.slow();
    const browser = await chromium.launch({ slowMo: 5000 });
    const context = await browser.newContext();
    const page = await context.newPage();

    const apiKey = process.env.MAILSLURP_API_KEY || 'your_default_api_key';
    expect(apiKey).toBeDefined();

    // load playground app
    await page.goto("https://playground.mailslurp.com");
    await page.click('[data-test="sign-in-create-account-link"]');

    // create a new inbox
    const mailslurp = new MailSlurp({ apiKey })
    const password = "test-password"
    const { id, emailAddress } = await mailslurp.inboxController.createInbox({
        expiresIn: 5 * 60 * 1000, // expire in 5 minutes
    })

    // fill sign up form
    await page.fill('input[name=email]', emailAddress);
    await page.fill('input[name=password]', password);
    await page.click('[data-test="sign-up-create-account-button"]');

    // wait for verification code
    const email = await mailslurp.waitForLatestEmail(id)
    
    // extract the confirmation code (so we can confirm the user)
    let match: any;
    if (email.body !== undefined && email.body !== null) {
        match = /([0-9]{6})$/.exec(email.body);
        // Rest of your code using match...
    } else {
        // Handle the case where email.body is undefined or null
    }
    
    const code: string = match ? String(match[1]) : '';

    // enter confirmation code
    await page.fill('[data-test="confirm-sign-up-confirmation-code-input"]', code);
    await page.click('[data-test="confirm-sign-up-confirm-button"]');

    // fill out username (email) and password
    await page.fill('[data-test="username-input"]', emailAddress);
    await page.fill('[data-test="sign-in-password-input"]', password);
    // submit
    await page.click('[data-test="sign-in-sign-in-button"]');
    await page.waitForSelector("[data-test='greetings-nav']")
  });

});