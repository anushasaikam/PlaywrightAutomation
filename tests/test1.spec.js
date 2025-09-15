// Run: npx playwright test  OR  npx playwright test tests/test1.spec.js
const {test, expect} = require('@playwright/test');

test('First playwright Test' , async ({browser}) =>
{

     const context = await browser.newContext();
     const page = await context.newPage();

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    await userName.fill("rahulshettyacademy"); // changed to valid username
    await password.fill("learning");
    await signInButton.click();

    console.log(await page.locator(".card-body a").first().textContent());



    //console.log(await page.locator("[style*=none]").textContent());
    //await expect(page.locator("[style*=none]")).toContainText("Incorrect");
    

});

test('UI Controls', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const documentLink = page.locator("a[href*='documents-request']");
    const roleDropdown = page.locator("select.form-control");
    await roleDropdown.selectOption("consult");

    // Use the radio input, not the label
    await page.locator("input[type='radio'][value='user']").check();
    await page.locator("#okayBtn").click();
    await expect(page.locator("input[type='radio'][value='user']")).toBeChecked();
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();

    await expect(documentLink).toHaveAttribute("class","blinkingText");


    //await page.pause();

    const signInButton = page.locator("#signInBtn");

})

test('Child Windows', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    const userName = page.locator('#username');
    const password = page.locator('#password'); 

    // page.pause(); // remove pause during normal runs

    const documentLink = page.locator("a[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());

    
})














test('Page playwright Test', async ({page})=>
{

    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});