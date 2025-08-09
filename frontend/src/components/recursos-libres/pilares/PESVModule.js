// PESVModule - Módulo de recursos libres para PESV
// Contiene todas las herramientas relacionadas con Plan Estratégico de Seguridad Vial

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { Car, FileText, Target, Users, Calendar, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';

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
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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

const RequirementsList = styled.div`
  background: ${props => props.theme.colors.surfaceSubtle};
  border: 1px solid ${props => props.theme.colors.borderSubtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s6};
  margin: ${props => props.theme.spacing.s6} 0;
  text-align: left;
`;

const RequirementsTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  margin-bottom: ${props => props.theme.spacing.s3};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RequirementIcon = styled.div`
  color: ${props => props.theme.colors.success};
  margin-top: 2px;
`;

const RequirementText = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  line-height: 1.5;
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
    id: 'diagnostico-pesv',
    title: 'Diagnóstico PESV',
    description: 'Evalúa el estado actual de la seguridad vial en tu organización según Res. 40595/2022.',
    icon: FileText,
    available: true,
    pillar: 'pesv'
  },
  {
    id: 'plan-accion',
    title: 'Plan de Acción',
    description: 'Define objetivos, metas y acciones específicas para mejorar la seguridad vial.',
    icon: Target,
    available: true,
    pillar: 'pesv'
  }
];


// Requisitos de aplicación del PESV
const requisitosAplicacion = [
  'Empresas que posean 10 o más vehículos',
  'Empresas que contraten o administren personal de conductores',
  'Empresas dedicadas al transporte como actividad económica principal',
  'Entidades del Estado con cualquier cantidad de vehículos'
];

const PESVModule = () => {
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
          <Car size={32} />
          Recursos PESV
        </ModuleTitle>
        <ModuleDescription>
          Herramientas especializadas para desarrollar e implementar el Plan Estratégico 
          de Seguridad Vial conforme a la Resolución 40595 de 2022 del Ministerio de Transporte.
        </ModuleDescription>

        <LegalInfoBox>
          <LegalTitle>Marco Legal - Resolución 40595 de 2022</LegalTitle>
          <LegalText>
            El PESV es <strong>obligatorio</strong> para las organizaciones que posean, fabriquen, 
            ensamblen, comercialicen, contraten o administren flotas de vehículos automotores o no automotores.
          </LegalText>
        </LegalInfoBox>

        <RequirementsList>
          <RequirementsTitle>¿Tu organización debe implementar PESV?</RequirementsTitle>
          {requisitosAplicacion.map((requisito, index) => (
            <RequirementItem key={index}>
              <RequirementIcon>
                <CheckCircle size={16} />
              </RequirementIcon>
              <RequirementText>{requisito}</RequirementText>
            </RequirementItem>
          ))}
        </RequirementsList>
      </ModuleHeader>

      <SectionTitle>Herramientas Disponibles</SectionTitle>
      
      <ToolsGrid columns={2} tablet={1} mobile={1} gap="large">
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

export default PESVModule;