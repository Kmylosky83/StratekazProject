// Sistema de Diseño - Tokens de Efectos
// Documentación de efectos de hover, sombras y animaciones

export const effects = {
  // Transiciones estándar
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    
    // Transiciones específicas
    hover: '0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Gradientes para separadores
  dividers: {
    // Gradiente básico para separadores sutiles
    subtle: (primaryColor, borderColor) => `
      linear-gradient(90deg, 
        transparent 0%,
        ${primaryColor}10 20%,
        ${borderColor} 30%,
        ${borderColor} 70%,
        ${primaryColor}10 80%,
        transparent 100%
      )
    `,
    
    // Gradiente para bordes animados (Footer, Header)
    animated: (primaryColor, borderColor) => ({
      normal: `
        linear-gradient(90deg, 
          transparent 0%,
          ${primaryColor}20 20%,
          ${borderColor} 30%,
          ${borderColor} 70%,
          ${primaryColor}20 80%,
          transparent 100%
        )
      `,
      hover: `
        linear-gradient(90deg, 
          transparent 0%,
          ${primaryColor}40 15%,
          ${primaryColor} 25%,
          ${primaryColor} 75%,
          ${primaryColor}40 85%,
          transparent 100%
        )
      `
    })
  },

  // Opacidades estándar
  opacity: {
    disabled: 0.4,
    muted: 0.6,
    subtle: 0.8,
    full: 1.0
  },

  // Transformaciones comunes
  transforms: {
    hover: {
      lift: 'translateY(-2px)',
      liftHigh: 'translateY(-5px)',
      scale: 'scale(1.05)',
      scaleSmall: 'scale(1.02)'
    },
    
    active: {
      press: 'translateY(0)',
      scale: 'scale(0.98)'
    }
  }
};

export default effects;