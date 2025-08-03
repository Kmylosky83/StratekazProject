// Estilos Globales usando styled-components
// Aplica estilos base usando el tema del sistema de diseño

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset básico */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Estilos del body */
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.typography.fontFamilies.primary};
    font-size: ${props => props.theme.typography.fontSizes.base};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Estilos de títulos usando tokens */
  h1 {
    font-size: ${props => props.theme.typography.fontSizes.heroTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    line-height: ${props => props.theme.typography.lineHeights.tight};
    margin-bottom: ${props => props.theme.spacing.margin.heroTitleBottom};
    color: ${props => props.theme.colors.text};
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.margin.sectionTitleBottom};
    color: ${props => props.theme.colors.text};
    text-align: center;
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSizes.cardTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing.margin.cardTitleBottom};
    color: ${props => props.theme.colors.text};
  }

  /* Estilos de párrafos */
  p {
    margin-bottom: ${props => props.theme.spacing.margin.baseTextBottom};
    color: ${props => props.theme.colors.secondary};
  }

  /* Enlaces */
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.normal};
  }

  a:hover {
    color: ${props => props.theme.colors.primaryDark};
  }

  /* Botones base */
  button {
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: ${props => props.theme.transitions.normal};
  }

  /* Input y form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Listas */
  ul, ol {
    padding-left: ${props => props.theme.spacing.s6};
  }

  /* Responsive typography */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    h1 {
      font-size: ${props => props.theme.typography.fontSizes.tablet.heroTitle};
    }
    
    h2 {
      font-size: ${props => props.theme.typography.fontSizes.tablet.sectionTitle};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    h1 {
      font-size: ${props => props.theme.typography.fontSizes.mobile.heroTitle};
    }
    
    h2 {
      font-size: ${props => props.theme.typography.fontSizes.mobile.sectionTitle};
    }
    
    h3 {
      font-size: ${props => props.theme.typography.fontSizes.mobile.cardTitle};
    }
  }

  /* Utility classes usando el tema */
  .titulo-hero {
    padding: ${props => props.theme.spacing.padding.heroTitle};
    font-size: ${props => props.theme.typography.fontSizes.heroTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.margin.heroTitleBottom};
    line-height: ${props => props.theme.typography.lineHeights.tight};
  }

  .subtitulo-hero {
    font-size: ${props => props.theme.typography.fontSizes.heroSubtitle};
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.margin.heroSubtitleBottom};
  }

  .titulo-seccion {
    font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.margin.sectionTitleBottom};
    text-align: center;
  }

  .subtitulo-seccion {
    font-size: ${props => props.theme.typography.fontSizes.sectionSubtitle};
    color: ${props => props.theme.colors.secondary};
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }

  .titulo-tarjeta {
    font-size: ${props => props.theme.typography.fontSizes.cardTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.margin.cardTitleBottom};
  }

  .subtitulo-tarjeta {
    font-size: ${props => props.theme.typography.fontSizes.cardSubtitle};
    color: ${props => props.theme.colors.textMuted};
    text-align: center;
  }

  .texto-base {
    font-size: ${props => props.theme.typography.fontSizes.base};
    color: ${props => props.theme.colors.secondary};
    line-height: ${props => props.theme.typography.lineHeights.relaxed};
    margin-bottom: ${props => props.theme.spacing.margin.baseTextBottom};
  }

  .texto-nota {
    font-size: ${props => props.theme.typography.fontSizes.note};
    color: ${props => props.theme.colors.textMuted};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    margin-bottom: ${props => props.theme.spacing.margin.noteTextBottom};
    font-style: italic;
  }
`;

export default GlobalStyle;