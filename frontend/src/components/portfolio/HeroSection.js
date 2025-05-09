import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faAward, 
  faUsers, 
  faClock, 
  faClipboardCheck, 
  faHome
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/portfolio.css';

const HeroSection = () => {
  const finalValues = [20, 17, 30, 2000];    

  return (
    <div className="portfolio-hero-combined-section"> 
      <div className="portfolio-hero-header-lineti"></div>

      <header className="portfolio-hero-clean">
        <div className="container mx-auto px-4">
          <div className="portfolio-hero-content text-center">
            <h1 className="titulo-hero">
              <span style={{color: 'var(--primary-color)'}}>Soluciones</span>{' '}
              <span>Estratégicas Empresariales</span>
            </h1>
            <p className="subtitulo-hero">
              Impulse la eficiencia, innovación y crecimiento sostenible de su
              organización con estrategias personalizadas que integran Inteligencia
              Artificial, Tecnología y procesos optimizados.
            </p>
            <div className="portfolio-hero-buttons">
            <a 
            href="https://wa.me/573115351944" 
            className="boton-primario boton-grande me-3 mb-3 mb-sm-0"
            target="_blank" 
            rel="noopener noreferrer"
            >
            Solicitar Consulta <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </a>
              <a href="#servicios" className="boton-secundario boton-grande me-3 mb-3 mb-sm-0">
                Explorar Servicios
              </a>
            <a 
            href="/contacto" 
            className="boton-primario boton-grande me-3 mb-3 mb-sm-0"
            >
            Ir al Home <FontAwesomeIcon icon={faHome} className="ms-2" />
            </a>
            </div>
          </div>
        </div>
      </header>
           
      <div className="container mx-auto px-4">
        <div className="row g-4">
          <div className="col-3">
            <div className="stat-item text-center">
              <div className="icono-suelto-a">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3 className="stat-number">+{finalValues[0]}</h3>
              <p className="texto-base">Años de experiencia</p>
            </div>
          </div>
          <div className="col-3">
            <div className="stat-item text-center">
              <div className="icono-suelto-a">
                <FontAwesomeIcon icon={faAward} />
              </div>
              <h3 className="stat-number">+{finalValues[1]}</h3>
              <p className="texto-base">Sistemas implementados</p>
            </div>
          </div>
          <div className="col-3">
            <div className="stat-item text-center">
              <div className="icono-suelto-a">
                <FontAwesomeIcon icon={faClipboardCheck} />
              </div>
              <h3 className="stat-number">+{finalValues[2]}</h3>
              <p className="texto-base">Auditorías realizadas</p>
            </div>
          </div>
          <div className="col-3">
            <div className="stat-item text-center">
              <div className="icono-suelto-a">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3 className="stat-number">+{finalValues[3]}</h3>
              <p className="texto-base">Personas capacitadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>         
  );
};

export default HeroSection;