import fs from 'fs';
import path from 'path';
import { prerenderRoutes } from '../src/data/contentMetadata';
import { renderRoute } from '../src/entry-server';

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

function stripRouteAgnosticHead(template: string) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<meta name="keywords"[^>]*>/i, '');
}

function filePathForRoute(route: string) {
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
      console.error(`Prerender failed on route: ${route}`);
      throw error;
    }
  }

  console.log(`Prerendered ${prerenderRoutes.length} routes into ${distDir}`);
}

prerender().catch((error) => {
  console.error('Prerender failed', error);
  process.exit(1);
});
