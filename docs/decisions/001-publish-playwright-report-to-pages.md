# 001 — Publish Playwright report to GitHub Pages

**Date:** 2026-04-19
**Status:** Accepted

## Context

The CI workflow runs Playwright + axe-core against `docs/index.html` and produces an HTML report in `playwright-report/`. The report shows full test results, console logs (including axe findings), traces, and screenshots — it's the richest view of what CI actually saw.

GitHub Actions only exposes workflow outputs as **artifact downloads** (zipped). There is no way to open an artifact's HTML in the browser directly — you must download it, unzip it, and open it locally. That friction means the report rarely gets looked at.

## Decision

After every CI run, the workflow copies `playwright-report/` into `docs/playwright-report/` and commits the change back to `main`. GitHub Pages republishes automatically.

The live URL is always:

**<https://elizabeth1979.github.io/a11y-engineering-toolkit/playwright-report/>**

No download, no unzip — one click to view the latest run.

## Alternatives considered

### Use `actions/upload-artifact` (status quo before this decision)

- ✅ No commit churn on `main`
- ❌ Only downloadable as zip — can't be viewed in-browser
- ❌ Users rarely look at reports because of the friction

Rejected: defeats the point of having a report.

### Migrate to Actions-based Pages deployment (`actions/deploy-pages`)

- ✅ No commit churn on `main`
- ✅ Industry-standard pattern
- ❌ Requires changing Pages settings (currently legacy source: `main /docs`)
- ❌ Bigger workflow rewrite, more moving parts

Rejected for now: higher effort for a personal-scale toolkit. Reconsider if commit noise becomes annoying.

### GitHub Step Summary (already in place, complementary)

Axe findings are also written to `$GITHUB_STEP_SUMMARY` so they render as a markdown table on the run page itself — no click-through needed for a quick check. This decision does not replace that; it adds the full Playwright report as a drill-down when needed.

## Consequences

**Positive**

- Every push produces a browsable report at a stable URL
- Axe findings visible both on the run page (quick glance) and in the full Playwright UI (deep dive)
- Works with the existing legacy Pages config — no settings change

**Negative**

- Each CI run produces an extra bot commit on `main` (`update playwright report [skip ci]`). `[skip ci]` prevents the commit from re-triggering CI.
- The committed report folder grows the repo slightly over time. The workflow overwrites in place, so the working tree stays a fixed size; only git history accumulates.

## Implementation

See `.github/workflows/ci.yml`. Relevant bits:

- `permissions: contents: write` on the `test` job so the workflow can push
- A `Publish Playwright report` step that runs with `if: always()` so reports are published even when tests fail
- The commit message ends with `[skip ci]` to prevent loops
