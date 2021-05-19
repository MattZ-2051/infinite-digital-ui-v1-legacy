import React from 'react';

type MyProps = {
  children: JSX.Element;
};
type MyState = { error: string | null; errorInfo: string | null };

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render(): JSX.Element {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h3>Something went wrong.</h3>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
