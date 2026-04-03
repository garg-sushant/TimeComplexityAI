import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const TutorialPost = lazy(() => import('./pages/TutorialPost'));
const InsideMath = lazy(() => import('./pages/InsideMath'));
const BlogIndex = lazy(() => import('./pages/Blog/BlogIndex'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const Layout = lazy(() => import('./components/Layout'));
const NotFound = lazy(() => import('./pages/NotFound'));

export function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/10 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="font-headline font-black text-primary uppercase tracking-tighter animate-pulse text-sm">Loading Story...</p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="time-complexity-calculator" element={<Home />} />
        <Route path="space-complexity-calculator" element={<Home />} />
        <Route path="big-o-calculator" element={<Navigate to="/time-complexity-calculator" replace />} />
        <Route path="code-complexity-analyzer" element={<Navigate to="/" replace />} />
        <Route path="bigocalc-alternative" element={<Navigate to="/" replace />} />

        <Route path="tutorials" element={<Tutorials />} />
        <Route path="tutorials/:slug" element={<TutorialPost />} />
        <Route path="inside-math" element={<InsideMath />} />
        <Route path="complexity-lab" element={<Navigate to="/inside-math" replace />} />        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />

        <Route path="big-o-notation-explained" element={<Navigate to="/blog/big-o-notation-explained" replace />} />
        <Route path="bubble-sort-time-complexity" element={<Navigate to="/blog/bubble-sort-time-complexity" replace />} />
        <Route path="merge-sort-time-complexity" element={<Navigate to="/blog/merge-sort-time-complexity" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
