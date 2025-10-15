import {test} from '@playwright/test'; 

test('the first test', async({page}) =>{ // the first test is the name of the test, {page} is the parameter that gives us access to the page object and test is the function from Playwright that allows us to define a test


   await page.goto('/')
   await page.getByText("Forms").click()
   await page.getByText("Form Layouts").click()

})

//if promises are no there then no need to use await keyword
//if we use page.goto then in goto we have promise - promise means that it will check for response success or failed and it has capability to wait for the page to load completely 
//so we can use await keyword to wait for the promise to resolve and also when await is used the async function should be used in the test function
//for a playwright command goto we should see for promise and use await keyword to wait for the promise to resolve

test('the first test2', async({page}) => { 


   await page.goto('/')
   await page.getByText("Forms").click()
   await page.getByText("Datepicker").click() // this is duplicating of code like repeating.. we can use hooks .. test.beforeEach(async ({page})

})
