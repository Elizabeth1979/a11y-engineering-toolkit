/**
 * A11y Audit Panel — Standalone accessibility testing toolkit
 * Extracted from Hermes dashboard, no external dependencies.
 *
 * Usage:
 *   import { initA11yAudit, destroyA11yAudit } from '@a11y-toolkit/audit-panel';
 *   initA11yAudit();            // mount into document.body
 *   initA11yAudit({ container }) // mount into a specific element
 *   destroyA11yAudit();         // tear down
 */

// ---- Tool definitions ----

const TOOLS = [
  {
    id: 'headings',
    name: 'Headings Map',
    desc: 'Show heading hierarchy (H1–H6)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>',
  },
  {
    id: 'landmarks',
    name: 'Landmarks',
    desc: 'Outline page regions (nav, main, etc.)',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
  },
  {
    id: 'alt-text',
    name: 'Alt Text',
    desc: 'Check images for alt text',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
  },
  {
    id: 'labels',
    name: 'Interactive Labels',
    desc: 'Show accessible names of buttons & links',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  },
  {
    id: 'hidden',
    name: 'Hidden Elements',
    desc: 'Reveal aria-hidden & visually hidden',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  },
  {
    id: 'tab-order',
    name: 'Tab Order',
    desc: 'Visualize keyboard tab sequence',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    desc: 'Check WCAG color contrast ratios',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/></svg>',
  },
  {
    id: 'focus',
    name: 'Focus Indicators',
    desc: 'Detect missing focus styles',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>',
  },
  {
    id: 'aria',
    name: 'ARIA Validation',
    desc: 'Detect common ARIA mistakes',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  },
  {
    id: 'forms',
    name: 'Form Labels',
    desc: 'Audit form inputs for labels & ARIA',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 12h8"/><path d="M8 9v6"/></svg>',
  },
];

// ---- State ----

let _initialized = false;
let _toggleEl = null;
let _panelEl = null;
let _container = null;
let _activeTools = {};
let _overlayElements = [];

// ---- Helpers ----

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function clearOverlays() {
  _overlayElements.forEach(el => el.remove());
  _overlayElements = [];
  const overlayClasses = [
    'a11y-tester-heading-overlay', 'a11y-tester-landmark-overlay',
    'a11y-tester-img-overlay', 'a11y-tester-label-overlay',
    'a11y-tester-hidden-reveal', 'missing',
    'a11y-tester-taborder-overlay',
    'a11y-tester-contrast-overlay', 'contrast-fail',
    'a11y-tester-focus-overlay', 'focus-issue',
    'a11y-tester-aria-overlay', 'aria-error',
    'a11y-tester-form-overlay', 'form-error', 'form-warn',
  ];
  document.querySelectorAll(overlayClasses.map(c => '.' + c).join(', ')).forEach(el => {
    overlayClasses.forEach(c => el.classList.remove(c));
  });
}

function addBadge(el, text, className) {
  const badge = document.createElement('span');
  badge.className = className;
  badge.textContent = text;
  el.style.position = el.style.position || 'relative';
  el.appendChild(badge);
  _overlayElements.push(badge);
  return badge;
}

function getAccessibleName(el) {
  if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
  const lblId = el.getAttribute('aria-labelledby');
  if (lblId) {
    const parts = lblId.split(/\s+/).map(id => {
      const ref = document.getElementById(id);
      return ref ? ref.textContent.trim() : '';
    }).filter(Boolean);
    if (parts.length) return parts.join(' ');
  }
  if (el.id) {
    const label = document.querySelector(`label[for="${el.id}"]`);
    if (label) return label.textContent.trim();
  }
  if (el.title) return el.title;
  const text = el.textContent.trim();
  if (text) return text;
  const img = el.querySelector('img[alt]');
  if (img && img.alt) return img.alt;
  return '';
}

/** Check if element is inside our own panel UI */
function isOwnUI(el) {
  return el.closest('.a11y-tester-panel, .a11y-tester-toggle');
}

// ---- Tool Runners ----

function runHeadings() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const results = [];
  let lastLevel = 0;
  let issues = 0;

  headings.forEach(h => {
    if (isOwnUI(h)) return;
    const level = parseInt(h.tagName[1]);
    const text = h.textContent.trim() || '(empty)';
    const skipped = lastLevel > 0 && level > lastLevel + 1;
    if (skipped) issues++;
    if (!h.textContent.trim()) issues++;
    results.push({ level, text, skipped, empty: !h.textContent.trim() });
    h.classList.add('a11y-tester-heading-overlay');
    addBadge(h, h.tagName, 'a11y-tester-heading-badge');
    lastLevel = level;
  });

  let html = '';
  if (headings.length === 0 || results.length === 0) {
    html = '<div class="atr-summary fail">No headings found on this page</div>';
  } else {
    const status = issues > 0 ? 'warn' : 'pass';
    const msg = issues > 0
      ? `${results.length} headings, ${issues} issue${issues > 1 ? 's' : ''}`
      : `${results.length} headings — all good`;
    html = `<div class="atr-summary ${status}">${msg}</div>`;
    results.forEach(r => {
      const indent = r.level > 1 ? ` atr-indent-${Math.min(r.level - 1, 5)}` : '';
      const cls = r.skipped ? ' atr-warn' : (r.empty ? ' atr-error' : '');
      const warning = r.skipped ? ' ⚠ skipped level' : (r.empty ? ' ⚠ empty' : '');
      html += `<div class="atr-item${indent}"><span class="atr-tag">H${r.level}</span> <span class="atr-text${cls}">${esc(r.text)}${warning}</span></div>`;
    });
  }
  return html;
}

function runLandmarks() {
  const landmarkMap = {
    header: 'banner', nav: 'navigation', main: 'main',
    aside: 'complementary', footer: 'contentinfo',
    section: 'region', form: 'form',
  };
  const ariaRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'form', 'search'];
  const found = [];

  Object.keys(landmarkMap).forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      if (isOwnUI(el)) return;
      const role = el.getAttribute('role') || landmarkMap[tag];
      const label = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || '';
      if (tag === 'section' && !label && !el.getAttribute('role')) return;
      found.push({ el, role, label, tag });
    });
  });

  ariaRoles.forEach(role => {
    document.querySelectorAll(`[role="${role}"]`).forEach(el => {
      if (isOwnUI(el)) return;
      if (found.some(f => f.el === el)) return;
      const label = el.getAttribute('aria-label') || '';
      found.push({ el, role, label, tag: el.tagName.toLowerCase() });
    });
  });

  let html = '';
  if (found.length === 0) {
    html = '<div class="atr-summary fail">No landmarks found — page needs semantic structure</div>';
  } else {
    const hasMain = found.some(f => f.role === 'main');
    const status = hasMain ? 'pass' : 'warn';
    const msg = hasMain
      ? `${found.length} landmarks found`
      : `${found.length} landmarks — no <main> found`;
    html = `<div class="atr-summary ${status}">${msg}</div>`;
    found.forEach(f => {
      const labelText = f.label ? ` "${f.label}"` : '';
      html += `<div class="atr-item"><span class="atr-tag">${f.role}</span> <span class="atr-text">&lt;${f.tag}&gt;${esc(labelText)}</span></div>`;
      f.el.classList.add('a11y-tester-landmark-overlay');
      addBadge(f.el, f.role + (f.label ? ': ' + f.label : ''), 'a11y-tester-landmark-badge');
    });
  }
  return html;
}

function runAltText() {
  const images = document.querySelectorAll('img');
  if (images.length === 0) {
    return '<div class="atr-summary pass">No images on this page</div>';
  }

  let missing = 0, decorative = 0, good = 0;
  const results = [];

  images.forEach(img => {
    if (isOwnUI(img)) return;
    const alt = img.getAttribute('alt');
    const src = img.src.split('/').pop().split('?')[0] || '(inline)';
    let status, text;

    if (alt === null) {
      status = 'error'; text = 'MISSING alt attribute'; missing++;
    } else if (alt === '') {
      status = 'ok'; text = 'decorative (alt="")'; decorative++;
    } else {
      status = 'ok'; text = alt; good++;
    }

    results.push({ img, src, status, text, alt });
    img.classList.add('a11y-tester-img-overlay');
    if (alt === null) img.classList.add('missing');
    const badgeText = alt === null ? '⚠ NO ALT' : (alt === '' ? 'decorative' : alt);
    const badge = addBadge(img.parentElement || img, badgeText, 'a11y-tester-img-badge');
    if (alt === null) badge.classList.add('missing');
  });

  const total = missing + decorative + good;
  const summaryStatus = missing > 0 ? 'fail' : 'pass';
  const summaryMsg = missing > 0
    ? `${total} images — ${missing} missing alt text`
    : `${total} images — all have alt text`;
  let html = `<div class="atr-summary ${summaryStatus}">${summaryMsg}</div>`;

  results.forEach(r => {
    const cls = r.status === 'error' ? ' atr-error' : ' atr-ok';
    html += `<div class="atr-item"><span class="atr-tag">${esc(r.src)}</span><br><span class="${cls}">${esc(r.text)}</span></div>`;
  });

  return html;
}

function runLabels() {
  const interactives = document.querySelectorAll(
    'a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]'
  );
  let missing = 0, total = 0;
  const results = [];

  interactives.forEach(el => {
    if (isOwnUI(el)) return;
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute('role') || tag;
    const name = getAccessibleName(el);
    total++;
    if (!name) {
      missing++;
      results.push({ el, role, name: '(no accessible name)', hasName: false });
    } else {
      results.push({ el, role, name, hasName: true });
    }
    el.classList.add('a11y-tester-label-overlay');
    const badge = addBadge(el, name || '⚠ NO NAME', 'a11y-tester-label-badge');
    if (!name) badge.classList.add('missing');
  });

  if (total === 0) return '<div class="atr-summary pass">No interactive elements found</div>';
  const status = missing > 0 ? 'fail' : 'pass';
  const msg = missing > 0
    ? `${total} interactive elements — ${missing} missing names`
    : `${total} interactive elements — all labeled`;
  let html = `<div class="atr-summary ${status}">${msg}</div>`;
  const sorted = [...results.filter(r => !r.hasName), ...results.filter(r => r.hasName)];
  sorted.forEach(r => {
    const cls = r.hasName ? 'atr-ok' : 'atr-error';
    html += `<div class="atr-item"><span class="atr-tag">${r.role}</span> <span class="${cls}">${esc(r.name)}</span></div>`;
  });
  return html;
}

function runHidden() {
  const hidden = [];
  document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
    if (isOwnUI(el)) return;
    if (el.tagName === 'SVG' || el.tagName === 'I') return;
    hidden.push({ el, reason: 'aria-hidden="true"', tag: el.tagName.toLowerCase() });
  });
  document.querySelectorAll('.sr-only, .visually-hidden, [class*="screen-reader"]').forEach(el => {
    if (isOwnUI(el)) return;
    if (hidden.some(h => h.el === el)) return;
    hidden.push({ el, reason: 'visually hidden (sr-only)', tag: el.tagName.toLowerCase() });
  });

  if (hidden.length === 0) return '<div class="atr-summary pass">No hidden elements with content found</div>';
  let html = `<div class="atr-summary warn">${hidden.length} hidden elements found</div>`;
  hidden.forEach(h => {
    const text = h.el.textContent.trim().slice(0, 80);
    html += `<div class="atr-item"><span class="atr-tag">&lt;${h.tag}&gt;</span> <span class="atr-warn">${esc(h.reason)}</span><br><span class="atr-text">${esc(text)}${text.length >= 80 ? '...' : ''}</span></div>`;
    h.el.classList.add('a11y-tester-hidden-reveal');
    addBadge(h.el, h.reason, 'a11y-tester-hidden-badge');
  });
  return html;
}

function runTabOrder() {
  const selector = 'a[href], button, input, select, textarea, [tabindex]';
  const allFocusable = Array.from(document.querySelectorAll(selector));
  const focusable = allFocusable.filter(el => {
    if (isOwnUI(el)) return false;
    const ti = el.getAttribute('tabindex');
    if (ti !== null && parseInt(ti) < 0) return false;
    return true;
  });

  const positiveTab = focusable
    .filter(el => { const ti = el.getAttribute('tabindex'); return ti !== null && parseInt(ti) > 0; })
    .sort((a, b) => parseInt(a.getAttribute('tabindex')) - parseInt(b.getAttribute('tabindex')));
  const naturalOrder = focusable.filter(el => { const ti = el.getAttribute('tabindex'); return ti === null || parseInt(ti) === 0; });
  const ordered = [...positiveTab, ...naturalOrder];
  const hasPositiveTabindex = positiveTab.length > 0;

  if (ordered.length === 0) return '<div class="atr-summary fail">No focusable elements found on this page</div>';
  const status = hasPositiveTabindex ? 'warn' : 'pass';
  const msg = hasPositiveTabindex
    ? `${ordered.length} focusable elements — tabindex > 0 detected (anti-pattern)`
    : `${ordered.length} focusable elements in tab order`;
  let html = `<div class="atr-summary ${status}">${msg}</div>`;
  ordered.forEach((el, i) => {
    const num = i + 1;
    const tag = el.tagName.toLowerCase();
    const name = getAccessibleName(el) || el.getAttribute('placeholder') || el.getAttribute('title') || '(no label)';
    const ti = el.getAttribute('tabindex');
    const isPositive = ti !== null && parseInt(ti) > 0;
    el.classList.add('a11y-tester-taborder-overlay');
    addBadge(el, String(num), 'a11y-tester-taborder-badge');
    const warnText = isPositive ? ` <span class="atr-warn">⚠ tabindex=${esc(ti)}</span>` : '';
    html += `<div class="atr-item"><span class="atr-tag">${num}. &lt;${esc(tag)}&gt;</span> <span class="atr-text">${esc(name)}</span>${warnText}</div>`;
  });
  if (hasPositiveTabindex) {
    html += '<div class="atr-item"><span class="atr-warn">⚠ Avoid tabindex > 0 — it disrupts the natural reading order for keyboard users</span></div>';
  }
  return html;
}

function runContrast() {
  // Simplified for jsdom compat — getComputedStyle won't work fully in tests
  // but preserves original logic for real browsers
  function parseRgb(colorStr) {
    const m = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
    if (!m) return null;
    return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
  }
  function linearize(c) { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); }
  function relativeLuminance(r, g, b) { return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b); }
  function contrastRatio(c1, c2) {
    const l1 = relativeLuminance(c1.r, c1.g, c1.b);
    const l2 = relativeLuminance(c2.r, c2.g, c2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function getRealBgColor(el) {
    let cur = el;
    while (cur && cur.nodeType === 1) {
      const bg = getComputedStyle(cur).backgroundColor;
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        const parsed = parseRgb(bg);
        if (parsed && parsed.a > 0) return parsed;
      }
      cur = cur.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  const textTags = 'p, span, h1, h2, h3, h4, h5, h6, a, button, li, td, th, label';
  const elements = Array.from(document.querySelectorAll(textTags));
  document.querySelectorAll('div').forEach(div => {
    const hasDirectText = Array.from(div.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 0);
    if (hasDirectText) elements.push(div);
  });

  let passed = 0, failed = 0;
  const failures = [];

  elements.forEach(el => {
    if (isOwnUI(el)) return;
    if (!el.textContent.trim()) return;
    const style = getComputedStyle(el);
    const fgColor = parseRgb(style.color);
    if (!fgColor) return;
    const bgColor = getRealBgColor(el);
    const ratio = contrastRatio(fgColor, bgColor);
    const ratioStr = ratio.toFixed(2);
    const fontSize = parseFloat(style.fontSize);
    const fw = style.fontWeight;
    const isBold = parseInt(fw) >= 700 || fw === 'bold' || fw === 'bolder';
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
    const aaThreshold = isLargeText ? 3.0 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7.0;
    let statusLabel;
    if (ratio >= aaaThreshold) { statusLabel = 'AAA'; passed++; }
    else if (ratio >= aaThreshold) { statusLabel = 'AA'; passed++; }
    else { statusLabel = 'FAIL'; failed++; failures.push({ el, ratioStr, tag: el.tagName.toLowerCase() }); }
    el.classList.add('a11y-tester-contrast-overlay');
    if (statusLabel === 'FAIL') el.classList.add('contrast-fail');
    const badge = addBadge(el, ratioStr + ':1', 'a11y-tester-contrast-badge');
    if (statusLabel === 'FAIL') badge.classList.add('fail');
  });

  const total = passed + failed;
  if (total === 0) return '<div class="atr-summary pass">No text elements found to check</div>';
  const summaryStatus = failed > 0 ? 'fail' : 'pass';
  const summaryMsg = failed > 0
    ? `${total} elements checked — ${failed} failing WCAG AA contrast`
    : `${total} elements checked — all pass WCAG AA contrast`;
  let html = `<div class="atr-summary ${summaryStatus}">${summaryMsg}</div>`;
  if (failures.length > 0) {
    failures.forEach(f => {
      const text = f.el.textContent.trim().slice(0, 60);
      html += `<div class="atr-item"><span class="atr-tag">&lt;${esc(f.tag)}&gt;</span> <span class="atr-error">${esc(f.ratioStr)}:1 — FAIL</span><br><span class="atr-text">${esc(text)}${text.length >= 60 ? '…' : ''}</span></div>`;
    });
  } else {
    html += '<div class="atr-item"><span class="atr-ok">✓ All text elements pass WCAG AA requirements</span></div>';
  }
  return html;
}

function runFocus() {
  const selector = 'a[href], button, input, select, textarea, [tabindex]';
  const focusable = Array.from(document.querySelectorAll(selector)).filter(el => {
    if (isOwnUI(el)) return false;
    const ti = el.getAttribute('tabindex');
    return ti === null || parseInt(ti) >= 0;
  });

  if (focusable.length === 0) return '<div class="atr-summary pass">No focusable elements found</div>';
  let issues = 0;
  const results = [];

  focusable.forEach(el => {
    const style = getComputedStyle(el);
    const outlineStyle = style.outlineStyle;
    const outlineWidth = parseFloat(style.outlineWidth) || 0;
    const noOutline = outlineStyle === 'none' || outlineWidth === 0;
    const hasBoxShadow = style.boxShadow && style.boxShadow !== 'none';
    const flagged = noOutline && !hasBoxShadow;
    if (flagged) issues++;
    const name = getAccessibleName(el) || el.getAttribute('placeholder') || el.getAttribute('title') || '(unnamed)';
    results.push({ el, flagged, tag: el.tagName.toLowerCase(), name });
    el.classList.add('a11y-tester-focus-overlay');
    if (flagged) el.classList.add('focus-issue');
    const badge = addBadge(el, flagged ? '⚠ focus?' : '✓ outline', 'a11y-tester-focus-badge');
    if (flagged) badge.classList.add('issue');
  });

  const status = issues > 0 ? 'warn' : 'pass';
  const msg = issues > 0
    ? `${focusable.length} focusable elements — ${issues} may lack visible focus indicators`
    : `${focusable.length} focusable elements — focus styles detected`;
  let html = `<div class="atr-summary ${status}">${msg}</div>`;
  html += '<div class="atr-item"><span class="atr-text">💡 Tab through the page to visually verify each focus indicator</span></div>';
  const sorted = [...results.filter(r => r.flagged), ...results.filter(r => !r.flagged)];
  sorted.forEach(r => {
    const cls = r.flagged ? 'atr-warn' : 'atr-ok';
    const statusText = r.flagged ? '⚠ outline:none — verify custom :focus style exists' : '✓ has outline';
    html += `<div class="atr-item"><span class="atr-tag">&lt;${esc(r.tag)}&gt;</span> <span class="atr-text">${esc(r.name)}</span><br><span class="${cls}">${statusText}</span></div>`;
  });
  return html;
}

function runAria() {
  const validRoles = new Set([
    'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell',
    'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition',
    'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell',
    'group', 'heading', 'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
    'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
    'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio',
    'radiogroup', 'region', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search',
    'searchbox', 'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
    'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree',
    'treegrid', 'treeitem',
  ]);
  const redundantRoleMap = {
    button: 'button', a: 'link', nav: 'navigation', main: 'main',
    header: 'banner', footer: 'contentinfo', article: 'article', aside: 'complementary',
  };
  const issues = [];
  const candidates = document.querySelectorAll(
    '[role], [aria-labelledby], [aria-describedby], [aria-hidden], [aria-expanded], [aria-controls]'
  );
  candidates.forEach(el => {
    if (isOwnUI(el)) return;
    const role = el.getAttribute('role');
    const tag = el.tagName.toLowerCase();
    if (role === 'button' && tag !== 'button' && tag !== 'input' && tag !== 'a') {
      if (el.getAttribute('tabindex') === null) {
        issues.push({ el, severity: 'error', msg: `role="button" on <${tag}> without tabindex — not keyboard accessible` });
      }
    }
    const labelledby = el.getAttribute('aria-labelledby');
    if (labelledby) {
      labelledby.split(/\s+/).forEach(id => {
        if (id && !document.getElementById(id)) {
          issues.push({ el, severity: 'error', msg: `aria-labelledby references missing ID: "${id}"` });
        }
      });
    }
    const describedby = el.getAttribute('aria-describedby');
    if (describedby) {
      describedby.split(/\s+/).forEach(id => {
        if (id && !document.getElementById(id)) {
          issues.push({ el, severity: 'error', msg: `aria-describedby references missing ID: "${id}"` });
        }
      });
    }
    if (el.getAttribute('aria-hidden') === 'true') {
      const isFocusable = el.matches('a[href], button, input, select, textarea') ||
        (el.hasAttribute('tabindex') && parseInt(el.getAttribute('tabindex')) >= 0);
      if (isFocusable) {
        issues.push({ el, severity: 'error', msg: `aria-hidden="true" on focusable <${tag}> — creates keyboard trap` });
      }
    }
    if (role && !validRoles.has(role)) {
      issues.push({ el, severity: 'error', msg: `Invalid ARIA role: "${role}"` });
    }
    if (el.hasAttribute('aria-expanded')) {
      const controls = el.getAttribute('aria-controls');
      if (!controls || !document.getElementById(controls)) {
        issues.push({ el, severity: 'warn', msg: 'aria-expanded set but aria-controls target not found' });
      }
    }
    if (role && redundantRoleMap[tag] === role) {
      issues.push({ el, severity: 'warn', msg: `Redundant: role="${role}" is implicit on <${tag}>` });
    }
  });

  if (issues.length === 0) return '<div class="atr-summary pass">No ARIA issues detected</div>';
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warn');
  const summaryStatus = errors.length > 0 ? 'fail' : 'warn';
  const summaryMsg = `${issues.length} ARIA issue${issues.length !== 1 ? 's' : ''} — ${errors.length} error${errors.length !== 1 ? 's' : ''}, ${warnings.length} warning${warnings.length !== 1 ? 's' : ''}`;
  let html = `<div class="atr-summary ${summaryStatus}">${summaryMsg}</div>`;
  [...errors, ...warnings].forEach(issue => {
    const tag = issue.el.tagName.toLowerCase();
    issue.el.classList.add('a11y-tester-aria-overlay');
    if (issue.severity === 'error') issue.el.classList.add('aria-error');
    const badge = addBadge(issue.el, issue.severity === 'error' ? '⚠ ARIA' : 'ⓘ ARIA', 'a11y-tester-aria-badge');
    if (issue.severity === 'error') badge.classList.add('error');
    const cls = issue.severity === 'error' ? 'atr-error' : 'atr-warn';
    html += `<div class="atr-item"><span class="atr-tag">&lt;${esc(tag)}&gt;</span><br><span class="${cls}">${esc(issue.msg)}</span></div>`;
  });
  return html;
}

function runForms() {
  const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
  const results = [];
  let issueCount = 0, errorCount = 0;

  inputs.forEach(el => {
    if (isOwnUI(el)) return;
    if (el.type === 'hidden') return;
    const tag = el.tagName.toLowerCase();
    const inputType = (el.type || '').toLowerCase();
    const inputIssues = [];
    const hasAriaLabel = !!el.getAttribute('aria-label');
    const labelledbyAttr = el.getAttribute('aria-labelledby');
    const hasAriaLabelledby = !!(labelledbyAttr && document.getElementById(labelledbyAttr));
    const hasLabelFor = !!(el.id && document.querySelector(`label[for="${el.id}"]`));
    const hasWrappingLabel = !!el.closest('label');
    const hasLabel = hasAriaLabel || hasAriaLabelledby || hasLabelFor || hasWrappingLabel;
    const hasPlaceholder = !!el.getAttribute('placeholder');

    if (!hasLabel) {
      if (hasPlaceholder) {
        inputIssues.push({ type: 'warn', msg: 'Placeholder used as label — disappears when filled, not read by all screen readers' });
        issueCount++;
      } else {
        inputIssues.push({ type: 'error', msg: 'No accessible label (no aria-label, aria-labelledby, or <label>)' });
        issueCount++;
        errorCount++;
      }
    }

    if (!el.hasAttribute('autocomplete')) {
      const nameAttr = (el.name || el.id || el.getAttribute('placeholder') || '').toLowerCase();
      let suggestion = null;
      if (inputType === 'email' || nameAttr.includes('email')) suggestion = 'email';
      else if (nameAttr.match(/\bname\b/) && !nameAttr.includes('user')) suggestion = 'name';
      else if (inputType === 'tel' || nameAttr.includes('phone') || nameAttr.includes('tel')) suggestion = 'tel';
      else if (nameAttr.includes('zip') || nameAttr.includes('postal')) suggestion = 'postal-code';
      if (suggestion) {
        inputIssues.push({ type: 'warn', msg: `Missing autocomplete — consider autocomplete="${suggestion}"` });
      }
    }

    const isRequired = el.hasAttribute('required') || el.getAttribute('aria-required') === 'true';
    results.push({ el, tag, inputType, hasLabel, isRequired, inputIssues });
    const hasErrors = inputIssues.some(i => i.type === 'error');
    const hasWarns = inputIssues.some(i => i.type === 'warn');
    el.classList.add('a11y-tester-form-overlay');
    if (hasErrors) el.classList.add('form-error');
    else if (hasWarns) el.classList.add('form-warn');
    const badgeText = hasErrors ? '⚠ no label' : (hasWarns ? 'ⓘ warn' : '✓ ok');
    const badge = addBadge(el, badgeText, 'a11y-tester-form-badge');
    if (hasErrors) badge.classList.add('error');
    else if (hasWarns) badge.classList.add('warn');
  });

  if (results.length === 0) return '<div class="atr-summary pass">No form inputs found on this page</div>';
  const summaryStatus = errorCount > 0 ? 'fail' : (issueCount > 0 ? 'warn' : 'pass');
  const summaryMsg = issueCount > 0
    ? `${results.length} inputs — ${errorCount > 0 ? errorCount + ' unlabeled' : ''}${errorCount > 0 && issueCount > errorCount ? ', ' : ''}${issueCount > errorCount ? (issueCount - errorCount) + ' warning' + (issueCount - errorCount !== 1 ? 's' : '') : ''}`
    : `${results.length} inputs — all properly labeled`;
  let html = `<div class="atr-summary ${summaryStatus}">${summaryMsg}</div>`;
  const sorted = [
    ...results.filter(r => r.inputIssues.some(i => i.type === 'error')),
    ...results.filter(r => r.inputIssues.some(i => i.type === 'warn') && !r.inputIssues.some(i => i.type === 'error')),
    ...results.filter(r => r.inputIssues.length === 0),
  ];
  sorted.forEach(r => {
    const name = getAccessibleName(r.el) || r.el.getAttribute('placeholder') || r.el.name || '(unnamed)';
    const typeLabel = r.inputType ? ` type="${esc(r.inputType)}"` : '';
    const reqLabel = r.isRequired ? ' <span class="atr-warn">required</span>' : '';
    html += `<div class="atr-item"><span class="atr-tag">&lt;${esc(r.tag)}${typeLabel}&gt;</span>${reqLabel} <span class="atr-text">${esc(name)}</span>`;
    r.inputIssues.forEach(issue => {
      const cls = issue.type === 'error' ? 'atr-error' : 'atr-warn';
      html += `<br><span class="${cls}">${esc(issue.msg)}</span>`;
    });
    if (r.inputIssues.length === 0) html += '<br><span class="atr-ok">✓ properly labeled</span>';
    html += '</div>';
  });
  return html;
}

// ---- Runner map ----

const toolRunners = {
  headings: runHeadings,
  landmarks: runLandmarks,
  'alt-text': runAltText,
  labels: runLabels,
  hidden: runHidden,
  'tab-order': runTabOrder,
  contrast: runContrast,
  focus: runFocus,
  aria: runAria,
  forms: runForms,
};

// ---- UI Builder ----

function buildPanel(container) {
  const root = container || document.body;

  const toggle = document.createElement('button');
  toggle.className = 'a11y-tester-toggle';
  toggle.setAttribute('aria-label', 'Toggle accessibility tester');
  toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>';
  root.appendChild(toggle);

  const panel = document.createElement('div');
  panel.className = 'a11y-tester-panel';
  panel.innerHTML = `
    <div class="a11y-tester-header">
      <div class="a11y-tester-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
        A11y Audit
      </div>
      <button class="a11y-tester-close" aria-label="Close tester panel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="a11y-tester-tools">
      ${TOOLS.map(t => `
        <button class="a11y-tester-tool" data-tool="${t.id}">
          ${t.icon}
          <div class="a11y-tester-tool-info">
            <div class="a11y-tester-tool-name">${t.name}</div>
            <div class="a11y-tester-tool-desc">${t.desc}</div>
          </div>
        </button>
      `).join('')}
    </div>
    <div class="a11y-tester-results"></div>
  `;
  root.appendChild(panel);

  _toggleEl = toggle;
  _panelEl = panel;
  _container = root;

  // Events
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  panel.querySelector('.a11y-tester-close').addEventListener('click', () => {
    panel.classList.remove('open');
    Object.keys(_activeTools).forEach(id => { _activeTools[id] = false; });
    clearOverlays();
    panel.querySelectorAll('.a11y-tester-tool').forEach(b => b.classList.remove('active'));
    panel.querySelector('.a11y-tester-results').classList.remove('show');
  });

  panel.querySelectorAll('.a11y-tester-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      const toolId = btn.dataset.tool;
      const isActive = btn.classList.contains('active');

      Object.keys(_activeTools).forEach(id => { _activeTools[id] = false; });
      clearOverlays();
      panel.querySelectorAll('.a11y-tester-tool').forEach(b => b.classList.remove('active'));

      const resultsEl = panel.querySelector('.a11y-tester-results');

      if (isActive) {
        resultsEl.classList.remove('show');
        resultsEl.innerHTML = '';
      } else {
        _activeTools[toolId] = true;
        btn.classList.add('active');
        const runner = toolRunners[toolId];
        if (runner) {
          const resultHtml = runner();
          resultsEl.innerHTML = `<div class="a11y-tester-results-title">${TOOLS.find(t => t.id === toolId).name}</div>${resultHtml}`;
          resultsEl.classList.add('show');
        }
      }
    });
  });
}

// ---- Public API ----

/**
 * Initialize the A11y Audit panel.
 * @param {Object} [options]
 * @param {HTMLElement} [options.container] - Element to mount into (default: document.body)
 */
export function initA11yAudit(options = {}) {
  if (_initialized) return;
  _initialized = true;
  _activeTools = {};
  _overlayElements = [];
  buildPanel(options.container || null);
}

/**
 * Remove the A11y Audit panel and clean up.
 */
export function destroyA11yAudit() {
  if (!_initialized) return;
  clearOverlays();
  if (_toggleEl) _toggleEl.remove();
  if (_panelEl) _panelEl.remove();
  _toggleEl = null;
  _panelEl = null;
  _container = null;
  _activeTools = {};
  _overlayElements = [];
  _initialized = false;
}

/**
 * Exposed internals for testing — not part of public API contract.
 */
export const _internals = {
  runTool(toolId) {
    const runner = toolRunners[toolId];
    if (!runner) throw new Error(`Unknown tool: ${toolId}`);
    return runner();
  },
  get TOOLS() { return TOOLS; },
};
