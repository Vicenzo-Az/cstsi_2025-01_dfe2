import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#d32f2f' }}>Algo deu errado!</h1>
          <pre style={{ 
            backgroundColor: '#ffebee', 
            padding: '15px',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            {this.state.error.toString()}
          </pre>
          <button 
            style={{
              marginTop: '15px',
              padding: '10px 15px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => window.location.reload()}
          >
            Recarregar Aplicação
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;