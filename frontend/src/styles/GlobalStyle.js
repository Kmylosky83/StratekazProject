// Estilos Globales - Design System StrateKaz
// Reset y estilos base usando tokens del tema

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset moderno */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Variables para rem y em */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  /* Estilos del body */
  body {
    font-family: ${props => props.theme.typography.fontFamilies.primary};
    font-size: ${props => props.theme.typography.fontSizes.base};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Enlaces básicos */
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.normal};
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  /* Botones básicos */
  button {
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: ${props => props.theme.transitions.normal};
    background: none;
  }

  /* Inputs básicos */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }

  /* Imágenes responsivas */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Eliminar estilos por defecto de listas */
  ul, ol {
    list-style: none;
  }

  /* Focus visible para accesibilidad */
  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export default GlobalStyle;