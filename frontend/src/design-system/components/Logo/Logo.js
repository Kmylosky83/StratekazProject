/**
 * Componente Logo - Sistema de Diseño StrateKaz
 * Logo adaptable con variantes de tamaño y color
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Logo real de StrateKaz
const LogoSVG = ({ color = 'currentColor', ...props }) => (
  <img
    src="https://i.postimg.cc/gnGzQtsY/logo-png-1.png"
    alt="StrateKaz - Estrategias y Capacitación de la A a la Z"
    style={{ maxHeight: '100%', width: 'auto' }}
    {...props}
  />
);

// Componente estilizado
const StyledLogo = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: ${props => props.theme.transitions.normal};
  
  /* Sombra para logo - solo en tema black usando design system */
  ${props => props.theme.shadows.logo && `
    img, svg {
      filter: drop-shadow(${props.theme.shadows.logo});
    }
  `}
  
  svg {
    width: ${props => {
      switch (props.size) {
        case 'small': return '120px';
        case 'medium': return '160px';
        case 'large': return '200px';
        case 'xlarge': return '240px';
        default: return '160px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '30px';
        case 'medium': return '40px';
        case 'large': return '50px';
        case 'xlarge': return '60px';
        default: return '60px';
      }
    }};
  }
  
  img {
    max-height: ${props => {
      switch (props.size) {
        case 'small': return '30px';
        case 'medium': return '40px';
        case 'large': return '50px';
        case 'xlarge': return '60px';
        default: return '40px';
      }
    }};
    width: auto;
  }
  
  &:hover {
    ${props => props.hoverable && `
      transform: scale(1.05);
      opacity: 0.9;
    `}
  }
`;

// Componente Solo Icono
const IconOnly = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: ${props => props.theme.transitions.normal};
  
  svg {
    width: ${props => {
      switch (props.size) {
        case 'small': return '24px';
        case 'medium': return '32px';
        case 'large': return '40px';
        case 'xlarge': return '48px';
        default: return '32px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '24px';
        case 'medium': return '32px';
        case 'large': return '40px';
        case 'xlarge': return '48px';
        default: return '32px';
      }
    }};
  }
  
  &:hover {
    ${props => props.hoverable && `
      transform: scale(1.1);
      opacity: 0.9;
    `}
  }
`;

// Icono solo SVG
const IconSVG = ({ color = 'currentColor', ...props }) => (
  <svg
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="25" cy="25" r="20" fill={color} fillOpacity="0.1" />
    <path
      d="M25 10 L35 20 L30 25 L35 30 L25 40 L15 30 L20 25 L15 20 Z"
      fill={color}
      stroke={color}
      strokeWidth="1"
    />
  </svg>
);

/**
 * Componente Logo principal
 */
export const Logo = ({
  size = 'medium',
  color,
  variant = 'full',
  clickable = false,
  hoverable = false,
  onClick,
  className,
  ...props
}) => {
  // Determinar color basado en el tema
  const logoColor = color || (variant === 'white' ? '#ffffff' : '#ec268f');
  
  if (variant === 'icon') {
    return (
      <IconOnly
        size={size}
        clickable={clickable}
        hoverable={hoverable}
        onClick={onClick}
        className={className}
        {...props}
      >
        <IconSVG color={logoColor} />
      </IconOnly>
    );
  }
  
  return (
    <StyledLogo
      size={size}
      clickable={clickable}
      hoverable={hoverable}
      onClick={onClick}
      className={className}
      {...props}
    >
      <LogoSVG color={logoColor} />
    </StyledLogo>
  );
};

/**
 * Logo con texto personalizable
 */
export const Logo_Custom = ({
  text = 'StrateKaz',
  tagline,
  size = 'medium',
  color,
  onClick,
  className,
  ...props
}) => {
  const logoColor = color || '#ec268f';
  
  return (
    <StyledLogo
      size={size}
      clickable={!!onClick}
      hoverable={!!onClick}
      onClick={onClick}
      className={className}
      {...props}
    >
      <svg
        viewBox="0 0 250 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icono */}
        <g id="icon">
          <circle cx="25" cy="30" r="20" fill={logoColor} fillOpacity="0.1" />
          <path
            d="M25 15 L35 25 L30 30 L35 35 L25 45 L15 35 L20 30 L15 25 Z"
            fill={logoColor}
            stroke={logoColor}
            strokeWidth="1"
          />
        </g>
        
        {/* Texto principal */}
        <text
          x="55"
          y="38"
          fontFamily="Montserrat, sans-serif"
          fontSize="20"
          fontWeight="700"
          fill={logoColor}
        >
          {text}
        </text>
        
        {/* Tagline opcional */}
        {tagline && (
          <text
            x="55"
            y="52"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            fontWeight="400"
            fill={logoColor}
            fillOpacity="0.7"
          >
            {tagline}
          </text>
        )}
      </svg>
    </StyledLogo>
  );
};

/**
 * Logo para diferentes contextos
 */
export const Logo_Header = (props) => (
  <Logo size="medium" hoverable clickable {...props} />
);

export const Logo_Footer = (props) => (
  <Logo size="small" variant="full" {...props} />
);

export const Logo_Sidebar = (props) => (
  <Logo variant="icon" size="medium" {...props} />
);

export const Logo_Loading = ({ size = 'large', ...props }) => {
  const StyledLoadingLogo = styled.div`
    display: inline-flex;
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  
  return (
    <StyledLoadingLogo>
      <Logo size={size} {...props} />
    </StyledLoadingLogo>
  );
};

// PropTypes
Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.string,
  variant: PropTypes.oneOf(['full', 'icon', 'white']),
  clickable: PropTypes.bool,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Logo_Custom.propTypes = {
  text: PropTypes.string,
  tagline: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Logo;