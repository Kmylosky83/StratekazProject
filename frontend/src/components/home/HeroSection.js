// frontend/src/components/home/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { H1, Text, Button } from '../../design-system/components';

const HeroSection = () => {
  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Columna izquierda */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <H1 variant="hero">Stratek</H1>
            <Text variant="heroSubtitle">
              Gestiona tu organización de manera inteligente, diseña, implementa y audita, 
              Sistemas Integrados de Gestión, Seguridad y Salud en el Trabajo y mucho mas. 
              "Desde cualquier lugar del mundo".
            </Text>
            
            <div className="hero-buttons mb-5">
              <Button as={Link} to="/register" variant="primary" size="large" className="me-3 mb-3 mb-sm-0">
                Comenzar Ahora
              </Button>
              <Button as={Link} to="/portfolio" variant="secondary" size="large">
                Portafolio de Servicios
              </Button>
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