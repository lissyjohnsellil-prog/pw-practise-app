
import {test} from '@playwright/test'


test.beforeEach(async({page}) => { //beforeeach is hook that runs before each test in the file
await page.goto('http://localhost:4200/')

})


test.describe('suite1', () => { // we can use describe.only or describle.skip to run only this suite or skip this suite
test.beforeEach(async({page}) => { 
await page.getByText('Charts').click()

})

test('the first test', async({page}) => {
    await page.getByText('Form Layouts').click()

})

test('navigate to datepicker page', async({page}) =>{
    await page.getByText('Datepicker').click()
})
})
//another suite


test.describe ('suite1', () => {
test.beforeEach(async({page}) => { 
await page.getByText("Forms").click()

})

test('the first test1', async({page}) => {
    await page.getByText("Form Layouts").click()

})

test('navigate to datepicker page1', async({page}) => {
    await page.getByText('Datepicker').click()
})
})
//test.afterEach() // afterEach is a hook that runs after each test in the file
//test.afterAll(() =>{ // afterAll is a hook that runs once after all tests in the file and try not use these both  hooks as they are not needed in most cases
