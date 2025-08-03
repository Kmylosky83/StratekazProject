// Sistema de Diseño - Componente Heading
// Títulos reutilizables con variantes basadas en tokens del tema

import styled, { css } from 'styled-components';

// Variantes de títulos
const headingVariants = {
  hero: css`
    font-size: ${props => props.theme.typography.fontSizes.heroTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    line-height: ${props => props.theme.typography.lineHeights.tight};
    margin-bottom: ${props => props.theme.spacing.margin.heroTitleBottom};
    padding: ${props => props.theme.spacing.padding.heroTitle};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSizes.tablet.heroTitle};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.typography.fontSizes.mobile.heroTitle};
    }
  `,
  
  section: css`
    font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.margin.sectionTitleBottom};
    text-align: center;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.fontSizes.tablet.sectionTitle};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.typography.fontSizes.mobile.sectionTitle};
    }
  `,
  
  card: css`
    font-size: ${props => props.theme.typography.fontSizes.cardTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.margin.cardTitleBottom};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.typography.fontSizes.mobile.cardTitle};
    }
  `,
  
  heroSubtitle: css`
    font-size: ${props => props.theme.typography.fontSizes.heroSubtitle};
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.margin.heroSubtitleBottom};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: ${props => props.theme.typography.fontSizes.mobile.heroSubtitle};
    }
  `,
  
  sectionSubtitle: css`
    font-size: ${props => props.theme.typography.fontSizes.sectionSubtitle};
    color: ${props => props.theme.colors.secondary};
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    font-weight: ${props => props.theme.typography.fontWeights.regular};
  `,
  
  cardSubtitle: css`
    font-size: ${props => props.theme.typography.fontSizes.cardSubtitle};
    color: ${props => props.theme.colors.textMuted};
    text-align: center;
    font-weight: ${props => props.theme.typography.fontWeights.regular};
  `
};

// Componente Heading base
const HeadingBase = styled.h1`
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  color: ${props => props.theme.colors.text};
  margin: 0;
  
  /* Aplicar variante */
  ${props => headingVariants[props.variant || 'section']}
  
  /* Color personalizado si se proporciona */
  ${props => props.color && css`
    color: ${props.color};
  `}
`;

// Componentes específicos por nivel semántico
export const H1 = styled(HeadingBase).attrs({ as: 'h1' })``;
export const H2 = styled(HeadingBase).attrs({ as: 'h2' })``;
export const H3 = styled(HeadingBase).attrs({ as: 'h3' })``;
export const H4 = styled(HeadingBase).attrs({ as: 'h4' })``;
export const H5 = styled(HeadingBase).attrs({ as: 'h5' })``;
export const H6 = styled(HeadingBase).attrs({ as: 'h6' })``;

// Componente Heading genérico
export const Heading = HeadingBase;

export default Heading;