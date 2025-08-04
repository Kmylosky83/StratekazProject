// Sistema de Diseño - Tema por Defecto
// Importa y combina todos los tokens en un tema unificado

import colors from '../tokens/colors';
import shadows from '../tokens/shadows';
import spacing, { componentMeasures } from '../tokens/spacing';
import typography from '../tokens/typography';

export const defaultTheme = {
  colors,
  shadows,
  spacing,
  typography,
  componentMeasures,
  
  // Configuraciones adicionales del tema
  breakpoints: {
    mobile: '767px',
    tablet: '991px',
    desktop: '1200px'
  },
  
  // Transiciones estándar
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  
  // Radios de borde
  borderRadius: {
    small: '0.375rem',      // 6px
    medium: '0.5rem',       // 8px
    large: '1rem',          // 16px
    xlarge: '2rem',         // 32px - para botones CTA
    round: '50%'            // para iconos circulares
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  }
};

export default defaultTheme;