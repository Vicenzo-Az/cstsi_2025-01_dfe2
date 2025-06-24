// Função para configurar token no cabeçalho do axios
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_exp');
  }
};

// Verifica se o token está expirado
export const isTokenExpired = () => {
  const expiration = localStorage.getItem('token_exp');
  return !expiration || Date.now() > parseInt(expiration);
};

// Função para refresh token (opcional, já implementada no AuthContext)
export const refreshAccessToken = async () => {
  // Implementação pode ser similar à do AuthContext, se necessário em outros lugares
};