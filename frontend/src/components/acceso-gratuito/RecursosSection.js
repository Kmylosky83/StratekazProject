// RecursosSection - Componente específico para AccesoGratuitoPage
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Section, SectionHeader, Grid, Container, Card_Selection, Button } from '../../design-system/components';
import { Award, HardHat, Car, Lightbulb, HelpCircle } from 'lucide-react';
import RecursosLibresInfoModal from '../modals/RecursosLibresInfoModal';
import PillarSidebar from '../recursos-libres/PillarSidebar';
import { Icon } from '../../design-system/icons';

const ToolGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s8};
  text-align: center;
`;

const tools = [
  {
    id: 'iso',
    icon: Award,
    title: "ISO 9001 | 45001 | 14001",
    description: "Sistema de Gestión de Calidad. Herramientas básicas para implementar ISO 9001 en tu organización.",
    available: true,
    herramientas: [
      {
        id: 'matriz-riesgos',
        name: 'Matriz de Riesgos',
        description: 'Identifica y evalúa los riesgos de tu organización'
      },
      {
        id: 'auditoria-interna',
        name: 'Auditoría Interna',
        description: 'Planifica y ejecuta auditorías internas de calidad'
      }
    ]
  },
  {
    id: 'sgsst',
    icon: HardHat,
    title: "SG-SST",
    description: "Sistema de Gestión de Seguridad y Salud en el Trabajo. Cumple con la normatividad colombiana.",
    available: true,
    herramientas: [
      {
        id: 'matriz-peligros',
        name: 'Matriz de Peligros',
        description: 'Identifica peligros y evalúa riesgos laborales'
      },
      {
        id: 'investigacion-accidentes',
        name: 'Investigación de Accidentes',
        description: 'Investiga y analiza accidentes e incidentes'
      }
    ]
  },
  {
    id: 'pesv',
    icon: Car,
    title: "PESV",
    description: "Plan Estratégico de Seguridad Vial. Herramientas para implementar PESV en tu empresa.",
    available: true,
    herramientas: [
      {
        id: 'diagnostico-pesv',
        name: 'Diagnóstico PESV',
        description: 'Evalúa el estado actual de seguridad vial'
      },
      {
        id: 'plan-accion',
        name: 'Plan de Acción',
        description: 'Define objetivos y acciones de seguridad vial'
      }
    ]
  },
  {
    id: 'innovation',
    icon: Lightbulb,
    title: "Innovación",
    description: "Herramientas de gestión de la innovación. Impulsa la creatividad en tu organización.",
    available: true,
    herramientas: [
      {
        id: 'canvas-innovacion',
        name: 'Canvas de Innovación',
        description: 'Estructura tus ideas innovadoras'
      },
      {
        id: 'matriz-priorizacion',
        name: 'Matriz de Priorización',
        description: 'Prioriza proyectos de innovación'
      }
    ]
  }
];

const RecursosSection = () => {
  const navigate = useNavigate();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState(null);

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
    // Abrir sidebar con las herramientas del pilar
    setSelectedPillar(tool.id);
    setSidebarOpen(true);
  };

  const handleToolSelect = (tool) => {
    // Navegar a la herramienta específica
    navigate(`/herramientas/${selectedPillar}/${tool.id}`);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setSelectedPillar(null);
  };

  const handleShowInfo = () => {
    setInfoModalOpen(true);
  };

  return (
    <Section variant="light" size="large">
      <Container>
        <HeaderSection>
          <SectionHeader
            title="Recursos Libres"
            centered
          />
          
          <Button 
            variant="outline"
            size="medium"
            onClick={handleShowInfo}
            title="¿Cómo funcionan los recursos libres?"
            aria-label="Información sobre recursos libres"
          >
            ¿Cómo funcionan los recursos libres?
          </Button>
        </HeaderSection>
        
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

        {/* Sidebar de Herramientas */}
        <PillarSidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          selectedPillar={selectedPillar}
          tools={selectedPillar ? tools.find(t => t.id === selectedPillar)?.herramientas || [] : []}
          onToolSelect={handleToolSelect}
        />
      </Container>
    </Section>
  );
};

export default RecursosSection;