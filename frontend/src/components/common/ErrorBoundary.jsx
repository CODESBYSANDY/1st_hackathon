import React from 'react';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[AVIRA ErrorBoundary] Uncaught runtime error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#FEF2F2',
                color: '#DC2626',
                display: 'grid',
                placeItems: 'center',
                marginBottom: '4px',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: '800',
                color: '#0F172A',
                margin: 0,
              }}
            >
              Something went wrong.
            </h2>

            <p
              style={{
                fontSize: '0.92rem',
                color: '#64748B',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              An unexpected error occurred while rendering this page. Try returning to your dashboard or reloading.
            </p>

            {this.state.error?.message && (
              <div
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#64748B',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  overflowX: 'auto',
                  maxHeight: '100px',
                }}
              >
                {this.state.error.message}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
                width: '100%',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.22)',
                }}
              >
                <LayoutDashboard size={16} />
                <span>Back to Dashboard</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  color: '#334155',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={15} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
