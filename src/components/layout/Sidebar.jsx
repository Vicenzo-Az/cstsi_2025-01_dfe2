// src/components/layout/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { 
  House, Database, People, Gear 
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Adicione export default aqui
export default function Sidebar() {
  const { user } = useAuth();

  return (
    <nav className="bg-light border-end vh-100" style={{ width: '250px' }}>
      <div className="p-3 border-bottom">
        <h5 className="m-0">Menu</h5>
      </div>
      
      <Nav variant="pills" className="flex-column p-3">
        <Nav.Item>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `nav-link ${isActive ? 'active' : ''} d-flex align-items-center`
            }
          >
            <House className="me-2" />
            Dashboard
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink 
            to="/data-sources" 
            className={({isActive}) => 
              `nav-link ${isActive ? 'active' : ''} d-flex align-items-center`
            }
          >
            <Database className="me-2" />
            Fontes de Dados
          </NavLink>
        </Nav.Item>
        
        {user?.role === 'admin' && (
          <Nav.Item>
            <NavLink 
              to="/admin" 
              className={({isActive}) => 
                `nav-link ${isActive ? 'active' : ''} d-flex align-items-center`
              }
            >
              <People className="me-2" />
              Usuários
            </NavLink>
          </Nav.Item>
        )}
      </Nav>
    </nav>
  );
}