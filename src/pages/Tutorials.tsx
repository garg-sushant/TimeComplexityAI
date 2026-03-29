import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { tutorialsData } from '../data/tutorials';
import Seo from '../components/Seo';

export default function Tutorials() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All Guides');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchResult('');
    try {
      const { searchTutorials } = await import('../lib/gemini');
      const result = await searchTutorials(query);
      setSearchResult(result);
    } catch (error) {
      console.error(error);
      setSearchResult("The library is currently closed for maintenance. Try again later!");
    } finally {
      setIsSearching(false);
    }
  };

  const categories = ['All Guides', ...Array.from(new Set(tutorialsData.map(t => t.category)))];

  const filteredTutorials = activeCategory === 'All Guides' 
    ? tutorialsData 
    : tutorialsData.filter(t => t.category === activeCategory);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AlgoStory Tutorials',
    description:
      'Master Big O notation, data structures, graph algorithms, and sorting patterns with crawlable algorithm tutorials.',
    url: 'https://algostory.com/tutorials',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tutorialsData.map((tutorial, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tutorial.title,
        url: `https://algostory.com/tutorials/${tutorial.id}`,
        description: tutorial.description,
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <Seo
        title="Knowledge Vault: Master Big O, Algorithms, and Data Structures | AlgoStory"
        description="Master Big O notation, dynamic programming, graph traversal, and sorting with crawlable algorithm stories and interactive guides."
        path="/tutorials"
        keywords="algorithm tutorials, big o notation guide, binary search tutorial, merge sort tutorial, data structures"
        schema={schema}
      />

      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1 rounded-full bg-primary text-white font-label text-xs sm:text-sm font-black mb-4 border-2 border-on-background shadow-[3px_3px_0_#064e3b] transform -rotate-1">
            FREE RESOURCES
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-headline text-on-background tracking-tighter leading-[1] md:leading-[0.9] mb-6 sm:mb-8 uppercase italic">
            The <span className="text-primary italic">Knowledge</span> Library
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg mb-8">
            Crack the code without the headache. Explore our interactive guides to algorithms, complexity, and the secret life of data.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a concept..."
              className="flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-on-background bg-white font-label text-sm sm:text-md font-bold focus:outline-none focus:bg-primary/5 shadow-[4px_4px_0_rgba(15,23,42,0.1)]"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-primary text-white border-2 sm:border-4 border-on-background px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-headline font-black text-md sm:text-lg shadow-[4px_4px_0_#064e3b] sm:shadow-[6px_6px_0_#064e3b] hover:-translate-y-1 transition-all disabled:opacity-50"
            >
              {isSearching ? <span className="text-xs">Searching...</span> : <Search className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </form>
        </div>
        <div className="relative w-48 h-48 sm:w-80 sm:h-80 bg-secondary border-4 border-on-background rounded-3xl flex items-center justify-center transform rotate-2 overflow-hidden shadow-[8px_8px_0_#0c4a6e] sm:shadow-[12px_12px_0_#0c4a6e]">
          <BookOpen className="w-24 h-24 sm:w-40 sm:h-40 text-white" />
        </div>
      </div>

      {searchResult && (
        <div className="mb-16 bg-white p-10 rounded-3xl border-4 border-primary shadow-[12px_12px_0_#059669]">
          <h3 className="font-headline font-black text-2xl mb-4 text-primary">Search Results</h3>
          <div className="prose prose-emerald max-w-none font-body whitespace-pre-wrap">
            {searchResult}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4 space-y-8">
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline/30 shadow-lg">
            <h3 className="font-headline font-extrabold text-xl mb-6">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-black text-sm transition-all border-4 ${
                    activeCategory === category 
                      ? 'bg-primary text-white border-on-background shadow-[4px_4px_0_#064e3b]' 
                      : 'bg-white border-on-background text-on-background hover:bg-primary/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredTutorials.map((tutorial, idx) => (
              <article 
                key={tutorial.id}
                className={`bg-white rounded-3xl p-8 border-4 border-on-background hover:shadow-[12px_12px_0_#0f172a] transition-all group ${idx % 2 === 1 ? 'transform rotate-1' : 'transform -rotate-1'}`}
              >
                <div className={`aspect-video rounded-lg mb-6 overflow-hidden flex items-center justify-center relative ${tutorial.bgClass}`}>
                  <tutorial.icon className={`w-16 h-16 group-hover:scale-110 transition-transform duration-500 ${tutorial.colorClass}`} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-label font-bold uppercase tracking-widest px-2 py-0.5 rounded ${tutorial.bgClass} ${tutorial.colorClass}`}>
                    {tutorial.category}
                  </span>
                  <span className="text-xs text-on-surface-variant font-bold">• {tutorial.readTime}</span>
                </div>
                <h2 className="text-2xl font-black font-headline mb-3 text-on-background leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/tutorials/${tutorial.id}`}>{tutorial.title}</Link>
                </h2>
                <p className="text-on-surface-variant mb-6 text-sm font-bold leading-relaxed line-clamp-3">
                  {tutorial.description}
                </p>
                <Link
                  to={`/tutorials/${tutorial.id}`}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-headline font-black text-sm transition-transform group-hover:-translate-y-1 ${tutorial.bgClass} text-on-background border-4 border-on-background shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a]`}
                >
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
