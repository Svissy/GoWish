import { test as base } from '@playwright/test';
import { WishlistPage } from '../pageObjects/documents/wishlistPage';
import * as Constants from '../constants/constants';

type AppFixtures = {
    wishlistPage: WishlistPage;
};

export const test = base.extend<AppFixtures>({
    wishlistPage: async ({ page }, use) => {
        const wishlistPage = new WishlistPage(page);
        await page.goto(Constants.overviewUrl);
        await use(wishlistPage);
    },
});

export { expect } from '@playwright/test';
