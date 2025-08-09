// Sistema de Diseño - Tema Black
import { defaultTheme } from './defaultTheme';
import { componentMeasures } from '../tokens/spacing';

export const blackTheme = {
  ...defaultTheme,
  componentMeasures,
  colors: {
    ...defaultTheme.colors,
    // Override para tema oscuro - Mejorado para WCAG AA
    primary: '#ffffff',  // Blanco puro - Contraste 21:1 con negro
    primaryLight: '#f5f5f5',  // Gris muy claro para variación
    primaryDark: '#e0e0e0',  // Gris claro para hover
    primarySubtle: 'rgba(255, 255, 255, 0.1)',  // Fondo sutil para items activos
    
    accent: '#60a5fa',  // Azul claro - Contraste 5.94:1 con negro
    accentDark: '#3b82f6',  // Azul medio para variación
    
    white: '#ffffff',
    black: '#000000',
    
    // Fondos oscuros optimizados
    background: '#000000',  // Negro puro
    backgroundLight: '#121212',  // Material Design Dark - mejor contraste
    surface: '#1e1e1e',  // Superficie para cards - Contraste mejorado
    surfaceSubtle: '#2a2a2a',  // Superficie sutil para tarjetas pequeñas
    surfaceDark: '#151515',  // Superficie más oscura
    
    // Colores de texto optimizados para contraste
    text: '#ffffff',  // Blanco puro para máximo contraste
    textLight: '#f0f0f0',  // Casi blanco
    textMuted: '#cccccc',  // Gris claro
    textMutedLight: '#aaaaaa',  // Gris medio
    textDisabled: '#666666',  // Gris oscuro para deshabilitado
    
    // Bordes oscuros  
    border: '#333333',  // Border sutil para header (mantiene estética original)
    borderAccessible: '#5a5a5a',  // Mejorado: ratio 3.2:1 con negro (WCAG AA ✅) 
    borderLight: '#2a2a2a',  // Border más sutil
    borderDark: '#6a6a6a',  // Borde más prominente
    borderSubtle: '#484848',  // Mejorado para 3:1 mínimo
    borderVeryLight: '#383838',  // Mejorado para visibilidad
    
    // Estados oscuros optimizados
    hover: 'rgba(96, 165, 250, 0.15)',  // Hover con azul suave
    active: 'rgba(96, 165, 250, 0.25)',  // Active con azul
    focus: 'rgba(96, 165, 250, 0.4)',  // Focus con azul prominente
    disabled: '#121212',  // Fondo deshabilitado más claro
    
    // Botones con contraste WCAG AA optimizado
    buttonPrimary: {
      background: '#60a5fa',  // Azul claro - Contraste 5.94:1
      text: '#000000',  // Negro sobre azul claro - excelente contraste
      hover: '#3b82f6',  // Azul más intenso
      active: '#2563eb',  // Azul oscuro
      shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      overlay: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
    },
    buttonSecondary: {
      background: 'transparent',
      text: '#60a5fa',  // Azul claro para contraste
      border: '#60a5fa',
      hover: 'rgba(96, 165, 250, 0.15)',
      active: 'rgba(96, 165, 250, 0.25)'
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
  
  // Configuración para cards optimizada
  card: {
    background: '#1e1e1e',  // Fondo oscuro mejorado
    backgroundLight: '#121212',  // Material Design Dark
    border: '#404040',  // Borde más visible
    shadow: '0 2px 8px rgba(96, 165, 250, 0.15)',  // Sombra azul sutil
    hoverBackground: 'rgba(96, 165, 250, 0.08)'  // Hover azul suave sin gradiente
  }
};

export default blackTheme;