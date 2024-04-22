import { Page, Locator} from "@playwright/test";

export class ProductPage{
    readonly page: Page;
    readonly allParagraphs: Locator;

    constructor(page: Page){
        this.page = page;
        this.allParagraphs = page.locator("//p");
    }
}