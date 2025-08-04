// Grid System - Design System
// Reemplaza el sistema de grid de Bootstrap con CSS Grid moderno

import styled, { css } from 'styled-components';

// Grid Container
export const Grid = styled.div`
  display: grid;
  gap: ${props => {
    if (props.gap === 'xs') return props.theme.spacing.s1;
    if (props.gap === 'small') return props.theme.spacing.s2;
    if (props.gap === 'medium') return props.theme.spacing.s4;
    if (props.gap === 'large') return props.theme.spacing.s6;
    if (props.gap === 'xl') return props.theme.spacing.s8;
    return props.gap || props.theme.spacing.s4;
  }};
  
  /* Columnas básicas */
  ${props => props.columns && css`
    grid-template-columns: repeat(${props.columns}, 1fr);
  `}
  
  /* Auto-fit responsive */
  ${props => props.autoFit && css`
    grid-template-columns: repeat(auto-fit, minmax(${props.minWidth || '280px'}, 1fr));
  `}
  
  /* Auto-fill responsive */
  ${props => props.autoFill && css`
    grid-template-columns: repeat(auto-fill, minmax(${props.minWidth || '280px'}, 1fr));
  `}
  
  /* Responsive breakpoints personalizados */
  ${props => props.mobile && css`
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      grid-template-columns: repeat(${props.mobile}, 1fr);
    }
  `}
  
  ${props => props.tablet && css`
    @media (min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props => props.theme.breakpoints.tablet}) {
      grid-template-columns: repeat(${props.tablet}, 1fr);
    }
  `}
  
  ${props => props.desktop && css`
    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      grid-template-columns: repeat(${props.desktop}, 1fr);
    }
  `}
  
  /* Align items */
  ${props => props.align && css`
    align-items: ${props.align};
  `}
  
  ${props => props.justify && css`
    justify-content: ${props.justify};
  `}
  
  /* Comportamiento responsive por defecto mejorado */
  ${props => !props.mobile && !props.tablet && !props.desktop && !props.autoFit && !props.autoFill && css`
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: ${props => props.theme.spacing.s3};
    }
    
    @media (min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props => props.theme.breakpoints.tablet}) {
      grid-template-columns: repeat(${props => Math.min(props.columns || 2, 2)}, 1fr);
    }
  `}
`;

// Flex Row (equivalente a Bootstrap row)
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.gap || props.theme.spacing.s4};
  
  ${props => props.align && css`
    align-items: ${props.align};
  `}
  
  ${props => props.justify && css`
    justify-content: ${props.justify};
  `}
  
  ${props => props.noWrap && css`
    flex-wrap: nowrap;
  `}
`;

// Flex Column (equivalente a Bootstrap col)
export const Col = styled.div`
  flex: ${props => props.flex || '1'};
  min-width: 0; /* Prevent flex item overflow */
  
  ${props => props.width && css`
    flex: 0 0 ${props.width};
  `}
  
  /* Responsive columns */
  ${props => props.sm && css`
    @media (min-width: ${props => props.theme.breakpoints.mobile}) {
      flex: 0 0 ${(props.sm / 12) * 100}%;
    }
  `}
  
  ${props => props.md && css`
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      flex: 0 0 ${(props.md / 12) * 100}%;
    }
  `}
  
  ${props => props.lg && css`
    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      flex: 0 0 ${(props.lg / 12) * 100}%;
    }
  `}
`;

export default { Grid, Row, Col };