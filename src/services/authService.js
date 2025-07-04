// src/services/authService.js
import api from './api';

// Grava ou limpa tokens em localStorage
export const setAuthToken = (accessToken, refreshToken = null, expiresIn = null) => {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    if (expiresIn) {
      // expira em `Date.now() + expiresIn * 1000` (expiresIn em segundos)
      localStorage.setItem('token_exp', Date.now() + expiresIn * 1000);
    }
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_exp');
  }
};

// Verifica se o token está expirado (ou prestes a expirar)
export const isTokenExpired = () => {
  const exp = localStorage.getItem('token_exp');
  return !exp || Date.now() >= parseInt(exp, 10);
};

// Faz refresh do access token usando o refresh token
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('No refresh token available');

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/token/refresh/`,
    { refresh }
  );
  const { access, refresh: newRefresh, expires_in } = response.data;
  // Atualiza os tokens na storage
  setAuthToken(access, newRefresh, expires_in);
  return access;
};
