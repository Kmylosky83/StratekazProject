// frontend/src/components/home/CaracteristicasSection.js
import React from 'react';
import '../../styles/home.css';

const CaracteristicasSection = () => {
  return (
    <section id="caracteristicas" className="caracteristicas-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="caracteristicas-title">Características Principales</h2>
          <p className="section-subtitle">Todo lo que necesitas para lograr un verdadero cambio en tu Organización</p>
        </div>
        
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="caracteristica-card">
              <div className="caracteristica-icon">
                <i className="fas fa-sitemap"></i>
              </div>
              <h4>Sistemas Integrados</h4>
              <p>Gestiona múltiples normativas en una única plataforma, evitando duplicidades.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="caracteristica-card">
              <div className="caracteristica-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h4>Trazabilidad</h4>
              <p>Mantén el control de toda la información de tus sistemas de gestión.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="caracteristica-card">
              <div className="caracteristica-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h4>Automatización</h4>
              <p>Reduce el trabajo manual con formularios y reportes automáticos.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="caracteristica-card">
              <div className="caracteristica-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h4>Análisis en tiempo real</h4>
              <p>Toma decisiones basadas en datos y verifica el avance de tus sistemas de gestión a un click de distancia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaracteristicasSection;