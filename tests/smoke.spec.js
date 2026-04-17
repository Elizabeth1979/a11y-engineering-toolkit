import { test, expect } from "@playwright/test";

test.describe("docs/index.html smoke", () => {
  test("page loads with data-theme set to light or dark", async ({ page }) => {
    await page.goto("/");
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(["light", "dark"]).toContain(theme);
  });

  test("clicking #theme-light sets light theme and aria-pressed", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click("#theme-light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("#theme-light")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("#theme-dark")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("clicking #theme-dark sets dark theme and aria-pressed", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click("#theme-dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("#theme-dark")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("#theme-light")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("theme persists across reload via localStorage", async ({ page }) => {
    await page.goto("/");
    await page.click("#theme-dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored).toBe("dark");
  });

  test("clicking #showAudit injects audit panel script and sets __a11yLoaded", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click("#showAudit");
    await expect
      .poll(() => page.evaluate(() => window.__a11yLoaded === true))
      .toBe(true);
  });

  test("clicking #showWidget injects UX widget script and sets __uxWidgetLoaded", async ({
    page,
  }) => {
    await page.goto("/");
    await page.click("#showWidget");
    await expect
      .poll(() => page.evaluate(() => window.__uxWidgetLoaded === true))
      .toBe(true);
  });

  test('clicking #copyAudit copies bookmarklet code starting with "javascript:"', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await expect
      .poll(() => page.locator("#auditCode").inputValue())
      .toMatch(/^javascript:/);
    await page.click("#copyAudit");
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toMatch(/^javascript:/);
  });

  test('#dragAudit textContent is "A11y Audit Panel"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#dragAudit")).toHaveText("A11y Audit Panel");
  });

  test('#dragWidget textContent is "A11y UX Widget"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#dragWidget")).toHaveText("A11y UX Widget");
  });

  test("clicking #copyAudit does not scroll to top (regression guard)", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await expect
      .poll(() => page.locator("#auditCode").inputValue())
      .toMatch(/^javascript:/);
    await page.locator("#copyAudit").scrollIntoViewIfNeeded();
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBeGreaterThan(100);
    await page.click("#copyAudit");
    const after = await page.evaluate(() => window.scrollY);
    expect(after).toBeGreaterThan(100);
  });
});
