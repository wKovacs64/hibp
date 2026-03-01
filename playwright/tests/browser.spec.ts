import { test, expect } from "@playwright/test";

test("ESM for browsers", async ({ page }) => {
  await page.goto("/test/esm.html");

  await expect(page.getByText("success")).toBeVisible();
});
