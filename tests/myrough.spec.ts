

// import { test, expect } from '@playwright/test';

// //1) “Open a page and assert the title”
// test.beforeEach(async ({page })=>{

//     await page.goto("http://localhost:4200")
// })
//     test('should have correct title', async ({ page }) => {

//     await expect(page).toHaveTitle('playwright-test-admin Demo Application')

// })

//Problem: Fill email and password, click Login, and assert user is redirected to dashboard.


// import {test,expect} from '@playwright/test'

// test('to fill email and password',async ({page})=>{
//   await page.goto("https://localhost:4200")
//   await page.getByText('Email').fill('lissyjohns@gmail.com')
//   await page.getByLabel('password').fill('welcome123')
//   await page.getByRole('button',{name:'submit'})
//   await expect(page).toHaveTitle('welcome')
     
//   await page.getByPlaceholder('test').fill('test@test.com')

// })


//Check / Uncheck a checkbox and assert”

// import {test,expect} from '@playwright/test'

// // test('check and uncheck', async({page})=> {
// //  await page.goto("https://localhost.com")
// //  const cb = page.getByLabel("subscribe to my channel")
// //  await cb.check()
// //  await expect(cb).toBeChecked()
// //  await cb.uncheck
// //  await expect(cb).not.toBeChecked()

// // })



import {test,expect} from '@playwright/test'

test("assertions ", async({page})=>{
await page.goto('https://google.com')

const jesus = await page.locator('.gLFyf')
await jesus.fill("jesus")
await expect(jesus).toHaveValue("jesus")
await page.getByText('Google Search').first().click()
})


// import {test,expect} from '@playwright/test'

// test.beforeEach(async ({page})=>{
//     await page.goto("https://gmail.com")
//     await page.getByRole('textbox' , {name : "email"}).fill("lissy.johns@gmail.com")
//     await page.getByPlaceholder("password").fill("password")
//     await page.locator('.shape').click()
//     await page.locator('#id').click()
    

//     const email = page.getByRole('textbox' , {name : "email"}).fill("lissy.johns@gmail.com")

//     await expect(email).toEqual("email")

    





