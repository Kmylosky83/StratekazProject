// Sistema de Diseño - Tema Arkane (Futurista/Cyberpunk)
import { defaultTheme } from './defaultTheme';
import { componentMeasures } from '../tokens/spacing';

export const arkaneTheme = {
  ...defaultTheme,
  componentMeasures,
  colors: {
    ...defaultTheme.colors,
    // Override para tema Arkane
    primary: '#00ffcc', // Cyan brillante
    primaryLight: '#33ffd6',
    primaryDark: '#00ccaa',
    
    accent: '#ff00ff', // Magenta neón
    accentDark: '#cc00cc',
    
    secondary: '#7b2fff', // Púrpura
    
    white: '#ffffff',
    black: '#000000',
    
    // Fondos oscuros con tinte púrpura
    background: '#0a0014',
    backgroundLight: '#140028',
    surface: '#1a0033',
    surfaceDark: '#250047',
    
    // Colores de texto con tinte cyan
    text: '#e0fff0',
    textLight: '#b0ffd0',
    textMuted: '#70a090',
    textDisabled: '#405060',
    
    // Bordes con glow
    border: '#2a5050',
    borderLight: '#1a3540',
    borderDark: '#3a6060',
    
    // Estados con neón
    hover: 'rgba(0, 255, 204, 0.1)',
    active: 'rgba(0, 255, 204, 0.2)',
    focus: 'rgba(0, 255, 204, 0.3)',
    disabled: '#1a2030',
    
    // Colores semánticos cyberpunk
    success: '#00ff88',
    successLight: '#00ff8830',
    danger: '#ff0066',
    dangerLight: '#ff006630',
    warning: '#ffaa00',
    warningLight: '#ffaa0030',
    info: '#00aaff',
    infoLight: '#00aaff30',
  },
  
  shadows: {
    ...defaultTheme.shadows,
    // Sombras con glow neón
    card: '0 0 20px rgba(0, 255, 204, 0.1), 0 4px 12px rgba(0, 0, 0, 0.8)',
    cardHover: '0 0 30px rgba(0, 255, 204, 0.2), 0 8px 20px rgba(0, 0, 0, 0.9)',
    button: '0 0 15px rgba(0, 255, 204, 0.2), 0 2px 8px rgba(0, 0, 0, 0.6)',
    buttonHover: '0 0 25px rgba(0, 255, 204, 0.4), 0 4px 12px rgba(0, 0, 0, 0.7)',
    elevated: '0 0 40px rgba(0, 255, 204, 0.15), 0 10px 30px rgba(0, 0, 0, 0.8)',
    hover: '0 0 50px rgba(0, 255, 204, 0.25), 0 15px 40px rgba(0, 0, 0, 0.9)',
  }
};

export default arkaneTheme;