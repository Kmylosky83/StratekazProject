// Container Component - Design System
// Reemplaza las clases container de Bootstrap

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.s4};
  
  /* Responsive containers */
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.s6};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 0 ${props => props.theme.spacing.s8};
  }
  
  /* Variantes de tamaño */
  ${props => props.size === 'small' && `
    max-width: 800px;
  `}
  
  ${props => props.size === 'large' && `
    max-width: 1400px;
  `}
  
  ${props => props.fluid && `
    max-width: none;
  `}
`;

export default Container;