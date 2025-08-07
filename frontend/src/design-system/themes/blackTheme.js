// Sistema de Diseño - Tema Black
import { defaultTheme } from './defaultTheme';
import { componentMeasures } from '../tokens/spacing';

export const blackTheme = {
  ...defaultTheme,
  componentMeasures,
  colors: {
    ...defaultTheme.colors,
    // Override para tema oscuro - Solo blanco y negro
    primary: '#ffffff',  // Blanco puro
    primaryLight: '#ffffff',  // Blanco puro
    primaryDark: '#e0e0e0',  // Gris muy claro para variación
    
    accent: '#ffffff',  // Blanco para acentos
    accentDark: '#e0e0e0',  // Gris claro
    
    white: '#ffffff',
    black: '#000000',
    
    // Fondos oscuros con mejor contraste
    background: '#000000',  // Negro puro
    backgroundLight: '#0a0a0a',  // Negro ligeramente más claro
    surface: '#1a1a1a',  // Superficie para cards
    surfaceDark: '#141414',  // Superficie más oscura
    
    // Colores de texto optimizados para contraste
    text: '#ffffff',  // Blanco puro para máximo contraste
    textLight: '#f0f0f0',  // Casi blanco
    textMuted: '#cccccc',  // Gris claro
    textMutedLight: '#aaaaaa',  // Gris medio
    textDisabled: '#666666',  // Gris oscuro para deshabilitado
    
    // Bordes oscuros mejorados
    border: '#333333',  // Borde principal
    borderLight: '#2a2a2a',  // Borde más sutil
    borderDark: '#444444',  // Borde más prominente
    borderSubtle: '#1a1a1a',  // Borde muy sutil
    borderVeryLight: '#0f0f0f',  // Borde apenas visible
    
    // Estados oscuros con blanco
    hover: 'rgba(255, 255, 255, 0.1)',  // Hover con blanco
    active: 'rgba(255, 255, 255, 0.2)',  // Active con blanco
    focus: 'rgba(255, 255, 255, 0.3)',  // Focus con blanco
    disabled: '#0a0a0a',  // Fondo deshabilitado
    
    // Colores para botones con mejor contraste
    buttonPrimary: {
      background: '#ffffff',
      text: '#000000',
      hover: '#f0f0f0',
      active: '#e0e0e0',
      shimmer: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)',  // Animación oscura para tema black
      overlay: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
    },
    buttonSecondary: {
      background: 'transparent',
      text: '#ffffff',
      border: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.1)',
      active: 'rgba(255, 255, 255, 0.2)'
    }
  },
  
  shadows: {
    ...defaultTheme.shadows,
    // Sombras para tema oscuro con blanco
    card: '0 2px 8px rgba(255, 255, 255, 0.1)',  // Sombra blanca sutil
    cardHover: '0 4px 16px rgba(255, 255, 255, 0.2)',  // Sombra blanca más visible
    button: '0 2px 6px rgba(255, 255, 255, 0.15)',  // Sombra blanca para botones
    buttonHover: '0 4px 12px rgba(255, 255, 255, 0.25)',  // Sombra blanca hover
    elevated: '0 8px 24px rgba(255, 255, 255, 0.15)',  // Sombra blanca elevada
    hover: '0 12px 32px rgba(255, 255, 255, 0.2)',  // Sombra blanca prominente
    logo: '0 0 8px rgba(255, 255, 255, 0.4)',  // Sombra blanca para logo en tema black (formato drop-shadow)
    // Función para sombras dinámicas
    ctaHover: (color) => `0 12px 32px rgba(255, 255, 255, 0.2)`,  // Siempre blanca para tema black
  },
  
  // Colores específicos para componentes
  header: {
    background: '#000000',  // Negro puro
    text: '#ffffff',  // Blanco puro
    border: '#333333'
  },
  
  footer: {
    background: '#000000',  // Negro puro
    text: '#ffffff',  // Blanco puro
    border: '#333333'
  },
  
  // Configuración para cards
  card: {
    background: '#1a1a1a',  // Fondo oscuro para cards
    backgroundLight: '#0a0a0a',  // Para TermsSummary y otros componentes
    border: '#333333',
    shadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
    hoverBackground: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'  // Fondo de hover sin gradientes de color
  }
};

export default blackTheme;