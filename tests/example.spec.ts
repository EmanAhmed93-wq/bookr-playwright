import { test, expect } from '@playwright/test';

test('Bookr customer sign-up journey', async ({ page }) => {
  // 1. فتح الموقع والانتقال لصفحة الكستمرز
  await page.goto('https://www.bookr.co');
  await page.getByRole('navigation').getByRole('link', { name: 'For customers' }).click();
  await page.waitForURL('**/customers');

  // 2. الضغط على زر Start free trial للوصول لصفحة التسجيل (/contact-us)
  await page.locator('a[href="/contact-us"]').first().click();
  await page.waitForURL('**/contact-us');

  // 3. التأكد من ظهور عنوان الصفحة
  await expect(page.getByText('Want to try Bookr?')).toBeVisible();

  const form = page.locator('form');

  // 4. تعبئة حقل Full Name
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Full Name' }) })
    .locator('input')
    .fill('Eman Ahmed');

  // 5. تعبئة حقل Phone (8 أرقام لرقم بحريني تجريبي)
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Phone' }) })
    .locator('input')
    .fill('33123456');

  // 6. اختيار Customer من القائمة المنسدلة (Business Or Customer)
  const typeField = form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Business Or Customer' }) });

  await typeField.locator('[role="combobox"], .MuiSelect-select, input').first().click();
  await page.getByRole('option', { name: /customer/i }).click();

  // 7. تعبئة الملاحظات الإضافية
  await form
    .locator('div')
    .filter({ has: page.locator('label', { hasText: 'Additional comments' }) })
    .locator('textarea')
    .first()
    .fill('Automated test for customer registration.');

  // 8. التأكد أن زر Submit مفعّل ثم الضغط عليه وانتظار استجابة الإرسال
  const submitBtn = page.getByRole('button', { name: /submit/i });
  await expect(submitBtn).toBeEnabled();

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.request().method() === 'POST'),
    submitBtn.click(),
  ]);

  // التحقق أن طلب الإرسال رجع بحالة ناجحة (2xx)
  expect(response.ok()).toBeTruthy();
});