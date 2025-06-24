import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Plataforma de Análise de Dados</h1>
        <p className="lead">Para Pequenas e Médias Empresas</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-3 text-center">
        <p className="mb-1">
          Não tem uma conta? <Link to="/register">Registrar</Link>
        </p>
        <p>
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;