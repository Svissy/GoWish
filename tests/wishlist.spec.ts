import { test, expect } from '../support/fixtures';
import * as Constants from '../support/constants/constants';

test.describe('Wishlist management', () => {
    test.setTimeout(60000);

    test('Verify wishlist creation modal displays with default state', async ({ wishlistPage, page }) => {
        await wishlistPage.openModal();
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('dialog')).toContainText(Constants.modalTitle);
        await expect(page.getByTestId(Constants.personalType)).toBeVisible();
        await expect(page.getByTestId(Constants.sharedType)).toBeVisible();
        await expect(page.getByTestId(Constants.onBehalfType)).toBeVisible();
        await expect(page.getByRole('button', { name: Constants.createButtonText })).toBeVisible();
        await expect(page.getByTestId(Constants.nameInput)).toHaveValue(Constants.defaultPersonalName);
        await expect(page.getByRole('dialog')).toHaveScreenshot('wishlist-modal.png', {
            maxDiffPixels: 50,
            mask: [page.locator('.ant-modal-wrap')],
        });
    });

    test('Verify action button updates when switching wishlist types', async ({ wishlistPage, page }) => {
        await wishlistPage.fillWishlistName();
        await page.getByTestId(Constants.sharedType).click();
        await expect(page.getByRole('button', { name: Constants.sharedButtonText })).toBeVisible();
        await page.getByTestId(Constants.onBehalfType).click();
        await expect(page.getByRole('button', { name: Constants.onBehalfButtonText })).toBeVisible();
        await page.getByTestId(Constants.personalType).click();
        await expect(page.getByTestId(Constants.personalType)).toContainText(/Til mig/i);
    });

    test('Verify wishlist is created successfully and redirects to overview', async ({ wishlistPage, page }) => {
        await wishlistPage.submitCreation();
        await expect(page).toHaveURL(/.*overview/);
        await expect(page.getByRole('dialog')).not.toBeVisible();
        await expect(page.getByText(wishlistPage.lastCreatedName)).toBeVisible();
    });
});
