// frontend/src/components/home/CTASection.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Section, SectionHeader, SectionContent } from '../../design-system/components';

const CTAContainer = styled(SectionContent)`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  padding: ${props => props.theme.spacing.s10};
  border-radius: ${props => props.theme.borderRadius.large};
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  border: 1px solid ${props => props.theme.card?.border || props.theme.colors.borderSubtle};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.cardHover || props.theme.shadows.card};
  }
`;

const CTAQuote = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.heroSubtitle || '1.25rem'};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin-bottom: ${props => props.theme.spacing.s8};
  font-style: italic;
  position: relative;
  
  &::before,
  &::after {
    content: '"';
    color: ${props => props.theme.colors.primary};
    font-size: 3rem;
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    position: absolute;
    line-height: 1;
  }
  
  &::before {
    top: -10px;
    left: -20px;
  }
  
  &::after {
    bottom: -30px;
    right: -10px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSizes.base};
    
    &::before,
    &::after {
      font-size: 2rem;
    }
    
    &::before {
      left: -10px;
    }
    
    &::after {
      right: -5px;
    }
  }
`;

const CTAButtonWrapper = styled.div`
  margin-top: ${props => props.theme.spacing.s6};
`;

const CTAButton = styled(Button)`
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  font-size: ${props => props.theme.typography.fontSizes.buttonCta};
  padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s8};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.button || '0 4px 14px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.buttonHover || '0 8px 25px rgba(0, 0, 0, 0.15)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CTASection = () => {
  return (
    <Section variant="light" size="large" centered>
      <CTAContainer>
        <SectionHeader
          title="¿Estás listo para el siguiente nivel?"
          centered
          spacing={props => props.theme.spacing.s6}
        />
        <CTAQuote>
          No diseñamos sistemas de gestión. Desatamos el potencial de tu empresa. Únete a StrateKaz.
        </CTAQuote>
        <CTAButtonWrapper>
          <CTAButton 
            as={Link} 
            to="/register" 
            size="large" 
            variant="primary"
            onClick={() => window.scrollTo(0, 0)}
          >
            Comenzar Ahora
          </CTAButton>
        </CTAButtonWrapper>
      </CTAContainer>
    </Section>
  );
};

export default CTASection;