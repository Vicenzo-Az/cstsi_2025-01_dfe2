// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setAuthToken, isTokenExpired } from '../services/authService';

const AuthContext = createContext();

// Componente de fallback para carregamento
const AuthLoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #e0e0e0',
        borderTop: '5px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 20px'
      }}></div>
      <p>Carregando aplicação...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Função para buscar dados do usuário
  const fetchCurrentUser = useCallback(async (token) => {
    try {
      const response = await api.get('/auth/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Falha ao buscar dados do usuário:', error);
      return null;
    }
  }, []);

  // Função para atualizar o token de acesso
  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Token de refresh não encontrado');
      }

      const response = await api.post('/token/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('token_exp', Date.now() + 5 * 60 * 1000); // 5 minutos
      return access;
    } catch (error) {
      console.error('Falha ao atualizar token:', error);
      throw error;
    }
  }, []);

  // Efeito para inicializar a autenticação
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        // Se não há tokens, usuário não está autenticado
        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          return;
        }

        // Verifica se o token de acesso está expirado
        if (isTokenExpired()) {
          try {
            // Tenta renovar o token
            const newAccessToken = await refreshAccessToken();
            setAuthToken(newAccessToken);
            
            // Busca dados do usuário com o novo token
            const userData = await fetchCurrentUser(newAccessToken);
            if (userData) {
              setUser(userData);
            }
          } catch (refreshError) {
            console.error('Falha ao renovar token:', refreshError);
            logout();
          }
        } else {
          // Token ainda válido, busca dados do usuário
          const userData = await fetchCurrentUser(accessToken);
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Erro na inicialização da autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Configura um intervalo para verificar a expiração do token periodicamente
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        console.log('Token expirado, tentando renovar...');
        refreshAccessToken().catch(() => {
          console.log('Falha ao renovar token, fazendo logout...');
          logout();
        });
      }
    }, 300000); // Verifica a cada 5 minutos

    return () => clearInterval(interval);
  }, [fetchCurrentUser, refreshAccessToken]);

  // Função de login
  const login = async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      const { access, refresh } = response.data;

      // Armazena tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('token_exp', Date.now() + 5 * 60 * 1000); // 5 minutos

      // Busca dados do usuário
      const userData = await fetchCurrentUser(access);
      if (userData) {
        setUser(userData);
        setAuthToken(access);
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_exp');
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  };

  // Se estiver carregando, exibe o fallback
  if (isLoading) {
    return <AuthLoadingFallback />;
  }

  // Provedor de contexto
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
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