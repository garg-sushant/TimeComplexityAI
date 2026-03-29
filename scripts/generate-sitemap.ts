import fs from 'fs';
import path from 'path';
import { SITE_URL, blogMetadata, tutorialMetadata } from '../src/data/contentMetadata';

const routes = [
  '/',
  '/time-complexity-calculator',
  '/space-complexity-calculator',
  '/tutorials',
  ...tutorialMetadata.map((tutorial) => `/tutorials/${tutorial.id}`),
  '/inside-math',
  '/blog',
  ...blogMetadata.map((post) => `/blog/${post.slug}`),
];

function priorityForRoute(route: string) {
  if (route === '/' || route.includes('calculator')) {
    return '1.0';
  }

  if (route.startsWith('/tutorials/') || route.startsWith('/blog/')) {
    return '0.8';
  }

  return '0.7';
}

function generateSitemap() {
  const now = new Date().toISOString();
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorityForRoute(route)}</priority>
  </url>`,
  )
  .join('')}
</urlset>`;

  const publicPath = path.resolve(process.cwd(), 'public');

  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  const sitemapPath = path.join(publicPath, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent.trim());

  console.log(`Success! Sitemap created at ${sitemapPath}`);
}

generateSitemap();
