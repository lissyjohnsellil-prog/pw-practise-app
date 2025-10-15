import {test,expect} from '@playwright/test'


test.beforeEach(async({page})=>{
 await page.goto("https://google.com")
 



})


test('hellow', async({page})=> {
const google = await page.getByRole('textbox',{name:"Search"})
await google.fill("Jesus")
await page.keyboard.press('Enter')

})