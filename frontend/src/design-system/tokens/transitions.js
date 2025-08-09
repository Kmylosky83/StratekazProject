// Sistema de Diseño - Tokens de Transiciones
// Definiciones de duraciones, easing y delays para transiciones consistentes

export const transitions = {
  // Duraciones estándar
  duration: {
    instant: '0ms',
    fastest: '100ms',
    fast: '150ms',
    medium: '200ms',
    slow: '300ms',
    slower: '500ms'
  },

  // Curvas de easing profesionales
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    
    // Curvas personalizadas profesionales
    smooth: 'cubic-bezier(0.23, 1, 0.32, 1)', // Suave y natural
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Con rebote
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)', // Más directa
    gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Muy suave
  },

  // Delays para hover y interactions
  delay: {
    none: '0ms',
    short: '50ms',
    medium: '100ms',
    long: '150ms',
    tooltip: '300ms'
  },

  // Shortcuts comunes para componentes
  sidebar: {
    collapse: '200ms cubic-bezier(0.23, 1, 0.32, 1)',
    hover: '150ms ease',
    content: '150ms cubic-bezier(0.23, 1, 0.32, 1)'
  },

  // Transiciones predefinidas para elementos comunes
  button: '0.2s ease',
  modal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  tooltip: '0.15s ease',
  dropdown: '0.2s ease',
  
  // Para compatibilidad con componentes existentes
  fast: '0.2s ease',
  medium: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ease: 'ease'
};

export default transitions;