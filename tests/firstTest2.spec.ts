import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
   await page.goto('/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()

})

test('Locator syntac rules',async({page})=> {
//by Tag name

 page.locator('input')

//by ID

await page.locator('#inputEmail1').click() //# means ID //await not needed with action method like click()

//by Class value

page.locator('.shape rectage') // . means class ,# means id Finds element with class="shape".


// by attribute
 page.locator('[placeholder="Email"]')

//by Class value (full)
page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
 
//combine different selectors

page. locator ('input[placeholder="Email"][nbinput]' )
//by XPath not recommended

//page.locator('//*[@id="inputEmail1"]').click()

//by partial text match
page.locator(':text("using")')

//by exact text match
page.locator(':text("Using the Grid")')

})


test('user facing locators',async({page}) => {
await page.getByRole('textbox', {name:"Email"}).first().click()
await page.getByRole('button',{name: "Sign in"}).first().click()


await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Jane Doe').click()

await page.getByText('Using the Grid').click()
await page.getByTestId('SignIn').click() // not a user facing interaction but makes code very resilient


//await page.getByTitle('Iot Dashboard').click()


})

test('locating child elements', async({page}) =>{
 await page.locator('nb-card nb-radio :text-is("Option 1")').click() //text-is is to bne precise 
 await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() // if you want to find child element


 await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click() // when we have two buttons on the page then we say first()
 await page.locator('nb-card').nth(3).getByRole('button').click() //index starts with 0 ,try to avoid because order can be changed in ui , try to find more unique elements 
})

test('locating parent elements', async({page}) => {
 await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
 await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).click()

 await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).click()

 await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:'Password'}).click()

 await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox',{name:'Email'}).click()

 await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:'Email'}).click()
})


test('Resuing the locator', async({page})=>{
const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
const emailField = basicForm.getByRole('textbox',{name:'Email'})
await emailField.fill('test@test.com')



//await basicForm.getByRole('textbox',{name:'Email'}).fill('test@test.com')
await basicForm.getByRole('textbox',{name:'Password'}).fill('Welcome123')
await basicForm.locator('nb-checkbox').click()
await basicForm.getByRole('button').click()

await  expect(emailField).toHaveValue('test@test.com')


// await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Email'}).fill('test@test.com')
 //await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox',{name:'Password'}).fill('Welcome123')
//await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('button').click()

})

test('extracting values', async ({page}) => {
    //singe text value 
const basicForm = page.locator('nb-card').filter({hasText:"Basic form"})
const buttonText = await basicForm.locator('button').textContent() // taking the text from the button
 expect(buttonText).toEqual('Submit')


//all text values 

const allRadioButtonLabels= await page.locator('nb-radio').allTextContents() // it will grab all the values 

expect(allRadioButtonLabels).toContain("Option 1")

//input value

const emailField = basicForm.getByRole('textbox',{name: "Email"})
await emailField.fill('test@test.com')
const emailValue= await emailField.inputValue() // we have to use this method to check teh input value and validate
expect(emailValue).toEqual('test@test.com')

const placeHolderValue = await emailField.getAttribute('placeholder')
expect (placeHolderValue).toEqual('Email')

})

test('assertions', async({page})=>{
//General assertions
const basicFormbutton = page.locator('nb-card').filter({hasText:"Basic form"}).locator('button')
const value =5 
expect(value).toEqual(5)

const text = await basicFormbutton.textContent()
expect(text).toEqual("Submit")

//locator assertion 
await expect(basicFormbutton).toHaveText('Submit')
//soft assertion
await expect.soft(basicFormbutton).toHaveText("Submit5") // soft to continue the process not a good practise 
await basicFormbutton.click() //default timeout is 30 secs
})
// Auto waiting

