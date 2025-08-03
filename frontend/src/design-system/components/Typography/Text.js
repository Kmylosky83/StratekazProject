// Sistema de Diseño - Componente Text
// Texto reutilizable con variantes basadas en tokens del tema

import styled, { css } from 'styled-components';

// Variantes de texto
const textVariants = {
  base: css`
    font-size: ${props => props.theme.typography.fontSizes.base};
    color: ${props => props.theme.colors.secondary};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
    margin-bottom: ${props => props.theme.spacing.margin.baseTextBottom};
  `,
  
  note: css`
    font-size: ${props => props.theme.typography.fontSizes.note};
    color: ${props => props.theme.colors.textMuted};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    margin-bottom: ${props => props.theme.spacing.margin.noteTextBottom};
    font-style: italic;
  `,
  
  muted: css`
    font-size: ${props => props.theme.typography.fontSizes.base};
    color: ${props => props.theme.colors.textMuted};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
  `,
  
  small: css`
    font-size: ${props => props.theme.typography.fontSizes.note};
    color: ${props => props.theme.colors.text};
    line-height: ${props => props.theme.typography.lineHeights.normal};
  `,
  
  feature: css`
    font-size: ${props => props.theme.typography.fontSizes.base};
    color: ${props => props.theme.colors.text};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
  `,
  
  body: css`
    font-size: ${props => props.theme.typography.fontSizes.base};
    color: ${props => props.theme.colors.text};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
    margin-bottom: ${props => props.theme.spacing.margin.baseTextBottom};
  `
};

// Tamaños de texto
const textSizes = {
  xs: css`
    font-size: 0.75rem;
  `,
  sm: css`
    font-size: ${props => props.theme.typography.fontSizes.note};
  `,
  base: css`
    font-size: ${props => props.theme.typography.fontSizes.base};
  `,
  lg: css`
    font-size: 1.125rem;
  `,
  xl: css`
    font-size: 1.25rem;
  `
};

// Pesos de texto
const textWeights = {
  light: css`
    font-weight: 300;
  `,
  normal: css`
    font-weight: ${props => props.theme.typography.fontWeights.regular};
  `,
  medium: css`
    font-weight: ${props => props.theme.typography.fontWeights.medium};
  `,
  semibold: css`
    font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  `,
  bold: css`
    font-weight: ${props => props.theme.typography.fontWeights.bold};
  `
};

// Componente Text estilizado
export const Text = styled.p`
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0;
  
  /* Aplicar variante */
  ${props => textVariants[props.variant || 'base']}
  
  /* Aplicar tamaño personalizado */
  ${props => props.size && textSizes[props.size]}
  
  /* Aplicar peso personalizado */
  ${props => props.weight && textWeights[props.weight]}
  
  /* Color personalizado */
  ${props => props.color && css`
    color: ${props.color};
  `}
  
  /* Alineación de texto */
  ${props => props.align && css`
    text-align: ${props.align};
  `}
  
  /* Sin margen inferior */
  ${props => props.noMargin && css`
    margin-bottom: 0;
  `}
`;

// Componentes específicos por elemento semántico
export const Paragraph = styled(Text).attrs({ as: 'p' })``;
export const Span = styled(Text).attrs({ as: 'span' })``;
export const Small = styled(Text).attrs({ as: 'small', variant: 'small' })``;

export default Text;