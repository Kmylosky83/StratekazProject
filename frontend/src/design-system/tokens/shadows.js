// Sistema de Diseño - Tokens de Sombras
// Extraído de frontend/src/styles/variables.css

export const shadows = {
  // Sombras básicas
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Sombras de componentes específicos
  card: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.05)',
  hover: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  elevated: '0 20px 40px -4px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
  
  // Funciones para sombras con color primario (se calculan dinámicamente)
  primary: (color, opacity = 0.2) => `0 0.5rem 1rem ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  primarySm: (color, opacity = 0.15) => `0 2px 4px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  primaryMd: (color, opacity = 0.2) => `0 8px 16px -4px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  primaryLg: (color, opacity = 0.25) => `0 20px 40px -4px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  
  // Sombras de botones
  button: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  buttonHover: '0 0.75rem 1.5rem rgba(0, 0, 0, 0.2)',
  buttonSecondary: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
  
  // Sombras de tarjetas con funciones dinámicas
  selectionCard: (color) => `0 15px 30px ${color}1A`, // 1A = 10% opacity en hex
  selectionCardSelected: (color) => `0 15px 30px ${color}33`, // 33 = 20% opacity en hex
  cardButtonActive: (color) => `0 0.5rem 1rem ${color}26`, // 26 = 15% opacity en hex
  
  // Función para CTA hover con múltiples sombras
  ctaHover: (color) => `
    0 20px 40px -4px ${color}33,
    0 8px 16px -4px ${color}26,
    0 0 0 1px ${color}4D
  `.replace(/\s+/g, ' ').trim()
};

export default shadows;