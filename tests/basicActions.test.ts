import {expect, test} from "@playwright/test";


test("simple form demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    const messageInput = page.locator("(//input[@id='user-message'])[1]");
    console.log('Placeholder value: ' + await messageInput.getAttribute("placeholder"));
    expect(messageInput).toHaveAttribute("placeholder", "Please enter your Message");
    console.log('Before entering data: ' + await messageInput.inputValue());
    await messageInput.fill("test message");
    console.log('After entering data: ' + await messageInput.inputValue());
    expect(messageInput).toHaveValue("test message");

    const getCheckedValueBtn = page.locator("#showInput");
    await getCheckedValueBtn.click();

    const messageOutput = page.locator("#message");
    console.log('Output message: ' + await messageOutput.textContent());
    expect(messageOutput).toHaveText("test message");
});

test("sum demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    const sumInput1 = page.locator("#sum1");
    const sumInput2 = page.locator("#sum2");

    const getValuesBtn = page.locator("//button[text()='Get Sum']");
    let num1 = 121;
    let num2 = 546;

    await sumInput1.fill("" + num1);
    await sumInput2.fill("" + num2);
    await getValuesBtn.click();

    const result = page.locator("#addmessage");
    console.log(await result.textContent());

    let expectedResult = num1 + num2;
    expect(result).toHaveText("" + expectedResult);
});