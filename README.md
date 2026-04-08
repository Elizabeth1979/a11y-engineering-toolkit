# A11y Engineering Toolkit

Standalone accessibility audit tools, extracted from the Hermes dashboard.

## Audit Panel

A floating panel with 10 audit tools: Headings, Landmarks, Alt Text, Interactive Labels, Hidden Elements, Tab Order, Contrast, Focus Indicators, ARIA Validation, and Form Labels.

### Quick Start

```js
import { initA11yAudit, destroyA11yAudit } from './src/audit-panel/index.js';

// Mount into document.body (default)
initA11yAudit();

// Or mount into a specific container
initA11yAudit({ container: document.getElementById('my-root') });

// Tear down when done
destroyA11yAudit();
```

Include the CSS on your page:

```html
<link rel="stylesheet" href="./src/audit-panel/styles.css">
```

### API

| Export | Description |
|---|---|
| `initA11yAudit(options?)` | Create and mount the panel. Options: `{ container: HTMLElement }` |
| `destroyA11yAudit()` | Remove the panel and clean up overlays |

### Tests

```bash
npm install
npm test
```

Uses Vitest + jsdom. Tests cover: init/destroy lifecycle, toggle/close behavior, double-init guard, tool rendering, headings/landmarks/alt-text runners.

### No Hermes Dependencies

This module has zero dependency on Hermes dashboard globals (`window.__a11yTesterInit`, `#a11y-widget-btn`, etc.). It works on any page.

## License

MIT
