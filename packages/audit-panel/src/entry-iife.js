/**
 * IIFE entry point — bundles the audit panel + CSS for browser use.
 * Exposes globalThis.A11yToolkit.initA11yAudit / destroyA11yAudit.
 */
import { initA11yAudit, destroyA11yAudit } from './index.js';

// Inject styles into <head> at load time
import cssText from './styles.css';

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = cssText;
  document.head.appendChild(style);
}

// Expose on global
globalThis.A11yToolkit = globalThis.A11yToolkit || {};
globalThis.A11yToolkit.initA11yAudit = initA11yAudit;
globalThis.A11yToolkit.destroyA11yAudit = destroyA11yAudit;

// Auto-init when loaded via bookmarklet
if (typeof document !== 'undefined') {
  initA11yAudit();
}
