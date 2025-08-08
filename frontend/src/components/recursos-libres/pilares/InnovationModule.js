// InnovationModule - Módulo de recursos libres para Innovación
// Contiene todas las herramientas relacionadas con gestión de la innovación

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { Lightbulb, TrendingUp, Calculator, FileText, Users, Zap, Target, BarChart3 } from 'lucide-react';

const ModuleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ModuleHeader = styled(FormContainer)`
  margin-bottom: ${props => props.theme.spacing?.s8 || '32px'};
  text-align: center;
  max-width: 1000px;
`;

const ModuleTitle = styled.h1`
  color: ${props => props.theme.colors?.text || '#111827'};
  font-size: ${props => props.theme.typography?.fontSizes?.pageTitle || '2rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
  margin: 0 0 ${props => props.theme.spacing?.s4 || '16px'} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing?.s3 || '12px'};
`;

const ModuleDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.large || '1.125rem'};
  margin: 0 0 ${props => props.theme.spacing?.s6 || '24px'} 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  margin: ${props => props.theme.spacing?.s6 || '24px'} 0;
`;

const BenefitCard = styled.div`
  background: ${props => props.theme.colors?.surfaceSubtle || '#f9fafb'};
  border: 1px solid ${props => props.theme.colors?.borderSubtle || '#f3f4f6'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  text-align: center;
`;

const BenefitIcon = styled.div`
  color: ${props => props.theme.colors?.warning || '#f59e0b'};
  margin-bottom: ${props => props.theme.spacing?.s3 || '12px'};
  display: flex;
  justify-content: center;
`;

const BenefitTitle = styled.h3`
  color: ${props => props.theme.colors?.text || '#111827'};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.125rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: 0 0 ${props => props.theme.spacing?.s2 || '8px'} 0;
`;

const BenefitDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.small || '0.875rem'};
  margin: 0;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors?.text || '#111827'};
  font-size: ${props => props.theme.typography?.fontSizes?.sectionTitle || '1.5rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: ${props => props.theme.spacing?.s8 || '32px'} 0 ${props => props.theme.spacing?.s6 || '24px'} 0;
`;

const ToolsGrid = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing?.s8 || '32px'};
`;

const ComingSoonSection = styled(FormContainer)`
  border: 2px dashed ${props => props.theme.colors?.border || '#d1d5db'};
  text-align: center;
  margin-top: ${props => props.theme.spacing?.s8 || '32px'};
  background: ${props => props.theme.colors?.backgroundLight || '#f3f4f6'};
  max-width: 1000px;
`;

const ComingSoonTitle = styled.h3`
  color: ${props => props.theme.colors?.text || '#374151'};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.25rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: 0 0 ${props => props.theme.spacing?.s4 || '16px'} 0;
`;

const ComingSoonDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  margin: 0 0 ${props => props.theme.spacing?.s6 || '24px'} 0;
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

// Herramientas próximas (para llegar a 10 total)
const herramientasProximas = [
  'Generador de Ideas',
  'Análisis de Tendencias',
  'Plan de Innovación',
  'Métricas de Innovación',
  'Gestión de Portfolio',
  'Ecosistema de Innovación'
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

      <ComingSoonSection>
        <ComingSoonTitle>Próximas Herramientas de Innovación</ComingSoonTitle>
        <ComingSoonDescription>
          Estamos desarrollando {herramientasProximas.length} herramientas adicionales para completar 
          el conjunto de 10 recursos especializados en gestión de la innovación empresarial.
        </ComingSoonDescription>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px', 
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          {herramientasProximas.map((tool, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              color: '#6b7280',
              border: '1px solid #d1d5db'
            }}>
              {tool}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="medium"
          onClick={() => navigate('/register')}
        >
          <Users size={16} />
          Regístrate para Actualizaciones
        </Button>
      </ComingSoonSection>
    </ModuleContainer>
  );
};

export default InnovationModule;