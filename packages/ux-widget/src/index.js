/**
 * A11y UX Widget — Standalone embeddable accessibility preferences widget
 * Extracted from Hermes dashboard a11y-widget, no external dependencies.
 *
 * Usage:
 *   import { initUxWidget, destroyUxWidget } from '@a11y-toolkit/ux-widget';
 *   initUxWidget();                          // mount into document.body
 *   initUxWidget({ container, storageKey })  // mount into specific element
 *   destroyUxWidget();                       // tear down
 */

// ---- Constants ----

const DEFAULT_STORAGE_KEY = 'a11y-ux-widget';

const FONT_CYCLE = ['default', 'lg', 'xl'];
const FONT_LABELS = { default: 'Default', lg: 'Large', xl: 'XL' };

const CB_CYCLE = ['off', 'deuteranopia', 'protanopia', 'tritanopia'];
const CB_LABELS = { off: 'Off', deuteranopia: 'Red-Green', protanopia: 'Red-Weak', tritanopia: 'Blue-Yellow' };

const FEATURES = [
  {
    id: 'underline-links',
    cls: 'a11y-underline-links',
    label: 'Underline Links',
    desc: 'Adds underlines to all links',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/>
    </svg>`,
  },
  {
    id: 'high-contrast',
    cls: 'a11y-high-contrast',
    label: 'High Contrast',
    desc: 'Boosts text and background contrast',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" stroke="none"/>
    </svg>`,
  },
  {
    id: 'colorblind',
    cls: null,
    label: 'Color Vision',
    desc: 'Cycles: Off → Red-Green → Red-Weak → Blue-Yellow',
    type: 'cycle-cb',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M9 12a3 3 0 0 1 6 0"/>
      <circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>`,
  },
  {
    id: 'dyslexia-font',
    cls: 'a11y-dyslexia-font',
    label: 'Dyslexia Friendly Font',
    desc: 'Switches to Lexend for readability',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
    </svg>`,
  },
  {
    id: 'font-size',
    cls: null,
    label: 'Increase Font Size',
    desc: 'Cycles: Default → Large → XL',
    type: 'cycle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <text x="8.5" y="16" font-size="10" fill="currentColor" stroke="none" font-weight="600">A</text>
      <text x="13" y="15.5" font-size="7.5" fill="currentColor" stroke="none" font-weight="600">a</text>
    </svg>`,
  },
  {
    id: 'focus-highlight',
    cls: 'a11y-focus-highlight',
    label: 'Highlight Focus',
    desc: 'Visible outlines on focused elements',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke-dasharray="4 2"/><circle cx="12" cy="12" r="3"/>
    </svg>`,
  },
  {
    id: 'reduce-motion',
    cls: 'a11y-reduce-motion',
    label: 'Reduce Motion',
    desc: 'Stops animations and transitions',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>`,
  },
  {
    id: 'letter-spacing',
    cls: 'a11y-letter-spacing',
    label: 'Letter Spacing',
    desc: 'Increases space between characters',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 8h10"/><path d="M5 12h14"/><path d="M7 16h10"/>
      <line x1="3" y1="8" x2="3" y2="16"/><line x1="21" y1="8" x2="21" y2="16"/>
    </svg>`,
  },
  {
    id: 'reading-guide',
    cls: 'a11y-reading-guide',
    label: 'Reading Guide',
    desc: 'Horizontal line follows your cursor',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 8 12 4 16 8"/>
    </svg>`,
  },
  {
    id: 'big-cursor',
    cls: 'a11y-big-cursor',
    label: 'Big Cursor',
    desc: 'Enlarges the mouse pointer',
    type: 'toggle',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4l7 18 2.5-7.5L21 12z" fill="currentColor" stroke="none"/>
      <path d="M4 4l7 18 2.5-7.5L21 12z"/>
    </svg>`,
  },
];

// ---- Module state ----

let _initialized = false;
let _btnEl = null;
let _panelEl = null;
let _container = null;
let _storageKey = DEFAULT_STORAGE_KEY;
let _state = {};
let _isOpen = false;
let _readingGuideEl = null;
let _lexendLoaded = false;
let _escHandler = null;

// ---- State management ----

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(_storageKey) || '{}');
  } catch {
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(_storageKey, JSON.stringify(state));
  } catch { /* quota exceeded — silently ignore */ }
}

// ---- CSS class application ----

function applyFontSize(level) {
  const html = document.documentElement;
  html.classList.remove('a11y-font-lg', 'a11y-font-xl');
  if (level === 'lg') html.classList.add('a11y-font-lg');
  if (level === 'xl') html.classList.add('a11y-font-xl');
}

function applyColorblind(mode) {
  const html = document.documentElement;
  html.classList.remove('a11y-cb-deuteranopia', 'a11y-cb-protanopia', 'a11y-cb-tritanopia');
  if (mode && mode !== 'off') html.classList.add('a11y-cb-' + mode);
}

function applyState(state) {
  FEATURES.forEach(feat => {
    if (feat.type === 'toggle' && feat.cls) {
      document.documentElement.classList.toggle(feat.cls, !!state[feat.id]);
    }
  });
  applyFontSize(state['font-size'] || 'default');
  applyColorblind(state['colorblind'] || 'off');

  if (state['dyslexia-font']) {
    loadLexend();
  }

  manageReadingGuide(!!state['reading-guide']);
}

// ---- Lexend font ----

function loadLexend() {
  if (_lexendLoaded) return;
  if (typeof document === 'undefined') return;
  _lexendLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap';
  document.head.appendChild(link);
}

// ---- Reading guide ----

function moveReadingGuide(e) {
  if (_readingGuideEl) {
    _readingGuideEl.style.top = e.clientY + 'px';
  }
}

function manageReadingGuide(enabled) {
  if (enabled && !_readingGuideEl) {
    _readingGuideEl = document.createElement('div');
    _readingGuideEl.id = 'a11y-reading-guide';
    _readingGuideEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(_readingGuideEl);
    document.addEventListener('mousemove', moveReadingGuide);
  } else if (!enabled && _readingGuideEl) {
    document.removeEventListener('mousemove', moveReadingGuide);
    _readingGuideEl.remove();
    _readingGuideEl = null;
  }
}

// ---- SVG filters for color vision ----

function injectSVGFilters() {
  if (document.getElementById('a11y-svg-filter-defs')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'a11y-svg-filter-defs');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('a11y-svg-filters');
  svg.innerHTML = `
    <defs>
      <filter id="a11y-deuteranopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          0.367 0.861 -0.228 0 0
          0.280 0.673  0.047 0 0
         -0.012 0.043  0.969 0 0
          0     0      0     1 0
        "/>
      </filter>
      <filter id="a11y-protanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          0.152 1.053 -0.205 0 0
          0.115 0.786  0.099 0 0
         -0.004 -0.048  1.052 0 0
          0     0      0     1 0
        "/>
      </filter>
      <filter id="a11y-tritanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feColorMatrix type="matrix" values="
          1.256 -0.077 -0.179 0 0
         -0.078  0.931  0.148 0 0
          0.005  0.691  0.304 0 0
          0      0      0     1 0
        "/>
      </filter>
    </defs>
  `;
  (_container || document.body).appendChild(svg);
}

// ---- Build panel HTML ----

function buildPanel(state) {
  const a11ySymbolSm = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="12" cy="7.5" r="1.6" fill="currentColor" stroke="none"/>
    <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="12" y1="11" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="15" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`;

  let togglesHTML = '';

  FEATURES.forEach(feat => {
    let isOn;
    if (feat.type === 'cycle') {
      isOn = (state['font-size'] || 'default') !== 'default';
    } else if (feat.type === 'cycle-cb') {
      isOn = (state['colorblind'] || 'off') !== 'off';
    } else {
      isOn = !!state[feat.id];
    }

    const ariaPressed = isOn ? 'true' : 'false';

    let rightEl;
    if (feat.type === 'cycle') {
      const level = state['font-size'] || 'default';
      rightEl = `<span class="a11y-font-badge" data-font-badge>${FONT_LABELS[level]}</span>`;
    } else if (feat.type === 'cycle-cb') {
      const mode = state['colorblind'] || 'off';
      rightEl = `<span class="a11y-font-badge" data-cb-badge>${CB_LABELS[mode]}</span>`;
    } else {
      rightEl = `<span class="a11y-toggle-pill" aria-hidden="true"></span>`;
    }

    togglesHTML += `
      <button
        class="a11y-toggle"
        data-feature="${feat.id}"
        aria-pressed="${ariaPressed}"
        title="${feat.label}"
        type="button"
      >
        <span class="a11y-toggle-icon" aria-hidden="true">${feat.icon}</span>
        <span class="a11y-toggle-label">
          <span class="a11y-toggle-name">${feat.label}</span>
          <span class="a11y-toggle-desc">${feat.desc}</span>
        </span>
        ${rightEl}
      </button>
    `;
  });

  return `
    <div class="a11y-panel-header">
      <div>
        <div class="a11y-panel-title">
          ${a11ySymbolSm}
          Accessibility
        </div>
        <div class="a11y-panel-subtitle">Customise your experience</div>
      </div>
      <button class="a11y-close-btn" data-ux-widget-close aria-label="Close accessibility panel" type="button">
        ${closeIcon}
      </button>
    </div>
    <div class="a11y-panel-body" role="group" aria-label="Accessibility options">
      ${togglesHTML}
    </div>
    <div class="a11y-panel-footer">
      <button class="a11y-reset-btn" data-ux-widget-reset type="button">↺ Reset All</button>
    </div>
  `;
}

// ---- Toggle handler ----

function handleToggle(feat) {
  const html = document.documentElement;

  if (feat.type === 'toggle') {
    _state[feat.id] = !_state[feat.id];
    html.classList.toggle(feat.cls, _state[feat.id]);

    if (feat.id === 'dyslexia-font' && _state[feat.id]) {
      loadLexend();
    }
    if (feat.id === 'reading-guide') {
      manageReadingGuide(_state[feat.id]);
    }
  } else if (feat.type === 'cycle') {
    const current = _state['font-size'] || 'default';
    const idx = FONT_CYCLE.indexOf(current);
    const next = FONT_CYCLE[(idx + 1) % FONT_CYCLE.length];
    _state['font-size'] = next;
    applyFontSize(next);
  } else if (feat.type === 'cycle-cb') {
    const current = _state['colorblind'] || 'off';
    const idx = CB_CYCLE.indexOf(current);
    const next = CB_CYCLE[(idx + 1) % CB_CYCLE.length];
    _state['colorblind'] = next;
    applyColorblind(next);
  }

  saveState(_state);

  // Re-render panel — preserve scroll position
  const body = _panelEl.querySelector('.a11y-panel-body');
  const scrollY = body ? body.scrollTop : 0;
  _panelEl.innerHTML = buildPanel(_state);
  bindPanelEvents();
  const newBody = _panelEl.querySelector('.a11y-panel-body');
  if (newBody) newBody.scrollTop = scrollY;
}

// ---- Reset ----

function handleReset() {
  _state = {};
  saveState(_state);
  applyState(_state);
  _panelEl.innerHTML = buildPanel(_state);
  bindPanelEvents();
}

// ---- Bind panel events ----

function bindPanelEvents() {
  const closeBtn = _panelEl.querySelector('[data-ux-widget-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });
  }

  const resetBtn = _panelEl.querySelector('[data-ux-widget-reset]');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => { e.stopPropagation(); handleReset(); });
  }

  const toggleBtns = _panelEl.querySelectorAll('.a11y-toggle');
  toggleBtns.forEach(toggleBtn => {
    const featureId = toggleBtn.dataset.feature;
    const feat = FEATURES.find(f => f.id === featureId);
    if (!feat) return;
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleToggle(feat);
    });
  });
}

// ---- Open / Close ----

function openPanel() {
  _isOpen = true;
  _panelEl.classList.add('a11y-panel-open');
  _btnEl.setAttribute('aria-expanded', 'true');

  _panelEl.innerHTML = buildPanel(_state);
  bindPanelEvents();

  requestAnimationFrame(() => {
    if (_panelEl) {
      const closeBtn = _panelEl.querySelector('[data-ux-widget-close]');
      if (closeBtn) closeBtn.focus();
    }
  });
}

function closePanel() {
  _isOpen = false;
  _panelEl.classList.remove('a11y-panel-open');
  _btnEl.setAttribute('aria-expanded', 'false');
  _btnEl.focus();
}

// ---- Public API ----

/**
 * Initialize the UX widget.
 * @param {Object} [options]
 * @param {HTMLElement} [options.container] - Element to mount into (default: document.body)
 * @param {string} [options.storageKey] - localStorage key (default: 'a11y-ux-widget')
 */
export function initUxWidget(options = {}) {
  if (_initialized) return;
  _initialized = true;

  _container = options.container || document.body;
  _storageKey = options.storageKey || DEFAULT_STORAGE_KEY;

  // Load & apply saved state
  _state = loadState();
  applyState(_state);

  // Inject SVG colour-filter definitions
  injectSVGFilters();

  // Build the floating button
  _btnEl = document.createElement('button');
  _btnEl.setAttribute('data-ux-widget-btn', '');
  _btnEl.setAttribute('aria-label', 'Open accessibility settings');
  _btnEl.setAttribute('aria-haspopup', 'dialog');
  _btnEl.setAttribute('aria-expanded', 'false');
  _btnEl.setAttribute('type', 'button');
  _btnEl.className = 'a11y-widget-btn';

  _btnEl.innerHTML = `
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="#0b0e11">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#0b0e11" stroke-width="6"/>
      <circle cx="50" cy="22" r="9" fill="#0b0e11"/>
      <line x1="14" y1="42" x2="86" y2="42" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="42" x2="50" y2="63" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="63" x2="30" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      <line x1="50" y1="63" x2="70" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
    </svg>
  `;

  // Build the panel
  _panelEl = document.createElement('div');
  _panelEl.setAttribute('data-ux-widget-panel', '');
  _panelEl.setAttribute('role', 'dialog');
  _panelEl.setAttribute('aria-label', 'Accessibility settings');
  _panelEl.setAttribute('aria-modal', 'false');
  _panelEl.className = 'a11y-widget-panel';
  _panelEl.innerHTML = buildPanel(_state);

  _container.appendChild(_btnEl);
  _container.appendChild(_panelEl);

  // Button click handler
  _btnEl.addEventListener('click', () => {
    if (_isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  });

  // Escape key handler
  _escHandler = (e) => {
    if (e.key === 'Escape' && _isOpen) {
      closePanel();
    }
  };
  document.addEventListener('keydown', _escHandler);

  // Initial panel event binding
  bindPanelEvents();
}

/**
 * Destroy the UX widget — remove all DOM elements and event listeners.
 */
export function destroyUxWidget() {
  if (!_initialized) return;

  if (_escHandler) {
    document.removeEventListener('keydown', _escHandler);
    _escHandler = null;
  }

  manageReadingGuide(false);

  // Remove SVG filters
  const svgFilters = document.getElementById('a11y-svg-filter-defs');
  if (svgFilters) svgFilters.remove();

  // Remove widget elements
  if (_btnEl) { _btnEl.remove(); _btnEl = null; }
  if (_panelEl) { _panelEl.remove(); _panelEl = null; }

  _container = null;
  _state = {};
  _isOpen = false;
  _initialized = false;
  _lexendLoaded = false;
}

// ---- Test internals ----

export const _internals = {
  FEATURES,
  FONT_CYCLE,
  CB_CYCLE,
};
