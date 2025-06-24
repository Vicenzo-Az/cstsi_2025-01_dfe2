// src/components/layout/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';

// Adicione "export default" antes da função
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-dark text-white p-3 shadow-sm">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-white text-decoration-none">
              <h1 className="h4 mb-0">Plataforma de Análise de Dados</h1>
            </Link>
          </div>
          
          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <PersonCircle className="me-2" size={20} />
                  <span>{user.name || user.username}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <button 
                      className="dropdown-item d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <BoxArrowRight className="me-2" />
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}