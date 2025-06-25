// Constantes de autenticação
export const AUTH_STATUS = {
  LOGGED_IN: 'logged_in',
  LOGGED_OUT: 'logged_out',
  LOADING: 'loading'
};

// Papéis de usuário
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  ANALYST: 'analyst'
};

// Limites da aplicação
export const MAX_FILE_SIZE = 1048576; // 1MB
export const ALLOWED_FILE_TYPES = ['text/csv', 'application/vnd.ms-excel'];

// Mensagens de erro comuns
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  DEFAULT: 'Ocorreu um erro inesperado.',
  INVALID_CREDENTIALS: 'Credenciais inválidas. Tente novamente.'
};

// Configurações de API
export const API_TIMEOUT = 30000; // 30 segundos

// Textos reutilizáveis
export const APP_NAME = 'Plataforma de Análise de Dados';
export const APP_DESCRIPTION = 'Solução para PMEs analisarem seus dados';

// Outras constantes úteis
export const DATE_FORMAT = 'DD/MM/YYYY';
export const CURRENCY_FORMAT = {
  style: 'currency',
  currency: 'BRL'
};