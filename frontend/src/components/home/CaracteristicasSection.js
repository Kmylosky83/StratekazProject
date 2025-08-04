// frontend/src/components/home/CaracteristicasSection.js
import React from 'react';
import styled from 'styled-components';
import { GitBranch, Activity, CheckSquare, PieChart } from 'lucide-react';
import { Section, SectionHeader, Grid, Card_Feature, H4, Text } from '../../design-system/components';
import { Icon } from '../../design-system/icons';

const FeatureGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.s6};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s8};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.card};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.hover};
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.primary};
  transition: ${props => props.theme.transitions.normal};
  
  ${FeatureCard}:hover & {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const FeatureTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.s3};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const FeatureDescription = styled(Text)`
  color: ${props => props.theme.colors.muted};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const features = [
  {
    icon: GitBranch,
    title: "Sistemas Integrados",
    description: "Gestiona múltiples normativas en una única plataforma, evitando duplicidades."
  },
  {
    icon: Activity,
    title: "Trazabilidad",
    description: "Mantén el control de toda la información de tus sistemas de gestión."
  },
  {
    icon: CheckSquare,
    title: "Automatización",
    description: "Reduce el trabajo manual con formularios y reportes automáticos."
  },
  {
    icon: PieChart,
    title: "Análisis en tiempo real",
    description: "Toma decisiones basadas en datos y verifica el avance de tus sistemas de gestión a un click de distancia."
  }
];

const CaracteristicasSection = () => {
  return (
    <Section id="caracteristicas" variant="light" size="large">
      <SectionHeader
        title="Características Principales"
        subtitle="Todo lo que necesitas para lograr un verdadero cambio en tu Organización"
        centered
      />
      
      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>
              <feature.icon size={32} />
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </Section>
  );
};

export default CaracteristicasSection;