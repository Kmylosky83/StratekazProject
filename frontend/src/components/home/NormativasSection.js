// frontend/src/components/home/NormativasSection.js
import React, { useState } from 'react';
import NormativaModal from '../modals/NormativaModal';
import '../../styles/home.css';

const NormativasSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentNormativa, setCurrentNormativa] = useState(null);

  // Definir los datos de las normativas
  const normativas = [
    {
      id: 'iso',
      title: 'ISO 9001: Gestión de Calidad',
      subtitle: 'Sistema de Gestión de Calidad',
      icon: 'fa-certificate',
      iconClass: 'iso-icon',
      description: 'La norma ISO 9001 es un estándar internacional que establece los requisitos para un sistema de gestión de calidad. Esta norma ayuda a las organizaciones a:',
      benefits: [
        'Mejorar la satisfacción del cliente',
        'Optimizar procesos internos',
        'Aumentar la eficiencia operativa',
        'Reducir errores y aumentar la consistencia'
      ],
      conclusion: 'Con StrateKaz, implementar y mantener ISO 9001 es más sencillo gracias a nuestras herramientas especializadas y sistemas de seguimiento automático.'
    },
    {
      id: 'sgsst',
      title: 'SG-SST: Sistema de Gestión de Seguridad y Salud en el Trabajo',
      subtitle: 'Sistema obligatorio para empresas en Colombia',
      icon: 'fa-hard-hat',
      iconClass: 'sgsst-icon',
      description: 'El Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) es obligatorio para todas las empresas en Colombia según el Decreto 1072 de 2015. Este sistema:',
      benefits: [
        'Previene accidentes y enfermedades laborales',
        'Promueve la salud y el bienestar de los trabajadores',
        'Identifica, evalúa y controla los riesgos laborales',
        'Establece planes de emergencia y contingencia'
      ],
      conclusion: 'Con StrateKaz, implementar y mantener el SG-SST es más sencillo, cumpliendo con todos los estándares mínimos establecidos en la Resolución 0312 de 2019.'
    },
    {
      id: 'pesv',
      title: 'PESV: Plan Estratégico de Seguridad Vial',
      subtitle: 'Plan obligatorio para empresas con flota vehicular',
      icon: 'fa-car',
      iconClass: 'pesv-icon',
      description: 'El Plan Estratégico de Seguridad Vial (PESV) es de obligatorio cumplimiento para las organizaciones que posean, fabriquen, ensamblen, comercialicen, contraten o administren flotas de vehículos automotores o no automotores. Este plan:',
      benefits: [
        'Reduce la accidentalidad vial',
        'Disminuye los efectos de los accidentes de tránsito',
        'Define lineamientos de seguridad vial',
        'Implementa acciones y mecanismos de prevención'
      ],
      conclusion: 'StrateKaz facilita la implementación del PESV conforme a la Resolución 40595 de 2022, con herramientas para la gestión documental, capacitaciones y seguimiento de indicadores.'
    },
    {
      id: 'isoiec',
      title: 'ISO/IEC 17020: Evaluación de la Conformidad',
      subtitle: 'Requisitos para el funcionamiento de Organismos de Inspección',
      icon: 'fa-plug',
      iconClass: 'isoiec-icon',
      description: 'La norma ISO/IEC 17020 especifica los requisitos para la competencia de los organismos que realizan inspecciones y para la imparcialidad y consistencia de sus actividades. Esta norma:',
      benefits: [
        'Establece criterios para organismos de inspección',
        'Garantiza la independencia e imparcialidad',
        'Asegura métodos y procedimientos adecuados',
        'Promueve la confianza en los servicios de inspección'
      ],
      conclusion: 'StrateKaz ofrece herramientas especializadas para la gestión de ISO/IEC 17020, facilitando la documentación, control de procesos y gestión de competencias del personal.'
    }
  ];

  // Función para mostrar el modal con la normativa seleccionada
  const handleShowModal = (normativa) => {
    setCurrentNormativa(normativa);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="normativas-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="normativas-section-title">Soluciones Integrales</h2>
          <p className="section-subtitle mb-5">
            Plataforma tecnologica diseñada para gestionar diferentes normativas nacionales e internacionales
          </p>
          
          <div className="row justify-content-center g-4">
            {normativas.map((normativa) => (
              <div className="col-6 col-md-3" key={normativa.id}>
                <div className="normativa-card" onClick={() => handleShowModal(normativa)}>
                  <div className={`normativa-icon ${normativa.iconClass}`}>
                    <i className={`fas ${normativa.icon}`}></i>
                  </div>
                  <div className="normativa-name">{normativa.id.toUpperCase()}</div>
                  <p>{normativa.description.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Normativa */}
      <NormativaModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        normativa={currentNormativa} 
      />
    </section>
  );
};

export default NormativasSection;