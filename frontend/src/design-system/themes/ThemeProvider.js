/**
 * ThemeProvider Multi-Tenant para StrateKaz SaaS
 * Maneja temas personalizados por tenant y configuración dinámica
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import { defaultTheme } from './defaultTheme';
import { blackTheme } from './blackTheme';
import { arkaneTheme } from './arkaneTheme';
import { createTenantTheme, generateThemeVariants } from './themeUtils';
import config, { getTenantFromSubdomain } from '../../config';

// Context para el tema
const ThemeContext = createContext({
  currentTheme: defaultTheme,
  tenantConfig: null,
  switchTheme: () => {},
  updateTenantColors: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
  availableThemes: [],
  isLoading: false,
  error: null
});

/**
 * Hook para usar el contexto de tema
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};

/**
 * Provider de tema multi-tenant
 */
export const ThemeProvider = ({ children, initialTheme = 'default', tenantId }) => {
  // Estados del tema
  const [currentThemeName, setCurrentThemeName] = useState(initialTheme);
  const [tenantConfig, setTenantConfig] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customColors, setCustomColors] = useState(null);

  // Temas disponibles por defecto
  const baseThemes = useMemo(() => ({
    default: defaultTheme,
    light: defaultTheme,
    dark: blackTheme,
    black: blackTheme,
    arkane: arkaneTheme,
  }), []);

  /**
   * Cargar configuración del tenant
   */
  const loadTenantConfig = async (tenant) => {
    if (!tenant) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Aquí se haría la llamada a la API para obtener la configuración del tenant
      const response = await fetch(`/api/tenants/${tenant}/settings/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const config = await response.json();
        setTenantConfig(config);
        
        // Aplicar colores personalizados si existen
        if (config.primary_color || config.secondary_color) {
          setCustomColors({
            primary: config.primary_color || defaultTheme.colors.primary,
            secondary: config.secondary_color || defaultTheme.colors.secondary,
          });
        }
        
        // Aplicar tema preferido
        if (config.theme && config.theme !== currentThemeName) {
          setCurrentThemeName(config.theme);
        }
      }
    } catch (err) {
      console.error('Error cargando configuración del tenant:', err);
      setError('No se pudo cargar la configuración del tema');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Detectar tenant y cargar configuración
   */
  useEffect(() => {
    const detectTenant = () => {
      // Prioridad: prop > subdomain > localStorage
      let tenant = tenantId;
      
      if (!tenant) {
        tenant = getTenantFromSubdomain();
      }
      
      if (!tenant) {
        const savedTenant = localStorage.getItem('stratekaz_current_tenant');
        if (savedTenant) {
          tenant = savedTenant;
        }
      }
      
      if (tenant) {
        loadTenantConfig(tenant);
      }
    };

    detectTenant();
  }, [tenantId]);

  /**
   * Cargar preferencias guardadas
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('stratekaz_theme');
    const savedDarkMode = localStorage.getItem('stratekaz_dark_mode') === 'true';
    
    if (savedTheme && savedTheme !== currentThemeName) {
      setCurrentThemeName(savedTheme);
    }
    
    if (savedDarkMode !== isDarkMode) {
      setIsDarkMode(savedDarkMode);
    }
  }, []);

  /**
   * Crear tema final combinando base + tenant + modo oscuro
   */
  const finalTheme = useMemo(() => {
    let baseTheme = baseThemes[currentThemeName] || baseThemes.default;
    
    // Aplicar colores personalizados del tenant
    if (customColors) {
      baseTheme = createTenantTheme(baseTheme, {
        primaryColor: customColors.primary,
        secondaryColor: customColors.secondary,
        tenantName: tenantConfig?.name || 'StrateKaz',
      });
    }
    
    // Aplicar modo oscuro si está activado
    if (isDarkMode) {
      const variants = generateThemeVariants(baseTheme);
      baseTheme = variants.dark;
    }
    
    return baseTheme;
  }, [currentThemeName, customColors, isDarkMode, baseThemes, tenantConfig]);

  /**
   * Cambiar tema
   */
  const switchTheme = (themeName) => {
    if (baseThemes[themeName]) {
      setCurrentThemeName(themeName);
      localStorage.setItem('stratekaz_theme', themeName);
    }
  };

  /**
   * Actualizar colores del tenant
   */
  const updateTenantColors = async (colors) => {
    setCustomColors(colors);
    
    // Guardar en el servidor si hay tenant configurado
    if (tenantConfig && tenantId) {
      try {
        await fetch(`/api/tenants/${tenantId}/settings/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            primary_color: colors.primary,
            secondary_color: colors.secondary,
          }),
        });
      } catch (err) {
        console.error('Error guardando colores del tenant:', err);
      }
    }
  };

  /**
   * Toggle modo oscuro
   */
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('stratekaz_dark_mode', newDarkMode.toString());
  };

  // Valor del contexto
  const contextValue = {
    currentTheme: finalTheme,
    currentThemeName,
    tenantConfig,
    switchTheme,
    updateTenantColors,
    isDarkMode,
    toggleDarkMode,
    availableThemes: Object.keys(baseThemes),
    isLoading,
    error,
    // Utilidades adicionales
    colors: finalTheme.colors,
    spacing: finalTheme.spacing,
    typography: finalTheme.typography,
    breakpoints: finalTheme.breakpoints,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={finalTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

/**
 * HOC para componentes que necesitan tema
 */
export const withTheme = (Component) => {
  const ThemedComponent = (props) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
  
  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
};

/**
 * Hook para obtener colores responsivos
 */
export const useResponsiveTheme = () => {
  const theme = useTheme();
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= parseInt(theme.currentTheme.breakpoints.mobile)) {
        setScreenSize('mobile');
      } else if (width <= parseInt(theme.currentTheme.breakpoints.tablet)) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.currentTheme.breakpoints]);

  return {
    ...theme,
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
  };
};

/**
 * Hook para animaciones del tema
 */
export const useThemeTransition = () => {
  const { currentTheme } = useTheme();
  
  return {
    fast: currentTheme.transitions.fast,
    normal: currentTheme.transitions.normal,
    slow: currentTheme.transitions.slow,
  };
};

// PropTypes
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialTheme: PropTypes.string,
  tenantId: PropTypes.string,
};

export default ThemeProvider;