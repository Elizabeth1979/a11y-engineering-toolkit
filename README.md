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
2. Host `packages/audit-panel/dist/audit-panel.iife.js` on a server
3. Edit the URL in `packages/audit-panel/dist/bookmarklet.js` (replace `YOUR_HOST`)
4. Create a browser bookmark with the bookmarklet content as the URL
5. Click it on any page to toggle the audit panel

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
