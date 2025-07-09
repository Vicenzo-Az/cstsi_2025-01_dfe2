// src/pages/DashboardPage/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const go = (path) => () => navigate(path, { replace: true });

  if (!user) {
    return <div className={styles.loading}>Carregando autenticação…</div>;
  }

  return (
    <div className={styles.container}>
      {/* Top bar igual à HomePage */}
      <div className={styles.topBar}>
        <div className={styles.logo}>MeuApp</div>
        <div className={styles.userSection}>
          <span className={styles.userName}>Olá, {user.name}</span>
          <button onClick={() => { logout(); navigate('/login', { replace: true }); }}
                  className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>

      {/* Menu de funcionalidades em cartões */}
      <section className={styles.menu}>
        <div className={styles.menuCard} onClick={go('/dashboard/importar-dados')}>
          <h3>Importar Dados</h3>
          <p>Envie arquivos ou conecte-se a fontes externas</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/processar-dados')}>
          <h3>Processar Dados</h3>
          <p>Execute ETLs e monitore o progresso</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/gerar-dashboard')}>
          <h3>Gerar Dashboard</h3>
          <p>Crie visualizações dinâmicas</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/compartilhar-relatorio')}>
          <h3>Compartilhar Relatório</h3>
          <p>Envie por e‑mail ou link seguro</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/configurar-alertas')}>
          <h3>Configurar Alertas</h3>
          <p>Defina regras e notificações</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/gerenciar-usuarios')}>
          <h3>Gerenciar Usuários</h3>
          <p>Controle acessos e permissões</p>
        </div>
        <div className={styles.menuCard} onClick={go('/dashboard/gerar-insights-ia')}>
          <h3>Gerar Insights com IA</h3>
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
