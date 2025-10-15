import {test,expect} from '@playwright/test'


test.beforeEach(async ({page}, testInfo)=>{
 await page.goto(process.env.URL)
 await page.getByText('Button Triggering AJAX Request').click()
testInfo.setTimeout(testInfo.timeout + 2000) // it will multiple exisiting timeout in tests
})

 test('auto wait', async({page})=>{
 const successButton = page.locator('.bg-success')
// // //await successButton.click()

// // //const text = await successButton.textContent()
// // // await successButton.waitFor({state : "attached"})
// // // const text = await successButton.allTextContents()
// // // expect(text).toContain('Data loaded with AJAX get request.')
await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout: 20000}) // by default yo have 5 secs wait time
 })


test('alternative waits', async({page})=> {

const successButton = page.locator('.bg-success')
//---wait for element
//await page.waitForSelector('.bg-success')


//__ wait for particular responce api responce
await page.waitForResponse('http://uitestingplayground.com/ajaxdata')


//__wait for network calls to be completed(' NOT RECOMMENDED)
await page.waitForLoadState('networkidle') // untill all api calls network is idle it will wait

await page.waitForTimeout(5000) // hardcoded wait api 


const text = await successButton.allTextContents()
expect(successButton).toHaveText('Data loaded with AJAX get request.')

})


test.skip('timeouts', async({page})=>{
 test.setTimeout(10000)
 test.slow()
    const successButton = await page.locator('.bg-success')
    await successButton.click()



    //await successButton.click({timeout:18000}) // default is 30 secs 
 

})
