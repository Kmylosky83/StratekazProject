// HeroSection Component - Design System
// Componente unificado que reemplaza todos los HeroSection duplicados

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container } from '../Layout';
import { H1, Text } from '../Typography';
import { Button } from '../Button';
import { fadeInUp } from '../../animations';
import { useCountAnimation } from '../../hooks';

const HeroWrapper = styled.section`
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.s12} 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  
  /* Línea sutil y difusa al final */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}40,
      ${props => props.theme.colors.primary}60,
      ${props => props.theme.colors.primary}40,
      transparent
    );
    filter: blur(1px);
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s6};
`;

const HeroTitle = styled(H1)`
  font-size: ${props => props.theme.typography.fontSizes.heroTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  text-align: center;
  margin: 0;
  margin-top: ${props => props.theme.spacing.s8};
  margin-bottom: ${props => props.theme.spacing.s4};
  letter-spacing: -0.02em;
  animation: ${fadeInUp} 0.8s ease-out;
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  
  .highlight {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.fontSizes.tablet.heroTitle};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSizes.mobile.heroTitle};
  }
`;

// Contenedor de dos columnas
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.s16};
  align-items: center;
  width: 100%;
  max-width: 1200px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s8};
    text-align: center;
  }
`;

// Contenedor de información centrado
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s4};
  text-align: center;
`;

// Subtítulo minimalista
const HeroSubtitle = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.heroSubtitle};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  margin-top: -${props => props.theme.spacing.s3};
  font-weight: ${props => props.theme.typography.fontWeights.regular};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  max-width: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSizes.mobile.heroSubtitle};
  }
`;

// Botones minimalistas
const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s3};
    width: 100%;
  }
`;

// Contenedor de imagen
const ImageSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Imagen del dashboard sin contenedor
const DashboardImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 400px;
  }
`;

// Frases flotantes con contenedores de color
const FloatingQuote = styled.div`
  position: absolute;
  font-size: 0.875rem;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  font-style: italic;
  padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s3};
  border-radius: ${props => props.theme.borderRadius.medium};
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &.top-right {
    top: -10px;
    right: -20px;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
  }
  
  &.bottom-left {
    bottom: -10px;
    left: -20px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

// Estadísticas centradas
const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.s12};
  margin-top: ${props => props.theme.spacing.s6};
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.s8};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s6};
    align-items: center;
  }
`;

// Estadística individual minimalista
const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    line-height: 1;
    margin-bottom: ${props => props.theme.spacing.s1};
  }
  
  .stat-label {
    display: block;
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.4;
    font-weight: ${props => props.theme.typography.fontWeights.normal};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    .stat-number {
      font-size: 2rem;
    }
  }
`;

// Componente para contador animado
const StatCounter = ({ number, label }) => {
  const { formattedValue, ref } = useCountAnimation(number, 2500);
  
  return (
    <StatItem>
      <span className="stat-number" ref={ref}>{formattedValue}</span>
      <span className="stat-label">{label}</span>
    </StatItem>
  );
};

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
      title: <>Sistemas <span className="highlight">Integrados</span></>,
      subtitle: 'Plataforma integral para la gestión empresarial moderna. Diseña, implementa y audita sistemas de gestión con herramientas inteligentes que se adaptan a tu organización.',
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
        {/* Título centrado */}
        <HeroTitle>{finalTitle}</HeroTitle>
        
        {/* Contenido en dos columnas */}
        <ContentGrid>
          {/* Columna de información */}
          <InfoSection>
            <HeroSubtitle>{finalSubtitle}</HeroSubtitle>
            
            <HeroButtons>
              {renderButton(finalPrimaryButton, 'primary')}
              {finalSecondaryButton && renderButton(finalSecondaryButton, 'outline')}
            </HeroButtons>
          </InfoSection>
          
          {/* Columna de imagen */}
          <ImageSection>
            <DashboardImage 
              src={`${process.env.PUBLIC_URL}/images/dashboard-mockup.png`}
              alt="Dashboard StrateKaz"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '300px', background: '#f0f0f0', borderRadius: '12px', color: '#999' }}>
              Dashboard Preview
            </div>
            
            {/* Frases flotantes */}
            <FloatingQuote className="top-right">
              "Gestión inteligente"
            </FloatingQuote>
            <FloatingQuote className="bottom-left">
              "Desde cualquier lugar"
            </FloatingQuote>
          </ImageSection>
        </ContentGrid>
        
        {/* Estadísticas centradas */}
        {showStats && finalStats && (
          <StatsSection>
            {finalStats.map((stat, index) => (
              <StatCounter key={index} number={stat.number} label={stat.label} />
            ))}
          </StatsSection>
        )}
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;