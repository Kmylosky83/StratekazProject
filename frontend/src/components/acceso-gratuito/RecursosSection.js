// RecursosSection - Componente específico para AccesoGratuitoPage
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Section, SectionHeader, Grid, Container, Card_Selection } from '../../design-system/components';
import { Award, HardHat, Car, Lightbulb } from 'lucide-react';
// import RecursoLibreModal from '../modals/RecursoLibreModal'; // No usado en esta sección
import RecursosLibresInfoModal from '../modals/RecursosLibresInfoModal';
import { Icon } from '../../design-system/icons';

const ToolGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  position: relative;
`;

const InfoButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Efecto de resplandor sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, ${props => props.theme.colors.primary}20 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  /* Estados de interacción mejorados */
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px rgba(236, 38, 143, 0.25);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.1s ease;
  }
  
  /* Icono con micro-animación */
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(15deg) scale(1.1);
  }
  
  /* Responsive mejorado */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    margin: ${props => props.theme.spacing.s4} auto 0;
    width: 48px;
    height: 48px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 52px;
    height: 52px;
  }
`;

const tools = [
  {
    id: 'iso',
    icon: Award,
    title: "ISO 9001",
    description: "Sistema de Gestión de Calidad. Herramientas básicas para implementar ISO 9001 en tu organización.",
    available: true
  },
  {
    id: 'sgsst',
    icon: HardHat,
    title: "SG-SST",
    description: "Sistema de Gestión de Seguridad y Salud en el Trabajo. Cumple con la normatividad colombiana.",
    available: true
  },
  {
    id: 'pesv',
    icon: Car,
    title: "PESV",
    description: "Plan Estratégico de Seguridad Vial. Herramientas para implementar PESV en tu empresa.",
    available: true
  },
  {
    id: 'innovation',
    icon: Lightbulb,
    title: "Innovación",
    description: "Herramientas de gestión de la innovación. Impulsa la creatividad en tu organización.",
    available: true
  }
];

const RecursosSection = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // Verificar si es la primera visita y mostrar modal automáticamente
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenRecursosLibresIntro');
    if (!hasSeenIntro) {
      // Mostrar el modal después de un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        setInfoModalOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToolClick = (tool) => {
    // Función principal para acceder al recurso
    console.log(`Accediendo directamente al recurso: ${tool.id}`);
    // Aquí puedes agregar lógica para navegar a la herramienta específica
    // Ejemplo: window.location.href = `/herramientas/${tool.id}`;
    // O navegar con React Router: navigate(`/herramientas/${tool.id}`);
  };

  // Función para mostrar información general sobre recursos libres

  const handleShowInfo = () => {
    setInfoModalOpen(true);
  };

  return (
    <Section variant="light" size="large">
      <Container>
        <HeaderContainer>
          <SectionHeader
            title="Recursos Libres"
            subtitle="Accede a nuestras herramientas básicas de gestión empresarial completamente gratis"
            centered
          />
          <InfoButton 
            onClick={handleShowInfo}
            title="¿Cómo funcionan los recursos libres?"
          >
            <Icon name="help-circle" size={20} />
          </InfoButton>
        </HeaderContainer>
        
        <ToolGrid columns={4} tablet={2} mobile={1} gap="large">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card_Selection
                key={index}
                title={tool.title}
                description={tool.description}
                icon={<IconComponent size={32} />}
                selected={false}
                disabled={!tool.available}
                onClick={() => handleToolClick(tool)}
              />
            );
          })}
        </ToolGrid>

        {/* Modal Informativo de Primera Visita */}
        <RecursosLibresInfoModal
          isOpen={infoModalOpen}
          onClose={() => setInfoModalOpen(false)}
        />
      </Container>
    </Section>
  );
};

export default RecursosSection;