import axios from 'axios';
import { isTokenExpired, refreshAccessToken } from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor para adicionar token às requisições
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');
  
  if (token && isTokenExpired()) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      console.error('Falha ao renovar token:', error);
      return config;
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para tratar erros 401 (não autorizado)
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshAccessToken();
        setAuthToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Falha ao renovar token:', refreshError);
        // Redirecionar para login ou realizar logout
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;