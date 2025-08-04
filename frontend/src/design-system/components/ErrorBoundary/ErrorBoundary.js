// ErrorBoundary Component - Design System
// Componente para capturar y manejar errores de React con diseño unificado

import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../icons';
import { Container } from '../Layout';
import { H2, Text } from '../Typography';
import { Button } from '../Button';

const ErrorContainer = styled(Container)`
  padding: ${props => props.theme.spacing.s8};
  margin: ${props => props.theme.spacing.s8} auto;
  max-width: 600px;
  text-align: center;
`;

const ErrorCard = styled.div`
  background: ${props => props.theme.colors.error.background};
  border: 1px solid ${props => props.theme.colors.error.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s8};
  box-shadow: ${props => props.theme.shadows.card};
`;

const ErrorIcon = styled.div`
  color: ${props => props.theme.colors.error.main};
  margin-bottom: ${props => props.theme.spacing.s4};
  display: flex;
  justify-content: center;
`;

const ErrorTitle = styled(H2)`
  color: ${props => props.theme.colors.error.main};
  margin-bottom: ${props => props.theme.spacing.s4};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s2};
`;

const ErrorMessage = styled(Text)`
  color: ${props => props.theme.colors.error.text};
  margin-bottom: ${props => props.theme.spacing.s6};
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin: ${props => props.theme.spacing.s4} 0;
  text-align: left;
  
  summary {
    cursor: pointer;
    padding: ${props => props.theme.spacing.s2};
    color: ${props => props.theme.colors.error.main};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    border-radius: ${props => props.theme.borderRadius.small};
    
    &:hover {
      background-color: ${props => props.theme.colors.error.hover};
    }
  }
`;

const ErrorStack = styled.div`
  margin-top: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  font-family: ${props => props.theme.typography.fontFamilies.mono};
  font-size: 0.75rem;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-x: auto;
  color: ${props => props.theme.colors.text};
  
  strong {
    color: ${props => props.theme.colors.error.main};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.s6};
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el state para mostrar la UI de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generar ID único del error para reporte
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Log del error
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    // Actualizar state con información del error
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    });

    // Aquí podrías enviar el error a un servicio de monitoreo como Sentry
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
        error_id: errorId
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorReport = {
      id: errorId,
      message: error?.toString(),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Aquí podrías enviar el reporte a tu API de errores
    console.log('Reporte de error:', errorReport);
    alert('Reporte enviado. Gracias por ayudarnos a mejorar.');
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      const { fallback: CustomFallback } = this.props;

      // Si se proporciona un componente de fallback personalizado
      if (CustomFallback) {
        return (
          <CustomFallback 
            error={error}
            errorInfo={errorInfo}
            resetError={() => this.setState({ hasError: false })}
          />
        );
      }

      // UI de error por defecto
      return (
        <ErrorContainer>
          <ErrorCard>
            <ErrorIcon>
              <Icon name="alertTriangle" size={48} />
            </ErrorIcon>
            
            <ErrorTitle>
              ¡Oops! Algo salió mal
            </ErrorTitle>
            
            <ErrorMessage>
              Se ha producido un error inesperado en la aplicación. 
              No te preocupes, nuestro equipo ha sido notificado automáticamente.
            </ErrorMessage>

            {process.env.NODE_ENV === 'development' && (
              <ErrorDetails>
                <summary>Detalles técnicos del error</summary>
                <ErrorStack>
                  <strong>ID del Error:</strong> {errorId}
                  <br /><br />
                  <strong>Error:</strong> {error && error.toString()}
                  <br /><br />
                  <strong>Stack Trace:</strong>
                  <br />
                  {error && error.stack}
                  <br /><br />
                  <strong>Component Stack:</strong>
                  <br />
                  {errorInfo && errorInfo.componentStack}
                </ErrorStack>
              </ErrorDetails>
            )}
            
            <ActionButtons>
              <Button 
                variant="primary" 
                onClick={this.handleReload}
                size="medium"
              >
                <Icon name="refreshCw" size={16} style={{ marginRight: '8px' }} />
                Recargar página
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={this.handleGoHome}
                size="medium"
              >
                <Icon name="home" size={16} style={{ marginRight: '8px' }} />
                Ir al inicio
              </Button>
              
              {process.env.NODE_ENV === 'development' && (
                <Button 
                  variant="outline" 
                  onClick={this.handleReportError}
                  size="medium"
                >
                  <Icon name="bug" size={16} style={{ marginRight: '8px' }} />
                  Reportar error
                </Button>
              )}
            </ActionButtons>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;