import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';
import { blogMetadataBySlug, SITE_URL, tutorialMetadataById } from '../data/contentMetadata';

function formatTitle(segment: string) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 0) {
    return null;
  }

  const crumbs = pathnames.map((segment, index) => {
    const href = `/${pathnames.slice(0, index + 1).join('/')}`;
    let label = formatTitle(segment);

    if (pathnames[0] === 'tutorials' && index === 1 && tutorialMetadataById[segment as keyof typeof tutorialMetadataById]) {
      label = tutorialMetadataById[segment as keyof typeof tutorialMetadataById].title;
    }

    if (pathnames[0] === 'blog' && index === 1 && blogMetadataBySlug[segment as keyof typeof blogMetadataBySlug]) {
      label = blogMetadataBySlug[segment as keyof typeof blogMetadataBySlug].title;
    }

    return { href, label };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      ...crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 px-4 text-sm font-medium text-on-surface-variant">
        <Link to="/" className="flex items-center hover:text-primary transition-colors">
          <Home className="mr-1 h-4 w-4" />
          Home
        </Link>
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;

          return (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 opacity-50" />
              {last ? (
                <span className="max-w-[200px] truncate font-bold text-on-surface md:max-w-max" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.href} className="max-w-[150px] truncate hover:text-primary transition-colors md:max-w-max">
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
