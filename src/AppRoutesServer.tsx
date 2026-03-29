import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import TutorialPost from './pages/TutorialPost';
import InsideMath from './pages/InsideMath';
import BlogIndex from './pages/Blog/BlogIndex';
import BlogPost from './pages/Blog/BlogPost';
import NotFound from './pages/NotFound';

export function AppRoutesServer() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="time-complexity-calculator" element={<Home />} />
        <Route path="space-complexity-calculator" element={<Home />} />

        <Route path="tutorials" element={<Tutorials />} />
        <Route path="tutorials/:slug" element={<TutorialPost />} />
        <Route path="inside-math" element={<InsideMath />} />
        <Route path="complexity-lab" element={<Navigate to="/inside-math" replace />} />

        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />

        <Route path="big-o-notation-explained" element={<Navigate to="/blog/big-o-notation-explained" replace />} />
        <Route path="bubble-sort-time-complexity" element={<Navigate to="/blog/bubble-sort-time-complexity" replace />} />
        <Route path="merge-sort-time-complexity" element={<Navigate to="/blog/merge-sort-time-complexity" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
