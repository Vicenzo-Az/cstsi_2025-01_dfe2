// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Ou você pode retornar um spinner/placeholder mais elaborado
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    // Redireciona para /login se não estiver logado
    return <Navigate to="/login" replace />;
  }

  // Renderiza as rotas filhas (definidas em App.jsx)
  return <Outlet />;
}
