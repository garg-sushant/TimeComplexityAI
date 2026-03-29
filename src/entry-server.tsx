import { Suspense } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { PassThrough } from 'stream';
import { LoadingFallback } from './AppRoutes.tsx';
import { AppRoutesServer } from './AppRoutesServer.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { AuthContext } from './contexts/AuthContext.tsx';

interface HelmetContextValue {
  helmet?: HelmetServerState | null;
}

function renderHead(context: HelmetContextValue) {
  const helmet = context.helmet;

  if (!helmet) {
    return '';
  }

  return [
    helmet.title?.toString() ?? '',
    helmet.meta?.toString() ?? '',
    helmet.link?.toString() ?? '',
    helmet.script?.toString() ?? '',
  ].join('');
}

function splitHeadTagsFromMarkup(markup: string) {
  const tagPatterns = [
    /^<title\b[\s\S]*?<\/title>/i,
    /^<meta\b[^>]*>/i,
    /^<link\b[^>]*>/i,
    /^<script\b[\s\S]*?<\/script>/i,
  ];
  let remainingMarkup = markup;
  let headTags = '';

  while (true) {
    const match = tagPatterns
      .map((pattern) => remainingMarkup.match(pattern))
      .find(Boolean);

    if (!match) {
      break;
    }

    headTags += match[0];
    remainingMarkup = remainingMarkup.slice(match[0].length);
  }

  return {
    headTags,
    appHtml: remainingMarkup,
  };
}

export async function renderRoute(url: string) {
  const helmetContext: HelmetContextValue = {};

  const appHtml = await new Promise<string>((resolve, reject) => {
    const stream = new PassThrough();
    let html = '';
    let abortTimer: ReturnType<typeof setTimeout> | undefined;

    stream.on('data', (chunk) => {
      html += chunk.toString();
    });

    stream.on('end', () => {
      if (abortTimer) {
        clearTimeout(abortTimer);
      }

      resolve(html);
    });

    stream.on('error', (error) => {
      if (abortTimer) {
        clearTimeout(abortTimer);
      }

      reject(error);
    });

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <ErrorBoundary>
          <AuthContext.Provider value={{ user: null, loading: false }}>
            <MemoryRouter initialEntries={[url]}>
              <Suspense fallback={<LoadingFallback />}>
                <AppRoutesServer />
              </Suspense>
            </MemoryRouter>
          </AuthContext.Provider>
        </ErrorBoundary>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(stream);
        },
        onError(error) {
          if (abortTimer) {
            clearTimeout(abortTimer);
          }

          reject(error);
        },
      },
    );

    abortTimer = setTimeout(() => abort(), 15000);
  });

  const extracted = splitHeadTagsFromMarkup(appHtml);
  const contextHead = renderHead(helmetContext);

  return {
    appHtml: extracted.appHtml,
    headTags: extracted.headTags || contextHead,
  };
}
