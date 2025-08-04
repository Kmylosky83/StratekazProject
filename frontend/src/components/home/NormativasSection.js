// frontend/src/components/home/NormativasSection.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionHeader, Grid, Card } from '../../design-system/components';
import { Award, Shield, Car, Zap } from 'lucide-react';
import { fadeInUp, slideInUp, bounceIn, scaleIn } from '../../design-system/animations';
import NormativaModal from '../modals/NormativaModal';

// Animaciones personalizadas
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.3); }
  50% { box-shadow: 0 0 30px rgba(52, 152, 219, 0.6); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const NormativasGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const NormativaCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.s8};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.card};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  /* Animación de entrada */
  animation: ${fadeInUp} 0.6s ease-out ${props => props.delay}s both;
  
  /* Efecto hover sorprendente */
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    /* Glow effect basado en el color temático */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 
                0 0 30px ${props => props.themeColor}40;
  }
  
  /* Efecto de fondo animado */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      ${props => props.themeColor}10, 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, ${props => props.themeColor}, ${props => props.themeColor}80);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.s5};
  color: ${props => props.theme.colors.white};
  position: relative;
  animation: ${pulse} 2s ease-in-out infinite;
  
  /* Efecto de flotación en hover */
  transition: all 0.3s ease;
  
  ${NormativaCard}:hover & {
    animation: ${float} 1s ease-in-out infinite;
    transform: scale(1.1);
  }
  
  /* Círculo de glow */
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: ${props => props.theme.borderRadius.full};
    background: linear-gradient(135deg, ${props => props.themeColor}20, transparent);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${NormativaCard}:hover &::after {
    opacity: 1;
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.s3};
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  
  ${NormativaCard}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: ${props => props.theme.spacing.s4};
  transition: color 0.3s ease;
  
  ${NormativaCard}:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

const LearnMoreText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  ${NormativaCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
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

  // Mapeo de iconos modernos
  const getIcon = (id) => {
    const icons = {
      'iso': Award,
      'sgsst': Shield,
      'pesv': Car,
      'isoiec': Zap
    };
    return icons[id] || Award;
  };

  // Colores temáticos para cada normativa
  const getColor = (id) => {
    const colors = {
      'iso': '#3498db',
      'sgsst': '#e74c3c',
      'pesv': '#9b59b6',
      'isoiec': '#f39c12'
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
            <NormativaCard 
              key={normativa.id}
              onClick={() => handleShowModal(normativa)}
              delay={index * 0.1}
              themeColor={themeColor}
            >
              <IconContainer themeColor={themeColor}>
                <IconComponent size={40} />
              </IconContainer>
              <CardTitle>{normativa.id.toUpperCase()}</CardTitle>
              <CardDescription>
                {normativa.description.substring(0, 100)}...
              </CardDescription>
              <LearnMoreText>Conocer más →</LearnMoreText>
            </NormativaCard>
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