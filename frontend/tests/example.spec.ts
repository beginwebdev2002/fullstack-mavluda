import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/admin/login');
  await expect(page).toHaveTitle('Mavluda Beauty | Medical Luxury Ecosystem');
});
