// frontend/src/components/home/CTASection.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Container, H2, Text } from '../../design-system/components';

const CTAWrapper = styled.section`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.secondary} 100%
  );
  padding: ${props => props.theme.spacing.s16} 0;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled(H2)`
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.s4};
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const CTASubtitle = styled(Text)`
  color: ${props => props.theme.colors.white};
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.s8};
  opacity: 0.95;
  font-style: italic;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Button)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  
  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CTASection = () => {
  return (
    <CTAWrapper>
      <Container>
        <CTAContent>
          <CTATitle>¿Estás listo para el siguiente nivel?</CTATitle>
          <CTASubtitle>
            "No diseñamos sistemas de gestión. Desatamos el potencial de tu empresa. Únete a StrateKaz."
          </CTASubtitle>
          <CTAButton as={Link} to="/register" size="large">
            Comenzar Ahora
          </CTAButton>
        </CTAContent>
      </Container>
    </CTAWrapper>
  );
};

export default CTASection;