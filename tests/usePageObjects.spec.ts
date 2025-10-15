import {test,expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'
import {PageManager} from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'


test.beforeEach(async ({page}) => {
await page.goto('/')


})

test.only('tesing with argos ci', async({page}) => {
    const pm = new PageManager(page)
// const navigateTo = new NavigationPage(page)
 await pm.navigateTo().formLayoutsPage()
// await pm.navigateTo().datepickerPage()
 await pm.navigateTo().smartTablePage()
//  await pm.navigateTo().toasterPager() 
//  await pm.navigateTo().tooltipPage()
 
})

test('parametertized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()

//  const navigateTo = new NavigationPage(page)
  //const onFormLayoutsPage = new FormLayoutsPage(page)

await pm.navigateTo().formLayoutsPage()
await pm.onFormLayoutsPage().submitUsingTheGridFormwithCredentialsAndSelectionOption('test@test.com','welcome1','Option 1')
await pm.onFormLayoutsPage().submitInlineFormwithNameEmailAndCheckbox(randomFullName,'Johns@test.come',true)

})
