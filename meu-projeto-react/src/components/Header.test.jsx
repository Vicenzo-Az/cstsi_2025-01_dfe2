// src/components/Header.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  it('exibe o título da aplicação', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Plataforma de Análise de Dados')).toBeInTheDocument();
  });

  it('mostra link de login quando não autenticado', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
});