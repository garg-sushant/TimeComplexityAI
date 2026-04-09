import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import Seo from '../../components/Seo';
import { SITE_URL } from '../../data/contentMetadata';
import { blogPosts } from '../../data/blogPosts';

export default function BlogIndex() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TimeComplexityAI Blog',
    description:
      'Algorithm explainers covering Big O notation, sorting complexity, and practical code analysis.',
    url: `${SITE_URL}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="TimeComplexityAI Blog: Big O Guides, Sorting Analysis, and Algorithm Articles"
        description="Read algorithm explainers on Big O notation, Bubble Sort, Merge Sort, and practical code complexity analysis."
        path="/blog"
        keywords="big o notation, algorithm blog, sorting algorithms, complexity analysis, interview preparation"
        schema={schema}
      />

      <section className="mb-14 flex flex-col gap-6 text-center">
        <div className="mx-auto w-fit rounded-full border-2 border-on-background bg-primary px-4 py-1 font-label text-xs font-black text-white shadow-[3px_3px_0_#064e3b]">
          SEO CONTENT HUB
        </div>
        <h1 className="font-headline text-4xl font-black uppercase italic tracking-tighter sm:text-6xl">
          The TimeComplexityAI Blog
        </h1>
        <p className="mx-auto max-w-3xl text-lg font-bold text-on-surface-variant">
          Practical guides on Big O notation, algorithm design, and the runtime patterns that show
          up again and again in interviews and production code.
        </p>
      </section>

      <section className="mb-14 rounded-[2.5rem] border-4 border-on-background bg-white p-8 shadow-[10px_10px_0_#0f172a]">
        <h2 className="mb-3 font-headline text-3xl font-black uppercase italic tracking-tighter">
          Need A Quick Answer First?
        </h2>
        <p className="mb-6 max-w-3xl text-sm font-bold leading-relaxed text-on-surface-variant">
          Use the free <Link to="/time-complexity-calculator" className="text-primary underline">time complexity calculator</Link> to
          estimate Big O directly from code, then use these articles to understand why the answer
          makes sense.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/time-complexity-calculator"
            className="inline-flex items-center gap-2 rounded-full border-4 border-on-background bg-primary px-6 py-3 font-headline text-sm font-black uppercase text-white shadow-[4px_4px_0_#064e3b]"
          >
            Open Time Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog/how-to-calculate-time-complexity"
            className="inline-flex items-center gap-2 rounded-full border-4 border-on-background bg-secondary-container px-6 py-3 font-headline text-sm font-black uppercase text-on-background shadow-[4px_4px_0_#0f172a]"
          >
            Read The Step-By-Step Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post, index) => (
          <article
            key={post.slug}
            className={`rounded-3xl border-4 border-on-background bg-white p-8 shadow-[10px_10px_0_#0f172a] transition-transform hover:-translate-y-1 ${
              index % 2 === 0 ? 'lg:-rotate-1' : 'lg:rotate-1'
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="rounded-2xl border-4 border-on-background bg-secondary-container p-4 shadow-[4px_4px_0_#0f172a]">
                <BookOpen className="h-8 w-8 text-on-secondary-container" />
              </div>
              <span className="text-sm font-bold text-on-surface-variant">{post.readTime}</span>
            </div>
            <h2 className="mb-3 font-headline text-3xl font-black leading-tight text-on-background">
              <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mb-6 text-sm font-bold leading-relaxed text-on-surface-variant">
              {post.description}
            </p>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-full border-4 border-on-background bg-primary px-6 py-3 font-headline text-sm font-black uppercase text-white shadow-[4px_4px_0_#064e3b] transition-transform hover:-translate-y-1"
            >
              Read Article
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
