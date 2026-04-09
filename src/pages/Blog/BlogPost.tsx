import { Link, useParams } from 'react-router-dom';
import { BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import Seo from '../../components/Seo';
import { SITE_URL } from '../../data/contentMetadata';
import { blogPosts, blogPostBySlug } from '../../data/blogPosts';
import NotFound from '../NotFound';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !blogPostBySlug[slug]) {
    return <NotFound />;
  }

  const post = blogPostBySlug[slug];
  const relatedPosts = blogPosts.filter((item) => item.slug !== slug).slice(0, 2);
  const url = `${SITE_URL}/blog/${slug}`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Organization',
        name: 'TimeComplexityAI',
      },
      publisher: {
        '@type': 'Organization',
        name: 'TimeComplexityAI',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/favicon.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      url,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Seo
        title={`${post.title} | TimeComplexityAI Blog`}
        description={post.description}
        path={`/blog/${slug}`}
        type="article"
        keywords={`${post.title}, algorithm, big o notation, sorting, complexity analysis`}
        schema={structuredData}
      />

      <Breadcrumbs />

      <main className="surface-container-lowest p-8 md:p-12 rounded-3xl border-4 border-on-background shadow-[12px_12px_0_#2d2f31]">
        <header className="mb-10 text-center">
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline font-black text-4xl md:text-5xl leading-tight mb-4">{post.title}</h1>
          <p className="text-xl text-on-surface-variant italic">{post.description}</p>
        </header>

        <div className="bg-on-background/10 h-1 w-full my-8 rounded-full" />

        {post.content}

        <div className="mt-16 p-6 bg-secondary-container rounded-xl border-2 border-on-background flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-on-secondary-container shrink-0" />
          <div>
            <h2 className="font-bold text-lg text-on-secondary-container mb-2">Want to see this in action?</h2>
            <p className="text-on-secondary-container mb-4">
              Jump directly into the time complexity calculator to see how code translates to Big O growth.
            </p>
            <Link
              to="/time-complexity-calculator"
              className="inline-flex items-center gap-2 px-6 py-2 bg-on-background text-background font-bold rounded-lg shadow-sm hover:translate-y-px transition-transform"
            >
              Open Time Complexity Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="mb-6 font-headline text-3xl font-black uppercase italic tracking-tighter">
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((item) => (
              <article
                key={item.slug}
                className="rounded-3xl border-4 border-on-background bg-white p-6 shadow-[8px_8px_0_#0f172a]"
              >
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">
                  {item.readTime}
                </p>
                <h3 className="mb-3 font-headline text-2xl font-black leading-tight">
                  <Link to={`/blog/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h3>
                <p className="mb-4 text-sm font-bold leading-relaxed text-on-surface-variant">
                  {item.description}
                </p>
                <Link
                  to={`/blog/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-black text-primary"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
