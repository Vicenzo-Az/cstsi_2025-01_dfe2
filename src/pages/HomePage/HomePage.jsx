import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.logo}>CoffeeBase</div>
        <div className={styles.authLinks}>
          <a href="/login" className={styles.loginLink}>Login</a>
          <a href="/signup" className={styles.signupLink}>Criar Conta</a>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>CoffeeBase</h1>
        <p className={styles.heroSubtitle}>Entre no mundo dos seus dados de vendas e aprenda o que eles significam.</p>
      </div>

      {/* Imagem Principal */}
      <div className={styles.imageContainer}>
        <img 
          src="https://images.unsplash.com/photo-1485878344847-7c1d692a8c24?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
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