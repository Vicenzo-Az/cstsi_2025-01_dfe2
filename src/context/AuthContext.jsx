// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao montar, tenta recuperar e validar o token existente
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Define header para todas as requisições
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
          // Busca dados do usuário autenticado
          const { data } = await api.get('/auth/user/');
          setUser(data);
        } catch (err) {
          console.error('Erro ao validar token existente:', err);
          localStorage.removeItem('access_token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Realiza o login: armazena token, busca user e atualiza estado
  const login = async (token) => {
    try {
      // 1) Armazena token e ajusta header
      localStorage.setItem('access_token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // 2) Busca dados do usuário
      const { data } = await api.get('/auth/user/');
      setUser(data);
    } catch (err) {
      console.error('Erro no login ao buscar usuário:', err);
      // Caso falhe, limpa tudo
      localStorage.removeItem('access_token');
      setUser(null);
      throw err; // permite tratar o erro na página de login, se desejar
    }
  };

  // Desloga: limpa token, header e usuário
  const logout = () => {
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading
        ? <div>Carregando autenticação...</div>
        : children
      }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
