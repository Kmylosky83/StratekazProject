import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/portfolio.css';

const TestimonialSection = () => {
  // Testimonios
  const testimonios = [
    {
      nombre: "Laura Martínez",
      cargo: "Gerente General",
      empresa: "Fianzacrédito",
      contenido: "La implementación del Sistema de Gestión de Calidad ha sido fundamental para mejorar nuestros procesos y la satisfacción de nuestros clientes.",
      avatar: "/api/placeholder/60/60"
    },
    {
      nombre: "Maria Luisa Manrique",
      cargo: "Profesional de seguridad y Salud en el Trabajo",
      empresa: "Sociedad de Mejoras Públicas",
      contenido: "El acompañamiento y experticia durante la implementación y el mantenieminto del Sistema Integrado de Gestión fue clave para mantener nuestros contratos vigentes.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <section className="testimonial-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="titulo-seccion">Comentarios del Acompañamiento</h2>
          <p className="subtitulo-seccion">
          Su satisfacción, nuestra motivación
          </p>
        </div>
        
        <div className="row g-4">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="col-md-6">
              <div className="tarjeta">
                <div className="d-flex align-items-center mb-3">
                  <img src={testimonio.avatar} alt={testimonio.nombre} className="rounded-circle me-3" width="60" height="60" />
                  <div>
                    <h4 className="titulo-tarjeta mb-1">{testimonio.nombre}</h4>
                    <p className="texto-nota mb-0">{testimonio.cargo}, {testimonio.empresa}</p>
                  </div>
                </div>
                <div className="position-relative testimonial-content ps-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="position-absolute start-0 top-0 text-muted opacity-25 fs-2" />
                  <p className="texto-base ps-2">"{testimonio.contenido}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;