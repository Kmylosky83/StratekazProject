// frontend/src/components/common/footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PolicyModal from '../modals/PolicyModal';
import '../../styles/footer.css';
import NormativaModal from '../modals/NormativaModal';

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showNormativaModal, setShowNormativaModal] = useState(false);
  const [selectedNormativa, setSelectedNormativa] = useState(null);

  // Datos de las normativas
  const normativasData = {
    'ISO 9001': {
      id: 'iso9001',
      title: 'ISO 9001 - Gestión de Calidad',
      icon: 'fa-award',
      iconClass: 'iso-icon',
      description: 'Estándar internacional que especifica los requisitos para un sistema de gestión de calidad.',
      benefits: [
        'Mejora continua de procesos',
        'Mayor satisfacción del cliente',
        'Reducción de errores y costos',
        'Ventaja competitiva en el mercado'
      ],
      conclusion: 'Implementar ISO 9001 puede transformar positivamente su organización.'
    },
    'ISO 45001': {
      id: 'iso45001',
      title: 'ISO 45001 - Seguridad y Salud en el Trabajo',
      icon: 'fa-hard-hat',
      iconClass: 'sgsst-icon',
      description: 'Norma internacional para sistemas de gestión de seguridad y salud en el trabajo.',
      benefits: [
        'Reducción de accidentes laborales',
        'Cumplimiento legal en SST',
        'Entorno de trabajo más seguro',
        'Disminución de costos por incidentes'
      ],
      conclusion: 'Proteja a sus empleados y mejore la productividad con ISO 45001.'
    },
    'ISO 14001': {
      id: 'iso14001',
      title: 'ISO 14001 - Gestión Ambiental',
      icon: 'fa-leaf',
      iconClass: 'iso-icon',
      description: 'Estándar de gestión ambiental que ayuda a las organizaciones a minimizar su impacto en el medio ambiente.',
      benefits: [
        'Reducción de la huella ambiental',
        'Cumplimiento de normativas ambientales',
        'Mejora de la imagen corporativa',
        'Optimización del uso de recursos'
      ],
      conclusion: 'Contribuya al desarrollo sostenible con ISO 14001.'
    },
    'ISO-IEC 17020': {
      id: 'isoiec17020',
      title: 'ISO-IEC 17020 - Organismos de Inspección',
      icon: 'fa-search',
      iconClass: 'isoiec-icon',
      description: 'Norma que establece los requisitos para la competencia de organismos que realizan inspecciones.',
      benefits: [
        'Reconocimiento internacional de competencia',
        'Mayor credibilidad en los informes de inspección',
        'Mejora de la eficiencia en los procesos de inspección',
        'Garantía de imparcialidad y objetividad'
      ],
      conclusion: 'Eleve el estándar de sus inspecciones con ISO-IEC 17020.'
    },
    'SG-SST': {
      id: 'sgsst',
      title: 'SG-SST - Sistema de Gestión de Seguridad y Salud en el Trabajo',
      icon: 'fa-shield-alt',
      iconClass: 'sgsst-icon',
      description: 'Sistema obligatorio que busca prevenir lesiones y enfermedades causadas por las condiciones de trabajo.',
      benefits: [
        'Cumplimiento legal colombiano (Decreto 1072)',
        'Prevención de accidentes y enfermedades laborales',
        'Mejora del clima organizacional',
        'Reducción de ausentismo laboral'
      ],
      conclusion: 'Cumpla con la normativa y proteja a su equipo con SG-SST.'
    },
    'PESV': {
      id: 'pesv',
      title: 'PESV - Plan Estratégico de Seguridad Vial',
      icon: 'fa-car',
      iconClass: 'pesv-icon',
      description: 'Instrumento de planificación que contiene acciones para reducir siniestros de tránsito.',
      benefits: [
        'Cumplimiento de la Ley 2050 de 2020',
        'Reducción de riesgos viales',
        'Optimización de costos de operación vehicular',
        'Protección de la vida de colaboradores y terceros'
      ],
      conclusion: 'Garantice la seguridad vial de su organización con PESV.'
    }
  };

  const openNormativaModal = (normativaName) => {
    setSelectedNormativa(normativasData[normativaName]);
    setShowNormativaModal(true);
  };

  return (
    <footer className="footer-section py-5">
      <div className="container">
        <div className="row mx-0">
          {/* Columna StrateKaz (Logo y descripción) */}
          <div className="col-md-3">
            <div className="footer-logo mb-3">
              <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="StrateKaz" className="img-fluid" style={{ maxHeight: '45px' }} />
            </div>
            <p className="footer-description" style={{ textAlign: 'left', fontSize: '0.9rem' }}>
              Es un desarrollo de @Kmylosky, potenciado con "CLAUDE IA" Que busca la automatizacion de los sistemas de gestión y aporta valor a las organizaciones.
            </p>
            <div className="social-icons mt-3 d-flex justify-content-start">
              <a href="https://www.facebook.com/Kmylosky" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/Kmylosky" className="social-icon" title="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/Stratekaz" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.tiktok.com/Kmylosky" className="social-icon" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
              <a href="https://wa.me/573115351944" className="social-icon" title="WhatsApp" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          {/* Línea vertical */}
          <div className="col-auto d-flex align-items-center px-0">
            <div className="footer-divider-vertical"></div>
          </div>
          
          {/* Columna Enlaces */}
          <div className="col">
            <h5 className="footer-heading">Enlaces</h5>
            <ul className="footer-links text-left">
              <li><Link to="/HeroSection">Inicio</Link></li>
              <li><a href="#como-funciona">Cómo Funciona</a></li>
              <li><a href="#caracteristicas">Características</a></li>              
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
            </ul>
          </div>
          
          {/* Línea vertical */}
          <div className="col-auto d-flex align-items-center px-0">
            <div className="footer-divider-vertical"></div>
          </div>
          
          {/* Columna Normativas */}
          <div className="col">
          <h5 className="footer-heading">Normativas</h5>
          <ul className="footer-links text-left">
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('ISO 9001'); }}>ISO 9001</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('ISO 45001'); }}>ISO 45001</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('ISO 14001'); }}>ISO 14001</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('ISO-IEC 17020'); }}>ISO-IEC 17020</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('SG-SST'); }}>SG-SST</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); openNormativaModal('PESV'); }}>PESV</a></li>
          </ul>
        </div>
          
          {/* Línea vertical */}
          <div className="col-auto d-flex align-items-center px-0">
            <div className="footer-divider-vertical"></div>
          </div>
          
          {/* Columna Contacto */}
          <div className="col">
            <h5 className="footer-heading">Contacto</h5>
            <ul className="footer-contact text-left">
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@stratekaz.com</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>+57 (311) 535-1944</span>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Cúcuta, Colombia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="footer-divider my-4" />
        
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <p className="copyright mb-0">© 2025 StrateKaz. Marca @Kmylosky. Todos los derechos reservados.</p>
          </div>
          <div className="footer-policies">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Términos y Condiciones</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} className="ms-3">Política de Privacidad</a>
          </div>
        </div>
      </div>

      {/* Modales de políticas */}
      <PolicyModal 
        show={showTermsModal} 
        handleClose={() => setShowTermsModal(false)} 
        type="terms" 
      />
      <PolicyModal 
        show={showPrivacyModal} 
        handleClose={() => setShowPrivacyModal(false)} 
        type="privacy" 
      />
      <NormativaModal 
        show={showNormativaModal} 
        handleClose={() => setShowNormativaModal(false)} 
        normativa={selectedNormativa} 
      />
    </footer>
  );
};

export default Footer;