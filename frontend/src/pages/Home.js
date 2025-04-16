import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="hero-title">Stratekaz</h1>
              <p className="hero-text">
                Gestiona tu organización de manera inteligente, diseña, implementa y audita Sistemas Integrados de Gestión, 
                Seguridad y Salud en el Trabajo y mucho más. "Desde cualquier lugar del mundo".
              </p>
              
              <div className="hero-buttons mb-5">
                <Link to="/register" className="btn btn-primary btn-lg me-sm-3 mb-3 mb-sm-0">Comenzar Ahora</Link>
                <a href="#como-funciona" className="btn btn-outline-secondary btn-lg">Ver Demostración</a>
              </div>
              
              {/* Estadísticas de impacto */}
              <div className="stats-row">
                <div className="row g-4">
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="stat-number">40%</h3>
                      <p className="stat-text">Menos tiempo de implementación</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="stat-number">95%</h3>
                      <p className="stat-text">Reducción de errores</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-item">
                      <h3 className="stat-number">100%</h3>
                      <p className="stat-text">Cumplimiento normativo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="dashboard-showcase clean">
                {/* Dashboard principal simplificado */}
                <div className="dashboard-main">
                  <img src="/images/dashboard-mockup.png" alt="StrateKaz Dashboard" className="img-fluid dashboard-img" 
                    onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x600/ffffff/ec268f?text=Dashboard+StrateKaz'}} />
                </div>
                
                {/* Solo dos elementos flotantes simplificados */}
                <div className="feature-badge badge-implementation">Gestión Integral Empresarial</div>
                <div className="feature-badge badge-systems">Seguridad y Salud en el Trabajo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de normativas */}
      <section className="normativas-section py-5">
        <div className="text-center mb-5">
          <h2 className="section-title">Soluciones Integrales</h2>
          <p className="text-center mb-5">Plataforma tecnológica diseñada para gestionar diferentes normativas nacionales e internacionales</p>
          <div className="row justify-content-center g-4">
            <div className="col-6 col-md-3">
              <div className="normativa-card" onClick={() => openModal('iso9001')}>
                <div className="normativa-icon iso-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="normativa-name">ISO</div>
                <p>Estándares Internacionales que garantizan Calidad, Seguridad y Eficiencia</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="normativa-card" onClick={() => openModal('sgsst')}>
                <div className="normativa-icon sgsst-icon">
                  <i className="fas fa-hard-hat"></i>
                </div>
                <div className="normativa-name">SG-SST</div>
                <p>Conjunto de normas para prevenir riesgos laborales y proteger la salud de los trabajadores</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="normativa-card" onClick={() => openModal('pesv')}>
                <div className="normativa-icon pesv-icon">
                  <i className="fas fa-car"></i>
                </div>
                <div className="normativa-name">PESV</div>
                <p>Herramienta para prevenir accidentes de tránsito, estableciendo acciones para generar comportamientos seguros</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="normativa-card" onClick={() => openModal('isoiec')}>
                <div className="normativa-icon isoiec-icon">
                  <i className="fas fa-plug"></i>
                </div>
                <div className="normativa-name">ISO-IEC</div>
                <p>Establece requisitos para la competencia de organismos que realizan inspecciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Cómo funciona" */}
      <section id="como-funciona" className="como-funciona-section paso-section py-5">
        <div className="text-center mb-5">
          <h2 className="section-title">¿Cómo funciona StrateKaz?</h2>
          <p className="text-center mb-5">Funciona como un ecosistema digital enfocado en el cumplimiento de los Objetivos Organizacionales</p>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="paso-card">
                <div className="paso-number">1</div>
                <div className="paso-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h4>Regístrate</h4>
                <p>Crea tu cuenta como consultor independiente, empresa directa o empresa de consultoría en menos de 2 minutos.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="paso-card">
                <div className="paso-number">2</div>
                <div className="paso-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <h4>Configura</h4>
                <p>Registra tus empresas, selecciona los roles de tu equipo o selecciona los módulos que vayas a trabajar en tu actividad empresarial.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="paso-card">
                <div className="paso-number">3</div>
                <div className="paso-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4>Gestiona</h4>
                <p>Diseña y delega actividades para el cumplimiento de tus sistemas de gestión con nuestra interfaz intuitiva y herramientas especializadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características principales */}
      <section id="caracteristicas" className="caracteristicas-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Características Principales</h2>
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

      {/* Sección CTA final */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Estás listo para el siguiente nivel?</h2>
            <p className="cta-text">"No diseñamos sistemas de gestión. Desatamos el potencial de tu empresa. Únete a StrateKaz."</p>
            <Link to="/register" className="btn btn-cta">Comenzar Ahora</Link>
          </div>
        </div>
      </section>

      {/* Modales para Normativas */}
      {activeModal === 'iso9001' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">ISO 9001: Gestión de Calidad</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="normativa-modal-content">
                <div className="normativa-icon iso-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h4>Sistema de Gestión de Calidad</h4>
                <p>La norma ISO 9001 es un estándar internacional que establece los requisitos para un sistema de gestión de calidad. Esta norma ayuda a las organizaciones a:</p>
                <ul>
                  <li>Mejorar la satisfacción del cliente</li>
                  <li>Optimizar procesos internos</li>
                  <li>Aumentar la eficiencia operativa</li>
                  <li>Reducir errores y aumentar la consistencia</li>
                </ul>
                <p>Con StrateKaz, implementar y mantener ISO 9001 es más sencillo gracias a nuestras herramientas especializadas y sistemas de seguimiento automático.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
              <Link to="/register" className="btn btn-primary">Implementar Ahora</Link>
            </div>
          </div>
        </div>
      )}

      {/* Agregar modales para otras normativas... */}
      
    </div>
  );
};

export default Home;