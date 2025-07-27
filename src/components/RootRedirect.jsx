// src/components/RootRedirect.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';

export default function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return <Navigate to={isAuthenticated ? '/dashboard' : '/home'} replace />;
}
