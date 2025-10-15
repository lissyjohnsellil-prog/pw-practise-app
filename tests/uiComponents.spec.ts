import {test,expect} from '@playwright/test'
import { using } from 'rxjs'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

//test.describe.configure({mode: 'parallel'})
test.beforeEach(async ({page})=>{
 await page.goto('/')
})


 test.describe('Form layouts page',() =>{
    test.describe.configure({retries:0})
   //test.describe.configure({mode: 'serial'})
   test.beforeEach( async({page})=> {
 await page.getByText('Forms').click()
 await page.getByText('Form Layouts').click()
    })

 test.only('input fields', async({page},testInfo)=> {
   if(testInfo.retry){
//do something if you want to clean up the code before retry 2 
   }
   
 const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox',{name : "Email"})
await usingTheGridEmailInput.fill('test2@test.com')
await usingTheGridEmailInput.clear()
await usingTheGridEmailInput.pressSequentially('test2@test.com') //, {delay : 500})// press sequentially it will create delay in keystroke
await argosScreenshot(page, "usingTheGridEmailInput");

//generic assertion
const inputValue = await usingTheGridEmailInput.inputValue()
expect(inputValue).toEqual('test2@test.com')
await page.screenshot({path: 'screenshots/formslayoutspage.png'}) //screenshots
await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox',{name : "Email"})//.screenshot({path: 'screenshots/usingthegridemailinput.png'})
//const buffer = await page.screenshot()
await argosScreenshot(page, "input fields");
//console.log(buffer.toString('base64'))

//locator assertion

await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

 })

test.skip('radio buttons', async({page})=>{
const usingTheGridForm = page.locator('nb-card', {hasText:"Using the Grid"})

//await usingTheGridForm.getByLabel('Option 1').click({force: true}) // when its visuslly hidden it will not show in click
await usingTheGridForm.getByRole('radio', {name:"Option 2"}).check({force:true})
const radioStatus = await usingTheGridForm.getByRole('radio', {name:"Option 1"}).isChecked()
await expect(usingTheGridForm).toHaveScreenshot()
// expect(radioStatus).toBeTruthy()
// await expect(usingTheGridForm.getByRole('radio', {name:"Option 1"})).toBeChecked()


// await usingTheGridForm.getByRole('radio', {name:"Option 2"}).click({force:true})
// expect(await usingTheGridForm.getByRole('radio', {name:"Option 1"}).isChecked()).toBeFalsy()
// expect(await usingTheGridForm.getByRole('radio', {name:"Option 2"}).isChecked()).toBeTruthy// not checked anymore
})
 })
test('checkboxes', async({page})=>{
 await page.getByText('Modal & Overlays').click()
 await page.getByText('Toastr').click()

await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true}) // or click () force is used to click the hidden elements
await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

//const allBoxes = page.getByRole('checkbox', {name : "Prevent arising of duplicate toast"})
const allBoxes = page.getByRole('checkbox')
 for(const box of await allBoxes.all()){
await box.uncheck({force:true})
expect(await box.isChecked()).toBeFalsy() // for uncheck we need to use falsy 



 }

})


test.skip ('lists and dropdowns', async({page})=>{
 const dropDownMenu = page.locator('ngx-header nb-select')
 await dropDownMenu.click()

 page.getByRole('list') // when the list has UL tag
page.getByRole('listitem') // when the list has LI tag

//const optionList = page.getByRole('list').locator('nb-option')
const optionList = page.locator('nb-option-list nb-option')
await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate'])
await optionList.filter({hasText: "Cosmic"}).click()
const header = page.locator('nb-layout-header')
await expect(header).toHaveCSS('background-color' ,'rgb(50, 50, 89)')

const colors = { 

   "Light" : "rgb(255, 255, 255)",
   "Dark" : "rgb(34, 43, 69)",
   "Cosmic" : "rgb(50, 50, 89)",
   "Corporate" : "rgb(255, 255, 255)"

}
await optionList.filter({hasText: "Cosmic"}).click()
for(const color in colors ){
 await optionList.filter({hasText: color}).click()
 await expect(header).toHaveCSS('background-color' , colors[color])
 if(color != "Corporate")
 await dropDownMenu.click()
}

})


test('tooltip', async({page}) => {
 await page.getByText('Modal & Overlays').click()
 await page.getByText('Tooltip').click()

 const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
 await toolTipCard.getByRole('button',{name : "Top"}).hover()

 page.getByRole('tooltip')
 const tooltip = await page.locator('nb-tooltip').textContent()
 expect(tooltip).toEqual('This is a tooltip')
})


test('dialog box' , async({page})=>{
 await page.getByText('Tables & Data').click()
 await page.getByText('Smart Table').click()
 
 page.on('dialog' , dialog =>{

   expect(dialog.message()).toEqual('Are you sure you want to delete?')
   dialog.accept() // to click ok
 })
 await page.getByRole('table').locator('tr',{hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web tables', async({page})=>{
await page.getByText('Tables & Data').click()
await page.getByText('Smart Table').click()

// 1 get the row by any test in this row
const targetRow =  page.getByRole('row' , {name : "twitter@outlook.com"})
const randomFullName = faker.person.fullName()
const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
await targetRow.locator('.nb-edit').click()

await page.locator('input-editor').getByPlaceholder('Age').clear()
await page.locator('input-editor').getByPlaceholder('Age').fill('30')
await page.locator('.nb-checkmark').click()


// 2 get the row based  on the value in the specific column
await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
await targetRowById.locator('.nb-edit').click()
await page.locator('input-editor').getByPlaceholder('First Name').clear()
await page.locator('input-editor').getByPlaceholder('First Name').fill(randomFullName)
await page.locator('input-editor').getByPlaceholder('E-mail').clear()
await page.locator('input-editor').getByPlaceholder('E-mail').fill(randomEmail)
//await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
await page.locator('.nb-checkmark').click()
await expect(targetRowById.locator('td').nth(5)).toHaveText(randomEmail)
//await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

})