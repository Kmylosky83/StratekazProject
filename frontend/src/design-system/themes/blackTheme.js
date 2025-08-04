// Sistema de Diseño - Tema Black
import { defaultTheme } from './defaultTheme';
import { componentMeasures } from '../tokens/spacing';

export const blackTheme = {
  ...defaultTheme,
  componentMeasures,
  colors: {
    ...defaultTheme.colors,
    // Override para tema oscuro
    primary: '#ec268f',
    primaryLight: '#f15ba5',
    primaryDark: '#d11f7d',
    
    accent: '#f4ec25',
    accentDark: '#e6dc0d',
    
    white: '#ffffff',
    black: '#000000',
    
    // Fondos oscuros
    background: '#0a0a0a',
    backgroundLight: '#1a1a1a',
    surface: '#1a1a1a',
    surfaceDark: '#2a2a2a',
    
    // Colores de texto invertidos
    text: '#e0e0e0',
    textLight: '#b0b0b0',
    textMuted: '#808080',
    textDisabled: '#505050',
    
    // Bordes oscuros
    border: '#333333',
    borderLight: '#2a2a2a',
    borderDark: '#4a4a4a',
    
    // Estados oscuros
    hover: 'rgba(255, 255, 255, 0.1)',
    active: 'rgba(255, 255, 255, 0.15)',
    focus: 'rgba(236, 38, 143, 0.4)',
    disabled: '#2a2a2a',
  },
  
  shadows: {
    ...defaultTheme.shadows,
    // Sombras más sutiles para tema oscuro
    card: '0 2px 8px rgba(0, 0, 0, 0.5)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.6)',
    button: '0 2px 6px rgba(0, 0, 0, 0.4)',
    buttonHover: '0 4px 12px rgba(236, 38, 143, 0.3)',
    elevated: '0 8px 24px rgba(0, 0, 0, 0.6)',
    hover: '0 12px 32px rgba(0, 0, 0, 0.7)',
  }
};

export default blackTheme;