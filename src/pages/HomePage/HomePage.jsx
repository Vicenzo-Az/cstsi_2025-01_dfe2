import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.authLinks}>
          <a href="/login" className={styles.loginLink}>Login</a>
          <a href="/signup" className={styles.signupLink}>Criar Conta</a>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Bem-vindo ao Nosso Site</h1>
        <p className={styles.heroSubtitle}>Descubra nossos serviços exclusivos</p>
      </div>

      {/* Imagem Principal */}
      <div className={styles.imageContainer}>
        <img 
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Banner principal" 
          className={styles.mainImage}
        />
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default HomePage;