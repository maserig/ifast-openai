import { test, expect } from '@playwright/test';

test('marketing page shows sign-in button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Continuar con Google/i })).toBeVisible();
});