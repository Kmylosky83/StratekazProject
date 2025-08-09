// SGSSTModule - Módulo de recursos libres para SG-SST
// Contiene todas las herramientas relacionadas con Sistema de Gestión SST

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { HardHat, AlertTriangle, FileText, Users, Calendar, Target, Activity, Clipboard } from 'lucide-react';

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

const LegalInfoBox = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s6} 0;
  text-align: left;
`;

const LegalTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
`;

const LegalText = styled.p`
  opacity: 0.95;
  margin: 0;
  font-size: ${props => props.theme.typography.fontSizes.base};
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

// Herramientas disponibles actualmente
const herramientasDisponibles = [
  {
    id: 'matriz-peligros',
    title: 'Matriz de Peligros',
    description: 'Identifica peligros y evalúa riesgos laborales según GTC-45 y Res. 0312/2019.',
    icon: AlertTriangle,
    available: true,
    pillar: 'sgsst'
  },
  {
    id: 'investigacion-accidentes',
    title: 'Investigación de Accidentes',
    description: 'Investiga y analiza accidentes e incidentes laborales con metodología estructurada.',
    icon: Clipboard,
    available: true,
    pillar: 'sgsst'
  },
  {
    id: 'evaluador-riesgos',
    title: 'Evaluador de Riesgos',
    description: 'Herramienta para evaluar y clasificar riesgos laborales con criterios técnicos.',
    icon: Activity,
    available: true,
    pillar: 'sgsst'
  },
  {
    id: 'diagnostico-0312',
    title: 'Diagnóstico Resolución 0312',
    description: 'Evalúa el cumplimiento de estándares mínimos del SG-SST según Res. 0312/2019.',
    icon: FileText,
    available: true,
    pillar: 'sgsst'
  },
  {
    id: 'diagnostico-1072',
    title: 'Diagnóstico Decreto 1072',
    description: 'Evalúa el cumplimiento del decreto único reglamentario del sector trabajo.',
    icon: FileText,
    available: true,
    pillar: 'sgsst'
  }
];


const SGSSTModule = () => {
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
          <HardHat size={32} />
          Recursos SG-SST
        </ModuleTitle>
        <ModuleDescription>
          Herramientas especializadas para implementar y mantener el Sistema de Gestión 
          de Seguridad y Salud en el Trabajo conforme a la normativa colombiana vigente.
        </ModuleDescription>

        <LegalInfoBox>
          <LegalTitle>Marco Legal Colombiano</LegalTitle>
          <LegalText>
            El SG-SST es <strong>obligatorio</strong> para todas las empresas en Colombia según 
            el Decreto 1072 de 2015 y debe cumplir con los estándares mínimos de la Resolución 0312 de 2019.
          </LegalText>
        </LegalInfoBox>
      </ModuleHeader>

      <SectionTitle>Herramientas Disponibles</SectionTitle>
      
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
    </ModuleContainer>
  );
};

export default SGSSTModule;