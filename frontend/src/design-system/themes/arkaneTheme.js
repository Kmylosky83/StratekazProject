// Sistema de Diseño - Tema Arkane (Azul Corporativo)
import { defaultTheme } from './defaultTheme';
import { componentMeasures } from '../tokens/spacing';

export const arkaneTheme = {
  ...defaultTheme,
  componentMeasures,
  colors: {
    ...defaultTheme.colors,
    // Override para tema Arkane - Azul Corporativo (Microsoft Blue)
    primary: '#0078d4', // Microsoft Blue - Azul corporativo optimizado 2024
    primaryLight: '#40a9ff', // Azul más claro
    primaryDark: '#106ebe', // Azul más oscuro para hover
    
    accent: '#0ea5e9', // Sky blue
    accentDark: '#0284c7',
    
    secondary: '#475569', // Slate gray
    
    white: '#ffffff',
    black: '#000000',
    
    // Fondos claros como tema light
    background: '#ffffff',
    backgroundLight: '#f8fafc', // slate-50
    surface: '#f1f5f9', // slate-100
    surfaceDark: '#e2e8f0', // slate-200
    
    // Colores de texto corporativos
    text: '#0f172a', // slate-900
    textLight: '#334155', // slate-700
    textMuted: '#64748b', // slate-500
    textMutedLight: '#94a3b8', // slate-400
    textDisabled: '#cbd5e1', // slate-300
    
    // Bordes corporativos
    border: '#e2e8f0', // slate-200
    borderLight: '#f1f5f9', // slate-100
    borderDark: '#cbd5e1', // slate-300
    borderSubtle: '#f8fafc', // slate-50
    borderVeryLight: '#ffffff',
    
    // Estados azules corporativos
    hover: 'rgba(0, 120, 212, 0.05)', // primary con opacidad
    active: 'rgba(0, 120, 212, 0.1)',
    focus: 'rgba(0, 120, 212, 0.2)',
    disabled: '#f1f5f9',
    
    // Colores semánticos corporativos
    success: '#059669', // emerald-600
    successLight: '#d1fae5', // emerald-100
    danger: '#dc2626', // red-600
    dangerLight: '#fee2e2', // red-100
    warning: '#d97706', // amber-600
    warningLight: '#fef3c7', // amber-100
    info: '#0284c7', // sky-600
    infoLight: '#e0f2fe', // sky-100
    
    // Configuración para botones corporativos
    buttonPrimary: {
      background: '#0078d4', // Microsoft Blue - Contraste 4.64:1 WCAG AA
      text: '#ffffff',
      hover: '#106ebe', // Hover más oscuro
      active: '#004578', // Active más oscuro
      shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      overlay: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
    },
    buttonSecondary: {
      background: 'transparent',
      text: '#0078d4',
      border: '#0078d4',
      hover: 'rgba(0, 120, 212, 0.05)',
      active: 'rgba(0, 120, 212, 0.1)'
    }
  },
  
  shadows: {
    ...defaultTheme.shadows,
    // Sombras corporativas azules - Microsoft Blue
    card: '0 1px 3px rgba(0, 120, 212, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    cardHover: '0 4px 6px rgba(0, 120, 212, 0.15), 0 2px 4px rgba(0, 0, 0, 0.06)',
    button: '0 2px 4px rgba(0, 120, 212, 0.15)',
    buttonHover: '0 4px 8px rgba(0, 120, 212, 0.25)',
    elevated: '0 10px 25px rgba(0, 120, 212, 0.15)',
    hover: '0 12px 32px rgba(0, 120, 212, 0.2)',
    // Funciones para sombras dinámicas con azul
    ctaHover: (color) => `0 12px 32px rgba(0, 120, 212, 0.2)`, // Microsoft Blue para CTA
  },
  
  // Configuración específica para componentes
  header: {
    background: '#ffffff',
    text: '#0f172a',
    border: '#e2e8f0'
  },
  
  footer: {
    background: '#f8fafc',
    text: '#0f172a',
    border: '#e2e8f0'
  },
  
  // Configuración para cards corporativas
  card: {
    background: '#ffffff',
    backgroundLight: '#f8fafc',
    border: '#e2e8f0',
    shadow: '0 1px 3px rgba(0, 120, 212, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    hoverBackground: 'linear-gradient(90deg, transparent, rgba(0, 120, 212, 0.05), transparent)'
  }
};

export default arkaneTheme;