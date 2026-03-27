import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy loaded components for Performance Optimization (Task 4)
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const InsideMath = lazy(() => import('./pages/InsideMath'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loader spinner for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-8 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  {/* Dedicated SEO Calculator Paths */}
                  <Route path="time-complexity-calculator" element={<Home />} />
                  <Route path="space-complexity-calculator" element={<Home />} />
                  
                  {/* Tutorials & Advanced Paths */}
                  <Route path="tutorials" element={<Tutorials />} />
                  <Route path="inside-math" element={<InsideMath />} />
                  
                  {/* Dynamic Blog Mapping */}
                  <Route path="blog/:slug" element={<BlogPost />} />
                  
                  {/* Root redirects for user explicitly requested SEO paths */}
                  <Route path="big-o-notation-explained" element={<Navigate to="/blog/big-o-notation-explained" replace />} />
                  <Route path="bubble-sort-time-complexity" element={<Navigate to="/blog/bubble-sort-time-complexity" replace />} />
                  <Route path="merge-sort-time-complexity" element={<Navigate to="/blog/merge-sort-time-complexity" replace />} />
                  
                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
