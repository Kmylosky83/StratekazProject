// frontend/src/components/home/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';

const HeroSection = () => {
  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Columna izquierda */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="titulo-hero">Stratek</h1>
            <p className="subtitulo-hero">
              Gestiona tu organización de manera inteligente, diseña, implementa y audita, 
              Sistemas Integrados de Gestión, Seguridad y Salud en el Trabajo y mucho mas. 
              "Desde cualquier lugar del mundo".
            </p>
            
            <div className="hero-buttons mb-5">
              <Link to="/register" className="boton-primario boton-grande me-3 mb-3 mb-sm-0">
                Comenzar Ahora
              </Link>
              <Link to="/portfolio" className="boton-secundario boton-grande">
                Portafolio de Servicios
              </Link>
            </div>
            
            {/* Estadísticas en formato horizontal */}
            <div className="stats-row">
              <div className="row g-4">
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="stat-number">40%</h3>
                    <p className="texto-base">Menos tiempo de implementación</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="stat-number">95%</h3>
                    <p className="texto-base">Reducción de errores</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-item">
                    <h3 className="stat-number">100%</h3>
                    <p className="texto-base">Cumplimiento normativo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Dashboard */}
          <div className="col-lg-6">
            <div className="dashboard-showcase clean">
              <div className="dashboard-main">
                <img 
                  src={process.env.PUBLIC_URL + '/images/dashboard-mockup.png'} 
                  alt="StrateKaz Dashboard" 
                  className="img-fluid dashboard-img" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600/ffffff/ec268f?text=Dashboard+StrateKaz';
                  }}
                />
              </div>
              
              <div className="feature-badge badge-implementation">Gestión Integral Empresarial</div>
              <div className="feature-badge badge-systems">Seguridad y Salud en el Trabajo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;