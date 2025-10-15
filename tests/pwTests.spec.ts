import {test,expect} from 'playwright/test'

test.beforeEach(async ({page})=>{
   await page.goto('/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()


})

test('Basic form fill', async ({page})=>{
    
   //await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()
   const basicform = page.locator('nb-card').filter({hasText:"Basic form"})
    await basicform.getByRole('textbox',{name:'Email'}).fill('test@test.com')
    await basicform.getByRole('textbox',{name:'Password'}).fill('welcome123')
    await page.getByText('Check me out').click()
    await page.locator('button.status-danger').click();
    
   //await page.locator['placeholder="name")']// using css locator for placeholder


})