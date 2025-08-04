// frontend/src/components/home/CTASection.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Section, SectionContent, H2, Text } from '../../design-system/components';

const CTAContent = styled(SectionContent)`
  max-width: 800px;
  text-align: center;
  padding: ${props => props.theme.spacing.s8};
  border-radius: ${props => props.theme.borderRadius.large};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}05, 
    ${props => props.theme.colors.secondary}05
  );
  border: 1px solid ${props => props.theme.colors.primary}20;
`;

const CTATitle = styled(H2)`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.s4};
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled(Text)`
  color: ${props => props.theme.colors.muted};
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.s8};
  font-style: italic;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Button)`
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CTASection = () => {
  return (
    <Section variant="light" size="large" centered>
      <CTAContent>
        <CTATitle>¿Estás listo para el siguiente nivel?</CTATitle>
        <CTASubtitle>
          "No diseñamos sistemas de gestión. Desatamos el potencial de tu empresa. Únete a StrateKaz."
        </CTASubtitle>
        <CTAButton as={Link} to="/register" size="large" variant="primary">
          Comenzar Ahora
        </CTAButton>
      </CTAContent>
    </Section>
  );
};

export default CTASection;