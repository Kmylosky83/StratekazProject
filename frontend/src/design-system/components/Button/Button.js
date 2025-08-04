// Sistema de Diseño - Componente Button
// Botón reutilizable con variantes basadas en tokens del tema

import styled, { css } from 'styled-components';

// Variantes de botones
const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
      color: ${props => props.theme.colors.white};
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,
  
  secondary: css`
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    
    &:hover {
      background-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.white};
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.buttonSecondary};
    }
  `,
  
  cta: css`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    border: none;
    border-radius: ${props => props.theme.borderRadius.xlarge};
    font-size: ${props => props.theme.typography.fontSizes.buttonCta};
    
    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.button};
      color: ${props => props.theme.colors.white};
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid transparent;
    
    &:hover {
      background-color: ${props => props.theme.colors.primaryLight || props.theme.colors.hover};
      border-color: ${props => props.theme.colors.primary};
      transform: translateY(-1px);
    }
  `,
  
  link: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    padding: 0;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    text-decoration: underline;
    text-decoration-color: transparent;
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
      text-decoration-color: currentColor;
    }
  `,
  
  success: css`
    background-color: ${props => props.theme.colors.success || '#28a745'};
    color: ${props => props.theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.successDark || '#218838'};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,
  
  danger: css`
    background-color: ${props => props.theme.colors.danger || '#dc3545'};
    color: ${props => props.theme.colors.white};
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.dangerDark || '#c82333'};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,
  
  text: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
      text-decoration: underline;
    }
  `,
  
  card: css`
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    opacity: 0.7;
    
    &:hover:not(:disabled) {
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
      opacity: 0.9;
    }
    
    &.active {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.primary};
      opacity: 1;
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.cardButtonActive};
    }
    
    &:disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    }
  `
};

// Tamaños de botones
const buttonSizes = {
  xs: css`
    padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s3};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    min-height: 24px;
  `,
  
  small: css`
    padding: ${props => props.theme.spacing.padding.buttonSmall || `${props.theme.spacing.s2} ${props.theme.spacing.s4}`};
    font-size: ${props => props.theme.typography.fontSizes.buttonSmall || props.theme.typography.fontSizes.sm};
    min-height: 32px;
  `,
  
  medium: css`
    padding: ${props => props.theme.spacing.padding.buttonRegular || `${props.theme.spacing.s3} ${props.theme.spacing.s6}`};
    font-size: ${props => props.theme.typography.fontSizes.buttonBase || props.theme.typography.fontSizes.base};
    min-height: 40px;
  `,
  
  large: css`
    padding: ${props => props.theme.spacing.padding.buttonLarge || `${props.theme.spacing.s4} ${props.theme.spacing.s8}`};
    font-size: ${props => props.theme.typography.fontSizes.buttonLarge || props.theme.typography.fontSizes.lg};
    min-height: 48px;
  `,
  
  xl: css`
    padding: ${props => props.theme.spacing.s5} ${props => props.theme.spacing.s10};
    font-size: ${props => props.theme.typography.fontSizes.xl};
    min-height: 56px;
  `,
  
  cta: css`
    padding: ${props => props.theme.spacing.padding.buttonCta || `${props.theme.spacing.s4} ${props.theme.spacing.s10}`};
    font-size: ${props => props.theme.typography.fontSizes.buttonCta || props.theme.typography.fontSizes.lg};
    min-height: 52px;
  `
};

// Componente Button estilizado
export const Button = styled.button`
  /* Estilos base */
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  
  /* Aplicar variante */
  ${props => buttonVariants[props.variant || 'primary']}
  
  /* Aplicar tamaño */
  ${props => buttonSizes[props.size || 'medium']}
  
  /* Estado disabled */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Clase active para botones de tarjeta */
  &.active {
    ${props => props.variant === 'card' && css`
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.primary};
      opacity: 1;
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.cardButtonActive};
    `}
  }
`;

export default Button;