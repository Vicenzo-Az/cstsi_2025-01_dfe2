// src/pages/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Usa a instância axios unificada
      await api.post('auth/signup/', {
        username,
        email,
        password,
      });
      // Após cadastro bem‑sucedido, leva ao login
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Erro no cadastro:', err);
      // Exibe mensagem de erro genérica ou específica se vier do backend
      const msg = err.response?.data?.detail
        || 'Não foi possível criar a conta. Tente novamente.';
      setError(msg);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Crie sua conta</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="email">E‑mail</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
        <p className={styles.footerText}>
          Já tem conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}
