// SGSSTModule - Módulo de recursos libres para SG-SST
// Contiene todas las herramientas relacionadas con Sistema de Gestión SST

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { HardHat, AlertTriangle, FileText, Users, Calendar, Target, Activity, Clipboard } from 'lucide-react';

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

const LegalInfoBox = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  margin: ${props => props.theme.spacing?.s6 || '24px'} 0;
  text-align: left;
`;

const LegalTitle = styled.h3`
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.125rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: 0 0 ${props => props.theme.spacing?.s2 || '8px'} 0;
`;

const LegalText = styled.p`
  opacity: 0.95;
  margin: 0;
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
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

// Herramientas próximas (para llegar a 10 total)
const herramientasProximas = [
  'Plan de Trabajo SG-SST',
  'Matriz de Capacitaciones',
  'Control de EPP',
  'Inspecciones de Seguridad',
  'Indicadores de Gestión'
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
        <ComingSoonTitle>Próximas Herramientas SG-SST</ComingSoonTitle>
        <ComingSoonDescription>
          Estamos desarrollando {herramientasProximas.length} herramientas adicionales para completar 
          el conjunto de 10 recursos especializados en gestión de seguridad y salud en el trabajo.
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

export default SGSSTModule;