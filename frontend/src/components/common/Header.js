// frontend/src/components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated = false, userName = "" }) => {
  return (
    <header className="main-header bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <h2 className="mb-0 text-primary fw-bold">StrateKaz</h2>
            <span className="badge bg-secondary ms-2 small">Suite Empresarial</span>
          </Link>

          {/* Mobile toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/acceso-gratuito">Acceso Gratuito</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/portfolio">Portafolio</Link>
              </li>
              
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                  </li>
                  <li className="nav-item ms-2">
                    <Link className="btn boton-primario btn-sm" to="/register">
                      Crear Cuenta
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle d-flex align-items-center" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown"
                    >
                      <div className="user-avatar me-2">
                        <i className="fas fa-user-circle fs-5"></i>
                      </div>
                      {userName}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to="/dashboard">
                          <i className="fas fa-tachometer-alt me-2"></i>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/complete-profile">
                          <i className="fas fa-user-edit me-2"></i>
                          Mi Perfil
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <a className="dropdown-item text-danger" href="#" onClick={() => {/* logout logic */}}>
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Cerrar Sesión
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;