import {test,expect,defineConfig} from 'playwright/test'
test.use({ browserName: 'chromium', channel: 'chrome' });

test.beforeEach(async ({page})=> {
 await page.goto("https://google.com")


})

test.skip('search results for Jesus Christ ', async ({page})=>{
     await page.locator('#APjFqb').fill('Jesus Christ ')

     
     await page.getByRole('button', { name: 'Google Search' }).first().click();
await page.keyboard.press('Enter');
  await expect(page.locator('h3')).toBeVisible({ timeout: 5000 });


})