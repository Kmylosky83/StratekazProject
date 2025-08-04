// Sistema de Diseño - Tokens de Espaciado
// Sistema de espaciado basado en incrementos de 4px

export const spacing = {
  // Espaciado base (múltiplos de 4px)
  s1: '4px',    // 0.25rem
  s2: '8px',    // 0.5rem
  s3: '12px',   // 0.75rem
  s4: '16px',   // 1rem
  s5: '20px',   // 1.25rem
  s6: '24px',   // 1.5rem
  s8: '32px',   // 2rem
  s10: '40px',  // 2.5rem
  s12: '48px',  // 3rem
  s16: '64px',  // 4rem
  s20: '80px',  // 5rem
  
  // Espaciado específico extraído del CSS
  padding: {
    // Padding de botones
    buttonSmall: '0.5rem 1rem',
    buttonRegular: '0.75rem 1.5rem',
    buttonLarge: '0.875rem 2rem',
    buttonCta: '0.75rem 2rem',
    buttonText: '0.5rem 0.75rem',
    
    // Padding de tarjetas
    card: '2rem',
    cardAcceso: '4rem', // del AccesoGratuitoPage
    
    // Padding de tabs
    tab: '0.6rem 1.25rem',
    tabWrapper: '0.25rem',
    
    // Padding del héroe
    heroTitle: '20px'
  },
  
  // Márgenes específicos
  margin: {
    // Márgenes de iconos
    iconStandardBottom: '1.5rem',
    iconSmallBottom: '1rem',
    iconLargeBottom: '2rem',
    
    // Márgenes de títulos
    heroTitleBottom: '1.5rem',
    heroSubtitleBottom: '2rem',
    sectionTitleBottom: '1rem',
    cardTitleBottom: '1rem',
    
    // Márgenes de texto
    baseTextBottom: '1rem',
    noteTextBottom: '0.5rem',
    
    // Márgenes de tabs
    tabsBottom: '2.5rem',
    
    // Márgenes de password
    passwordStrengthBottom: '5px',
    passwordChecklistTop: '5px',
    passwordChecklistItemBottom: '2px'
  },
  
  // Espaciado de gaps
  gap: {
    tabWrapper: '0.5rem',
    grid: '1rem' // para g-4 en Bootstrap equivale a 1.5rem, pero adaptamos a nuestro sistema
  }
};

// Medidas específicas para componentes\nconst componentMeasures = {\n  header: {\n    logoSubMargin: '2px',\n    dropdownOffset: '8px', \n    dropdownMinWidth: '250px',\n    iconSize: '18px',\n    iconSizeSmall: '16px',\n    mobileMenuWidth: '300px',\n    mobileMenuMaxWidth: '80vw',\n    translateHover: '5px',\n    borderWidth: '1px',\n    blurRadius: '4px',\n    overlayBackground: 'rgba(0, 0, 0, 0.5)',\n    shadowMobile: '-10px 0 30px rgba(0, 0, 0, 0.1)'\n  }\n};\n\nexport { spacing, componentMeasures };\nexport default spacing;