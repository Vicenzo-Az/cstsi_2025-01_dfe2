// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';  // cliente Axios configurado com import.meta.env.VITE_API_URL

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se o usuário já está autenticado ao montar o provider
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // `api` já injeta o header Authorization automaticamente via interceptor
          const { data: userData } = await api.get('/auth/me/');  
          setUser(userData);
        } catch (err) {
          console.error('Erro ao verificar autenticação:', err);
          logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Faz login: salva token e dados do usuário
  const login = (accessToken, userData) => {
    localStorage.setItem('access_token', accessToken);
    setUser(userData);
  };

  // Faz logout: limpa token e usuário
  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  // Só renderiza os filhos depois de verificar o loading
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
