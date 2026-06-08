import React from 'react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#F4F1EA',
          color: 'var(--color-uvac-dark, #0f291e)',
          fontFamily: '"Inter", system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '480px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '40px 32px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.03)'
          }}>
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.875rem',
              margin: '0 0 12px 0',
              fontWeight: 'bold',
              color: 'var(--color-uvac-dark, #0f291e)',
              lineHeight: '1.3'
            }}>
              Došlo je do greške.
            </h1>
            <p style={{
              fontSize: '1rem',
              margin: '0 0 28px 0',
              color: '#555555',
              lineHeight: '1.6'
            }}>
              Molimo osvežite stranicu.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: 'var(--color-uvac-accent, #d4a373)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(212, 163, 115, 0.3)',
                transition: 'opacity 0.2s ease'
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              Osveži stranicu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
