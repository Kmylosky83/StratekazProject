/**
 * Styled Components para Card - Sistema de Diseño StrateKaz
 */

import styled, { css } from 'styled-components';

// Card base
export const StyledCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.card};
  transition: ${props => props.theme.transitions.normal};
  overflow: hidden;
  
  /* Variantes de tamaño */
  ${props => props.size === 'small' && css`
    padding: ${props => props.theme.spacing.s4};
  `}
  
  ${props => props.size === 'medium' && css`
    padding: ${props => props.theme.spacing.s6};
  `}
  
  ${props => props.size === 'large' && css`
    padding: ${props => props.theme.spacing.s8};
  `}
  
  /* Variantes de elevación */
  ${props => props.elevation === 'low' && css`
    box-shadow: ${props => props.theme.shadows.low};
  `}
  
  ${props => props.elevation === 'medium' && css`
    box-shadow: ${props => props.theme.shadows.medium};
  `}
  
  ${props => props.elevation === 'high' && css`
    box-shadow: ${props => props.theme.shadows.high};
  `}
  
  /* Hover effects */
  ${props => props.hoverable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.hover};
    }
  `}
  
  /* Estados */
  ${props => props.selected && css`
    border: 2px solid ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  `}
  
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Variantes de tipo */
  ${props => props.variant === 'outlined' && css`
    background: transparent;
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: none;
  `}
  
  ${props => props.variant === 'elevated' && css`
    box-shadow: ${props => props.theme.shadows.elevated};
  `}
  
  ${props => props.variant === 'filled' && css`
    background: ${props => props.theme.colors.surface};
  `}
`;

// Header del Card
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.s4};
  
  ${props => props.center && css`
    justify-content: center;
    text-align: center;
  `}
`;

// Contenido principal
export const CardContent = styled.div`
  flex: 1;
  
  /* Espaciado para diferentes tamaños */
  ${props => props.compact && css`
    padding: ${props => props.theme.spacing.s3} 0;
  `}
  
  ${props => props.spacious && css`
    padding: ${props => props.theme.spacing.s6} 0;
  `}
`;

// Footer del Card
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.s4};
  padding-top: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.border};
  
  ${props => props.center && css`
    justify-content: center;
  `}
  
  ${props => props.end && css`
    justify-content: flex-end;
  `}
`;

// Icono del Card
export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size === 'small' ? '40px' : props.size === 'large' ? '80px' : '60px'};
  height: ${props => props.size === 'small' ? '40px' : props.size === 'large' ? '80px' : '60px'};
  margin-bottom: ${props => props.theme.spacing.s4};
  border-radius: ${props => props.theme.borderRadius.large};
  
  /* Variantes de color */
  ${props => props.variant === 'primary' && css`
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: ${props => props.theme.colors.secondary}20;
    color: ${props => props.theme.colors.secondary};
  `}
  
  ${props => props.variant === 'success' && css`
    background: ${props => props.theme.colors.success}20;
    color: ${props => props.theme.colors.success};
  `}
  
  ${props => props.variant === 'warning' && css`
    background: ${props => props.theme.colors.warning}20;
    color: ${props => props.theme.colors.warning};
  `}
  
  ${props => props.variant === 'danger' && css`
    background: ${props => props.theme.colors.danger}20;
    color: ${props => props.theme.colors.danger};
  `}
  
  ${props => props.variant === 'neutral' && css`
    background: ${props => props.theme.colors.neutral}20;
    color: ${props => props.theme.colors.neutral};
  `}
`;

// Título del Card
export const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  line-height: ${props => props.theme.typography.lineHeights.tight};
  
  ${props => props.center && css`
    text-align: center;
  `}
  
  ${props => props.size === 'small' && css`
    font-size: ${props => props.theme.typography.fontSizes.base};
  `}
  
  ${props => props.size === 'large' && css`
    font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
  `}
`;

// Subtítulo del Card
export const CardSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.cardSubtitle};
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
  
  ${props => props.center && css`
    text-align: center;
  `}
`;

// Card de selección (para formularios)
export const SelectionCard = styled(StyledCard)`
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary}40;
    transform: translateY(-1px);
  }
  
  ${props => props.selected && css`
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}05;
    
    &::after {
      content: '';
      position: absolute;
      top: ${props => props.theme.spacing.s3};
      right: ${props => props.theme.spacing.s3};
      background: ${props => props.theme.colors.primary};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      /* Checkmark usando CSS */
      &::before {
        content: '';
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-top: -2px;
      }
    }
  `}
  
  position: relative;
`;

// Card de estadística
export const StatCard = styled(StyledCard)`
  text-align: center;
  padding: ${props => props.theme.spacing.s6};
  
  ${props => props.trend === 'up' && css`
    border-left: 4px solid ${props => props.theme.colors.success};
  `}
  
  ${props => props.trend === 'down' && css`
    border-left: 4px solid ${props => props.theme.colors.danger};
  `}
  
  ${props => props.trend === 'neutral' && css`
    border-left: 4px solid ${props => props.theme.colors.warning};
  `}
`;

// Card de acción
export const ActionCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.s8};
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}05;
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.hover};
  }
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      border-color: transparent;
      background: ${props => props.theme.colors.white};
      box-shadow: ${props => props.theme.shadows.card};
    }
  `}
`;

// Container para grilla de cards
export const CardGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.s6};
  
  /* Responsive grid */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  
  ${props => props.columns && css`
    grid-template-columns: repeat(${props => props.columns}, 1fr);
  `}
  
  ${props => props.compact && css`
    gap: ${props => props.theme.spacing.s4};
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  `}
  
  /* Responsive breakpoints */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${props => props.theme.spacing.s4};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s4};
  }
`;

// Card de loading
export const LoadingCard = styled(StyledCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid ${props => props.theme.colors.border};
    border-top: 4px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Card de error
export const ErrorCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 200px;
  border: 1px solid ${props => props.theme.colors.danger}40;
  background: ${props => props.theme.colors.danger}05;
  
  .error-icon {
    color: ${props => props.theme.colors.danger};
    font-size: 48px;
    margin-bottom: ${props => props.theme.spacing.s4};
  }
  
  .error-title {
    color: ${props => props.theme.colors.danger};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.s2};
  }
  
  .error-message {
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.s4};
  }
`;

// Card Informativa - Para mostrar información sin interacción
export const InformativaCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.card};
  padding: ${props => props.theme.spacing.s8};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 4px 20px ${props => props.theme.colors.primary}20,
                0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px) rotateX(5deg);
    perspective: 1000px;
  }
`;

export const InformativaIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.s5};
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  ${InformativaCard}:hover & {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.theme.colors.primary}40;
  }
`;

export const InformativaTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.xl || '1.25rem'};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold || 600};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.tight || 1.25};
  text-align: center;
`;

export const InformativaDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm || '0.875rem'};
  color: ${props => props.theme.colors.textMuted || props.theme.colors.muted};
  line-height: ${props => props.theme.typography.lineHeights.normal || 1.5};
  margin: 0;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

// Card de Selección - Nueva implementación según especificaciones
export const SelectionCardNew = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.card};
  padding: ${props => props.theme.spacing.s8};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Estado Selected */
  ${props => props.selected && css`
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}08;
  `}
  
  /* Estado Disabled */
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(100%);
    pointer-events: none;
    
    &:hover {
      transform: none;
      border-color: ${props => props.theme.colors.border || '#e5e7eb'};
    }
  `}
  
  /* Hover Effects */
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-3px) rotateY(2deg);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15),
                0 4px 20px ${props => props.theme.colors.primary}30;
  }
`;

export const SelectionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.s5};
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Hover Effects */
  ${SelectionCardNew}:hover & {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 20px ${props => props.theme.colors.primary}40;
  }
  
  /* Estado Disabled */
  ${props => props.disabled && css`
    background: #f5f5f5;
    color: #999;
  `}
`;

export const SelectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.xl || '1.25rem'};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold || 600};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.tight || 1.25};
  text-align: center;
  transition: color 0.3s ease;
  
  /* Estado Selected */
  ${props => props.selected && css`
    color: ${props => props.theme.colors.primary};
  `}
  
  /* Estado Disabled */
  ${props => props.disabled && css`
    color: #999;
  `}
`;

export const SelectionDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm || '0.875rem'};
  color: ${props => props.theme.colors.textMuted || props.theme.colors.muted};
  line-height: ${props => props.theme.typography.lineHeights.normal || 1.5};
  margin: 0;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  
  /* Estado Disabled */
  ${props => props.disabled && css`
    color: #999;
  `}
`;

// Componentes de compatibilidad con la versión anterior
export const CardBody = styled.div`
  padding: ${props => props.theme.spacing.s8};
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  ${props => props.padding && css`
    padding: ${props.padding};
  `}
`;

export const ToolIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto ${props => props.theme.spacing.s4};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${props => props.theme.colors.white};
  
  ${props => props.backgroundColor && css`
    background-color: ${props.backgroundColor};
  `}
`;

// Card de Interacción - Para elementos clickeables con información detallada
// Usado en: NormativasSection con 4 pilares (ISO, SG-SST, PESV, Innovación)
export const InteraccionCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.card};
  padding: ${props => props.theme.spacing.s6};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Efecto de fondo animado */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      ${props => props.themeColor || props.theme.colors.primary}10, 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  /* Hover Effects */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 
                0 0 30px ${props => props.themeColor || props.theme.colors.primary}40;
    border-color: ${props => props.themeColor || props.theme.colors.primary}20;
    
    &::before {
      left: 100%;
    }
  }
`;

export const InteraccionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.themeColor || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.s4 || '1rem'};
  color: ${props => props.theme.colors.white};
  position: relative;
  transition: all 0.2s ease-out; /* Transición más rápida */
  will-change: transform;
  
  /* Hover Effects optimizados */
  ${InteraccionCard}:hover & {
    transform: scale(1.05); /* Escala más sutil */
    box-shadow: 0 6px 20px ${props => props.themeColor || props.theme.colors.primary}30;
  }
`;

export const InteraccionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg || '1.125rem'};
  font-weight: ${props => props.theme.typography.fontWeights.bold || 700};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.tight || 1.25};
  text-align: center;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  
  ${InteraccionCard}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

export const InteraccionDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm || '0.875rem'};
  color: ${props => props.theme.colors.textMuted || props.theme.colors.muted};
  line-height: ${props => props.theme.typography.lineHeights.normal || 1.5};
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  ${InteraccionCard}:hover & {
    color: ${props => props.theme.colors.text};
  }
`;

export const InteraccionCTA = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSizes.sm || '0.875rem'};
  font-weight: ${props => props.theme.typography.fontWeights.medium || 500};
  opacity: 0.7; /* Visible por defecto pero sutil */
  transform: translateY(0); /* Sin desplazamiento inicial */
  transition: all 0.15s ease-out; /* Transición muy rápida */
  
  ${InteraccionCard}:hover & {
    opacity: 1;
    color: ${props => props.themeColor || props.theme.colors.primary};
  }
`;