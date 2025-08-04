// frontend/src/pages/AccesoGratuitoPage.js
import React from 'react';
import styled from 'styled-components';
import { Header, Footer, Section, SectionHeader, Grid, Container } from '../design-system/components';
import { Button, Card, H3, Text } from '../design-system/components';
import { Award, HardHat, Navigation, Lightbulb } from 'lucide-react';

const PageWrapper = styled.div``;

const MainContent = styled.main`
  padding-top: ${props => props.theme.spacing.s12};
`;

const ToolGrid = styled(Grid)`
  max-width: 1200px;
  margin: 0 auto;
`;

const ToolCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
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

const ToolIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.backgroundColor || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.white};
`;

const ToolTitle = styled(H3)`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.s3};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const ToolDescription = styled(Text)`
  color: ${props => props.theme.colors.muted};
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const ToolButton = styled(Button)`
  margin-top: auto;
`;

const tools = [
  {
    icon: Award,
    iconColor: "#3498db",
    title: "ISO 9001",
    description: "Sistema de Gestión de Calidad. Herramientas básicas para implementar ISO 9001 en tu organización.",
    available: true
  },
  {
    icon: HardHat,
    iconColor: "#e74c3c", 
    title: "SG-SST",
    description: "Sistema de Gestión de Seguridad y Salud en el Trabajo. Cumple con la normatividad colombiana.",
    available: true
  },
  {
    icon: Navigation,
    iconColor: "#9b59b6",
    title: "PESV",
    description: "Plan Estratégico de Seguridad Vial. Herramientas para implementar PESV en tu empresa.",
    available: true
  },
  {
    icon: Lightbulb,
    iconColor: "#f39c12",
    title: "Innovación",
    description: "Herramientas de gestión de la innovación. Impulsa la creatividad en tu organización.",
    available: true
  }
];

const AccesoGratuitoPage = () => {
  const isAuthenticated = false; // This should come from AuthContext
  const userName = ""; // This should come from AuthContext

  return (
    <PageWrapper>
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <MainContent>
        <Section size="large">
          <SectionHeader
            title="Herramientas Gratuitas"
            subtitle="Accede a herramientas básicas de gestión empresarial sin costo. Perfectas para comenzar tu transformación digital."
            centered
          />
          
          <ToolGrid columns={4} mobile={1} tablet={2} gap="large">
            {tools.map((tool, index) => (
              <ToolCard key={index}>
                <ToolIcon backgroundColor={tool.iconColor}>
                  <tool.icon size={48} />
                </ToolIcon>
                <ToolTitle>{tool.title}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
                <ToolButton 
                  variant={tool.available ? "primary" : "outline"}
                  disabled={!tool.available}
                  size="medium"
                >
                  {tool.available ? "Acceder Gratis" : "Próximamente"}
                </ToolButton>
              </ToolCard>
            ))}
          </ToolGrid>
        </Section>
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

export default AccesoGratuitoPage;