import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary that captures initialization and render failures during deployment.
 * Logs comprehensive error details to console for debugging deployment issues.
 */
export class DeploymentDiagnosticsBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log comprehensive error details for deployment diagnostics
    console.error('=== DEPLOYMENT DIAGNOSTICS: ERROR BOUNDARY TRIGGERED ===');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    console.error('Error stack:', error.stack);
    
    if ('cause' in error && error.cause) {
      console.error('Error cause:', error.cause);
    }
    
    console.error('Component stack:', errorInfo.componentStack);
    console.error('=== END DEPLOYMENT DIAGNOSTICS ===');

    this.setState({
      error,
      errorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333'
          }}>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: '#ef4444'
            }}>
              Application Error
            </h1>
            <p style={{ 
              fontSize: '14px', 
              marginBottom: '16px',
              color: '#a1a1a1'
            }}>
              An error occurred during initialization. Check the browser console for detailed diagnostics.
            </p>
            <div style={{
              padding: '12px',
              backgroundColor: '#0a0a0a',
              borderRadius: '4px',
              fontSize: '13px',
              fontFamily: 'monospace',
              color: '#fca5a5',
              overflowX: 'auto'
            }}>
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
