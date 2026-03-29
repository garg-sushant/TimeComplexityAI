import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppRoutes, LoadingFallback } from './AppRoutes';

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <AppRoutes />
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
