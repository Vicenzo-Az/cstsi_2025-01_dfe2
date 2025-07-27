import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Toda vez que o accessToken mudar, configura o header padrão
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  // Função para tentar renovar o access token
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const { data } = await api.post('/auth/token/refresh/', { refresh: refreshToken });
      localStorage.setItem('access_token', data.access);
      setAccessToken(data.access);
      return data.access;
    } catch (err) {
      logout();
      return null;
    }
  }, [refreshToken]);

  // Interceptor para tratar 401 e tentar refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      r => r,
      async err => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const newToken = await refreshAccessToken();
          if (newToken) {
            original.headers['Authorization'] = `Bearer ${newToken}`;
            return api.request(original);
          }
        }
        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [refreshAccessToken]);

  // Tenta obter perfil atual ao entrar na app
  useEffect(() => {
    async function loadUser() {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me/'); // endpoint que retorna user
        setUser(data);
      } catch {
        // se falhar, força logout
        logout();
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [accessToken]);

  // Login: armazena tokens e redireciona
  const login = async (email, password) => {
    const { data } = await api.post('/auth/token/', { email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setAccessToken(data.access);
    setRefreshToken(data.refresh);
    // busca perfil imediatamente
    const { data: userData } = await api.get('/auth/me/');
    setUser(userData);
    navigate('/dashboard', { replace: true });
  };

  // Logout: limpa tudo
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
