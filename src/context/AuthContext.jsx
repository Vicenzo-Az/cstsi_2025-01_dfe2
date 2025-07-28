import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para fazer login
  const login = async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      const { access, refresh } = response.data;
      
      // Salva tokens no localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Busca dados do usuário
      const userResponse = await api.get('/auth/user/');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Erro ao fazer login' 
      };
    }
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  // Função para registrar usuário
  const register = async (userData) => {
    try {
      await api.post('/auth/signup/', userData);
      return { success: true };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Erro ao registrar usuário' 
      };
    }
  };

  // Verificar se usuário está autenticado na inicialização
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/user/');
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Token inválido, limpa storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}