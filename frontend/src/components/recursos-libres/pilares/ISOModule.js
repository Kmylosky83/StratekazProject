// ISOModule - Módulo de recursos libres para normas ISO
// Contiene todas las herramientas relacionadas con ISO 9001, 45001, 14001

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { FormContainer } from '../../../design-system/components/Form/FormContainer';
import { Award, FileText, ClipboardCheck, BarChart3, Settings, Users, Calendar, Target, Shield, Leaf } from 'lucide-react';

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

const NormasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  margin: ${props => props.theme.spacing?.s6 || '24px'} 0;
`;

const NormaCard = styled.div`
  background: ${props => props.theme.colors?.surfaceSubtle || '#f9fafb'};
  border: 2px solid ${props => props.color || props.theme.colors?.border};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  text-align: center;
`;

const NormaIcon = styled.div`
  color: ${props => props.color || props.theme.colors?.primary};
  margin-bottom: ${props => props.theme.spacing?.s3 || '12px'};
  display: flex;
  justify-content: center;
`;

const NormaTitle = styled.h3`
  color: ${props => props.theme.colors?.text || '#111827'};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.125rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: 0 0 ${props => props.theme.spacing?.s2 || '8px'} 0;
`;

const NormaSubtitle = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.small || '0.875rem'};
  margin: 0;
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

// Herramientas próximas (para llegar a 10 total)
const herramientasProximas = [
  'Plan de Implementación ISO',
  'Gestor de No Conformidades',
  'Matriz de Competencias',
  'Control de Documentos',
  'Seguimiento de Objetivos'
];

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

      <ComingSoonSection>
        <ComingSoonTitle>Próximas Herramientas ISO</ComingSoonTitle>
        <ComingSoonDescription>
          Estamos trabajando en {herramientasProximas.length} herramientas adicionales para completar 
          el conjunto de 10 recursos especializados en normas ISO.
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

export default ISOModule;