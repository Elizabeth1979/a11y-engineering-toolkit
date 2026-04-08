import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// We'll import the module under test
import { initA11yAudit, destroyA11yAudit, _internals } from '../src/index.js';

describe('Audit Panel — public API', () => {
  afterEach(() => {
    destroyA11yAudit();
  });

  it('exports initA11yAudit as a function', () => {
    expect(typeof initA11yAudit).toBe('function');
  });

  it('exports destroyA11yAudit as a function', () => {
    expect(typeof destroyA11yAudit).toBe('function');
  });

  it('initA11yAudit creates the toggle button in the DOM', () => {
    initA11yAudit();
    const toggle = document.querySelector('.a11y-tester-toggle');
    expect(toggle).not.toBeNull();
    expect(toggle.tagName).toBe('BUTTON');
  });

  it('initA11yAudit creates the panel in the DOM', () => {
    initA11yAudit();
    const panel = document.querySelector('.a11y-tester-panel');
    expect(panel).not.toBeNull();
  });

  it('panel starts closed (no "open" class)', () => {
    initA11yAudit();
    const panel = document.querySelector('.a11y-tester-panel');
    expect(panel.classList.contains('open')).toBe(false);
  });

  it('clicking toggle opens the panel', () => {
    initA11yAudit();
    const toggle = document.querySelector('.a11y-tester-toggle');
    const panel = document.querySelector('.a11y-tester-panel');
    toggle.click();
    expect(panel.classList.contains('open')).toBe(true);
  });

  it('clicking toggle twice closes the panel', () => {
    initA11yAudit();
    const toggle = document.querySelector('.a11y-tester-toggle');
    const panel = document.querySelector('.a11y-tester-panel');
    toggle.click();
    toggle.click();
    expect(panel.classList.contains('open')).toBe(false);
  });

  it('clicking the close button closes the panel', () => {
    initA11yAudit();
    const toggle = document.querySelector('.a11y-tester-toggle');
    toggle.click(); // open first
    const closeBtn = document.querySelector('.a11y-tester-close');
    closeBtn.click();
    const panel = document.querySelector('.a11y-tester-panel');
    expect(panel.classList.contains('open')).toBe(false);
  });

  it('does not double-init when called twice', () => {
    initA11yAudit();
    initA11yAudit();
    const toggles = document.querySelectorAll('.a11y-tester-toggle');
    expect(toggles.length).toBe(1);
  });

  it('destroyA11yAudit removes all panel elements', () => {
    initA11yAudit();
    destroyA11yAudit();
    expect(document.querySelector('.a11y-tester-toggle')).toBeNull();
    expect(document.querySelector('.a11y-tester-panel')).toBeNull();
  });

  it('renders all 10 tool buttons', () => {
    initA11yAudit();
    const tools = document.querySelectorAll('.a11y-tester-tool');
    expect(tools.length).toBe(10);
  });

  it('accepts a container option to mount into', () => {
    const container = document.createElement('div');
    container.id = 'custom-root';
    document.body.appendChild(container);
    initA11yAudit({ container });
    expect(container.querySelector('.a11y-tester-panel')).not.toBeNull();
    container.remove();
  });
});

describe('Audit Panel — tool runners (headings)', () => {
  afterEach(() => {
    destroyA11yAudit();
    document.body.innerHTML = '';
  });

  it('headings tool detects H1-H6 on page', () => {
    document.body.innerHTML = '<h1>Title</h1><h2>Subtitle</h2>';
    initA11yAudit();

    const result = _internals.runTool('headings');
    expect(result).toContain('2 headings');
    expect(result).toContain('all good');
  });

  it('headings tool reports skipped levels', () => {
    document.body.innerHTML = '<h1>Title</h1><h3>Skipped H2</h3>';
    initA11yAudit();

    const result = _internals.runTool('headings');
    expect(result).toContain('issue');
    expect(result).toContain('skipped level');
  });

  it('headings tool reports no headings', () => {
    document.body.innerHTML = '<p>No headings here</p>';
    initA11yAudit();

    const result = _internals.runTool('headings');
    expect(result).toContain('No headings found');
  });
});

describe('Audit Panel — tool runners (alt-text)', () => {
  afterEach(() => {
    destroyA11yAudit();
    document.body.innerHTML = '';
  });

  it('reports missing alt text', () => {
    document.body.innerHTML = '<img src="test.png">';
    initA11yAudit();

    const result = _internals.runTool('alt-text');
    expect(result).toContain('missing alt');
  });

  it('reports images with alt text as passing', () => {
    document.body.innerHTML = '<img src="test.png" alt="A photo">';
    initA11yAudit();

    const result = _internals.runTool('alt-text');
    expect(result).toContain('all have alt text');
  });
});

describe('Audit Panel — tool runners (landmarks)', () => {
  afterEach(() => {
    destroyA11yAudit();
    document.body.innerHTML = '';
  });

  it('finds semantic landmarks', () => {
    document.body.innerHTML = '<nav>Nav</nav><main>Content</main>';
    initA11yAudit();

    const result = _internals.runTool('landmarks');
    expect(result).toContain('landmarks found');
    expect(result).toContain('navigation');
    expect(result).toContain('main');
  });
});

describe('Audit Panel — no Hermes globals dependency', () => {
  it('does not set window.__a11yTesterInit', () => {
    initA11yAudit();
    expect(window.__a11yTesterInit).toBeUndefined();
    destroyA11yAudit();
  });

  it('does not reference #a11y-widget-btn or #a11y-widget-panel in init', () => {
    // The standalone module should work without any Hermes widget
    initA11yAudit();
    const panel = document.querySelector('.a11y-tester-panel');
    expect(panel).not.toBeNull();
    destroyA11yAudit();
  });
});
