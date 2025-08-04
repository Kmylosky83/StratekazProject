// HeroSection Component - Design System
// Componente unificado que reemplaza todos los HeroSection duplicados

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container, Grid, Row, Col } from '../Layout';
import { H1, Text } from '../Typography';
import { Button } from '../Button';
import { fadeInUp, slideInLeft, slideInRight } from '../../animations';

const HeroWrapper = styled.section`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.secondary} 100%
  );
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.s16} 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(H1)`
  font-size: 3.5rem;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.s4};
  animation: ${fadeInUp} 0.8s ease-out;
  
  .highlight {
    color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(Text)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.s8};
  opacity: 0.9;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s12};
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s3};
  }
`;

const StatsSection = styled.div`
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.s4};
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.accent};
    margin-bottom: ${props => props.theme.spacing.s2};
    display: block;
  }
  
  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.4;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .stat-number {
      font-size: 2rem;
    }
  }
`;

const HeroSection = ({ 
  variant = 'home', // 'home' | 'portfolio'
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  stats,
  showStats = true 
}) => {
  // Default content for home variant
  const defaultContent = {
    home: {
      title: 'Stratek',
      subtitle: 'Gestiona tu organización de manera inteligente, diseña, implementa y audita, Sistemas Integrados de Gestión, Seguridad y Salud en el Trabajo y mucho mas. "Desde cualquier lugar del mundo".',
      primaryButton: { text: 'Comenzar Ahora', to: '/register' },
      secondaryButton: { text: 'Portafolio de Servicios', to: '/portfolio' },
      stats: [
        { number: '40%', label: 'Menos tiempo de implementación' },
        { number: '95%', label: 'Reducción de errores' },
        { number: '100%', label: 'Cumplimiento normativo' }
      ]
    },
    portfolio: {
      title: <>
        <span className="highlight">Soluciones</span> Estratégicas Empresariales
      </>,
      subtitle: 'Impulse la eficiencia, innovación y crecimiento sostenible de su organización con estrategias personalizadas que integran Inteligencia Artificial, Tecnología y procesos optimizados.',
      primaryButton: { 
        text: 'Solicitar Consulta', 
        href: 'https://wa.me/573115351944',
        external: true,
        icon: 'arrowRight'
      },
      secondaryButton: { text: 'Explorar Servicios', href: '#servicios' },
      stats: [
        { number: '20+', label: 'Años de experiencia' },
        { number: '17+', label: 'Certificaciones' },
        { number: '30+', label: 'Proyectos exitosos' },
        { number: '2000+', label: 'Clientes satisfechos' }
      ]
    }
  };

  const content = defaultContent[variant];
  const finalTitle = title || content.title;
  const finalSubtitle = subtitle || content.subtitle;
  const finalPrimaryButton = primaryButton || content.primaryButton;
  const finalSecondaryButton = secondaryButton || content.secondaryButton;
  const finalStats = stats || content.stats;

  const renderButton = (buttonConfig, variant) => {
    if (buttonConfig.external) {
      return (
        <Button
          as="a"
          href={buttonConfig.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={variant}
          size="large"
        >
          {buttonConfig.text}
          {buttonConfig.icon && (
            <Icon name={buttonConfig.icon} size={16} style={{ marginLeft: '8px' }} />
          )}
        </Button>
      );
    }
    
    if (buttonConfig.href) {
      return (
        <Button
          as="a"
          href={buttonConfig.href}
          variant={variant}
          size="large"
        >
          {buttonConfig.text}
        </Button>
      );
    }
    
    return (
      <Button
        as={Link}
        to={buttonConfig.to}
        variant={variant}
        size="large"
      >
        {buttonConfig.text}
      </Button>
    );
  };

  return (
    <HeroWrapper>
      <HeroContent>
        <Row align="center">
          <Col lg={6}>
            <HeroTitle>{finalTitle}</HeroTitle>
            <HeroSubtitle>{finalSubtitle}</HeroSubtitle>
            
            <HeroButtons>
              {renderButton(finalPrimaryButton, 'primary')}
              {finalSecondaryButton && renderButton(finalSecondaryButton, 'secondary')}
            </HeroButtons>
            
            {showStats && finalStats && (
              <StatsSection>
                <Row>
                  {finalStats.map((stat, index) => (
                    <Col key={index} md={12 / finalStats.length}>
                      <StatItem>
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                      </StatItem>
                    </Col>
                  ))}
                </Row>
              </StatsSection>
            )}
          </Col>
        </Row>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;