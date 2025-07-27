// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Contexto de autenticação
import { AuthProvider } from './context/AuthContext';

// Páginas
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DataSourcePage from './pages/DataSourcePage/DataSourcePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

// Novos componentes de roteamento
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import RootRedirect from './components/RootRedirect';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirecionamento raiz */}
          <Route path="/" element={<RootRedirect />} />

          {/* Rotas públicas */}
          <Route
            path="/home"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />

          {/* Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/datasources"
            element={
              <ProtectedRoute>
                <DataSourcePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
