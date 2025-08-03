/**
 * Utilidades para manejo de temas multi-tenant
 * Funciones para generar, modificar y validar temas
 */

import chroma from 'chroma-js';

/**
 * Genera variantes de color a partir de un color base
 */
export const generateColorVariants = (baseColor) => {
  const color = chroma(baseColor);
  
  return {
    50: color.alpha(0.05).css(),
    100: color.alpha(0.1).css(),
    200: color.alpha(0.2).css(),
    300: color.alpha(0.3).css(),
    400: color.alpha(0.4).css(),
    500: baseColor,
    600: color.darken(0.5).css(),
    700: color.darken(1).css(),
    800: color.darken(1.5).css(),
    900: color.darken(2).css(),
    light: color.brighten(1).css(),
    dark: color.darken(1).css(),
  };
};

/**
 * Genera paleta de colores complementarios
 */
export const generateComplementaryPalette = (primaryColor) => {
  const primary = chroma(primaryColor);
  
  return {
    primary: primaryColor,
    secondary: primary.set('hsl.h', '+180').css(), // Color complementario
    tertiary: primary.set('hsl.h', '+120').css(),  // Triádico
    accent: primary.set('hsl.h', '+30').css(),     // Análogo
    success: chroma('#10B981').css(),
    warning: chroma('#F59E0B').css(),
    danger: chroma('#EF4444').css(),
    info: chroma('#3B82F6').css(),
  };
};

/**
 * Calcula contraste y ajusta colores para accesibilidad
 */
export const ensureAccessibility = (backgroundColor, textColor) => {
  const bg = chroma(backgroundColor);
  const text = chroma(textColor);
  const contrast = chroma.contrast(bg, text);
  
  // WCAG AA requiere contraste mínimo de 4.5:1
  if (contrast < 4.5) {
    // Ajustar el color del texto para mejor contraste
    if (bg.luminance() > 0.5) {
      // Fondo claro, oscurecer texto
      return text.darken(2).css();
    } else {
      // Fondo oscuro, aclarar texto
      return text.brighten(2).css();
    }
  }
  
  return textColor;
};

/**
 * Crea un tema personalizado para un tenant
 */
export const createTenantTheme = (baseTheme, tenantConfig) => {
  const {
    primaryColor = baseTheme.colors.primary,
    secondaryColor = baseTheme.colors.secondary,
    tenantName = 'StrateKaz',
    logo,
    customStyles = {}
  } = tenantConfig;

  // Generar variantes de colores
  const primaryVariants = generateColorVariants(primaryColor);
  const secondaryVariants = generateColorVariants(secondaryColor);
  
  // Paleta complementaria
  const palette = generateComplementaryPalette(primaryColor);
  
  // Colores optimizados para accesibilidad
  const accessibleColors = {
    ...baseTheme.colors,
    primary: primaryColor,
    primaryLight: primaryVariants.light,
    primaryDark: primaryVariants.dark,
    primaryVariants,
    
    secondary: secondaryColor,
    secondaryLight: secondaryVariants.light,
    secondaryDark: secondaryVariants.dark,
    secondaryVariants,
    
    // Colores complementarios
    accent: palette.accent,
    tertiary: palette.tertiary,
    
    // Texto con contraste adecuado
    textOnPrimary: ensureAccessibility(primaryColor, '#ffffff'),
    textOnSecondary: ensureAccessibility(secondaryColor, '#ffffff'),
    
    // Gradientes personalizados
    gradients: {
      primary: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryVariants.dark} 100%)`,
      secondary: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryVariants.dark} 100%)`,
      hero: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`,
    }
  };

  return {
    ...baseTheme,
    colors: accessibleColors,
    
    // Información del tenant
    tenant: {
      name: tenantName,
      logo,
      primaryColor,
      secondaryColor,
    },
    
    // Estilos personalizados del tenant
    custom: {
      ...customStyles,
      
      // Sombras con color primario
      shadows: {
        ...baseTheme.shadows,
        primary: `0 4px 14px 0 ${primaryColor}40`,
        primaryHover: `0 8px 25px 0 ${primaryColor}60`,
        card: `0 2px 8px 0 ${primaryColor}10`,
      },
      
      // Botones personalizados con colores del tenant
      buttons: {
        primary: {
          background: primaryColor,
          color: ensureAccessibility(primaryColor, '#ffffff'),
          hover: primaryVariants.dark,
        },
        secondary: {
          background: secondaryColor,
          color: ensureAccessibility(secondaryColor, '#ffffff'),
          hover: secondaryVariants.dark,
        },
      },
    },
  };
};

/**
 * Genera variantes de tema (claro/oscuro)
 */
export const generateThemeVariants = (baseTheme) => {
  const lightTheme = {
    ...baseTheme,
    mode: 'light',
    colors: {
      ...baseTheme.colors,
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#1a1a1a',
      textMuted: '#6b7280',
      textLight: '#9ca3af',
      border: '#e5e7eb',
      borderLight: '#f3f4f6',
    }
  };

  const darkTheme = {
    ...baseTheme,
    mode: 'dark',
    colors: {
      ...baseTheme.colors,
      // Mantener colores primarios del tenant
      primary: baseTheme.colors.primary,
      secondary: baseTheme.colors.secondary,
      
      // Ajustar colores de fondo para modo oscuro
      background: '#0f172a',
      surface: '#1e293b',
      white: '#334155',
      
      // Texto para modo oscuro
      text: '#f1f5f9',
      textMuted: '#cbd5e1',
      textLight: '#94a3b8',
      
      // Bordes para modo oscuro
      border: '#374151',
      borderLight: '#4b5563',
      
      // Invertir algunos colores utilitarios
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#3b82f6',
    },
    
    // Sombras ajustadas para modo oscuro
    shadows: {
      ...baseTheme.shadows,
      card: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      hover: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
      elevated: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    }
  };

  return { light: lightTheme, dark: darkTheme };
};

/**
 * Valida un color personalizado
 */
export const validateColor = (color) => {
  try {
    chroma(color);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Genera un tema a partir de una imagen (extrae colores dominantes)
 */
export const generateThemeFromImage = async (imageUrl) => {
  // Esta función requeriría una librería como color-thief
  // Por ahora devolvemos un placeholder
  return {
    primaryColor: '#ec268f',
    secondaryColor: '#333333',
    accentColor: '#f59e0b',
  };
};

/**
 * Convierte tema a CSS custom properties
 */
export const themeToCSSProperties = (theme) => {
  const cssProperties = {};
  
  // Colores
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssProperties[`--color-${key}`] = value;
    }
  });
  
  // Espaciado
  Object.entries(theme.spacing).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssProperties[`--spacing-${key}`] = value;
    }
  });
  
  // Tipografía
  Object.entries(theme.typography.fontSizes).forEach(([key, value]) => {
    cssProperties[`--font-size-${key}`] = value;
  });
  
  // Sombras
  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssProperties[`--shadow-${key}`] = value;
  });
  
  return cssProperties;
};

/**
 * Aplica CSS custom properties al DOM
 */
export const applyCSSProperties = (properties) => {
  const root = document.documentElement;
  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Calcula colores de estado basados en el primario
 */
export const generateStatusColors = (primaryColor) => {
  const primary = chroma(primaryColor);
  
  return {
    success: primary.set('hsl.h', 120).css(), // Verde
    warning: primary.set('hsl.h', 60).css(),  // Amarillo
    danger: primary.set('hsl.h', 0).css(),    // Rojo
    info: primary.set('hsl.h', 240).css(),    // Azul
  };
};

/**
 * Exportaciones de utilidades comunes
 */
export const themeUtils = {
  generateColorVariants,
  generateComplementaryPalette,
  ensureAccessibility,
  createTenantTheme,
  generateThemeVariants,
  validateColor,
  generateThemeFromImage,
  themeToCSSProperties,
  applyCSSProperties,
  generateStatusColors,
};