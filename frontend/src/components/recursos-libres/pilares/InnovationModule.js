// InnovationModule - Módulo de recursos libres para Innovación
// Contiene todas las herramientas relacionadas con gestión de la innovación

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { Lightbulb, TrendingUp, Calculator, FileText, Users, Zap, Target, BarChart3 } from 'lucide-react';

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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s6} 0;
`;

const BenefitCard = styled.div`
  background: ${props => props.theme.colors.surfaceSubtle};
  border: 1px solid ${props => props.theme.colors.borderSubtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  text-align: center;
`;

const BenefitIcon = styled.div`
  color: ${props => props.theme.colors.warning};
  margin-bottom: ${props => props.theme.spacing.s3};
  display: flex;
  justify-content: center;
`;

const BenefitTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
`;

const BenefitDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.small};
  margin: 0;
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

// Beneficios de la innovación
const beneficiosInnovacion = [
  {
    title: 'Ventaja Competitiva',
    description: 'Diferénciate de la competencia con soluciones únicas',
    icon: TrendingUp
  },
  {
    title: 'Eficiencia Operacional',
    description: 'Optimiza procesos y reduce costos operativos',
    icon: Zap
  },
  {
    title: 'Nuevos Ingresos',
    description: 'Identifica oportunidades de crecimiento y nuevos mercados',
    icon: Target
  },
  {
    title: 'Cultura Innovadora',
    description: 'Fomenta la creatividad y el pensamiento estratégico',
    icon: Users
  }
];

// Herramientas disponibles actualmente
const herramientasDisponibles = [
  {
    id: 'canvas-innovacion',
    title: 'Canvas de Innovación',
    description: 'Estructura y desarrolla tus ideas innovadoras con metodología Canvas especializada.',
    icon: FileText,
    available: true,
    pillar: 'innovation'
  },
  {
    id: 'matriz-priorizacion',
    title: 'Matriz de Priorización',
    description: 'Prioriza proyectos de innovación evaluando impacto, viabilidad y recursos.',
    icon: BarChart3,
    available: true,
    pillar: 'innovation'
  },
  {
    id: 'calculadora-roi',
    title: 'Calculadora ROI',
    description: 'Calcula el retorno de inversión de proyectos innovadores y de transformación.',
    icon: Calculator,
    available: true,
    pillar: 'innovation'
  },
  {
    id: 'diagnostico-innovacion',
    title: 'Diagnóstico de Innovación',
    description: 'Evalúa la madurez innovadora y capacidades de innovación de tu organización.',
    icon: Lightbulb,
    available: true,
    pillar: 'innovation'
  }
];


const InnovationModule = () => {
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
          <Lightbulb size={32} />
          Recursos de Innovación
        </ModuleTitle>
        <ModuleDescription>
          Herramientas especializadas para fomentar la innovación empresarial, gestionar 
          proyectos de transformación digital y desarrollar capacidades innovadoras en tu organización.
        </ModuleDescription>

        <BenefitsGrid>
          {beneficiosInnovacion.map((beneficio, index) => {
            const IconComponent = beneficio.icon;
            return (
              <BenefitCard key={index}>
                <BenefitIcon>
                  <IconComponent size={24} />
                </BenefitIcon>
                <BenefitTitle>{beneficio.title}</BenefitTitle>
                <BenefitDescription>{beneficio.description}</BenefitDescription>
              </BenefitCard>
            );
          })}
        </BenefitsGrid>
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

export default InnovationModule;