import {test} from 'playwright/test'

test.beforeEach( async ({page} )=> {
await page.goto("https://accounts.google.com/signin/v2/identifier?service=mail")

await page.getByRole('link', { name: 'Open the Sign into Gmail page in a new tab' }).click()


// await page.getByRole('button', {name:"Sign in"}).click()
// await page.waitForSelector('#identifierId', { state: 'visible' }); //After clicking Sign in, the page navigates to Google Accounts. Wait for the field to be ready.

})

test('enter the credentials or just click', async ({page})=> {

  //await page.locator('input[type="email")').fill('lissyjohns93@gmail.com')
 await page.locator('#identifierId').fill('lissyjohns@gmail.com')

  //await page.locator('[name="identifier",').fill('lissyjohns@gmail.com')


// await page.getByRole('textbox',{name:"email"})

})