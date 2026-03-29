import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * 🛠️ Robust Prerendering Script (Pure Node ESM)
 * This script runs AFTER the Vite SSR build, using the bundled output from dist-ssr/.
 * This avoids any issues with Node.js/tsx parsing complex React components.
 */
dotenv.config();

// 1. Load the pre-extracted routes
const routesPath = path.resolve(process.cwd(), 'scripts/routes.json');
if (!fs.existsSync(routesPath)) {
  console.warn('⚠️ No routes.json found. Skipping prerender.');
  process.exit(0);
}
const prerenderRoutes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));

// 2. Import the bundled SSR renderer
// We use dynamic absolute path to ensure Node identifies it correctly as ESM on Windows
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
      throw error;
    }
  }

  console.log(`Prerendered ${prerenderRoutes.length} routes into ${distDir}`);
}

prerender().catch((error) => {
  console.error('Prerender failed', error);
  process.exit(1);
});
