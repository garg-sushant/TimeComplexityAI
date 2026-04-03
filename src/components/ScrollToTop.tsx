import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 🏔️ ScrollToTop Component
 * 
 * In React Single Page Applications (SPAs), the browser preserves the 
 * scroll position on navigation by default. This component resets it 
 * to the top (0,0) whenever the route (location.pathname) changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent SSR errors in Node.js environment during build
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
