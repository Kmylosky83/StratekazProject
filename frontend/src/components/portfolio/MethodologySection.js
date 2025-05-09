import React from 'react';
import '../../styles/portfolio.css';

const MethodologySection = () => {
  const metodologiaPasos = [
    {
      numero: 1,
      titulo: "Diagnóstico",
      descripcion: "Evaluación exhaustiva del estado actual para identificar fortalezas, debilidades y oportunidades de mejora."
    },
    {
      numero: 2,
      titulo: "Planificación",
      descripcion: "Diseño de estrategias personalizadas y plan de acción adaptado a las necesidades específicas."
    },
    {
      numero: 3,
      titulo: "Implementación",
      descripcion: "Ejecución de acciones definidas en el plan, con acompañamiento constante y adaptabilidad."
    },
    {
      numero: 4,
      titulo: "Seguimiento",
      descripcion: "Monitoreo continuo, medición de resultados y ajustes para garantizar el logro de objetivos propuestos."
    }
  ];

  return (
    <section className="methodology-section">
      <div className="container mx-auto px-4">
        <div className="methodology-header">
          <h2 className="titulo-seccion">Nuestra Metodología</h2>
          <p className="subtitulo-seccion">
            Un enfoque estructurado y adaptable para asegurar resultados óptimos en cada proyecto.
          </p>
        </div>
        
        <div className="methodology-steps">
          {metodologiaPasos.map((paso, index) => (
            <div key={index} className="methodology-step">
              <div className="tarjeta">
                <div className="step-number">{paso.numero}</div>
                <h3 className="titulo-tarjeta">{paso.titulo}</h3>
                <p className="subtitulo-tarjeta">{paso.descripcion}</p>
              </div>
              {index < metodologiaPasos.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;