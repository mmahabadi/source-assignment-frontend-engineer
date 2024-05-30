import { test, expect } from '@playwright/test';

test('Cultivations load items', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h3').innerText()).toContain('Cultivations');

  await page.waitForSelector('button:has-text("Manage team")');
  const listItems = await page.locator('button:has-text("Manage team")').all();

  await expect(listItems.length).toBe(7);
});
test('Cultivations add new item', async ({ page }) => {
  await page.goto('/');

  await page.click('button:has-text("Add new")');

  await expect(page).toHaveURL('http://localhost:4200/cultivations/new');
  expect(await page.locator('h4').innerText()).toContain('Add New Cultivation');

  await page.click('button:has-text("Save")');
  const validationErrorDiv = page.getByRole('alert');
  await expect(validationErrorDiv).toHaveText(
    'Validation Error:Validation Error: Name is required.'
  );
  await page.fill('input', 'New Cultivation');
  await page.click('button:has-text("Save")');
  await expect(page).toHaveURL('http://localhost:4200/cultivations/');
});
