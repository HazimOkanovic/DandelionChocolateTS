import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";
import { MothersDayPage } from "../pages/mothersDayPage";

type allPages = {
    homePage: HomePage;
    productPage: ProductPage;
    mothersDayPage: MothersDayPage;
};

const pages = baseTest.extend<allPages>({
    homePage:async ({page}, use) => {
        await use(new HomePage(page));
    }, 

    productPage:async ({page}, use) => {
        await use(new ProductPage(page));
    }, 

    mothersDayPage:async ({page}, use) => {
        await use(new MothersDayPage(page));
    }
});

export const test = pages;
export const expect = pages.expect;