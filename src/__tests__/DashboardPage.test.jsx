import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage/DashboardPage';
import { AuthProvider } from '../context/AuthContext';
import api from '../services/api';

// mock da instância axios
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
  }
}));

describe('DashboardPage', () => {
  const fakeUser = { id: 42, username: 'az', email: 'az@example.com' };

  beforeEach(() => {
    // garante que, quando AuthProvider inicializar, o token exista
    window.localStorage.setItem('access_token', 'fake-jwt');
    // toda chamada a api.get devolve o usuário (tanto o /auth/user/ do provider quanto o do próprio page)
    api.get.mockResolvedValue({ data: fakeUser });
  });

  it('deve buscar e exibir os dados do usuário autenticado', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </MemoryRouter>
    );

    // findByText faz polling até encontrar o texto completo ou parcial
    const emailEl = await screen.findByText(/az@example\.com/);
    expect(emailEl).toBeInTheDocument();
    // e garantimos que chamamos o /auth/user/ ao menos uma vez
    expect(api.get).toHaveBeenCalledWith('/auth/user/');
  });
});
