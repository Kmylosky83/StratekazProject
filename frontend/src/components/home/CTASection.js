// frontend/src/components/home/CTASection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.css';

const CTASection = () => {
  return (
    <section className="cta-section py-5">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">¿Estás listo para el siguiente nivel?</h2>
          <p className="cta-text">"No diseñamos sistemas de gestión. Desatamos el potencial de tu empresa. Únete a StrateKaz."</p>
          <Link to="/register" className="btn btn-cta">Comenzar Ahora</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;