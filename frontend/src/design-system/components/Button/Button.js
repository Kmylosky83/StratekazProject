// Sistema de Diseño - Componente Button
// Botón profesional y minimalista para plataforma B2B

import styled, { css } from 'styled-components';

// Variantes de botones optimizadas para profesionalismo
const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
    color: ${props => props.theme.colors.white};
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
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, ${props => props.theme.colors.primaryDark} 0%, #b91c6b 100%);
      border-color: ${props => props.theme.colors.primaryDark};
      box-shadow: 0 4px 12px rgba(236, 38, 143, 0.3);
      transform: translateY(-1px);
      
      &::before {
        left: 100%;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, 0 4px 12px rgba(236, 38, 143, 0.2);
      outline: none;
    }
    
    &:active:not(:disabled) {
      transform: translateY(0px);
      box-shadow: 0 2px 6px rgba(236, 38, 143, 0.4);
    }
  `,
  
  secondary: css`
    background: linear-gradient(135deg, ${props => props.theme.colors.surface} 0%, #f1f3f5 100%);
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    position: relative;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-color: ${props => props.theme.colors.borderDark};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus};
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      transform: translateY(0px);
    }
  `,
  
  outline: css`
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
      transition: width 0.3s ease;
      z-index: -1;
    }
    
    &:hover:not(:disabled) {
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 2px 8px rgba(236, 38, 143, 0.2);
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
      background: linear-gradient(135deg, rgba(236, 38, 143, 0.05) 0%, rgba(236, 38, 143, 0.08) 100%);
      color: ${props => props.theme.colors.primaryDark};
      border-color: rgba(236, 38, 143, 0.15);
      transform: translateY(-1px);
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus};
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: linear-gradient(135deg, rgba(236, 38, 143, 0.08) 0%, rgba(236, 38, 143, 0.12) 100%);
      transform: translateY(0px);
    }
  `,
  
  // CTA Button - Diseño especial para call-to-action
  cta: css`
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
    color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 12px; /* Más redondeado para destacar */
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(236, 38, 143, 0.25);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, ${props => props.theme.colors.primaryDark} 0%, #b91c6b 100%);
      border-color: ${props => props.theme.colors.primaryDark};
      box-shadow: 0 8px 30px rgba(236, 38, 143, 0.4);
      transform: translateY(-2px) scale(1.02);
      
      &::before {
        left: 100%;
      }
      
      &::after {
        opacity: 1;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px ${props => props.theme.colors.focus}, 0 8px 30px rgba(236, 38, 143, 0.3);
      outline: none;
    }
    
    &:active:not(:disabled) {
      transform: translateY(-1px) scale(1.01);
      box-shadow: 0 4px 15px rgba(236, 38, 143, 0.5);
    }
  `,

  danger: css`
    background: linear-gradient(135deg, ${props => props.theme.colors.danger} 0%, #c82333 100%);
    color: ${props => props.theme.colors.white};
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
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.5s ease;
    }
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
      border-color: #c82333;
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
      transform: translateY(-1px);
      
      &::before {
        left: 100%;
      }
    }
    
    &:focus:not(:disabled) {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25), 0 4px 12px rgba(220, 53, 69, 0.2);
      outline: none;
    }
    
    &:active:not(:disabled) {
      background: linear-gradient(135deg, #bd2130 0%, #a71e2a 100%);
      transform: translateY(0px);
      box-shadow: 0 2px 6px rgba(220, 53, 69, 0.4);
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