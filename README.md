# A11y Engineering Toolkit

Accessibility engineering work — modules, AI integrations, CLI testing, screen-reader tooling, and education. This repo is the public entry point to the portfolio.

Public page: <https://elizabeth1979.github.io/a11y-engineering-toolkit/>

## Portfolio map

The home of the work is [`accessibility-evidence-engine`](https://github.com/Elizabeth1979/accessibility-evidence-engine) (AEE): the tool developers run on every pull request. The other repos either stay as separate products and knowledge, or are archived or deleted once what was worth keeping moved into the engine. Each repo's fate is decided in one place, AEE's [review list](https://github.com/Elizabeth1979/accessibility-evidence-engine/blob/main/docs/MASTER-PLAN.md#review-list-every-repo-in-one-place), which says why.

| Repo | What it does | Fate |
| --- | --- | --- |
| [`accessibility-evidence-engine`](https://github.com/Elizabeth1979/accessibility-evidence-engine) | Finds accessibility issues on every pull request by axe, keyboard, mouse and a virtual screen reader, suggests labelled AI fixes, applies a reviewed fix and proves it | **Home** |
| [`a11y-skills`](https://github.com/Elizabeth1979/a11y-skills) | The ARIA pattern files the engine's reports and coding agents read | Keep |
| [`screen-reader-cli`](https://github.com/Elizabeth1979/screen-reader-cli) | Screen-reader testing from the command line, including real VoiceOver and NVDA | Keep: separate product |
| [`clip-to-ticket`](https://github.com/Elizabeth1979/clip-to-ticket) | Recordings → WCAG-compliant tickets | Keep: separate product |
| [`a11y-engineering-toolkit`](https://github.com/Elizabeth1979/a11y-engineering-toolkit) | Audit panel, UX widget and this portfolio page | Keep |
| [`a11y-for-feds-intro`](https://github.com/Elizabeth1979/a11y-for-feds-intro) | Developer workshop with visual simulations | Keep |
| `bookmarklets` | Visual overlays: headings, tab order, alt text, focus | Keep |
| [`visua11y`](https://github.com/Elizabeth1979/visua11y), `accessible-search`, `a11y-first-ext`, `a11y-booth-game` | Not duplicates of anything the engine does (`visua11y` is a reading aid for end users) | Keep |
| `accessibility-engine`, `a11y-agent`, `a11y-expert-mcp`, `sr-visualizer`, `wcag-alt-generator`, `alt-generation-claude` | Earlier attempts at parts of what the engine now does | Archive: superseded by AEE |
| `a11y-memory-game`, `a11y-html-aria`, `a11y-interactions` | Workshop forks | Archive |
| `accessibility-validator`, `any-access` | Checks that axe and `a11y-skills` already cover | Delete |

Full inventory with how each repo maps into the work: [`docs/portfolio-inventory.md`](docs/portfolio-inventory.md).

## How I work

The portfolio is the output of a consistent accessibility engineering methodology:

1. **Research** — investigate a component pattern against WAI-ARIA Authoring Practices, screen reader behavior, and WCAG criteria
2. **Guideline** — document the accessible contract for the component (roles, states, keyboard, focus, announcements)
3. **Audit** — automated testing (axe, Vitest + RTL, Playwright) + manual SR verification
4. **Triage** — violations go through a gatekeeper process: WCAG criterion, steps to reproduce, expected/actual, acceptance criteria
5. **Fix + regression test** — layered tests lock in the fix

The open-source tools in this portfolio instrument each step. The internal guidelines, violation taxonomy, and decision log that drive the methodology live in a private vault.

## Current modules in this repo

- `packages/audit-panel` — floating visual accessibility audit panel
- `packages/ux-widget` — floating accessibility UX customization widget

### Repository structure

```
packages/
  audit-panel/           # Floating a11y audit panel
  ux-widget/             # Floating a11y UX widget
docs/
  index.html             # Public toolkit page
  portfolio-inventory.md # Full portfolio → toolkit scope map
```

### Quick start

```bash
npm install
npm test
npm run build
```

### Public page

<https://elizabeth1979.github.io/a11y-engineering-toolkit/> — for non-developers:

1. Drag the bookmarklet to the bookmarks bar
2. Or copy the bookmarklet into a browser bookmark
3. Run the tool on any page

### Module APIs

#### Audit Panel

```js
import {
  initA11yAudit,
  destroyA11yAudit,
} from "./packages/audit-panel/src/index.js";
initA11yAudit();
destroyA11yAudit();
```

| Export                    | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| `initA11yAudit(options?)` | Create and mount the panel. Options: `{ container: HTMLElement }` |
| `destroyA11yAudit()`      | Remove the panel and clean up overlays                            |

#### UX Widget

```js
import {
  initA11yWidget,
  destroyA11yWidget,
} from "./packages/ux-widget/src/index.js";
initA11yWidget();
destroyA11yWidget();
```

### Build + hosting

1. Run `npm run build`
2. The build copies public files into `docs/`
3. GitHub Pages serves the browser bundles
4. Testers use the public page and do not need to build anything

## Architecture rule

- `accessibility-evidence-engine` is the home: the tool developers run, where checks, AI suggestions and fixes live
- `a11y-engineering-toolkit` is the public entry point and portfolio page
- `a11y-skills` stays its own repo as the canonical source for ARIA pattern instruction files

Separate products stay separate. A repo is archived only once what was worth keeping from it is in the engine.

## Operating rule

Anything primarily about accessibility engineering should be represented here as one of:

- module
- workflow
- prompt or skill
- reference implementation
- docs
- research input

## Tests

Uses Vitest + jsdom. Current tests cover the audit panel and UX widget packages plus build output validation.

## License

MIT
