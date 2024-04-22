import { Page, Locator} from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly cartButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartButton = page.locator("//div[@class = 'thb-secondary-item-icon']");
    }
}