import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Ghost, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <title>404 - Page Not Found | AlgoStory</title>
        <meta name="description" content="The page you are looking for has been moved or doesn't exist." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="w-32 h-32 bg-error-container rounded-full flex items-center justify-center mb-8 shadow-[8px_8px_0_#2d2f31] border-4 border-on-background">
        <Ghost className="w-16 h-16 text-error animate-bounce" />
      </div>
      
      <h1 className="text-5xl md:text-6xl font-headline font-black mb-4">
        O(NO!) <br/> Page Not Found
      </h1>
      <p className="text-xl text-on-surface-variant font-medium max-w-lg mb-8">
        It looks like the algorithm you were searching for has exceeded its bounds. Let's redirect you back to safety.
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link 
          to="/time-complexity-calculator" 
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-bold rounded-full border-4 border-on-background shadow-[4px_4px_0_#2d2f31] hover:translate-y-1 hover:shadow-none active:translate-y-2 transition-all"
        >
          Go to Home <ArrowRight className="w-5 h-5" />
        </Link>
        <Link 
          to="/tutorials" 
          className="flex items-center gap-2 px-6 py-3 bg-tertiary text-on-tertiary font-bold rounded-full border-4 border-on-background shadow-[4px_4px_0_#2d2f31] hover:translate-y-1 hover:shadow-none active:translate-y-2 transition-all"
        >
          Browse Tutorials
        </Link>
      </div>
    </div>
  );
}
