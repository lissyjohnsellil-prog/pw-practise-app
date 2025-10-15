import {test} from '../test-options'


import {faker} from '@faker-js/faker'


test('parametertized methods', async({pageManager}) => {
   
    const randomFullName = faker.person.fullName()


await pageManager.onFormLayoutsPage().submitUsingTheGridFormwithCredentialsAndSelectionOption('test@test.com','welcome1','Option 1')
await pageManager.onFormLayoutsPage().submitInlineFormwithNameEmailAndCheckbox(randomFullName,'Johns@test.come',true)

})
