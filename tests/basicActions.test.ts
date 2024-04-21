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

test.only("checkbox demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");
    const singleCheckbox = await page.locator("id=isAgeSelected");
    expect(singleCheckbox).not.toBeChecked();
    await singleCheckbox.check();
    expect(singleCheckbox).toBeChecked();
    
    const disabledCheckbox = await page.locator("(//label[text()='Option 3'])[1]/parent::div//input");
    expect(disabledCheckbox).toBeDisabled();

    const checkAllBtn = await page.locator("input[type='button']");
    await checkAllBtn.click();

    const option1 = page.locator("#ex1-check1");
    const option2 = page.locator("#ex1-check2");
    const option3 = page.locator("(//input[@id='ex1-check3'])[1]");
    const option4 = page.locator("(//input[@id='ex1-check3'])[2]");
    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).toBeChecked();
    expect(option4).toBeChecked();
    await checkAllBtn.click();
    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
    expect(option3).not.toBeChecked();
    expect(option4).not.toBeChecked();
})