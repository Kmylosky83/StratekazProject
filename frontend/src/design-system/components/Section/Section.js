// Section Component - Design System
// Componente de sección reutilizable que reemplaza los patrones Bootstrap

import React from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout';
import { H2, Text } from '../Typography';

// Variantes de sección - Fondos consistentes sin gradientes
const sectionVariants = {
  default: css`
    background-color: ${props => props.theme.card?.background || props.theme.colors.white};
    color: ${props => props.theme.colors.text};
  `,
  
  light: css`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
  `,
  
  white: css`
    background-color: ${props => props.theme.card?.background || props.theme.colors.white};
    color: ${props => props.theme.colors.text};
  `,
  
  // Mantenemos solo estas variantes para casos específicos si se necesitan
  primary: css`
    background-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
  `,
  
  secondary: css`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
  `,
  
  dark: css`
    background-color: ${props => props.theme.colors.backgroundDark || '#343a40'};
    color: ${props => props.theme.colors.white};
  `
};

// Tamaños de padding
const sectionSizes = {
  xs: css`
    padding: ${props => props.theme.spacing.s4} 0;
  `,
  
  small: css`
    padding: ${props => props.theme.spacing.s8} 0;
  `,
  
  medium: css`
    padding: ${props => props.theme.spacing.s12} 0;
  `,
  
  large: css`
    padding: ${props => props.theme.spacing.s16} 0;
  `,
  
  xl: css`
    padding: ${props => props.theme.spacing.s20} 0;
  `
};

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
  
  /* Aplicar variante */
  ${props => sectionVariants[props.variant || 'default']}
  
  /* Aplicar tamaño */
  ${props => sectionSizes[props.size || 'medium']}
  
  /* Centrado de contenido */
  ${props => props.centered && css`
    text-align: center;
  `}
  
  /* Separador superior */
  ${props => props.borderTop && css`
    border-top: 1px solid ${props => props.theme.colors.border};
  `}
  
  /* Separador inferior */
  ${props => props.borderBottom && css`
    border-bottom: 1px solid ${props => props.theme.colors.border};
  `}
`;

const SectionContainer = styled(Container)`
  ${props => props.maxWidth && css`
    max-width: ${props.maxWidth};
  `}
`;

// Componente Section principal
export const Section = ({
  children,
  variant = 'default',
  size = 'medium',
  centered = false,
  borderTop = false,
  borderBottom = false,
  maxWidth,
  fluid = false,
  className,
  id,
  ...props
}) => {
  return (
    <SectionWrapper
      variant={variant}
      size={size}
      centered={centered}
      borderTop={borderTop}
      borderBottom={borderBottom}
      className={className}
      id={id}
      {...props}
    >
      {fluid ? (
        children
      ) : (
        <SectionContainer maxWidth={maxWidth}>
          {children}
        </SectionContainer>
      )}
    </SectionWrapper>
  );
};

// Componente SectionHeader para títulos y subtítulos
const HeaderWrapper = styled.div`
  margin-bottom: ${props => props.spacing || props.theme.spacing.s8};
  
  ${props => props.centered && css`
    text-align: center;
  `}
`;

const SectionTitle = styled(H2)`
  margin-bottom: ${props => props.theme.spacing.s4};
  
  ${props => props.variant === 'primary' && css`
    color: ${props => props.theme.colors.primary};
  `}
  
  ${props => props.variant === 'white' && css`
    color: ${props => props.theme.colors.white};
  `}
`;

const SectionSubtitle = styled(Text)`
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 800px;
  
  ${props => props.centered && css`
    margin: 0 auto;
  `}
  
  ${props => props.variant === 'white' && css`
    color: ${props => props.theme.colors.white};
  `}
`;

export const SectionHeader = ({
  title,
  subtitle,
  centered = false,
  variant,
  spacing,
  children
}) => {
  return (
    <HeaderWrapper centered={centered} spacing={spacing}>
      {title && (
        <SectionTitle variant={variant}>
          {title}
        </SectionTitle>
      )}
      {subtitle && (
        <SectionSubtitle variant={variant} centered={centered}>
          {subtitle}
        </SectionSubtitle>
      )}
      {children}
    </HeaderWrapper>
  );
};

// Componente SectionContent para el contenido principal
export const SectionContent = styled.div`
  ${props => props.centered && css`
    text-align: center;
  `}
  
  ${props => props.maxWidth && css`
    max-width: ${props.maxWidth};
    margin: 0 auto;
  `}
`;

export default Section;