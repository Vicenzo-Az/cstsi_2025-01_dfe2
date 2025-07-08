// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  console.log('ProtectedRoute:', { isLoading, isAuthenticated });
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
