// Sistema de Diseño - Tokens de Color
// Paleta de colores completa para StrateKaz

export const colors = {
  // Colores Primarios - Rosa original de marca
  primary: '#ec268f', // Rosa original de identidad de marca
  primaryLight: '#f15ba5', 
  primaryDark: '#d11f7d', // Más oscuro para hover (mantiene contraste)
  
  // Colores de Acento
  accent: '#f4ec25',
  accentDark: '#e6dc0d',
  
  // Colores Base
  white: '#ffffff',
  black: '#000000',
  
  // Fondos
  background: '#ffffff',
  backgroundLight: '#f8f9fa',
  surface: '#f8f9fa',
  surfaceDark: '#e9ecef',
  
  // Colores de Texto
  text: '#333333',
  textLight: '#555555',
  textMuted: '#6c757d',
  textMutedLight: '#64748b',
  textDisabled: '#adb5bd',
  
  // Colores Semánticos
  secondary: '#6c757d',
  success: '#28a745',
  successLight: '#d4edda',
  danger: '#dc3545',
  dangerLight: '#f8d7da',
  warning: '#ffc107',
  warningLight: '#fff3cd',
  info: '#17a2b8',
  infoLight: '#d1ecf1',
  
  // Bordes
  border: '#dee2e6', // Border sutil original
  borderAccessible: '#a0a0a0', // Border para elementos que necesiten WCAG AA
  borderLight: '#f8f9fa', 
  borderDark: '#858585', // Más oscuro para mejor contraste
  borderSubtle: '#b8b8b8', // Mejorado para 3:1 mínimo
  borderVeryLight: '#d1d5db', // Mejorado para visibilidad
  
  // Estados
  hover: 'rgba(0, 0, 0, 0.05)',
  active: 'rgba(0, 0, 0, 0.1)',
  focus: 'rgba(236, 38, 143, 0.25)',
  disabled: '#e9ecef',
  
  // Colores para Fortaleza de Contraseña
  passwordStrength: {
    veryWeak: {
      bg: '#f8d7da',
      text: '#842029'
    },
    weak: {
      bg: '#fff3cd',
      text: '#664d03'
    },
    medium: {
      bg: '#cff4fc',
      text: '#055160'
    },
    strong: {
      bg: '#d1e7dd',
      text: '#0f5132'
    },
    veryStrong: {
      bg: '#4caf50',
      text: '#ffffff'
    }
  },
  
  // Colores para Lista de Verificación de Contraseña
  passwordChecklist: {
    valid: '#0f5132',
    invalid: '#842029'
  },
  
  // Colores específicos para componentes
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Tokens faltantes encontrados en código hardcodeado
  gray50: '#f9fafb',
  gray100: '#f3f4f6', 
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  
  // Colores específicos de pilares (para compatibilidad temporal)
  pilar: {
    iso: '#3b82f6',      // Azul
    sgsst: '#dc2626',    // Rojo  
    pesv: '#7c3aed',     // Púrpura
    innovation: '#f59e0b', // Amarillo
    ambiente: '#059669'   // Verde para ISO 14001
  },
  
  // Tokens adicionales para layout
  surfaceSubtle: '#f9fafb',
  borderSubtle: '#f3f4f6',
  primarySubtle: '#fdf2f8'
};

export default colors;