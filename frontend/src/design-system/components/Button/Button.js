// Sistema de Diseño - Componente Button
// Botón profesional y minimalista para plataforma B2B

import styled, { css } from 'styled-components';

// Variantes de botones optimizadas para profesionalismo
const buttonVariants = {
  primary: css`
    background: ${props => props.theme.buttonPrimary?.background || `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.primaryDark} 100%)`};
    color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.primary};
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.buttonPrimary?.shimmer || 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'};
      transition: left 0.5s ease;
    }
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.buttonPrimary?.hover || `linear-gradient(135deg, ${props.theme.colors.primaryDark} 0%, #b91c6b 100%)`};
      border-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primaryDark};
      box-shadow: ${props => props.theme.shadows.buttonHover};
      transform: translateY(-1px);
      
      &::before {
        left: 100%;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, ${props => props.theme.shadows.button};
      outline: none;
    }
    
    &:active:not(:disabled) {
      transform: translateY(0px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,
  
  secondary: css`
    background: ${props => props.theme.buttonSecondary?.background || props.theme.colors.surface};
    color: ${props => props.theme.buttonSecondary?.text || props.theme.colors.text};
    border: 1px solid ${props => props.theme.buttonSecondary?.border || props.theme.colors.border};
    position: relative;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.buttonSecondary?.hover || props.theme.colors.hover};
      border-color: ${props => props.theme.colors.borderDark};
      box-shadow: ${props => props.theme.shadows.button};
      transform: translateY(-1px);
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus};
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: ${props => props.theme.buttonSecondary?.active || props.theme.colors.active};
      transform: translateY(0px);
    }
  `,
  
  outline: css`
    background: ${props => props.theme.buttonSecondary?.background || 'transparent'};
    color: ${props => props.theme.buttonSecondary?.text || props.theme.colors.primary};
    border: 2px solid ${props => props.theme.buttonSecondary?.border || props.theme.colors.primary};
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
      transition: width 0.3s ease;
      z-index: -1;
    }
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.buttonSecondary?.hover || 'transparent'};
      color: ${props => props.theme.buttonSecondary?.text || props.theme.colors.white};
      border-color: ${props => props.theme.buttonSecondary?.border || props.theme.colors.primary};
      box-shadow: ${props => props.theme.shadows.button};
      transform: translateY(-1px);
      
      &::before {
        width: 100%;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus};
      outline: none;
    }
    
    &:active:not(:disabled) {
      transform: translateY(0px);
    }
  `,
  
  ghost: css`
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid transparent;
    position: relative;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.hover};
      color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primaryDark};
      border-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary}15;
      transform: translateY(-1px);
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus};
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: ${props => props.theme.colors.active};
      transform: translateY(0px);
    }
  `,
  
  // CTA Button - Diseño especial para call-to-action
  cta: css`
    background: ${props => props.theme.buttonPrimary?.background || `linear-gradient(135deg, ${props.theme.colors.primary} 0%, ${props.theme.colors.primaryDark} 100%)`};
    color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
    border: 1px solid ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    border-radius: 12px; /* Más redondeado para destacar */
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadows.button};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.buttonPrimary?.shimmer || 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'};
      transition: left 0.6s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${props => props.theme.buttonPrimary?.overlay || 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'};
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.buttonPrimary?.hover || `linear-gradient(135deg, ${props.theme.colors.primaryDark} 0%, #b91c6b 100%)`};
      border-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primaryDark};
      box-shadow: ${props => props.theme.shadows.buttonHover};
      transform: translateY(-2px) scale(1.02);
      
      &::before {
        left: 100%;
      }
      
      &::after {
        opacity: 1;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, ${props => props.theme.shadows.buttonHover};
      outline: none;
    }
    
    &:active:not(:disabled) {
      transform: translateY(-1px) scale(1.01);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `,

  danger: css`
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.white}; /* Danger button siempre usa blanco */
    border: 1px solid ${props => props.theme.colors.danger};
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.buttonPrimary?.shimmer || 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'};
      transition: left 0.5s ease;
    }
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.danger}dd;
      border-color: ${props => props.theme.colors.danger};
      box-shadow: ${props => props.theme.shadows.button};
      transform: translateY(-1px);
      
      &::before {
        left: 100%;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, ${props => props.theme.shadows.button};
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: ${props => props.theme.colors.danger}aa;
      transform: translateY(0px);
      box-shadow: ${props => props.theme.shadows.button};
    }
  `
};

// Tamaños de botones simplificados y profesionales
const buttonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
    min-height: 32px;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
  `,
  
  medium: css`
    padding: 12px 24px;
    font-size: 16px;
    min-height: 40px;
    font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  `,
  
  large: css`
    padding: 16px 32px;
    font-size: 16px;
    min-height: 48px;
    font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  `
};

// Componente Button estilizado con diseño profesional
export const Button = styled.button`
  /* Estilos base profesionales */
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  line-height: 1.2;
  
  /* Aplicar variante */
  ${props => buttonVariants[props.variant || 'primary']}
  
  /* Aplicar tamaño */
  ${props => buttonSizes[props.size || 'medium']}
  
  /* Estado disabled mejorado */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    pointer-events: none;
  }
  
  /* Mejoras de accesibilidad */
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Soporte para iconos */
  svg {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
  
  /* Estado loading */
  &.loading {
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-right-color: transparent;
      animation: button-spin 0.8s linear infinite;
    }
  }
  
  @keyframes button-spin {
    to { transform: rotate(360deg); }
  }
`;

export default Button;