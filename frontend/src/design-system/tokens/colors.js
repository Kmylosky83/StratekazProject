// Sistema de Diseño - Tokens de Color
// Extraído de frontend/src/styles/variables.css

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
  
  // Colores de Texto
  text: '#333333',
  textMuted: '#666666',
  
  // Colores Semánticos
  secondary: '#6c757d',
  lightBg: '#f8f9fa',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  
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