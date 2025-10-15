import {Locator, Page} from "@playwright/test";
import { HelperBase } from "./helperBase";
export class NavigationPage extends HelperBase  {
readonly page: Page;
readonly formLayoutMenuItem: Locator
readonly smartTableMenuItem: Locator
readonly toasterMenuItem: Locator
readonly tooltipMenuItem: Locator
readonly datepickerPageMenuItem: Locator

    constructor(page: Page){
     super(page);

    //  this.formLayoutMenuItem = page.getByText('Form Layouts')
    //  this.datepickerPageMenuItem = page.getByText('Datepicker')
    //  this.smartTableMenuItem = page.getByText('Smart Table')
    //     this.toasterMenuItem = page.getByText('Toastr')
    //     this.tooltipMenuItem = page.getByText('Tooltip')
        
    }

    async formLayoutsPage() {
     await this.selectGroupMenuItem('Forms')
     await this.page.getByText('Form Layouts').click
     await this.waitForNumberOfSeconds(2);

    }

    // async datepickerPage() {
   
    // await this.selectGroupMenuItem('Forms')
    // await this.datepickerPageMenuItem.click()

    // }

    async smartTablePage(){
    await this.selectGroupMenuItem('Tables & Data')
    await this.smartTableMenuItem.click()


    }

    async toasterPager(){
    await this.selectGroupMenuItem('Modal & Overlays')
    await this.toasterMenuItem.click()

    }

    async tooltipPage(){
    await this.selectGroupMenuItem('Modal & Overlays')
    await this.tooltipMenuItem.click()


    }
    //collapse the group menu if it is expanded method is below 
  private async selectGroupMenuItem(groupItemTitle: string){
   const groupMenuItem = this.page.getByTitle(groupItemTitle)
   const expandedState = await groupMenuItem.getAttribute('aria-expanded')
   if (expandedState == "false")
    await groupMenuItem.click()
  }
  

}
