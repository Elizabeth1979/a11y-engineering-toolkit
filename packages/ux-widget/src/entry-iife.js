/**
 * IIFE entry point — bundles the UX widget + CSS for browser use.
 * Exposes globalThis.A11yToolkit.initUxWidget / destroyUxWidget.
 */
import { initUxWidget, destroyUxWidget } from './index.js';

// Inject styles into <head> at load time
import cssText from './styles.css';

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = cssText;
  document.head.appendChild(style);
}

// Expose on global
globalThis.A11yToolkit = globalThis.A11yToolkit || {};
globalThis.A11yToolkit.initUxWidget = initUxWidget;
globalThis.A11yToolkit.destroyUxWidget = destroyUxWidget;

// Auto-init when loaded via bookmarklet
if (typeof document !== 'undefined') {
  initUxWidget();
}
