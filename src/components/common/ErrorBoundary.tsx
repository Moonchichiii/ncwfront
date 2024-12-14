import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-surface-darker">
          <main className="text-center" role="main">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
              Something went wrong.
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              We&apos;re sorry for the inconvenience. Please try refreshing the
              page.
            </p>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;