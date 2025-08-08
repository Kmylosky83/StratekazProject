// Theme Manager - Sistema de manejo de temas
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme } from './defaultTheme';
import { blackTheme } from './blackTheme';
import { arkaneTheme } from './arkaneTheme';

// Contexto del tema
const ThemeContext = createContext();

// Hook para usar el contexto del tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeManager');
  }
  return context;
};

// Mapeo de temas disponibles
const THEMES = {
  light: defaultTheme,
  black: blackTheme,
  arkane: arkaneTheme
};

// Nombres amigables de los temas
export const THEME_NAMES = {
  light: 'Claro',
  black: 'Black',
  arkane: 'Arkane'
};

// ThemeManager que maneja el estado y persistencia de temas
export const ThemeManager = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Cargar tema desde localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('stratekaz-theme');
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Cambiar tema y persistir en localStorage
  const changeTheme = (themeName) => {
    if (THEMES[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('stratekaz-theme', themeName);
      
      // Agregar clase al body para estilos globales si es necesario
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${themeName}`);
    }
  };

  // Obtener el tema actual
  const getTheme = () => THEMES[currentTheme];

  // Valor del contexto
  const contextValue = {
    currentTheme,
    changeTheme,
    toggleTheme: changeTheme, // Alias for backwards compatibility
    getTheme,
    availableThemes: Object.keys(THEMES),
    themeNames: THEME_NAMES
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={getTheme()}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeManager;