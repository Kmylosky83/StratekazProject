// Sistema de Diseño - Tokens de Tipografía
// Extraído de frontend/src/styles/variables.css

export const typography = {
  // Familias de fuentes
  fontFamilies: {
    primary: 'Montserrat, sans-serif',
    secondary: 'Inter, sans-serif'
  },
  
  // Tamaños de fuente
  fontSizes: {
    // Títulos
    heroTitle: '3.5rem',      // titulo-hero
    sectionTitle: '2.25rem',  // titulo-seccion
    cardTitle: '1.5rem',      // titulo-tarjeta
    
    // Subtítulos
    heroSubtitle: '1.25rem',  // subtitulo-hero
    sectionSubtitle: '1.125rem', // subtitulo-seccion
    cardSubtitle: '0.9rem',   // subtitulo-tarjeta
    
    // Texto base
    base: '1rem',             // texto-base
    note: '0.875rem',         // texto-nota
    
    // Botones
    buttonBase: '1rem',
    buttonLarge: '1.1rem',
    buttonSmall: '0.875rem',
    buttonCta: '1.1rem',
    
    // Iconos
    iconStandard: '2rem',
    iconSmall: '1.25rem',
    iconLarge: '2.5rem',
    iconLoose: '2.5rem',      // icono-suelto-a
    iconLooseLarge: '3rem',   // icono-suelto-b
    
    // Password
    passwordBadge: '0.8rem',
    passwordChecklist: '0.8rem',
    
    // Responsive - mobile
    mobile: {
      heroTitle: '2rem',      // @media (max-width: 767px)
      heroSubtitle: '1rem',
      sectionTitle: '2rem',   // @media (max-width: 991px)
      cardTitle: '1.25rem'
    },
    
    // Responsive - tablet
    tablet: {
      heroTitle: '2.5rem',    // @media (max-width: 991px)
      sectionTitle: '2rem'
    }
  },
  
  // Pesos de fuente optimizados para legibilidad profesional
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  
  // Altura de línea
  lineHeights: {
    tight: 1.2,    // titulo-hero
    normal: 1.5,   // texto-nota, password-checklist
    relaxed: 1.6   // texto-base
  },
  
  // Estilos de texto
  textStyles: {
    // Títulos con pesos más sutiles y legibles
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 600, // Reducido de 700 a 600
      lineHeight: 1.3, // Mejorado de 1.2 a 1.3
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em' // Mejor espaciado
    },
    
    heroSubtitle: {
      fontSize: '1.25rem',
      fontWeight: 400, // Añadido peso específico
      lineHeight: 1.5, // Mejorada legibilidad
      marginBottom: '2rem',
      opacity: 0.9 // Menos invasivo
    },
    
    sectionTitle: {
      fontSize: '2.25rem',
      fontWeight: 600, // Reducido de 700 a 600
      lineHeight: 1.3, // Mejorada legibilidad
      marginBottom: '1rem',
      textAlign: 'center',
      letterSpacing: '-0.01em'
    },
    
    sectionSubtitle: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.6, // Más espacio entre líneas
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'center',
      opacity: 0.85 // Menos invasivo
    },
    
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 600, // Reducido de 700 a 600
      lineHeight: 1.4, // Mejorada legibilidad
      marginBottom: '1rem'
    },
    
    cardSubtitle: {
      fontSize: '0.9rem',
      fontWeight: 400,
      lineHeight: 1.5, // Añadida altura de línea
      textAlign: 'center',
      opacity: 0.8 // Menos invasivo
    },
    
    // Texto base
    baseText: {
      fontSize: '1rem',
      lineHeight: 1.6,
      marginBottom: '1rem'
    },
    
    noteText: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      marginBottom: '0.5rem',
      fontStyle: 'italic'
    }
  }
};

export default typography;