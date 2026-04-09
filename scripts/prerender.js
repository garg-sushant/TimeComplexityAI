import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * 🛠️ Robust Prerendering Script (Pure Node ESM)
 * This script runs AFTER the Vite SSR build, using the bundled output from dist-ssr/.
 * This avoids any issues with Node.js/tsx parsing complex React components.
 */
dotenv.config();

/**
 * 🌍 Robust Browser Global Shims for Node.js (SSR)
 * We use a Proxy-based "Nuclear" shim strategy to return safe dummy objects 
 * for any browser-only feature that isn't defined, preventing crashes.
 */
if (typeof globalThis !== 'undefined') {
  const createSafeProxy = (name, base = {}) => {
    return new Proxy(base, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (typeof prop === 'string' && prop.startsWith('on')) return () => {};
        if (prop === 'toString') return () => `[Shim Proxy ${name}]`;
        if (prop === Symbol.toPrimitive) return () => 0;

        // Common DOM properties that should return standard values
        if (prop === 'nodeType') return 1;
        if (prop === 'childNodes') return [];
        if (prop === 'firstChild') return null;
        if (prop === 'nextSibling') return null;
        if (prop === 'parentNode') return null;
        if (prop === 'style') return {};
        if (prop === 'attributes') return [];

        // Return a dummy function that's also a proxy (chainable)
        const dummy = function(...args) { return createSafeProxy(`${name}.${String(prop)}()`); };
        Object.defineProperty(dummy, 'name', { value: String(prop) });
        return createSafeProxy(`${name}.${String(prop)}`, dummy);
      }
    });
  };

  const shims = {
    window: globalThis,
    self: globalThis,
    document: createSafeProxy('document', {
      createElement: () => createSafeProxy('element', { style: {}, appendChild: () => {}, setAttribute: () => {} }),
      getElementsByTagName: () => [],
      querySelector: () => null,
      getElementById: () => null,
      head: createSafeProxy('head'),
      body: createSafeProxy('body'),
      documentElement: createSafeProxy('documentElement'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    navigator: createSafeProxy('navigator', { userAgent: 'Node.js', clipboard: { writeText: () => Promise.resolve() } }),
    location: createSafeProxy('location', { href: '', pathname: '/', search: '', hash: '' }),
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {} }),
    localStorage: createSafeProxy('localStorage'),
    sessionStorage: createSafeProxy('sessionStorage'),
    Image: function() { return createSafeProxy('Image'); },
    Prism: createSafeProxy('Prism', { highlightAll: () => {}, languages: {}, plugins: {}, hooks: { add: () => {} } }),
    atob: (str) => typeof str === 'string' ? Buffer.from(str, 'base64').toString('binary') : '',
    btoa: (str) => typeof str === 'string' ? Buffer.from(str, 'binary').toString('base64') : '',
    // Base DOM Classes
    Node: class {},
    Element: class {},
    HTMLElement: class {},
    Event: class {},
    CustomEvent: class {},
    SVGElement: class {},
  };

  Object.entries(shims).forEach(([key, value]) => {
    if (!globalThis[key] || (key === 'navigator' && !globalThis[key].userAgent)) {
      try {
        Object.defineProperty(globalThis, key, {
          value,
          writable: true,
          configurable: true,
        });
      } catch (e) {
        // Already defined or non-configurable
      }
    }
  });

  // Re-verify window and self pointers
  globalThis.window = globalThis;
  globalThis.self = globalThis;

  // Framer Motion touches browser globals during prerender.
  if (typeof globalThis.addEventListener !== 'function') {
    globalThis.addEventListener = () => {};
  }

  if (typeof globalThis.removeEventListener !== 'function') {
    globalThis.removeEventListener = () => {};
  }

  if (typeof globalThis.dispatchEvent !== 'function') {
    globalThis.dispatchEvent = () => false;
  }

  if (typeof globalThis.requestAnimationFrame !== 'function') {
    globalThis.requestAnimationFrame = (callback) =>
      setTimeout(() => callback(Date.now()), 0);
  }

  if (typeof globalThis.cancelAnimationFrame !== 'function') {
    globalThis.cancelAnimationFrame = (handle) => clearTimeout(handle);
  }

  if (typeof globalThis.getComputedStyle !== 'function') {
    globalThis.getComputedStyle = () => ({
      getPropertyValue: () => '',
    });
  }
}

// 1. Load the pre-extracted routes
const routesPath = path.resolve(process.cwd(), 'scripts/routes.json');
if (!fs.existsSync(routesPath)) {
  console.warn('⚠️ No routes.json found. Skipping prerender.');
  process.exit(0);
}
const prerenderRoutes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

// 2. Import the bundled SSR renderer
const ssrPath = path.resolve(process.cwd(), 'dist-ssr/entry-server.js');
if (!fs.existsSync(ssrPath)) {
  console.error(`❌ SSR build not found at ${ssrPath}. Run 'vite build --ssr' first.`);
  process.exit(1);
}

// Convert Windows path to File URL for standard ESM import()
const ssrUrl = `file://${ssrPath.replace(/\\/g, '/')}`;
const { renderRoute } = await import(ssrUrl);

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

function stripRouteAgnosticHead(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<meta name="keywords"[^>]*>/i, '');
}

function filePathForRoute(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Build template not found at ${templatePath}`);
  }

  const baseTemplate = stripRouteAgnosticHead(fs.readFileSync(templatePath, 'utf8'));

  for (const route of prerenderRoutes) {
    try {
      console.log(`Prerendering ${route}`);
      const { appHtml, headTags } = await renderRoute(route);
      const pageHtml = baseTemplate
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace('</head>', `${headTags}</head>`);

      const outputPath = filePathForRoute(route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, pageHtml);
    } catch (error) {
      console.error(`Prerender failed on route: ${route}`, error);
      // We don't crash the whole build if one route fails, but we show a warning
    }
  }

  console.log(`Prerendered ${prerenderRoutes.length} routes into ${distDir}`);
}

prerender().catch((error) => {
  console.error('Prerender failed', error);
  process.exit(1);
});
