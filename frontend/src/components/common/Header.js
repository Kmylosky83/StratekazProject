// Ubicación: frontend/src/components/common/header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';

const Header = ({ isAuthenticated, userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo (izquierda) */}
          <Link to="/" className="header-logo">
            <img src="/images/logo.png" alt="StrateKaz" className="responsive-logo" />
          </Link>
          
          {/* Saludo y menú (derecha) */}
          <div className="d-flex align-items-center">
            {isAuthenticated && (
              <h5 className="welcome-message mb-0 me-3 text-end">
                Bienvenido, {userName}
              </h5>
            )}
            
            {/* Botón de menú */}
            <div className="dropdown">
              <button 
                className="btn btn-primary dropdown-toggle" 
                type="button" 
                id="menuDropdown" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fas fa-bars me-2"></i> Menú
              </button>
              <ul className={`dropdown-menu dropdown-menu-end ${isMenuOpen ? 'show' : ''}`}>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/perfil">
                        <i className="fas fa-user-circle me-2"></i>Mi Perfil
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/logout">
                        <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        <i className="fas fa-user-plus me-2"></i>Registrarse
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
  
};

export default Header;