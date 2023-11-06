/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@playwright/test';
import type * as hibp from '../../src/hibp.js';

declare global {
  interface Window {
    hibp: typeof hibp;
  }
}

test('UMD', async ({ page }) => {
  await page.goto('/test/umd.html');

  expect(await page.evaluate(() => typeof window.hibp === 'object')).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.breach === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(
      () => typeof window.hibp.breachedAccount === 'function',
    ),
  ).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.breaches === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.dataClasses === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.pasteAccount === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.pwnedPassword === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(
      () => typeof window.hibp.pwnedPasswordRange === 'function',
    ),
  ).toBe(true);

  expect(
    await page.evaluate(() => typeof window.hibp.search === 'function'),
  ).toBe(true);

  expect(
    await page.evaluate(
      () => typeof window.hibp.subscriptionStatus === 'function',
    ),
  ).toBe(true);
});

test('ESM for browsers', async ({ page }) => {
  await page.goto('/test/esm.html');

  await expect(page.getByText('success')).toBeVisible();
});
