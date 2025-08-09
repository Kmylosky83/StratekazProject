// ISOModule - Módulo de recursos libres para normas ISO
// Contiene todas las herramientas relacionadas con ISO 9001, 45001, 14001

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { Award, FileText, ClipboardCheck, BarChart3, Settings, Users, Calendar, Target, Shield, Leaf } from 'lucide-react';

const ModuleContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.desktop};
  margin: 0 auto;
`;

const ModuleHeader = styled(FormContainer)`
  margin-bottom: ${props => props.theme.spacing.s8};
  text-align: center;
  max-width: ${props => props.theme.breakpoints.desktop};
`;

const ModuleTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.pageTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
`;

const ModuleDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.large};
  margin: 0 0 ${props => props.theme.spacing.s6} 0;
  max-width: ${props => props.theme.breakpoints.tablet};
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const NormasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s6} 0;
`;

const NormaCard = styled.div`
  background: ${props => props.theme.colors.surfaceSubtle};
  border: 2px solid ${props => props.color || props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  text-align: center;
`;

const NormaIcon = styled.div`
  color: ${props => props.color || props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.s3};
  display: flex;
  justify-content: center;
`;

const NormaTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
`;

const NormaSubtitle = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.small};
  margin: 0;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin: ${props => props.theme.spacing.s8} 0 ${props => props.theme.spacing.s6} 0;
`;

const ToolsGrid = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing.s8};
`;

// ComingSoonSection eliminado

// ComingSoonTitle eliminado

// ComingSoonDescription eliminado

// Datos de las normas ISO
const normasISO = [
  {
    title: 'ISO 9001:2015',
    subtitle: 'Sistemas de Gestión de Calidad',
    icon: Target,
    color: '#3b82f6'
  },
  {
    title: 'ISO 45001:2018',
    subtitle: 'Sistemas de Gestión de SST',
    icon: Shield,
    color: '#dc2626'
  },
  {
    title: 'ISO 14001:2015',
    subtitle: 'Sistemas de Gestión Ambiental',
    icon: Leaf,
    color: '#059669'
  }
];

// Herramientas disponibles actualmente
const herramientasDisponibles = [
  {
    id: 'matriz-riesgos',
    title: 'Matriz de Riesgos',
    description: 'Identifica, evalúa y clasifica los riesgos de tu organización según metodología ISO 31000.',
    icon: BarChart3,
    available: true,
    pillar: 'iso'
  },
  {
    id: 'auditoria-interna',
    title: 'Auditoría Interna',
    description: 'Planifica y ejecuta auditorías internas de sistemas de gestión ISO.',
    icon: ClipboardCheck,
    available: true,
    pillar: 'iso'
  },
  {
    id: 'diagnostico-9001',
    title: 'Diagnóstico ISO 9001:2015',
    description: 'Evalúa el nivel de cumplimiento de tu Sistema de Gestión de Calidad.',
    icon: FileText,
    available: true,
    pillar: 'iso'
  },
  {
    id: 'diagnostico-45001',
    title: 'Diagnóstico ISO 45001',
    description: 'Evalúa el cumplimiento de tu sistema de seguridad y salud ocupacional.',
    icon: Shield,
    available: true,
    pillar: 'iso'
  },
  {
    id: 'diagnostico-14001',
    title: 'Diagnóstico ISO 14001',
    description: 'Evalúa el estado de tu sistema de gestión ambiental.',
    icon: Leaf,
    available: true,
    pillar: 'iso'
  }
];

// herramientasProximas eliminado

const ISOModule = () => {
  const navigate = useNavigate();

  const handleToolClick = (tool) => {
    if (tool.available) {
      navigate(`/herramientas/${tool.pillar}/${tool.id}`);
    }
  };

  return (
    <ModuleContainer>
      <ModuleHeader>
        <ModuleTitle>
          <Award size={32} />
          Recursos ISO
        </ModuleTitle>
        <ModuleDescription>
          Herramientas especializadas para implementar y mantener sistemas de gestión 
          según las principales normas ISO: Calidad (9001), Seguridad y Salud (45001) 
          y Gestión Ambiental (14001).
        </ModuleDescription>

        <NormasGrid>
          {normasISO.map((norma, index) => {
            const IconComponent = norma.icon;
            return (
              <NormaCard key={index} color={norma.color}>
                <NormaIcon color={norma.color}>
                  <IconComponent size={24} />
                </NormaIcon>
                <NormaTitle>{norma.title}</NormaTitle>
                <NormaSubtitle>{norma.subtitle}</NormaSubtitle>
              </NormaCard>
            );
          })}
        </NormasGrid>
      </ModuleHeader>

      <SectionTitle>Herramientas Disponibles ({herramientasDisponibles.length}/10)</SectionTitle>
      
      <ToolsGrid columns={3} tablet={2} mobile={1} gap="large">
        {herramientasDisponibles.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Card_Selection
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={<IconComponent size={32} />}
              selected={false}
              disabled={!tool.available}
              onClick={() => handleToolClick(tool)}
            />
          );
        })}
      </ToolsGrid>

      {/* Sección "Próximas Herramientas" eliminada */}
    </ModuleContainer>
  );
};

export default ISOModule;