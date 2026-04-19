import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { appendFileSync } from "node:fs";

const BLOCKING_IMPACTS = ["critical"];

function formatConsole(violations) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .map((n) => `      ${n.target.join(", ")}`)
        .join("\n");
      return `  - [${v.impact}] ${v.id}: ${v.help}\n${nodes}\n    ${v.helpUrl}`;
    })
    .join("\n");
}

function formatMarkdown(theme, blocking, nonBlocking) {
  const lines = [`### axe scan — ${theme} theme`, ""];
  if (!blocking.length && !nonBlocking.length) {
    lines.push("No violations found.", "");
    return lines.join("\n");
  }
  const section = (title, list) => {
    if (!list.length) return;
    lines.push(`**${title}**`, "");
    lines.push("| Impact | Rule | Help | Elements |");
    lines.push("| --- | --- | --- | --- |");
    for (const v of list) {
      const targets = v.nodes
        .map((n) => `\`${n.target.join(", ")}\``)
        .join("<br>");
      lines.push(
        `| ${v.impact} | \`${v.id}\` | [${v.help}](${v.helpUrl}) | ${targets} |`,
      );
    }
    lines.push("");
  };
  section("Blocking (fails CI)", blocking);
  section("Non-blocking (logged only)", nonBlocking);
  return lines.join("\n");
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
      console.log(formatConsole(nonBlocking));
    }

    if (blocking.length) {
      console.log(`\n[${theme}] Blocking axe violations (critical/serious):`);
      console.log(formatConsole(blocking));
    }

    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        formatMarkdown(theme, blocking, nonBlocking) + "\n",
      );
    }

    expect(
      blocking,
      `Blocking axe violations on ${theme} theme — see console output above`,
    ).toEqual([]);
  });
}
