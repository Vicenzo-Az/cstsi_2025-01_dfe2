import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Bem-vindo, {user.name}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>Sair</button>
        </div>
      </header>
      
      <main className={styles.content}>
        <div className={styles.card}>
          <h2>Estatísticas</h2>
          <p>Conteúdo do dashboard aqui...</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;