import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Nenhum interceptor de auth aqui, pois tudo está em AuthContext
export default api;
