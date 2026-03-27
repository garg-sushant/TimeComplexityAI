import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import NotFound from '../NotFound';

// Mock database of blog articles. In a real app, this would be fetched from a CMS/API or Markdown files.
const blogPosts: Record<string, { title: string; description: string; content: React.ReactNode }> = {
  'big-o-notation-explained': {
    title: 'Big O Notation Explained: The Ultimate Guide',
    description: 'Learn Big O notation from scratch with easy-to-understand examples and visuals.',
    content: (
      <article className="prose prose-invert max-w-none space-y-4">
        <p>Big O notation is the language we use for talking about how long an algorithm takes to run...</p>
        <h2 className="text-2xl font-bold mt-8 text-primary">Why is it important?</h2>
        <p>Because it allows us to compare the efficiency of different algorithms objectively!</p>
      </article>
    )
  },
  'bubble-sort-time-complexity': {
    title: 'Bubble Sort Time Complexity: A Deep Dive',
    description: 'Understand why Bubble Sort is O(N^2) and how the arithmetic series proves its time complexity.',
    content: (
      <article className="prose prose-invert max-w-none space-y-4">
        <p>Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
        <h2 className="text-2xl font-bold mt-8 text-secondary">The N^2 Explanation</h2>
        <p>For an array of size N, the outer loop runs N times. The inner loop runs up to N times. Therefore N * N = N^2.</p>
      </article>
    )
  },
  'merge-sort-time-complexity': {
    title: 'Merge Sort Time Complexity: O(N log N) Explained',
    description: 'A detailed breakdown of Merge Sort and its divide-and-conquer time complexity.',
    content: (
      <article className="prose prose-invert max-w-none space-y-4">
        <p>Merge sort is a perfect example of Divide and Conquer...</p>
      </article>
    )
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogPosts[slug]) {
    return <NotFound />;
  }

  const post = blogPosts[slug];
  const url = `https://algostory.com/blog/${slug}`; // Update with real domain

  // JSON-LD Article Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Organization",
      "name": "AlgoStory"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AlgoStory",
      "logo": {
        "@type": "ImageObject",
        "url": "https://algostory.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Helmet>
        <title>{post.title} | AlgoStory Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

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
                <h4 className="font-bold text-lg text-on-secondary-container mb-2">Want to see this in action?</h4>
                <p className="text-on-secondary-container mb-4">Jump directly into our interactive analyzer to see how code translates to mathematical graphs.</p>
                <a href="/time-complexity-calculator" className="inline-block px-6 py-2 bg-on-background text-background font-bold rounded-lg shadow-sm hover:translate-y-px transition-transform">
                    Go to Calculator
                </a>
            </div>
        </div>
      </main>
    </div>
  );
}
