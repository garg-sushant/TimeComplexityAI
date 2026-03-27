import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://algostory.com';

const routes = [
  '/',
  '/time-complexity-calculator',
  '/space-complexity-calculator',
  '/tutorials',
  '/inside-math',
  '/blog/big-o-notation-explained',
  '/blog/bubble-sort-time-complexity',
  '/blog/merge-sort-time-complexity'
];

function generateSitemap() {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' || route.includes('calculator') ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
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
