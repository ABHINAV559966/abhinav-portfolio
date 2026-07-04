import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] items-center justify-center px-6">
          <div className="max-w-md rounded-lg border border-red-700/50 bg-red-900/10 p-8 text-center backdrop-blur">
            <FiAlertCircle className="mx-auto mb-4 text-4xl text-red-400" />
            <h2 className="mb-2 text-xl font-bold text-white">
              Something went wrong
            </h2>
            <p className="mb-4 text-sm text-slate-400">
              An error occurred while rendering this section. Please try
              refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-400">
                  Error details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-slate-900 p-2 text-xs text-red-300">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
            >
              <FiRefreshCw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
