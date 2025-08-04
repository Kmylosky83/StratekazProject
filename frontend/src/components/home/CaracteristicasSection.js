// frontend/src/components/home/CaracteristicasSection.js
import React from 'react';
import styled from 'styled-components';
import { GitBranch, Activity, CheckSquare, PieChart } from 'lucide-react';
import { Section, SectionHeader, Grid, Card_Informativa } from '../../design-system/components';
import { Icon } from '../../design-system/icons';

const FeatureGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.s6};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
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
          <Card_Informativa
            key={index}
            title={feature.title}
            description={feature.description}
            icon={<feature.icon size={32} />}
          />
        ))}
      </FeatureGrid>
    </Section>
  );
};

export default CaracteristicasSection;