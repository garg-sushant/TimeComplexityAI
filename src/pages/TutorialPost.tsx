import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Seo from '../components/Seo';
import { SITE_URL, tutorialMetadata } from '../data/contentMetadata';
import { tutorialsById } from '../data/tutorials';
import NotFound from './NotFound';

export default function TutorialPost() {
  const { slug } = useParams<{ slug: string }>();
  const [isHydrated, setIsHydrated] = useState(false);
  const tutorial = slug ? tutorialsById[slug] : undefined;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!tutorial) {
    return <NotFound />;
  }

  const relatedTutorials = tutorialMetadata
    .filter((item) => item.id !== tutorial.id && item.category === tutorial.category)
    .slice(0, 3);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: tutorial.title,
      description: tutorial.description,
      datePublished: '2024-01-01',
      author: {
        '@type': 'Organization',
        name: 'AlgoStory',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AlgoStory',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/tutorials/${tutorial.id}`,
      },
      url: `${SITE_URL}/tutorials/${tutorial.id}`,
      articleSection: tutorial.category,
      keywords: `${tutorial.title}, ${tutorial.category}, algorithm, big o notation`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl py-8">
      <Seo
        title={`${tutorial.title} | AlgoStory Tutorials`}
        description={tutorial.description}
        path={`/tutorials/${tutorial.id}`}
        keywords={`${tutorial.title}, ${tutorial.category}, algorithm tutorial, big o, time complexity, space complexity`}
        type="article"
        schema={schema}
      />

      <Breadcrumbs />

      <main className="rounded-3xl border-4 border-on-background bg-white p-8 shadow-[12px_12px_0_#0f172a] md:p-12">
        <header className="mb-10 border-b-4 border-on-background/10 pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="rounded-full bg-primary-container px-3 py-1 text-primary">
              {tutorial.category}
            </span>
            <span className="text-on-surface-variant">{tutorial.readTime}</span>
          </div>
          <h1 className="mb-4 font-headline text-4xl font-black leading-tight text-on-background md:text-5xl">
            {tutorial.title}
          </h1>
          <p className="max-w-3xl text-lg font-bold leading-relaxed text-on-surface-variant">
            {tutorial.description}
          </p>
        </header>

        <div className="prose prose-lg prose-slate max-w-none font-body">
          {isHydrated ? (
            tutorial.content
          ) : (
            <>
              <p>{tutorial.description}</p>
              <p>
                This {tutorial.category.toLowerCase()} guide explains the runtime and memory behavior
                behind {tutorial.title.toLowerCase()}, including practical examples and Big O tradeoffs.
              </p>
              <p>
                The full interactive lesson loads immediately after hydration so readers can explore
                formulas, code snippets, and visual complexity comparisons.
              </p>
            </>
          )}
        </div>

        <section className="mt-12 rounded-3xl border-4 border-on-background bg-secondary-container p-8">
          <h2 className="mb-3 font-headline text-3xl font-black uppercase italic tracking-tighter">
            Try The Time Complexity Calculator
          </h2>
          <p className="mb-5 text-sm font-bold leading-relaxed text-on-secondary-container">
            If you want to test similar code instantly, use the live time complexity calculator and
            compare the result with the explanation in this tutorial.
          </p>
          <Link
            to="/time-complexity-calculator"
            className="inline-flex items-center gap-2 rounded-full border-4 border-on-background bg-white px-6 py-3 font-headline text-sm font-black uppercase text-on-background shadow-[4px_4px_0_#0f172a]"
          >
            Open Time Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {relatedTutorials.length > 0 ? (
          <section className="mt-14 rounded-3xl border-4 border-on-background bg-surface-container-low p-8">
            <h2 className="mb-6 font-headline text-3xl font-black uppercase italic tracking-tighter">
              Related Tutorials
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedTutorials.map((item) => (
                <Link
                  key={item.id}
                  to={`/tutorials/${item.id}`}
                  className="rounded-2xl border-4 border-on-background bg-white p-5 shadow-[6px_6px_0_#0f172a] transition-transform hover:-translate-y-1"
                >
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">
                    {item.category}
                  </p>
                  <h3 className="mb-2 font-headline text-xl font-black leading-tight">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm font-bold leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-primary">
                    Read Guide
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
