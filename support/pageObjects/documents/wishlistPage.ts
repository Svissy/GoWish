import { Page } from '@playwright/test';
import { ElementHelper } from '../../helpers/ElementHelper';
import * as Constants from '../../constants/constants';

export class WishlistPage {
    private readonly element: ElementHelper;
    public lastCreatedName: string = '';

    constructor(private readonly page: Page) {
        this.element = new ElementHelper(page);
    }

    async openModal(): Promise<void> {
        const plusButton = this.element.locatorByTestId(Constants.plusButton).last();
        await this.element.click(plusButton);
    }

    async fillWishlistName(name?: string): Promise<void> {
        await this.openModal();
        this.lastCreatedName = name ?? `AutoTest_${Date.now()}`;
        await this.element.textField(
            this.element.locatorByTestId(Constants.nameInput),
            this.lastCreatedName
        );
    }

    async submitCreation(): Promise<void> {
        await this.fillWishlistName();
        await this.element.click(this.element.locatorByTestId(Constants.submitButton));
        await this.page.waitForURL(Constants.overviewUrl);
    }
}
