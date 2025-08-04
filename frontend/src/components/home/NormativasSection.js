// frontend/src/components/home/NormativasSection.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionHeader, Grid } from '../../design-system/components';
import { Card_Interaccion } from '../../design-system/components/Card';
import { Award, Shield, Car, Lightbulb } from 'lucide-react';
import { fadeInUp, slideInUp, bounceIn, scaleIn } from '../../design-system/animations';
import NormativaModal from '../modals/NormativaModal';

// Styled Components
const NormativasGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

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
      id: 'innovation',
      title: 'Innovación: Transformación Digital',
      subtitle: 'Soluciones tecnológicas para la gestión moderna',
      icon: 'fa-lightbulb',
      iconClass: 'innovation-icon',
      description: 'Nuestra plataforma de innovación integra tecnologías emergentes para optimizar los procesos de gestión empresarial. Esta solución:',
      benefits: [
        'Automatiza procesos repetitivos',
        'Integra inteligencia artificial',
        'Proporciona análisis predictivos',
        'Facilita la toma de decisiones basada en datos'
      ],
      conclusion: 'Con StrateKaz, la innovación se convierte en el motor de crecimiento de tu organización, implementando soluciones digitales que optimizan cada aspecto de la gestión empresarial.'
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

  // Mapeo de iconos modernos
  const getIcon = (id) => {
    const icons = {
      'iso': Award,
      'sgsst': Shield,
      'pesv': Car,
      'innovation': Lightbulb
    };
    return icons[id] || Award;
  };

  // Colores temáticos para cada normativa
  const getColor = (id) => {
    const colors = {
      'iso': '#3498db',
      'sgsst': '#e74c3c',
      'pesv': '#9b59b6',
      'innovation': '#f39c12'
    };
    return colors[id] || '#3498db';
  };

  return (
    <Section size="large" variant="light">
      <SectionHeader
        title="Soluciones Integrales"
        subtitle="Plataforma tecnológica diseñada para gestionar diferentes normativas nacionales e internacionales"
        centered
      />
      
      <NormativasGrid columns={4} tablet={2} mobile={1} gap="large">
        {normativas.map((normativa, index) => {
          const IconComponent = getIcon(normativa.id);
          const themeColor = getColor(normativa.id);
          
          return (
            <Card_Interaccion
              key={normativa.id}
              title={normativa.id.toUpperCase()}
              description={normativa.description.substring(0, 100) + '...'}
              icon={<IconComponent size={32} />}
              themeColor={themeColor}
              onClick={() => handleShowModal(normativa)}
            />
          );
        })}
      </NormativasGrid>

      {/* Modal de Normativa */}
      <NormativaModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        normativa={currentNormativa} 
      />
    </Section>
  );
};

export default NormativasSection;