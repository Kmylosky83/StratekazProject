/**
 * Styled Components para Auth - Sistema de Diseño StrateKaz
 */

import styled from 'styled-components';

// Container principal para páginas de autenticación
export const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.backgroundLight || '#f8f9fa'} 0%, 
    ${props => props.theme.colors.white} 100%
  );
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.s8} ${props => props.theme.spacing.s4};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s4};
  }
`;

// Card principal
export const AuthCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.elevated || '0 20px 40px rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.hover || '0 25px 50px rgba(0, 0, 0, 0.15)'};
  }
`;

// Header del formulario
export const AuthHeader = styled.div`
  padding: ${props => props.theme.spacing.s8} ${props => props.theme.spacing.s8} ${props => props.theme.spacing.s6};
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border || '#e5e7eb'};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s4};
  }
`;

// Título principal
export const AuthTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.sectionTitle || '1.75rem'};
  font-weight: ${props => props.theme.typography.fontWeights.bold || 700};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.tight || 1.25};
`;

// Subtítulo
export const AuthSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.base || '1rem'};
  color: ${props => props.theme.colors.textMuted || props.theme.colors.muted};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal || 1.5};
`;

// Barra de progreso
export const AuthProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.border || '#e5e7eb'};
  border-radius: 2px;
  margin-top: ${props => props.theme.spacing.s6};
  overflow: hidden;
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.secondary || props.theme.colors.primary}
    );
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

// Contenido principal
export const AuthContent = styled.div`
  padding: ${props => props.theme.spacing.s8};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.s6};
  }
`;

// Footer
export const AuthFooter = styled.div`
  padding: ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s8} ${props => props.theme.spacing.s8};
  border-top: 1px solid ${props => props.theme.colors.border || '#e5e7eb'};
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6};
  }
`;

// Contenedor de botones de navegación
export const AuthNavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.s4};
  
  .nav-left,
  .nav-right {
    display: flex;
    align-items: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s4};
    
    .nav-left,
    .nav-right {
      width: 100%;
      justify-content: center;
    }
  }
`;