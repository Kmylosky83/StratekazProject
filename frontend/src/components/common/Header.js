// frontend/src/components/common/Header.js
import React from 'react';

const Header = ({ isAuthenticated = false, userName = "" }) => {

  return (
    <header className="main-header bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <h2 className="mb-0 text-primary fw-bold">StrateKaz</h2>
            <span className="badge bg-secondary ms-2 small">Suite Empresarial</span>
          </a>

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
                <a className="nav-link" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/acceso-gratuito">Acceso Gratuito</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/portfolio">Portafolio</a>
              </li>
              
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Iniciar Sesión</a>
                  </li>
                  <li className="nav-item ms-2">
                    <a className="btn boton-primario btn-sm" href="/register">
                      Crear Cuenta
                    </a>
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
                        <a className="dropdown-item" href="/dashboard">
                          <i className="fas fa-tachometer-alt me-2"></i>
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/complete-profile">
                          <i className="fas fa-user-edit me-2"></i>
                          Mi Perfil
                        </a>
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