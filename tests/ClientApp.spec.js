const {test, expect} = require('@playwright/test');


// test('Login Test', async({page})=>
// {
 
//     //const page = await context.newPage();

//     const firstName = page.locator("#firstName");
//     const lastName = page.locator("#lastName");
//     const email = page.locator("#userEmail");
//     const phoneNumber = page.locator("#userMobile");
//     const occupation =  page.locator("select[formcontrolname='occupation']");
//     const gender = page.locator('input[type="radio"][value="Female"]');
//     const password = page.locator("#userPassword");
//     const confirmPassword = page.locator("#confirmPassword");
//     const ageConfirmCheckbox = page.locator("[type='checkbox']");
//     const submitButton = page.locator("#login");

//     await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
//     console.log(await page.title());
//     await firstName.fill("Mary");
//     await lastName.fill("Jordan");
//     await email.fill("mary.jordantest@yahoo.com");
//     await phoneNumber.fill("5246859456");

//     await expect(occupation).toBeEnabled();               // ensure dropdown is enabled
//     await occupation.selectOption({ label: "Student" });  // select by label instead of value "2"
//     await gender.check();

//     await password.fill("Password@123");
//     await confirmPassword.fill("Password@123");
//     await ageConfirmCheckbox.check();
//     await submitButton.click();


// });

test.only('Client App login', async({page})=>{


    const email = "mary.jordantest@yahoo.com"
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    await page.locator("#userEmail").fill("mary.jordantest@yahoo.com");
    await page.locator("#userPassword").fill("Password@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

 
    const count = await products.count();
    for(let i= 0; i<count; i++) {

        if(await products.nth(i).locator("b").textContent()=== productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("ind",{delay:150});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId =await page.locator(" .em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    })

