import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

describe('Build output — bundle', () => {
  it('dist/audit-panel.iife.js exists', () => {
    expect(existsSync(resolve(distDir, 'audit-panel.iife.js'))).toBe(true);
  });

  it('bundle is an IIFE that does not use import/export', () => {
    const code = readFileSync(resolve(distDir, 'audit-panel.iife.js'), 'utf8');
    // IIFE bundles should not have bare import/export statements
    expect(code).not.toMatch(/^export /m);
    expect(code).not.toMatch(/^import /m);
  });

  it('bundle exposes initA11yAudit on globalThis.A11yToolkit', () => {
    const code = readFileSync(resolve(distDir, 'audit-panel.iife.js'), 'utf8');
    expect(code).toContain('A11yToolkit');
  });

  it('bundle includes CSS injection (styles embedded)', () => {
    const code = readFileSync(resolve(distDir, 'audit-panel.iife.js'), 'utf8');
    // The CSS should be inlined into the JS bundle
    expect(code).toContain('a11y-tester-toggle');
  });
});

describe('Build output — bookmarklet', () => {
  it('dist/bookmarklet.js exists', () => {
    expect(existsSync(resolve(distDir, 'bookmarklet.js'))).toBe(true);
  });

  it('bookmarklet starts with javascript:', () => {
    const code = readFileSync(resolve(distDir, 'bookmarklet.js'), 'utf8').trim();
    expect(code.startsWith('javascript:')).toBe(true);
  });

  it('bookmarklet is under 2000 characters (it loads a script, not embeds all)', () => {
    const code = readFileSync(resolve(distDir, 'bookmarklet.js'), 'utf8').trim();
    expect(code.length).toBeLessThan(2000);
  });

  it('bookmarklet references a .js file to load', () => {
    const code = readFileSync(resolve(distDir, 'bookmarklet.js'), 'utf8').trim();
    // It should create a script tag or reference the bundle URL
    expect(code).toContain('script');
  });
});
