// SectionDivider Component - Design System
// Separador sutil entre secciones basado en el estilo del Footer

import styled from 'styled-components';

export const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%,
    ${props => props.theme.colors.primary}10 20%,
    ${props => props.theme.colors.borderSubtle} 30%,
    ${props => props.theme.colors.borderSubtle} 70%,
    ${props => props.theme.colors.primary}10 80%,
    transparent 100%
  );
  margin: ${props => props.spacing || '0'} 0;
  opacity: ${props => props.opacity || 0.4};
  transition: opacity 0.3s ease;
  
  ${props => props.variant === 'subtle' && `
    opacity: 0.3;
    background: linear-gradient(90deg, 
      transparent 0%,
      ${props.theme.colors.primary}05 25%,
      ${props.theme.colors.borderVeryLight} 40%,
      ${props.theme.colors.borderVeryLight} 60%,
      ${props.theme.colors.primary}05 75%,
      transparent 100%
    );
  `}
  
  ${props => props.variant === 'strong' && `
    opacity: 0.8;
    background: linear-gradient(90deg, 
      transparent 0%,
      ${props.theme.colors.primary}20 15%,
      ${props.theme.colors.primary}40 25%,
      ${props.theme.colors.primary}40 75%,
      ${props.theme.colors.primary}20 85%,
      transparent 100%
    );
  `}
`;

export default SectionDivider;