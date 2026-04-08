import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('UX Widget — build output', () => {
  const distDir = resolve(__dirname, '../dist');

  it('dist/ux-widget.iife.js exists', () => {
    expect(existsSync(resolve(distDir, 'ux-widget.iife.js'))).toBe(true);
  });

  it('dist/ux-widget.iife.js is non-empty', () => {
    const content = readFileSync(resolve(distDir, 'ux-widget.iife.js'), 'utf8');
    expect(content.length).toBeGreaterThan(100);
  });

  it('dist/bookmarklet.js exists', () => {
    expect(existsSync(resolve(distDir, 'bookmarklet.js'))).toBe(true);
  });

  it('bookmarklet starts with javascript:', () => {
    const content = readFileSync(resolve(distDir, 'bookmarklet.js'), 'utf8');
    expect(content.startsWith('javascript:')).toBe(true);
  });

  it('IIFE bundle contains A11yToolkit global reference', () => {
    const content = readFileSync(resolve(distDir, 'ux-widget.iife.js'), 'utf8');
    expect(content).toContain('A11yToolkit');
  });
});
