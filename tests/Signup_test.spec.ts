import { test, expect } from '@playwright/test';

test('Bookr customer sign-up journey', async ({ page }) => {
 
  await page.goto('https://www.bookr.co');
  await page.getByRole('navigation').getByRole('link', { name: 'For customers' }).click();
  await page.waitForURL('**/customers');

 
  await page.locator('a[href="/contact-us"]').first().click();
  await page.waitForURL('**/contact-us');

  
  await expect(page.getByText('Want to try Bookr?')).toBeVisible();

  const form = page.locator('form');

 
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Full Name' }) })
    .locator('input')
    .fill('Eman Ahmed');

 
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Phone' }) })
    .locator('input')
    .fill('33123456');

  
  const typeField = form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Business Or Customer' }) });

  await typeField.locator('[role="combobox"], .MuiSelect-select, input').first().click();
  await page.getByRole('option', { name: /customer/i }).click();

  
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Additional comments' }) })
    .locator('textarea')
    .first()
    .fill('Automated test for customer registration.');

  
  const submitBtn = page.getByRole('button', { name: /submit/i });
  await expect(submitBtn).toBeEnabled();

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.request().method() === 'POST'),
    submitBtn.click(),
  ]);

  
  expect(response.ok()).toBeTruthy();
});