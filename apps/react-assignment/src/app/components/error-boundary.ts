import React, { Component, ReactNode } from 'react';
import { ErrorBlock } from '@ui-kit';

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};
type ErrorBoundaryProps = {
  children: ReactNode;
};
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.setState({ hasError: true, error });
  }
  render() {
    if ((this.state as ErrorBoundaryState).hasError) {
      return React.createElement(ErrorBlock, {
        title: 'Error',
        message: this.state?.error?.message || 'Something went wrong.',
      });
    }
    return (this.props as ErrorBoundaryProps).children;
  }
}
