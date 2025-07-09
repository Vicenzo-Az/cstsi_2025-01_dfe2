import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage/LoginPage';
import { AuthProvider } from '../context/AuthContext';
import api from '../services/api';

// mock da instância axios
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
  }
}));

describe('LoginPage', () => {
  const fakeToken = 'fake-jwt-token';
  const fakeUser  = { id: 1, username: 'qwert', email: 'a@b.com' };

  beforeEach(() => {
    api.post.mockReset();
    api.get .mockReset();
  });

  it('deve chamar /token/, buscar /auth/user/ e redirecionar para /dashboard', async () => {
    api.post.mockResolvedValueOnce({ data: { access: fakeToken } });
    api.get .mockResolvedValueOnce({ data: fakeUser });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/dashboard" element={<div>--- DASHBOARD ---</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    const [usernameInput] = screen.getAllByRole('textbox');
    const passwordInput   = screen.getByLabelText(/senha/i);
    const submitButton    = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(usernameInput, { target: { value: 'qwert' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText('--- DASHBOARD ---')).toBeInTheDocument()
    );

    // agora com a barra à esquerda
    expect(api.post).toHaveBeenCalledWith('/token/', {
      username: 'qwert',
      password: '1234'
    });
    expect(api.get).toHaveBeenCalledWith('/auth/user/');
  });
});
