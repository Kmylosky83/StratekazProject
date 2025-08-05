// FormContainer.js - Container for forms based on CTAContainer structure
import styled from 'styled-components';
import { SectionContent } from '../Section';

const FormContainer = styled(SectionContent)`
  max-width: 900px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.s10};
  border-radius: ${props => props.theme.borderRadius.large};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.borderSubtle};
  transition: ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.card};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.ctaHover(props.theme.colors.primary)};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.s8};
    margin: ${props => props.theme.spacing.s4};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.s6};
    margin: ${props => props.theme.spacing.s2};
  }
`;

// Contenedor específico para pasos de formulario centrados
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s6};
  text-align: center;
  width: 100%;
`;

// Título para pasos del formulario
const StepTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-align: center;
`;

// Grid para opciones de selección
const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.s4};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s3};
  }
`;

export { FormContainer, StepContainer, StepTitle, SelectionGrid };