import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../support/pageObjects/forms/LoginPage';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate user', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await expect(page).toHaveURL(/.*overview/, { timeout: 30000 });
  await page.context().storageState({ path: authFile });
});
