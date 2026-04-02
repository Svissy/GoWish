import { Page } from '@playwright/test';
import { ElementHelper } from '../../helpers/ElementHelper';

export class LoginPage {
    readonly page: Page;
    element: ElementHelper;

    constructor(page: Page) {
        this.page = page;
        this.element = new ElementHelper(page);
    }

    async login(email: string, pass: string) {
        await this.page.goto('https://onskeskyen.dk/da');
        try {
            await this.element.clickButton(/Accept Only Neccessary/i);
        } catch (e) {
            console.log('Cookie banner not found');
        }
        await this.element.clickButton('Log ind');
        await this.element.clickButton(/FORTSÆT MED E-MAIL/i);
        await this.element.fillField('input[data-cy="signupEmailInput"]', email);
        await this.element.fillField('input[data-testid="loginPasswordInput"]', pass);
        await this.element.clickButton('Log ind', 1);
    }
}
