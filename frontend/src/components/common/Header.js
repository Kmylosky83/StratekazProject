// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo (izquierda) */}
          <Link to="/" className="header-logo">
            <img src="/images/logo.png" alt="StrateKaz" className="responsive-logo" />
          </Link>
          
          {/* Menú (derecha) */}
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="menuDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-bars me-2"></i> Menú
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="menuDropdown">
                {isLoggedIn ? (
                  <>
                    <li><Link className="dropdown-item" to="/dashboard">
                      <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                    </Link></li>
                    <li><Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user-circle me-2"></i>Mi Perfil
                    </Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/">
                      <i className="fas fa-home me-2"></i>Inicio
                    </Link></li>
                    <li><Link className="dropdown-item" to="/login">
                      <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
                    </Link></li>
                    <li><Link className="dropdown-item" to="/register">
                      <i className="fas fa-user-plus me-2"></i>Registrarse
                    </Link></li>
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