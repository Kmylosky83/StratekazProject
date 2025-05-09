import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/portfolio.css';

const CasesSection = () => {
  const [showModal, setShowModal] = useState(false);
  
  // Datos para sección de casos de éxito
  const casosExito = [
    {
      empresa: "Sociedad de Mejoras Públicas",
      logo: "/api/placeholder/80/80",
      descripcion: "Implementación de Sistema Integrado de Gestión (ISO 9001, ISO 45001, ISO 14001)",
      resultado: "Certificación a su Sistema de Gestión ISO 9001/45001/14001, mantenida desde 2019"
    },
    {
      empresa: "Palnorte",
      logo: "/api/placeholder/80/80",
      descripcion: "Desarrollo de auditoria interna al Sistema de Gestión Integral (ISO 9001/45001/14001)",
      resultado: "Certificación a su Sistema de Gestión y mejora en indicadores de satisfacción del cliente"
    },
    {
      empresa: "Certiretie",
      logo: "/api/placeholder/80/80",
      descripcion: "Implementación de Sistema de Gestión según ISO/IEC 17020",
      resultado: "Acreditación ONAC  2022/2023, fortalecimiento como organismo de inspección reconocido"
    }
  ];

  return (
    <section className="cases-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="titulo-seccion">Casos de Éxito</h2>
          <p className="subtitulo-seccion">
            En mi rol como consultor freelance, al servicio de empresas de consultoria y diferentes empresas eh liderado el diseño, la implementacion, las auditorias y la mejora continua de los sistemas de gestión que
            se nos encomendaron.
          
          </p>
        </div>
        
        <div className="row g-4">
          {casosExito.map((caso, index) => (
            <div className="col-md-4" key={index}>
              <div className="tarjeta">
                <div className="case-header">
                  <img src={caso.logo} alt={caso.empresa} className="case-logo" />
                  <h3 className="titulo-tarjeta">{caso.empresa}</h3>
                </div>
                <p className="subtitulo-tarjeta">{caso.descripcion}</p>
                <div className="case-result">                  
                    <FontAwesomeIcon icon={faCheckCircle} className="icono-pequeno-gris" />
                    <p className="texto-base">{caso.resultado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button 
            className="boton-texto" 
            onClick={() => setShowModal(true)}
          >
            Ver todos los casos de éxito <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
          </button>
        </div>
      </div>

      {/* Modal de Casos de Éxito - usando los estilos existentes */}
      {showModal && (
        <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="custom-modal-container custom-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="custom-modal-header">
              <h3 className="custom-modal-title">Trayectoria Profesional</h3>
              <button className="custom-modal-close-btn" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="custom-modal-body">
              <div className="profile-summary">
                <div className="row g-4">
                  <div className="col-md-3 col-6">
                    <div className="text-center">
                      <div className="icono-estandar-primario">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <h3 className="stat-number">+20</h3>
                      <p className="texto-base">Años de experiencia</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center">
                      <div className="icono-estandar-primario">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <h3 className="stat-number">17</h3>
                      <p className="texto-base">Sistemas implementados</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center">
                      <div className="icono-estandar-primario">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <h3 className="stat-number">+30</h3>
                      <p className="texto-base">Auditorías realizadas</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="text-center">
                      <div className="icono-estandar-primario">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>
                      <h3 className="stat-number">+2000</h3>
                      <p className="texto-base">Personas capacitadas</p>
                    </div>
                  </div>
                </div>
                
                <h4 className="titulo-tarjeta mt-4">Empresas Certificadas</h4>
                <ul className="company-list">
                  <li>
                    <strong>Fianzacrédito:</strong> Certificación ISO 9001:2015 (2020-2023)
                  </li>
                  <li>
                    <strong>Certiretie:</strong> Acreditación ISO/IEC 17020 (2022-2023)
                  </li>
                  <li>
                    <strong>Sociedad de Mejoras Públicas:</strong> Certificación ISO 9001:2015, ISO 45001:2018, ISO 14001:2015 (2019-2023)
                  </li>
                  <li>
                    <strong>Concretos y Morteros:</strong> Certificación ISO 9001:2015 (2020-2022)
                  </li>
                  <li>
                    <strong>Consulservicios:</strong> Certificación ISO 9001:2015, ISO 45001:2018 (2022)
                  </li>
                </ul>
              </div>
            </div>
            <div className="custom-modal-footer">
              <button className="boton-secundario" onClick={() => setShowModal(false)}>Cerrar</button>              
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;