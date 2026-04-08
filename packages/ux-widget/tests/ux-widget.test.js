import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// jsdom localStorage can be unreliable — provide a simple in-memory mock
const _store = {};
const mockLocalStorage = {
  getItem(key) { return _store[key] ?? null; },
  setItem(key, val) { _store[key] = String(val); },
  removeItem(key) { delete _store[key]; },
  clear() { Object.keys(_store).forEach(k => delete _store[k]); },
};
Object.defineProperty(globalThis, 'localStorage', { value: mockLocalStorage, writable: true });

import { initUxWidget, destroyUxWidget, _internals } from '../src/index.js';

function clearStorage() {
  mockLocalStorage.clear();
}

describe('UX Widget — public API', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('exports initUxWidget as a function', () => {
    expect(typeof initUxWidget).toBe('function');
  });

  it('exports destroyUxWidget as a function', () => {
    expect(typeof destroyUxWidget).toBe('function');
  });

  it('initUxWidget creates the floating button in the DOM', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    expect(btn).not.toBeNull();
    expect(btn.tagName).toBe('BUTTON');
  });

  it('initUxWidget creates the panel in the DOM', () => {
    initUxWidget();
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel).not.toBeNull();
  });

  it('panel starts closed (no open class)', () => {
    initUxWidget();
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel.classList.contains('a11y-panel-open')).toBe(false);
  });

  it('clicking the button opens the panel', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    const panel = document.querySelector('[data-ux-widget-panel]');
    btn.click();
    expect(panel.classList.contains('a11y-panel-open')).toBe(true);
  });

  it('button aria-expanded updates on open', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    btn.click();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('clicking the button twice closes the panel', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    const panel = document.querySelector('[data-ux-widget-panel]');
    btn.click();
    btn.click();
    expect(panel.classList.contains('a11y-panel-open')).toBe(false);
  });

  it('clicking the close button closes the panel', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click(); // open
    const closeBtn = document.querySelector('[data-ux-widget-close]');
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel.classList.contains('a11y-panel-open')).toBe(false);
  });

  it('Escape key closes the panel', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click(); // open
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel.classList.contains('a11y-panel-open')).toBe(false);
  });

  it('does not double-init when called twice', () => {
    initUxWidget();
    initUxWidget();
    const btns = document.querySelectorAll('[data-ux-widget-btn]');
    expect(btns.length).toBe(1);
  });

  it('destroyUxWidget removes all widget elements', () => {
    initUxWidget();
    destroyUxWidget();
    expect(document.querySelector('[data-ux-widget-btn]')).toBeNull();
    expect(document.querySelector('[data-ux-widget-panel]')).toBeNull();
  });

  it('renders all 10 feature toggle buttons', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click(); // open to render toggles
    const toggles = document.querySelectorAll('.a11y-toggle');
    expect(toggles.length).toBe(10);
  });

  it('panel has role="dialog"', () => {
    initUxWidget();
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel.getAttribute('role')).toBe('dialog');
  });

  it('panel has aria-label', () => {
    initUxWidget();
    const panel = document.querySelector('[data-ux-widget-panel]');
    expect(panel.getAttribute('aria-label')).toBeTruthy();
  });

  it('accepts a container option to mount into', () => {
    const container = document.createElement('div');
    container.id = 'custom-mount';
    document.body.appendChild(container);
    initUxWidget({ container });
    expect(container.querySelector('[data-ux-widget-panel]')).not.toBeNull();
    expect(container.querySelector('[data-ux-widget-btn]')).not.toBeNull();
    container.remove();
  });
});

describe('UX Widget — toggle features', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('toggling underline-links adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click(); // open
    const toggle = document.querySelector('[data-feature="underline-links"]');
    expect(toggle).not.toBeNull();
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-underline-links')).toBe(true);
  });

  it('toggling underline-links off removes class from <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    // Click once to turn ON
    document.querySelector('[data-feature="underline-links"]').click();
    expect(document.documentElement.classList.contains('a11y-underline-links')).toBe(true);
    // Panel re-renders — re-query and click to turn OFF
    document.querySelector('[data-feature="underline-links"]').click();
    expect(document.documentElement.classList.contains('a11y-underline-links')).toBe(false);
  });

  it('toggling high-contrast adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="high-contrast"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-high-contrast')).toBe(true);
  });

  it('toggling reduce-motion adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="reduce-motion"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-reduce-motion')).toBe(true);
  });

  it('toggling focus-highlight adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="focus-highlight"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-focus-highlight')).toBe(true);
  });

  it('toggling letter-spacing adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="letter-spacing"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-letter-spacing')).toBe(true);
  });

  it('toggling big-cursor adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="big-cursor"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-big-cursor')).toBe(true);
  });

  it('toggling dyslexia-font adds class to <html>', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="dyslexia-font"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-dyslexia-font')).toBe(true);
  });
});

describe('UX Widget — font-size cycle', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('font-size cycles through default -> lg -> xl -> default', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();

    // Click once: default -> lg
    let toggle = document.querySelector('[data-feature="font-size"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-font-lg')).toBe(true);

    // Click again: lg -> xl
    toggle = document.querySelector('[data-feature="font-size"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-font-xl')).toBe(true);
    expect(document.documentElement.classList.contains('a11y-font-lg')).toBe(false);

    // Click again: xl -> default
    toggle = document.querySelector('[data-feature="font-size"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-font-xl')).toBe(false);
    expect(document.documentElement.classList.contains('a11y-font-lg')).toBe(false);
  });
});

describe('UX Widget — colorblind cycle', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('colorblind cycles through off -> deuteranopia -> protanopia -> tritanopia -> off', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();

    // off -> deuteranopia
    let toggle = document.querySelector('[data-feature="colorblind"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-cb-deuteranopia')).toBe(true);

    // deuteranopia -> protanopia
    toggle = document.querySelector('[data-feature="colorblind"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-cb-protanopia')).toBe(true);
    expect(document.documentElement.classList.contains('a11y-cb-deuteranopia')).toBe(false);

    // protanopia -> tritanopia
    toggle = document.querySelector('[data-feature="colorblind"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-cb-tritanopia')).toBe(true);

    // tritanopia -> off
    toggle = document.querySelector('[data-feature="colorblind"]');
    toggle.click();
    expect(document.documentElement.classList.contains('a11y-cb-tritanopia')).toBe(false);
    expect(document.documentElement.classList.contains('a11y-cb-deuteranopia')).toBe(false);
    expect(document.documentElement.classList.contains('a11y-cb-protanopia')).toBe(false);
  });
});

describe('UX Widget — state persistence', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('saves state to localStorage when toggling', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="high-contrast"]');
    toggle.click();
    const stored = JSON.parse(localStorage.getItem('a11y-ux-widget') || '{}');
    expect(stored['high-contrast']).toBe(true);
  });

  it('restores state from localStorage on init', () => {
    localStorage.setItem('a11y-ux-widget', JSON.stringify({ 'high-contrast': true }));
    initUxWidget();
    expect(document.documentElement.classList.contains('a11y-high-contrast')).toBe(true);
  });

  it('custom storageKey option is respected', () => {
    initUxWidget({ storageKey: 'my-custom-key' });
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="high-contrast"]');
    toggle.click();
    const stored = JSON.parse(localStorage.getItem('my-custom-key') || '{}');
    expect(stored['high-contrast']).toBe(true);
  });
});

describe('UX Widget — reset', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('reset button clears all active features', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();

    // Enable a couple features
    document.querySelector('[data-feature="high-contrast"]').click();
    document.querySelector('[data-feature="underline-links"]').click();
    expect(document.documentElement.classList.contains('a11y-high-contrast')).toBe(true);

    // Click reset
    const resetBtn = document.querySelector('[data-ux-widget-reset]');
    expect(resetBtn).not.toBeNull();
    resetBtn.click();

    expect(document.documentElement.classList.contains('a11y-high-contrast')).toBe(false);
    expect(document.documentElement.classList.contains('a11y-underline-links')).toBe(false);
  });

  it('reset clears localStorage state', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    document.querySelector('[data-feature="high-contrast"]').click();
    document.querySelector('[data-ux-widget-reset]').click();
    const stored = JSON.parse(localStorage.getItem('a11y-ux-widget') || '{}');
    expect(stored['high-contrast']).toBeFalsy();
  });
});

describe('UX Widget — reading guide', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    document.documentElement.className = '';
    clearStorage();
  });

  it('toggling reading-guide creates the guide element', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    const toggle = document.querySelector('[data-feature="reading-guide"]');
    toggle.click();
    const guide = document.getElementById('a11y-reading-guide');
    expect(guide).not.toBeNull();
    expect(guide.getAttribute('aria-hidden')).toBe('true');
  });

  it('toggling reading-guide off removes the guide element', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    document.querySelector('[data-feature="reading-guide"]').click();
    // re-query after re-render
    document.querySelector('[data-feature="reading-guide"]').click();
    const guide = document.getElementById('a11y-reading-guide');
    expect(guide).toBeNull();
  });
});

describe('UX Widget — no Hermes dependencies', () => {
  afterEach(() => {
    destroyUxWidget();
    document.body.innerHTML = '';
    clearStorage();
  });

  it('does not use hermes-a11y localStorage key', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    document.querySelector('[data-feature="high-contrast"]').click();
    expect(localStorage.getItem('hermes-a11y')).toBeNull();
  });

  it('does not reference hermes-specific tester panel', () => {
    initUxWidget();
    const btn = document.querySelector('[data-ux-widget-btn]');
    btn.click();
    // No .a11y-tester-panel should be created
    expect(document.querySelector('.a11y-tester-panel')).toBeNull();
  });
});
