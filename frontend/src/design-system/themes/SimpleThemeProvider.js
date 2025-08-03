/**
 * ThemeProvider simple temporal - versión básica sin dependencias externas
 * Para resolver el problema de routing inmediatamente
 */

import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { defaultTheme } from './defaultTheme';

// Context para el tema
const ThemeContext = createContext({
  currentTheme: defaultTheme,
  isDarkMode: false,
  toggleDarkMode: () => {},
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
 * Provider de tema simple
 */
export const ThemeProvider = ({ children, initialTheme = 'default' }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Tema final
  const finalTheme = React.useMemo(() => {
    if (isDarkMode) {
      // Versión simple del tema oscuro
      return {
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          background: '#0f172a',
          surface: '#1e293b',
          white: '#334155',
          text: '#f1f5f9',
          textMuted: '#cbd5e1',
          textLight: '#94a3b8',
          border: '#374151',
          borderLight: '#4b5563',
        }
      };
    }
    return defaultTheme;
  }, [isDarkMode]);

  /**
   * Toggle modo oscuro
   */
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Valor del contexto
  const contextValue = {
    currentTheme: finalTheme,
    isDarkMode,
    toggleDarkMode,
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

// PropTypes
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialTheme: PropTypes.string,
};

export default ThemeProvider;