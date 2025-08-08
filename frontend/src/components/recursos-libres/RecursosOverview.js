// RecursosOverview - Vista general de todos los recursos libres disponibles
// Página principal del dashboard de recursos libres

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid } from '../../design-system/components';
import { FormContainer } from '../../design-system/components/Form/FormContainer';
import { Card_Interaccion } from '../../design-system/components/Card';
import { Award, HardHat, Car, Lightbulb, CheckCircle, Clock } from 'lucide-react';

const OverviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled(FormContainer)`
  margin: 0 auto ${props => props.theme.spacing?.s8} auto;
  text-align: center;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows?.ctaHover ? 
      props.theme.shadows.ctaHover(props.theme.colors.primary) : 
      props.theme.shadows?.cardHover || props.theme.shadows?.card
    };
  }
`;

const WelcomeTitle = styled.h1`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.pageTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold};
  margin: 0 0 ${props => props.theme.spacing?.s4} 0;
`;

const WelcomeDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted};
  font-size: ${props => props.theme.typography?.fontSizes?.heroSubtitle};
  font-family: ${props => props.theme.typography?.fontFamilies?.secondary};
  line-height: ${props => props.theme.typography?.lineHeights?.relaxed};
  margin: 0 0 ${props => props.theme.spacing?.s6} 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints?.mobile}) {
    font-size: ${props => props.theme.typography?.fontSizes?.large};
  }
`;


const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing?.s4};
  margin: ${props => props.theme.spacing?.s6} 0;
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors?.surfaceSubtle};
  border: 1px solid ${props => props.theme.colors?.borderSubtle};
  border-radius: ${props => props.theme.borderRadius?.medium};
  padding: ${props => props.theme.spacing?.s4};
  text-align: center;
`;

const StatNumber = styled.div`
  color: ${props => props.theme.colors?.primary};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold};
  margin-bottom: ${props => props.theme.spacing?.s2};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors?.textMuted};
  font-size: ${props => props.theme.typography?.fontSizes?.small};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.sectionTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold};
  margin: ${props => props.theme.spacing?.s8} 0 ${props => props.theme.spacing?.s6} 0;
`;

const PilaresGrid = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing?.s8};
`;

const FeatureList = styled(FormContainer)`
  padding: ${props => props.theme.spacing?.s6};
  margin-top: ${props => props.theme.spacing?.s8};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows?.ctaHover ? 
      props.theme.shadows.ctaHover(props.theme.colors.primary) : 
      props.theme.shadows?.cardHover || props.theme.shadows?.card
    };
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3};
  padding: ${props => props.theme.spacing?.s3} 0;
  border-bottom: 1px solid ${props => props.theme.colors?.borderSubtle};
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeatureIcon = styled.div`
  color: ${props => props.theme.colors?.success};
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.base};
`;


// Datos de los pilares
const pilares = [
  {
    id: 'iso',
    title: 'ISO',
    subtitle: 'Normas 9001 | 45001 | 14001',
    description: 'Herramientas para implementar y mantener sistemas de gestión de calidad, seguridad y ambiente según normas ISO.',
    icon: Award,
    path: '/acceso-gratuito/iso',
    toolsCount: 5,
    color: '#3b82f6' // Azul
  },
  {
    id: 'sgsst',
    title: 'SG-SST',
    subtitle: 'Sistema Gestión SST',
    description: 'Recursos para cumplir con el Sistema de Gestión de Seguridad y Salud en el Trabajo según normativa colombiana.',
    icon: HardHat,
    path: '/acceso-gratuito/sgsst',
    toolsCount: 5,
    color: '#dc2626' // Rojo
  },
  {
    id: 'pesv',
    title: 'PESV',
    subtitle: 'Plan Estratégico Seguridad Vial',
    description: 'Herramientas para desarrollar e implementar planes de seguridad vial en organizaciones con flotas vehiculares.',
    icon: Car,
    path: '/acceso-gratuito/pesv',
    toolsCount: 2,
    color: '#7c3aed' // Púrpura
  },
  {
    id: 'innovation',
    title: 'Innovación',
    subtitle: 'Gestión de la Innovación',
    description: 'Recursos para fomentar la innovación empresarial y gestionar proyectos de transformación digital.',
    icon: Lightbulb,
    path: '/acceso-gratuito/innovation',
    toolsCount: 4,
    color: '#f59e0b' // Amarillo
  }
];

const RecursosOverview = () => {
  const navigate = useNavigate();

  const totalTools = pilares.reduce((total, pilar) => total + pilar.toolsCount, 0);
  const availablePilares = pilares.length;

  const handlePilarClick = (pilar) => {
    navigate(pilar.path);
  };

  return (
    <OverviewContainer>
      <WelcomeSection>
        <WelcomeTitle>Bienvenido a Recursos Libres</WelcomeTitle>
        <WelcomeDescription>
          Accede gratuitamente a herramientas profesionales de gestión empresarial. 
          Explora diagnósticos, matrices y calculadoras para mejorar la gestión de tu organización.
        </WelcomeDescription>

        <StatsGrid>
          <StatCard>
            <StatNumber>{totalTools}</StatNumber>
            <StatLabel>Herramientas Disponibles</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{availablePilares}</StatNumber>
            <StatLabel>Pilares de Gestión</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100%</StatNumber>
            <StatLabel>Gratis y Sin Registro</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Disponible Siempre</StatLabel>
          </StatCard>
        </StatsGrid>
      </WelcomeSection>

      <SectionTitle>Explora los Pilares de Gestión</SectionTitle>
      
      <PilaresGrid columns={2} tablet={1} mobile={1} gap="large">
        {pilares.map((pilar) => {
          const IconComponent = pilar.icon;
          return (
            <Card_Interaccion
              key={pilar.id}
              title={pilar.title}
              subtitle={pilar.subtitle}
              description={pilar.description}
              icon={<IconComponent size={32} />}
              themeColor={pilar.color}
              onClick={() => handlePilarClick(pilar)}
              footer={`${pilar.toolsCount} herramientas disponibles`}
            />
          );
        })}
      </PilaresGrid>

      <FeatureList>
        <SectionTitle style={{ marginTop: 0 }}>¿Qué incluye cada pilar?</SectionTitle>
        
        <FeatureItem>
          <FeatureIcon><CheckCircle size={20} /></FeatureIcon>
          <FeatureText>
            <strong>Diagnósticos automatizados:</strong> Evalúa el estado actual de tus sistemas de gestión
          </FeatureText>
        </FeatureItem>
        
        <FeatureItem>
          <FeatureIcon><CheckCircle size={20} /></FeatureIcon>
          <FeatureText>
            <strong>Matrices de evaluación:</strong> Herramientas para identificar y evaluar riesgos
          </FeatureText>
        </FeatureItem>
        
        <FeatureItem>
          <FeatureIcon><CheckCircle size={20} /></FeatureIcon>
          <FeatureText>
            <strong>Calculadoras especializadas:</strong> ROI, priorización y análisis cuantitativos
          </FeatureText>
        </FeatureItem>
        
        <FeatureItem>
          <FeatureIcon><CheckCircle size={20} /></FeatureIcon>
          <FeatureText>
            <strong>Plantillas y formatos:</strong> Documentos listos para usar en tu organización
          </FeatureText>
        </FeatureItem>
        
        <FeatureItem>
          <FeatureIcon><Clock size={20} /></FeatureIcon>
          <FeatureText>
            <strong>Próximamente:</strong> 10 herramientas por pilar para un total de 40 recursos
          </FeatureText>
        </FeatureItem>
      </FeatureList>
    </OverviewContainer>
  );
};

export default RecursosOverview;