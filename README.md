# A11y Engineering Toolkit

Accessibility engineering work — modules, AI integrations, CLI testing, screen-reader tooling, and education. This repo is the public entry point to the portfolio.

Public page: <https://elizabeth1979.github.io/a11y-engineering-toolkit/>

## Portfolio map

| Category                 | Repo                                                                                    | What it does                                                    | Status      |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| **Tools**                | [`a11y-engineering-toolkit`](https://github.com/Elizabeth1979/a11y-engineering-toolkit) | Audit panel + UX widget (this repo)                             | Production  |
|                          | [`screen-reader-cli`](https://github.com/Elizabeth1979/screen-reader-cli)               | CLI: scan, live SR, audit, test generation                      | Production  |
|                          | [`clip-to-ticket`](https://github.com/Elizabeth1979/clip-to-ticket)                     | Recordings → WCAG-compliant tickets                             | v1.5.0      |
| **AI / Agents**          | [`a11y-expert-mcp`](https://github.com/Elizabeth1979/a11y-expert-mcp)                   | MCP server for AI assistants — 4 tools, 33 ARIA patterns (PyPI) | v0.1.0      |
|                          | [`a11y-skills`](https://github.com/Elizabeth1979/a11y-skills)                           | Canonical ARIA pattern instruction files                        | Active      |
|                          | [`visua11y`](https://github.com/Elizabeth1979/visua11y)                                 | AI accessibility Chrome extension                               | WIP         |
| **Testing / Simulation** | [`sr-visualizer`](https://github.com/Elizabeth1979/sr-visualizer)                       | Screen reader simulation in the browser                         | WIP         |
| **Education**            | [`a11y-for-feds-intro`](https://github.com/Elizabeth1979/a11y-for-feds-intro)           | Developer workshop — 165 slides with visual simulations         | Educational |

Full inventory with repo relationships, historical work, and mapping model: [`docs/portfolio-inventory.md`](docs/portfolio-inventory.md).

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

- `a11y-engineering-toolkit` is the umbrella repo and public entry point
- `a11y-expert-mcp` stays its own repo and is linked as a toolkit module repo
- `a11y-skills` stays its own repo as the canonical source for ARIA pattern instruction files

Not every repo in the portfolio needs to be physically merged here. The default is link first, merge later only if there is a real benefit.

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
