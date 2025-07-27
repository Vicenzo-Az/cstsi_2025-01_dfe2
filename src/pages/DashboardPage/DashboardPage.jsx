// src/pages/DashboardPage/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const go = (path) => () => navigate(path, { replace: true });

  // Função para obter o nome de exibição do usuário
  const getUserDisplayName = () => {
    if (!user) return 'Usuário';
    
    // Prioridade: first_name > name > username > email
    if (user.first_name && user.first_name.trim()) {
      return user.first_name;
    }
    if (user.name && user.name.trim()) {
      return user.name;
    }
    if (user.username && user.username.trim()) {
      return user.username;
    }
    if (user.email) {
      return user.email.split('@')[0]; // Usa a parte antes do @ do email
    }
    
    return 'Usuário';
  };

  if (!user) {
    return <div className={styles.loading}>Carregando autenticação…</div>;
  }

  console.log('User data:', user); // Para debug - remova depois

  return (
    <div className={styles.container}>
      {/* Top bar igual à HomePage */}
      <div className={styles.topBar}>
        <div className={styles.logo}>CoffeeBase</div>
        <div className={styles.userSection}>
          <span className={styles.userName}>Olá, {getUserDisplayName()}</span>
          <button onClick={() => { logout(); navigate('/login', { replace: true }); }}
                  className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>

      {/* Menu de funcionalidades em cartões */}
      <section className={styles.menu}>
        <div className={styles.menuCard} onClick={go('/data-sources')}>
          <h3>Fontes de Dados</h3>
          <p>Gerencie suas conexões e importações</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboards')}>
          <h3>Dashboards</h3>
          <p>Crie visualizações interativas</p>
        </div>
        <div className={styles.menuCard} onClick={go('/reports')}>
          <h3>Relatórios</h3>
          <p>Gere análises detalhadas</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/processar-dados')}>
          <h3>Processar Dados</h3>
          <p>Execute ETLs e monitore o progresso</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/compartilhar-relatorio')}>
          <h3>Compartilhar</h3>
          <p>Envie por e‑mail ou link seguro</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/configurar-alertas')}>
          <h3>Alertas</h3>
          <p>Defina regras e notificações</p>
        </div>
        <div className={styles.menuCard} onClick={go('/admin/users')}>
          <h3>Usuários</h3>
          <p>Controle acessos e permissões</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/gerar-insights-ia')}>
          <h3>Insights com IA</h3>
          <p>Obtenha recomendações automatizadas</p>
        </div>
      </section>

      {/* Estatísticas resumidas */}
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
