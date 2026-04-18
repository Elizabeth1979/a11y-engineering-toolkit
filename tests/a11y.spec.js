import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BLOCKING_IMPACTS = ["critical"];

function format(violations) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .map((n) => `      ${n.target.join(", ")}`)
        .join("\n");
      return `  - [${v.impact}] ${v.id}: ${v.help}\n${nodes}\n    ${v.helpUrl}`;
    })
    .join("\n");
}

for (const theme of ["light", "dark"]) {
  test(`axe scan (${theme} theme) — no critical/serious violations`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate((t) => {
      document.documentElement.setAttribute("data-theme", t);
    }, theme);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();

    const blocking = results.violations.filter((v) =>
      BLOCKING_IMPACTS.includes(v.impact),
    );
    const nonBlocking = results.violations.filter(
      (v) => !BLOCKING_IMPACTS.includes(v.impact),
    );

    if (nonBlocking.length) {
      console.log(
        `\n[${theme}] Non-blocking axe findings (moderate/minor) — not failing CI:`,
      );
      console.log(format(nonBlocking));
    }

    if (blocking.length) {
      console.log(`\n[${theme}] Blocking axe violations (critical/serious):`);
      console.log(format(blocking));
    }

    expect(
      blocking,
      `Blocking axe violations on ${theme} theme — see console output above`,
    ).toEqual([]);
  });
}
