# A11y Engineering Toolkit

One-repo multi-module accessibility toolkit. Each tool lives under `packages/`.

## Repository Structure

```
packages/
  audit-panel/          # Floating a11y audit panel (10 tools)
    src/index.js        # Main module source
    src/styles.css      # Panel + overlay styles
    src/entry-iife.js   # IIFE entry (auto-inits, injects CSS)
    tests/              # Vitest tests
    build.mjs           # esbuild bundler script
    dist/               # Build output (gitignored)
      audit-panel.iife.js   # Browser-ready IIFE bundle
      bookmarklet.js         # Tiny javascript: bookmarklet snippet
```

## Quick Start

```bash
npm install
npm test          # Run all tests (28 passing)
npm run build     # Build IIFE bundle + bookmarklet
```

## Audit Panel

### As ES Module

```js
import { initA11yAudit, destroyA11yAudit } from './packages/audit-panel/src/index.js';
initA11yAudit();
destroyA11yAudit();
```

### As Bookmarklet

1. Run `npm run build`
2. The build copies public files into `docs/`
3. GitHub Pages serves:
   - `https://elizabeth1979.github.io/a11y-engineering-toolkit/audit-panel.iife.js`
   - `https://elizabeth1979.github.io/a11y-engineering-toolkit/bookmarklet.js`
4. Open the Pages site and copy the bookmarklet text
5. Create a browser bookmark with that value as the URL

The bookmarklet is tiny (~300 chars) — it just injects a `<script>` tag that loads the built bundle. The bundle auto-initializes the panel and injects styles.

### API

| Export | Description |
|---|---|
| `initA11yAudit(options?)` | Create and mount the panel. Options: `{ container: HTMLElement }` |
| `destroyA11yAudit()` | Remove the panel and clean up overlays |

## Tests

Uses Vitest + jsdom. Tests cover: init/destroy lifecycle, toggle/close, tool runners, and build output validation.

## License

MIT
