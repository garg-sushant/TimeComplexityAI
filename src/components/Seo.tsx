import * as HelmetPkg from 'react-helmet-async';
const Helmet = (HelmetPkg as any).Helmet || (HelmetPkg as any).default?.Helmet || (HelmetPkg as any).default;

import { SITE_NAME, SITE_URL } from '../data/contentMetadata';

type StructuredData = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  keywords?: string;
  robots?: string;
  schema?: StructuredData | StructuredData[];
  image?: string;
}

function toAbsoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (path === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function Seo({
  title,
  description,
  path,
  type = 'website',
  keywords,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  schema,
  image,
}: SeoProps) {
  const url = toAbsoluteUrl(path);
  const imageUrl = image ? toAbsoluteUrl(image) : `${SITE_URL}/logo-zap.png`;
  const structuredData = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
