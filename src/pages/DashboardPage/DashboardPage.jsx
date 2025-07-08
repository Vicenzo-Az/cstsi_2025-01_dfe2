// src/pages/DashboardPage/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sair da aplicação
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Cada handler abaixo deve levar a um componente/página específica
  const handleImportData       = () => navigate('/dashboard/importar-dados');
  const handleProcessData      = () => navigate('/dashboard/processar-dados');
  const handleGenerateReport   = () => navigate('/dashboard/gerar-dashboard');
  const handleShareReport      = () => navigate('/dashboard/compartilhar-relatorio');
  const handleConfigureAlerts  = () => navigate('/dashboard/configurar-alertas');
  const handleManageUsers      = () => navigate('/dashboard/gerenciar-usuarios');
  const handleIntegrateAPI     = () => navigate('/dashboard/integrar-api-externa');
  const handleGenerateInsights = () => navigate('/dashboard/gerar-insights-ia');

  if (!user) {
    return <div className={styles.loading}>Carregando autenticação…</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <div>
          <span>Bem-vindo, <strong>{user.name}</strong></span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      <section className={styles.menu}>
        <button onClick={handleImportData}>Importar Dados</button>
        <button onClick={handleProcessData}>Processar Dados</button>
        <button onClick={handleGenerateReport}>Gerar Dashboard</button>
        <button onClick={handleShareReport}>Compartilhar Relatório</button>
        <button onClick={handleConfigureAlerts}>Configurar Alertas</button>
        <button onClick={handleManageUsers}>Gerenciar Usuários</button>
        <button onClick={handleIntegrateAPI}>Integrar API Externa</button>
        <button onClick={handleGenerateInsights}>Gerar Insights com IA</button>
      </section>

      <section className={styles.stats}>
        <h2>Estatísticas</h2>
        {/* Aqui você pode mostrar cards com KPIs resumidos */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total de Imports</h3>
            <p>—</p>
          </div>
          <div className={styles.card}>
            <h3>Dashboards Criados</h3>
            <p>—</p>
          </div>
          <div className={styles.card}>
            <h3>Alertas Ativos</h3>
            <p>—</p>
          </div>
          <div className={styles.card}>
            <h3>Usuários Cadastrados</h3>
            <p>—</p>
          </div>
        </div>
      </section>
    </div>
  );
}
