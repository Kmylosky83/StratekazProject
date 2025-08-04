// Sistema de Diseño - Tokens Base Centralizados
// Valores fundamentales del sistema para evitar hardcoding

export const base = {
  // Breakpoints responsivos
  breakpoints: {
    mobile: '768px',
    tablet: '992px', 
    desktop: '1200px',
    xl: '1400px'
  },
  
  // Transiciones sistémicas
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.45s ease',
    bounce: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    xxlarge: '20px',
    full: '9999px'
  },
  
  // Z-index layers
  zIndex: {
    hide: -1,
    base: 0,
    elevated: 10,
    dropdown: 1000,
    sticky: 1010,
    fixed: 1020,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080
  },
  
  // Opacidades
  opacity: {
    disabled: 0.6,
    muted: 0.7,
    hover: 0.9,
    overlay: 0.6,
    backdrop: 0.4
  },
  
  // Blur values
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  
  // Duraciones de animación
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '450ms',
    slower: '600ms'
  },
  
  // Timing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // Medidas comunes
  measures: {
    // Contenedores
    containerMaxWidth: '1200px',
    containerPadding: '1rem',
    
    // Headers
    headerHeight: '64px',
    headerHeightMobile: '56px',
    
    // Sidebar
    sidebarWidth: '280px',
    sidebarWidthCollapsed: '64px',
    
    // Botones
    buttonHeight: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '56px'
    },
    
    // Inputs
    inputHeight: {
      sm: '32px',
      md: '40px',
      lg: '48px'
    }
  },
  
  // Iconos
  iconSizes: {
    xs: '12px',
    sm: '16px',
    base: '20px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xxl: '48px'
  }
};

export default base;