#!/usr/bin/env node
/**
 * Build script for @a11y-toolkit/ux-widget
 * Produces:
 *   dist/ux-widget.iife.js        — browser-consumable IIFE bundle (JS + CSS inlined)
 *   dist/ux-widget-bookmarklet.js — tiny javascript: URL that loads the bundle
 */
import { build } from 'esbuild';
import { writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const docsDir = resolve(__dirname, '../../docs');
const PAGES_BUNDLE_URL = 'https://elizabeth1979.github.io/a11y-engineering-toolkit/ux-widget.iife.js';

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
  outfile: resolve(distDir, 'ux-widget.iife.js'),
  minify: true,
  plugins: [cssLoaderPlugin],
});

console.log('  Built dist/ux-widget.iife.js');
copyFileSync(resolve(distDir, 'ux-widget.iife.js'), resolve(docsDir, 'ux-widget.iife.js'));
console.log('  Copied docs/ux-widget.iife.js');

// 2. Generate bookmarklet snippet
const bookmarkletCode = [
  `javascript:void(function(){`,
  `if(window.__uxWidgetLoaded){window.A11yToolkit&&window.A11yToolkit.destroyUxWidget();delete window.__uxWidgetLoaded;return}`,
  `var s=document.createElement('script');`,
  `s.src='${PAGES_BUNDLE_URL}';`,
  `s.onload=function(){window.__uxWidgetLoaded=true};`,
  `document.head.appendChild(s)`,
  `}())`,
].join('');

writeFileSync(resolve(distDir, 'ux-widget-bookmarklet.js'), bookmarkletCode, 'utf8');
writeFileSync(resolve(docsDir, 'ux-widget-bookmarklet.js'), bookmarkletCode, 'utf8');
console.log('  Built dist/ux-widget-bookmarklet.js');
console.log('  Copied docs/ux-widget-bookmarklet.js');
console.log('  Done.');
