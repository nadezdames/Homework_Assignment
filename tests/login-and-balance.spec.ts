import { test, expect } from '@playwright/test';



const BASE_URL = 'https://swaper.com/en';
const EMAIL = 'testuser@qa.com';
const PASSWORD = 'Parole123';

test.describe('Login & Balance', () => {

    test('check balance', async ({ page }) => {

        // Go to homepage
        await page.goto(BASE_URL);
        await expect(page, { message: 'Expected the page URL to be correct, but it is not' }).toHaveURL(BASE_URL);

        // Accept cookies
        await page.getByRole('button', { name: 'Allow all cookies' }).click();

        // Navigate to login
        await page.getByText('Log In', { exact: true }).nth(0).click();

        // Fill in login form
        await page.getByRole('textbox', { name: 'E-mail' }).click();
        await page.getByRole('textbox', { name: 'E-mail' }).fill(EMAIL);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);

        // Submit login (should be clicked only after entering email and password)
        await page.locator('#login-view').getByText('Log In').click();

        // Assert that balance shows 0 €
        await expect(page.locator('#add-funds .title').nth(0)).toContainText('0 €');

    })

})