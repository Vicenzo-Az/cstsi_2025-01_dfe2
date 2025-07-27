// src/pages/DashboardPage/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const go = (path) => () => navigate(path, { replace: true });

  const getUserDisplayName = () => {
    if (!user) return 'Usuário';
    if (user.first_name?.trim()) return user.first_name;
    if (user.name?.trim()) return user.name;
    if (user.username?.trim()) return user.username;
    return user.email?.split('@')[0] || 'Usuário';
  };

  if (!user) {
    return <div className={styles.loading}>Carregando autenticação…</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.logo}>CoffeeBase</div>
        <div className={styles.userSection}>
          <span className={styles.userName}>Olá, {getUserDisplayName()}</span>
          <button
            onClick={() => { logout(); navigate('/login', { replace: true }); }}
            className={styles.logoutButton}
          >
            Sair
          </button>
        </div>
      </div>

      <section className={styles.menu}>
        <div className={styles.menuCard} onClick={go('/datasources')}>
          <h3>Fontes de Dados</h3>
          <p>Gerencie suas conexões e importações</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboards')}>
          <h3>Dashboards</h3>
          <p>Crie visualizações interativas</p>
        </div>
        <div className={styles.menuCard} onClick={go('/profile')}>
          <h3>Minha Conta</h3>
          <p>Editar perfil e segurança</p>
        </div>
        {/* Você pode manter ou remover os outros cartões conforme necessário */}
      </section>

      <section className={styles.stats}>
        <h2>Estatísticas</h2>
        <div className={styles.cards}>
          {[
            ['Total de Imports', '—'],
            ['Dashboards Criados', '—'],
            ['Alertas Ativos', '—'],
            ['Usuários Cadastrados', '—'],
          ].map(([label, value]) => (
            <div key={label} className={styles.card}>
              <h3>{label}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
