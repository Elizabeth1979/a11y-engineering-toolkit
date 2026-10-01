# Accessibility Portfolio Inventory

This file maps the accessibility engineering portfolio around its home, [`accessibility-evidence-engine`](https://github.com/Elizabeth1979/accessibility-evidence-engine) (AEE). Each repo's fate (keep, archive or delete) is decided in one place, AEE's [review list](https://github.com/Elizabeth1979/accessibility-evidence-engine/blob/main/docs/MASTER-PLAN.md#review-list-every-repo-in-one-place). This file says what each repo is for and, for a retired one, where its useful parts went.

## Fates

- **Home** — where the shared work lives and grows
- **Keep** — stays live: a separate product, the shared knowledge, or this portfolio page
- **Archive** — read-only once what was worth keeping is in the engine; history and links keep working
- **Delete** — nothing to keep and nothing linking to it

## Home

- `accessibility-evidence-engine`
  - Role: the tool developers run on every pull request. It checks pages with axe, by keyboard and mouse, and with a virtual screen reader; explains each finding with an `a11y-skills` pattern; suggests labelled AI fixes for review; and applies a reviewed fix and proves it with a rerun.
  - Ships as a Playwright fixture, a CLI, a GitHub Action and an MCP server.

## Kept

- `a11y-skills` — the canonical ARIA pattern files. The engine's reports link to them and its MCP `explain` tool serves them; coding agents read them directly.
- `screen-reader-cli` — a separate product for screen-reader testing, including real VoiceOver and NVDA. Its `scan` repeats the engine's Playwright + axe pipeline, so it routes through the engine later.
- `clip-to-ticket` — a separate product: recordings → WCAG-compliant tickets. Its ticket format shaped the engine's "Copy as ticket".
- `a11y-engineering-toolkit` — this repo: the audit panel, the UX widget and the public portfolio page.
- `a11y-for-feds-intro` — a developer workshop with its own purpose: fixing issues one by one.
- `bookmarklets` — visual overlays (headings, tab order, alt text, focus). The engine's report now draws the same layers.
- `visua11y`, `accessible-search`, `a11y-first-ext`, `a11y-booth-game` — not duplicates of anything the engine does (`visua11y` is a reading aid for end users, not a developer tool).

## Archive: superseded by the engine

| Repo                    | Where its useful parts went                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `accessibility-engine`  | AI providers, specialist prompts, the MCP server, apply-a-fix and the AI-sees-evidence-only guard |
| `a11y-agent`            | The Playwright fixture's automatic checkpoint and the `fail-on` threshold                         |
| `a11y-expert-mcp`       | Tool ideas, in the engine's MCP `explain` tool; its patterns were a stale copy of `a11y-skills`   |
| `sr-visualizer`         | The report's screen-reader view                                                                   |
| `wcag-alt-generator`    | Image-role classification, in the image-purpose AI specialist                                     |
| `alt-generation-claude` | Alt-text rules and prompt, in the image-purpose AI specialist                                     |

## Archive: workshop forks

- `a11y-memory-game` — the only copy of the game in this account
- `a11y-html-aria` — a workshop fork with its own build fixes
- `a11y-interactions` — a workshop fork

## Delete

- `accessibility-validator` — a hand-written checker for rules axe already covers
- `any-access` — three small scripts, all covered by `a11y-skills`

## Adjacent

- `e11i-garden` — digital garden with accessibility and web engineering writing. A public knowledge surface, not part of the tooling.
