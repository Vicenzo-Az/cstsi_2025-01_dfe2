// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Exibir spinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  // Usuário não autenticado - redirecionar para login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rota requer admin mas usuário não é admin
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Usuário autenticado e tem permissão - renderizar conteúdo
  return children;
};

export default ProtectedRoute;