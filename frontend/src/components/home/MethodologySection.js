import React from 'react';
import styled from 'styled-components';
import { Section, SectionHeader, Grid, Card_Informativa } from '../../design-system/components';
import { Search, Target, Settings, BarChart3 } from 'lucide-react';

// Styled Components
const MethodologyGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const MethodologySection = () => {
  const metodologiaPasos = [
    {
      icono: Search,
      titulo: "Diagnóstico",
      descripcion: "Evaluación exhaustiva del estado actual para identificar fortalezas, debilidades y oportunidades de mejora."
    },
    {
      icono: Target,
      titulo: "Planificación",
      descripcion: "Diseño de estrategias personalizadas y plan de acción adaptado a las necesidades específicas."
    },
    {
      icono: Settings,
      titulo: "Implementación",
      descripcion: "Ejecución de acciones definidas en el plan, con acompañamiento constante y adaptabilidad."
    },
    {
      icono: BarChart3,
      titulo: "Seguimiento",
      descripcion: "Monitoreo continuo, medición de resultados y ajustes para garantizar el logro de objetivos propuestos."
    }
  ];

  return (
    <Section size="large" variant="light">
      <SectionHeader
        title="Nuestra Metodología"
        subtitle="Un enfoque estructurado y adaptable para asegurar resultados óptimos en cada proyecto."
        centered
      />
      
      <MethodologyGrid columns={4} tablet={2} mobile={1} gap="large">
        {metodologiaPasos.map((paso, index) => {
          const IconComponent = paso.icono;
          return (
            <Card_Informativa
              key={index}
              title={paso.titulo}
              description={paso.descripcion}
              icon={<IconComponent size={32} />}
            />
          );
        })}
      </MethodologyGrid>
    </Section>
  );
};

export default MethodologySection;