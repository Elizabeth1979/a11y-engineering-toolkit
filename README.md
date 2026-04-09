# A11y Engineering Toolkit

One-repo multi-module accessibility toolkit. This repo is the shared home for accessibility engineering assets that can be reused across products, demos, QA, design reviews, and AI agents.

## Current modules

- `packages/audit-panel` — floating visual accessibility audit panel
- `packages/ux-widget` — floating accessibility UX customization widget

## Repository Structure

```
packages/
  audit-panel/          # Floating a11y audit panel
  ux-widget/            # Floating a11y UX widget

docs/
  index.html            # Public toolkit page
  portfolio-inventory.md# Accessibility portfolio -> toolkit scope map
```

## Quick Start

```bash
npm install
npm test
npm run build
```

## Public page

Use the public toolkit page:

- https://elizabeth1979.github.io/a11y-engineering-toolkit/

That page is for non-developers. It lets people:

1. Drag the bookmarklet to the bookmarks bar
2. Or copy the bookmarklet into a browser bookmark
3. Run the tool on any page

## Current module APIs

### Audit Panel

```js
import { initA11yAudit, destroyA11yAudit } from './packages/audit-panel/src/index.js';
initA11yAudit();
destroyA11yAudit();
```

| Export | Description |
|---|---|
| `initA11yAudit(options?)` | Create and mount the panel. Options: `{ container: HTMLElement }` |
| `destroyA11yAudit()` | Remove the panel and clean up overlays |

### UX Widget

```js
import { initA11yWidget, destroyA11yWidget } from './packages/ux-widget/src/index.js';
initA11yWidget();
destroyA11yWidget();
```

## Build + hosting

1. Run `npm run build`
2. The build copies public files into `docs/`
3. GitHub Pages serves the browser bundles
4. Testers use the public page and do not need to build anything

## Accessibility portfolio inventory

The toolkit now explicitly covers Elli's accessibility portfolio work.

Inventory file:

- `docs/portfolio-inventory.md`

Current in-scope portfolio items include:

- `a11y-expert-mcp`
- `a11y-skills`
- `accessibility-validator`
- `clip-to-ticket`
- `sr-visualizer`
- `visua11y`
- `a11y-first-ext`
- `accessible-search`
- `wcag-alt-generator`
- `alt-generation-claude`
- `a11y-for-feds-intro`
- `a11y-interactions`
- `a11y-html-aria`
- `a11y-memory-game`

Not all of these need to be physically moved into this repo immediately. Some are best treated first as:

- reference implementations
- research inputs
- training content
- future modules

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
