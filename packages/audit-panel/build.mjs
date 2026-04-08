#!/usr/bin/env node
/**
 * Build script for @a11y-toolkit/audit-panel
 * Produces:
 *   dist/audit-panel.iife.js  — browser-consumable IIFE bundle (JS + CSS inlined)
 *   dist/bookmarklet.js       — tiny javascript: URL that loads the bundle
 */
import { build } from 'esbuild';
import { writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const docsDir = resolve(__dirname, '../../docs');
const PAGES_BUNDLE_URL = 'https://elizabeth1979.github.io/a11y-engineering-toolkit/audit-panel.iife.js';

mkdirSync(distDir, { recursive: true });
mkdirSync(docsDir, { recursive: true });

// 1. Build IIFE bundle with CSS inlined as text
const cssLoaderPlugin = {
  name: 'css-text',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const { readFileSync } = await import('fs');
      const css = readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(css)};`,
        loader: 'js',
      };
    });
  },
};

await build({
  entryPoints: [resolve(__dirname, 'src/entry-iife.js')],
  bundle: true,
  format: 'iife',
  globalName: 'A11yToolkit',
  outfile: resolve(distDir, 'audit-panel.iife.js'),
  minify: true,
  plugins: [cssLoaderPlugin],
});

console.log('  Built dist/audit-panel.iife.js');
copyFileSync(resolve(distDir, 'audit-panel.iife.js'), resolve(docsDir, 'audit-panel.iife.js'));
console.log('  Copied docs/audit-panel.iife.js');

// 2. Generate bookmarklet snippet
const bookmarkletCode = [
  `javascript:void(function(){`,
  `if(window.__a11yLoaded){window.A11yToolkit&&window.A11yToolkit.destroyA11yAudit();delete window.__a11yLoaded;return}`,
  `var s=document.createElement('script');`,
  `s.src='${PAGES_BUNDLE_URL}';`,
  `s.onload=function(){window.__a11yLoaded=true};`,
  `document.head.appendChild(s)`,
  `}())`,
].join('');

writeFileSync(resolve(distDir, 'bookmarklet.js'), bookmarkletCode, 'utf8');
writeFileSync(resolve(docsDir, 'bookmarklet.js'), bookmarkletCode, 'utf8');
console.log('  Built dist/bookmarklet.js');
console.log('  Copied docs/bookmarklet.js');
console.log('  Done.');
