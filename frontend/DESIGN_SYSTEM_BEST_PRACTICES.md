# Design System + Global Styles - Mejores Prácticas

## ✅ Arquitectura Actual (CORRECTA)

```
App.js
├── ThemeProvider (Tokens: colores, tipografía, espaciado)
├── GlobalStyle (Reset CSS + estilos base usando tokens)
└── Components (Design System usando tokens)
```

## 🎯 Por qué funciona sin conflictos:

### 1. **Separación Clara de Responsabilidades**
```javascript
// GlobalStyle.js - Solo reset y base
body {
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  color: ${props => props.theme.colors.text};
}

// Button.js - Componente específico  
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.s3};
`;
```

### 2. **Fuente única de verdad (Tokens)**
- GlobalStyle usa `props.theme.X`
- Componentes usan `props.theme.X`
- Ambos consumen los mismos tokens = consistencia

### 3. **Especificidad CSS correcta**
- GlobalStyle: selectores básicos (body, a, button)
- Componentes: clases generadas (styled-components)
- No hay competencia entre selectores

## ⚠️ Anti-patrones a evitar:

### ❌ MAL - CSS Global con valores hardcoded:
```css
/* global.css */
body { color: #333333; }
button { background: #007bff; }
```
```jsx
// Button.js
const Button = styled.button`
  background: ${props => props.theme.colors.primary}; // Conflicto!
`;
```

### ❌ MAL - Múltiples fuentes de estilos globales:
```jsx
<App>
  <GlobalStyle />
  <AnotherGlobalCSS />  // Conflicto potencial
  <ThirdPartyCss />     // Más conflictos
</App>
```

### ❌ MAL - Tokens inconsistentes:
```javascript
// GlobalStyle.js
body { font-size: 16px; }  // Hardcoded

// Component.js  
const Text = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.base}; // Token
`;
```

## ✅ Mejores Prácticas Actuales:

### 1. **GlobalStyle como Foundation**
```javascript
export const GlobalStyle = createGlobalStyle`
  // Solo reset, normalize y estilos base del navegador
  *, *::before, *::after { box-sizing: border-box; }
  body { 
    font-family: ${props => props.theme.typography.fontFamilies.primary};
    background: ${props => props.theme.colors.background};
  }
`;
```

### 2. **Design System como Building Blocks**
```javascript
// Componentes específicos y reutilizables
export const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
`;
```

### 3. **Theme Provider como Single Source of Truth**
```javascript
const theme = {
  colors: { primary: '#007bff', text: '#333' },
  typography: { fontSizes: { base: '1rem' } },
  spacing: { s3: '0.75rem' }
};
```

## 🚀 Ventajas de la arquitectura actual:

1. **Consistencia**: Todos usan los mismos tokens
2. **Mantenibilidad**: Cambiar un token actualiza todo
3. **Performance**: styled-components optimiza CSS
4. **Flexibilidad**: Fácil tema oscuro/claro
5. **Escalabilidad**: Agregar componentes es simple
6. **Testing**: Componentes aislados y testeable

## 📋 Checklist de calidad:

- [x] GlobalStyle usa tokens del theme
- [x] Componentes usan tokens del theme  
- [x] Sin CSS hardcoded en JavaScript
- [x] Sin archivos .css compitiendo
- [x] Theme Provider provee tokens únicos
- [x] Orden correcto: Theme → GlobalStyle → Components

## 🔄 Flujo de trabajo recomendado:

1. **Definir token** en theme
2. **Usar en GlobalStyle** si es estilo base
3. **Usar en Component** si es específico
4. **Nunca hardcodear** valores en componentes

## 📖 Documentación de referencia:

- [Styled Components Best Practices](https://styled-components.com/docs/basics)
- [Design Systems with styled-components](https://styled-components.com/docs/advanced)
- [CSS-in-JS vs Global CSS](https://styled-components.com/docs/faqs)