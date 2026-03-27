import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-6">
          <div className="bg-error-container text-on-error-container p-8 rounded-2xl max-w-lg shadow-xl border-4 border-on-background">
            <h2 className="font-headline font-black text-3xl mb-4">Oops! Something broke.</h2>
            <p className="font-body mb-4">The code gremlins got into the machine.</p>
            <pre className="bg-on-background text-surface p-4 rounded-xl overflow-auto text-sm font-label">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 bg-on-background text-surface px-6 py-2 rounded-full font-headline font-bold hover:scale-105 transition-transform"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
