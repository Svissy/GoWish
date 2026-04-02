import { Page, Locator } from '@playwright/test';

export class ElementHelper {
    constructor(private readonly page: Page) {}

    locatorByTestId(testId: string): Locator {
        return this.page.locator(`[data-testid="${testId}"]`);
    }

    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 15000 });
        await locator.click();
    }

    async clickButton(text: string | RegExp, index: number = 0): Promise<void> {
        const button = this.page.getByRole('button', { name: text }).nth(index);
        await button.waitFor({ state: 'visible', timeout: 15000 });
        await button.click();
    }

    async textField(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'attached', timeout: 15000 });
        await locator.fill(value, { force: true });
    }

    async fillField(selector: string, value: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'attached', timeout: 15000 });
        await locator.fill(value);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}
