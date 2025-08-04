import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container mx-auto px-4 text-center">
        <h2 className="cta-title">¿Listo para transformar su organización?</h2>
        <p className="cta-description">
          Permítame acompañarle en el proceso de implementación de sistemas de gestión
          y mejora continua para alcanzar sus objetivos empresariales.
        </p>
        <div className="cta-buttons">          
          <a href="/register" className="boton-cta">
            Registrarse
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;