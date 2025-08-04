import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionHeader, Grid } from '../../design-system/components';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight } from '../../design-system/animations';

// Animaciones personalizadas
const drawLine = keyframes`
  from { 
    transform: scaleX(0);
    opacity: 0;
  }
  to { 
    transform: scaleX(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(52, 152, 219, 0.5);
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const MethodologyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s6};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.s8};
  }
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    width: 100%;
    max-width: 600px;
  }
`;

const StepCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s8};
  box-shadow: ${props => props.theme.shadows.card};
  text-align: center;
  width: 100%;
  max-width: 280px;
  position: relative;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Animación de entrada escalonada */
  animation: ${slideInUp} 0.6s ease-out ${props => props.index * 0.2}s both;
  
  /* Hover effects sorprendentes */
  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    /* Glow effect progresivo */
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
                0 0 40px rgba(52, 152, 219, 0.3);
  }
  
  /* Efecto de brillo que se mueve */
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
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
    border-radius: ${props => props.theme.borderRadius.large};
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: none;
    text-align: left;
    padding: ${props => props.theme.spacing.s6};
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s5};
  position: relative;
  overflow: hidden;
  
  /* Animación de pulso constante */
  animation: ${pulse} 3s ease-in-out infinite;
  
  /* En hover del card, el número rota */
  ${StepCard}:hover & {
    animation: ${rotate} 1s linear infinite;
  }
  
  /* Efecto de aro externo */
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px solid ${props => props.theme.colors.primary}40;
    border-radius: ${props => props.theme.borderRadius.full};
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
  }
  
  ${StepCard}:hover &::after {
    opacity: 1;
    transform: scale(1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 0 ${props => props.theme.spacing.s4} 0 0;
    width: 60px;
    height: 60px;
  }
`;

const NumberText = styled.span`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.fontSizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  
  ${StepCard}:hover & {
    transform: scale(1.1);
  }
`;

const StepIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  color: ${props => props.theme.colors.white};
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 3;
  
  ${StepCard}:hover & {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  
  ${StepCard}:hover ${NumberText} {
    transform: scale(0);
    opacity: 0;
  }
`;

const StepContent = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: 1;
  }
`;

const StepTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.s3};
  transition: color 0.3s ease;
  
  ${StepCard}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  line-height: 1.6;
  transition: color 0.3s ease;
  
  ${StepCard}:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

const StepConnector = styled.div`
  position: absolute;
  top: 40px;
  right: -${props => props.theme.spacing.s6};
  color: ${props => props.theme.colors.primary};
  z-index: 1;
  
  /* Animación de entrada con delay */
  opacity: 0;
  transform: translateX(-20px);
  animation: ${fadeInUp} 0.6s ease-out ${props => (props.index + 1) * 0.2}s both;
  
  /* Efecto hover */
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px) scale(1.2);
    color: ${props => props.theme.colors.secondary};
  }
  
  /* Línea connecting que se dibuja */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    width: 40px;
    height: 2px;
    background: linear-gradient(
      90deg, 
      ${props => props.theme.colors.primary}40, 
      ${props => props.theme.colors.primary}
    );
    transform: translateY(-50%) scaleX(0);
    transform-origin: left;
    animation: ${drawLine} 0.8s ease-out ${props => (props.index + 1) * 0.3}s both;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    margin: ${props => props.theme.spacing.s4} 0;
    transform: rotate(90deg);
    
    &::before {
      display: none;
    }
  }
`;

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
    <Section size="large" variant="default">
      <SectionHeader
        title="Nuestra Metodología"
        subtitle="Un enfoque estructurado y adaptable para asegurar resultados óptimos en cada proyecto."
        centered
      />
      
      <MethodologyContainer>
        {metodologiaPasos.map((paso, index) => (
          <StepContainer key={index} index={index}>
            <StepCard index={index}>
              <StepNumber index={index}>
                <NumberText>{paso.numero}</NumberText>
                <StepIcon>
                  <CheckCircle size={20} />
                </StepIcon>
              </StepNumber>
              
              <StepContent>
                <StepTitle>{paso.titulo}</StepTitle>
                <StepDescription>{paso.descripcion}</StepDescription>
              </StepContent>
            </StepCard>
            
            {index < metodologiaPasos.length - 1 && (
              <StepConnector index={index}>
                <ArrowRight size={24} />
              </StepConnector>
            )}
          </StepContainer>
        ))}
      </MethodologyContainer>
    </Section>
  );
};

export default MethodologySection;