import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
          <h3 className='text-lg font-semibold text-red-800 mb-2'>
            Wystąpił błąd
          </h3>
          <p className='text-red-600 mb-4'>
            Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'
          >
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
