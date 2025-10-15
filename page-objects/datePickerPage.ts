import { Page,expect } from "@playwright/test";

export class DatepickerPage{
private readonly page: Page

constructor(page: Page){
    this.page = page;
}


async selectCommonDatePickerDateFromToday(daysFromToday: number){
 const calendarInputField = this.page.getByPlaceholder('Form Picker')

 await calendarInputField.click()

 let date = new Date()
date.setDate(date.getDate()+ numberOfDaysFromToday) 
const expectedDate = date.getDate().toString()
const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
const expectedYear = date.getFullYear()
const dateToAssert = '${expectedMonthShot} ${expectedDate}, ${expectedYear}'

let calenderMonthAndYear = await this.page.locator('.calendar-header').textContent()
const expectedMonthAndYear = '${expectedMonthLong} ${expectedYear}'
while(!calenderMonthAndYear.includes(expectedMonthAndYear)){
 await this.page.locator('nb-calendar-navigation [data-name="chevron-right"]').click()
 calenderMonthAndYear = await this.page.locator('nb-calender-view-mode').textContent()
}
await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()

await expect(calendarInputField).toHaveValue(dateToAssert)
}
}