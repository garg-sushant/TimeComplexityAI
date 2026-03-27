import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { searchTutorials } from '../lib/gemini';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { tutorialsData } from '../data/tutorials';
import { Tutorial } from '../types';

export default function Tutorials() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Guides');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchResult('');
    setSelectedTutorial(null);
    try {
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

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Knowledge Vault: Master Big O & Algorithms | AlgoStory</title>
        <meta name="description" content="Master Big O notation, dynamic programming, and data structures with our curated algorithm stories." />
        <link rel="canonical" href="https://algostory.com/tutorials" />
        <meta property="og:title" content="Knowledge Vault: Master Big O & Algorithms | AlgoStory" />
        <meta property="og:description" content="Master Big O notation, dynamic programming, and data structures." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://algostory.com/tutorials" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AlgoStory Algorithms Library",
            "description": "Learn computer science algorithms, data structures, and Big O complexity."
          })}
        </script>
      </Helmet>

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

      {searchResult && !selectedTutorial && (
        <div className="mb-16 bg-white p-10 rounded-3xl border-4 border-primary shadow-[12px_12px_0_#059669]">
          <h3 className="font-headline font-black text-2xl mb-4 text-primary">Search Results</h3>
          <div className="prose prose-emerald max-w-none font-body whitespace-pre-wrap">
            {searchResult}
          </div>
        </div>
      )}

      {selectedTutorial ? (
        <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-on-background shadow-[16px_16px_0_#0f172a] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setSelectedTutorial(null)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-label font-bold text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${selectedTutorial.bgClass}`}>
              <selectedTutorial.icon className={`w-8 h-8 ${selectedTutorial.colorClass}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-label font-bold uppercase tracking-widest px-2 py-0.5 rounded ${selectedTutorial.bgClass} ${selectedTutorial.colorClass}`}>
                  {selectedTutorial.category}
                </span>
                <span className="text-xs text-on-surface-variant font-bold">• {selectedTutorial.readTime}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-headline text-on-background leading-tight">
                {selectedTutorial.title}
              </h2>
            </div>
          </div>
          
          <div className="prose prose-lg prose-emerald max-w-none font-body text-on-surface leading-relaxed mt-8">
            {selectedTutorial.content}
          </div>
        </div>
      ) : (
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
                  className={`bg-white rounded-3xl p-8 border-4 border-on-background hover:shadow-[12px_12px_0_#0f172a] transition-all group cursor-pointer ${idx % 2 === 1 ? 'transform rotate-1' : 'transform -rotate-1'}`}
                  onClick={() => setSelectedTutorial(tutorial)}
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
                    {tutorial.title}
                  </h2>
                  <p className="text-on-surface-variant mb-6 text-sm font-bold leading-relaxed line-clamp-3">
                    {tutorial.description}
                  </p>
                  <button className={`px-8 py-3 rounded-full font-headline font-black text-sm transition-transform group-hover:-translate-y-1 ${tutorial.bgClass.replace('container', '600')} text-white border-4 border-on-background shadow-[4px_4px_0_#0f172a]`}>
                    Read More
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
