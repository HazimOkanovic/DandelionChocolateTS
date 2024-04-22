import { expect } from "@playwright/test";
import { test } from "./baseTest";


test('Check cafe',async ({productPage, page}) => {
    await page.goto("https://www.dandelionchocolate.com/products/hot-chocolate-trio");
    let paragraphsText: string [] = [];
    for (let i = 0; i < await productPage.allParagraphs.count(); i++) {
        const element = await productPage.allParagraphs.nth(i);
        
        expect(await element).not.toContainText('Labesque')
      }
})