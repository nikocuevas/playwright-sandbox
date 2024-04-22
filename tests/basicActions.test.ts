import {expect, Page, test} from "@playwright/test";


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

test("checkbox demo", async({ page }) => {
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
});

test("alerts demo 1", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on("dialog", async(alert) => {
        const text = await alert.message();
        console.log(text);
        await alert.accept();
    });

    await page.locator("(//button[contains(@class,'btn btn-dark')])[1]").click();
});

test("alerts demo 2", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on("dialog", async(alert) => {
        await alert.accept();
    });

    await page.locator("(//button[contains(@class,'btn btn-dark')])[2]").click();
    expect(page.locator("#confirm-demo")).toContainText("You pressed OK!");
});

test("alerts demo 3", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    page.on("dialog", async(alert) => {
        await alert.accept("kyle");
    });

    await page.locator("(//button[contains(@class,'btn btn-dark')])[3]").click();
    expect(page.locator("#prompt-demo")).toContainText("kyle");
});

test("bootstrap modal demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo");

    await page.locator("button[data-target='#myModal']").click();
    await page.locator("(//button[text()='Save Changes'])[1]").click();
});

test("dropdown demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");

    await page.selectOption("id=select-demo", {
        // label: "Tuesday"
        // value: "Tuesday"
        index: 3
    });
    expect(page.locator("p.selected-value.text-size-14")).toContainText("Tuesday");

    await page.selectOption("#multi-select", [
        {
            label: "California"
        }, {
            label: "New York"
        }, {
            label: "Washington"
        }]);

    await page.locator("button[value='Print First']").click();
    await page.locator("button[value='Print All']").click();
});

test("bootstrap dropdown demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    await selectCountry("India");
    await selectCountry("Japan");
    await selectCountry("United States of America");

    async function selectCountry(countryName) {
        await page.click("(//span[@role='combobox'])[1]");
        await page.locator("#select2-country-results")
            .locator("li", {
                hasText: countryName
            }).click();
    };
})

test("frames demo", async({ page }) => {
    await page.goto("https://letcode.in/frame");
    const allFrames = page.frames();
    console.log("No. of frames: " + allFrames.length);

    const frame = page.frameLocator("#firstFr");
    await frame.locator("//input[@name='fname']").fill("Kyle Niko");
    await frame.locator("//input[@name='lname']").fill("Cuevas");
    
    expect(await frame.locator("//p[@class='title has-text-info']").textContent()).toContain("You have entered Kyle Niko Cuevas");

    const innerFrame = frame.frameLocator("iframe[src='innerFrame']");
    await innerFrame.locator("input[name='email']").fill("kyle.automation.test@gmail.com");

    await page.waitForTimeout(3000);
})

test.only("window and tabs demo", async({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [multiPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("#followboth")
    ]);

    await multiPage.waitForLoadState('load');

    const pages = multiPage.context().pages();
    console.log("No. of tabs: " + pages.length);

    pages.forEach(tab => {
        console.log(tab.url())
    });

    /* assigning tab
    let facebookPage: Page;
    for (let index = 0; index < pages.length; index++) {
        const url = pages[index].url()
        if (url == "https://www.facebook.com/lambdatest/") {
            facebookPage = pages[index]
        }
    }

    const text = await facebookPage.textContent("//h1");
    console.log(text);
    */

    // await pages[1].fill("","") //interact with specific tab

    /* singleWindow
    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("//a[contains(text(),'Follow On Twitter')]")
    ]);

    console.log(newWindow.url());
    // newWindow.fill("",""); //interact with new window
    */
});