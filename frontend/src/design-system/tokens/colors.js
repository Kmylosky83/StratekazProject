// Sistema de Diseño - Tokens de Color
// Paleta de colores completa para StrateKaz

export const colors = {
  // Colores Primarios
  primary: '#ec268f',
  primaryLight: '#f15ba5',
  primaryDark: '#d11f7d',
  
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
  border: '#dee2e6',
  borderLight: '#f1f3f4',
  borderDark: '#adb5bd',
  
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
  }
};

export default colors;