// src/errorBoundary/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 text-center">
          <h1>Algo deu errado!</h1>
          <p className="text-danger">{this.state.error.message}</p>
          <button 
            className="btn btn-primary mt-3"
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