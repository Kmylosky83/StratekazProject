# Sistema de Diseño - Stratek

Una guía completa para usar los componentes y tokens del sistema de diseño de Stratek.

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Estructura](#estructura)
- [Tokens](#tokens)
- [Componentes](#componentes)
  - [Button](#button)
  - [Typography](#typography)
  - [Card](#card)
- [Icons](#icons)
- [Tema](#tema)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 🚀 Instalación

```javascript
// Importar componentes individuales
import { Button, H1, Text, Card } from '@/design-system/components';

// Importar iconos
import { ArrowRight, Award } from '@/design-system/icons';

// Importar tokens (si necesitas acceso directo)
import { colors, typography, spacing } from '@/design-system/tokens';
```

## 📁 Estructura

```
design-system/
├── components/          # Componentes reutilizables
│   ├── Button/
│   ├── Typography/
│   ├── Card/
│   └── index.js
├── tokens/             # Tokens de diseño
│   ├── colors.js
│   ├── typography.js
│   ├── spacing.js
│   └── shadows.js
├── themes/             # Configuración de temas
│   └── defaultTheme.js
├── icons/              # Iconos centralizados
│   └── index.js
└── docs/              # Documentación
    └── README.md
```

## 🎨 Tokens

### Colores

Los colores están organizados en categorías semánticas:

```javascript
// Colores primarios
colors.primary         // #ec268f
colors.primaryLight    // #f15ba5
colors.primaryDark     // #d11f7d

// Colores de acento
colors.accent          // #f4ec25
colors.accentDark      // #e6dc0d

// Colores de texto
colors.text            // #333333
colors.textMuted       // #666666
```

### Tipografía

```javascript
// Tamaños
typography.fontSizes.heroTitle      // 3.5rem
typography.fontSizes.sectionTitle   // 2.25rem
typography.fontSizes.base           // 1rem

// Pesos
typography.fontWeights.regular      // 400
typography.fontWeights.semiBold     // 600
typography.fontWeights.bold         // 700
```

### Espaciado

Sistema basado en incrementos de 4px:

```javascript
spacing.s1    // 4px
spacing.s4    // 16px
spacing.s8    // 32px
```

## 🧩 Componentes

## Button

El componente Button es el principal medio para acciones en la aplicación.

### Uso Básico

```javascript
import { Button } from '@/design-system/components';

// Botón básico
<Button>Texto del Botón</Button>
```

### Variantes

```javascript
// Botón primario (por defecto)
<Button variant="primary">Acción Principal</Button>

// Botón secundario
<Button variant="secondary">Acción Secundaria</Button>

// Botón CTA (Call to Action)
<Button variant="cta">¡Comenzar Ahora!</Button>

// Botón de texto
<Button variant="text">Enlace de Texto</Button>

// Botón para tarjetas
<Button variant="card">Seleccionar</Button>
```

### Tamaños

```javascript
<Button size="small">Pequeño</Button>
<Button size="regular">Regular</Button>
<Button size="large">Grande</Button>
<Button size="cta">CTA Especial</Button>
```

### Ejemplos Avanzados

```javascript
// Botón como enlace
<Button as={Link} to="/register" variant="primary">
  Registrarse
</Button>

// Botón deshabilitado
<Button disabled>No Disponible</Button>

// Botón con clase active
<Button variant="card" className="active">
  Seleccionado
</Button>
```

## Typography

Componentes para texto y títulos que siguen las reglas tipográficas del sistema.

### Headings (Títulos)

```javascript
import { H1, H2, H3, Heading } from '@/design-system/components';

// Títulos semánticos
<H1 variant="hero">Título Principal</H1>
<H2 variant="section">Título de Sección</H2>
<H3 variant="card">Título de Tarjeta</H3>

// Heading genérico
<Heading as="h2" variant="hero">
  Título Personalizado
</Heading>
```

### Variantes de Heading

```javascript
// Título hero
<H1 variant="hero">Título Hero</H1>

// Título de sección
<H2 variant="section">Título de Sección</H2>

// Subtítulos
<Heading variant="heroSubtitle">Subtítulo Hero</Heading>
<Text variant="sectionSubtitle">Subtítulo de Sección</Text>
```

### Text (Texto)

```javascript
import { Text, Paragraph } from '@/design-system/components';

// Texto básico
<Text>Contenido de texto normal</Text>

// Variantes de texto
<Text variant="base">Texto base</Text>
<Text variant="muted">Texto apagado</Text>
<Text variant="note">Texto de nota</Text>
<Text variant="small">Texto pequeño</Text>
```

### Propiedades Personalizadas

```javascript
// Tamaño personalizado
<Text size="lg" weight="bold">Texto grande y bold</Text>

// Color personalizado
<Text color="#ec268f">Texto con color</Text>

// Alineación
<Text align="center">Texto centrado</Text>

// Sin margen
<Text noMargin>Texto sin margen inferior</Text>
```

## Card

Componente para crear tarjetas con diferentes estilos y funcionalidades.

### Uso Básico

```javascript
import { Card, CardBody, ToolIcon } from '@/design-system/components';

<Card>
  <CardBody>
    <h3>Título de la Tarjeta</h3>
    <p>Contenido de la tarjeta</p>
  </CardBody>
</Card>
```

### Variantes

```javascript
// Tarjeta estándar (por defecto)
<Card variant="standard">Contenido</Card>

// Tarjeta de selección
<Card variant="selection">Contenido Seleccionable</Card>

// Tarjeta de herramienta
<Card variant="tool">Herramienta</Card>
```

### Ejemplo Completo

```javascript
<Card variant="tool" className="h-100">
  <CardBody className="text-center p-4 d-flex flex-column">
    <ToolIcon backgroundColor="#3498db" className="mb-3">
      <i className="fas fa-certificate text-white fs-1"></i>
    </ToolIcon>
    <H3 variant="card" className="fw-bold mb-3">ISO 9001</H3>
    <Text variant="cardSubtitle" className="flex-grow-1">
      Sistema de Gestión de Calidad
    </Text>
    <Button variant="card" className="active mt-auto">
      Acceder Gratis
    </Button>
  </CardBody>
</Card>
```

## 🎯 Icons

Todos los iconos están centralizados desde Lucide React:

```javascript
import { ArrowRight, Award, Users, Settings } from '@/design-system/icons';

// Uso básico
<ArrowRight size={24} />
<Award className="text-primary" />
```

### Iconos Disponibles

- **Navegación**: `ArrowLeft`, `ArrowRight`, `ChevronRight`, `Home`
- **Acciones**: `Plus`, `Eye`, `Edit`, `Trash2`, `Download`, `Share2`
- **Servicios**: `Award`, `Shield`, `Briefcase`, `BarChart2`, `Users`
- **Estado**: `CheckSquare`, `Calendar`, `Activity`, `CheckCircle`
- **Y muchos más...**

## 🌙 Tema

El tema está disponible a través del `ThemeProvider` en toda la aplicación:

```javascript
// En componentes styled-components
const StyledComponent = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSizes.base};
  padding: ${props => props.theme.spacing.s4};
`;

// Acceso directo al tema
import { useTheme } from 'styled-components';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.colors.primary }}>
      Texto con color del tema
    </div>
  );
};
```

## 💡 Ejemplos de Uso

### Hero Section

```javascript
<section className="hero">
  <H1 variant="hero">
    Tu empresa hacia la <span style={{color: 'var(--primary-color)'}}>
      Excelencia empresarial
    </span>
  </H1>
  <Text variant="heroSubtitle">
    Plataforma SaaS para gestionar de manera integral todo su modelo
  </Text>
  <div className="hero-buttons">
    <Button as={Link} to="/register" variant="primary" size="large">
      Comenzar Ahora
    </Button>
    <Button as={Link} to="/portfolio" variant="secondary" size="large">
      Portafolio de Servicios
    </Button>
  </div>
</section>
```

### Service Cards

```javascript
<div className="service-grid">
  {servicios.map((servicio, index) => (
    <Card key={index} variant="standard">
      <div className="icono-estandar-primario">
        {servicio.icon}
      </div>
      <H3 variant="card">{servicio.title}</H3>
      <Text variant="cardSubtitle">{servicio.description}</Text>
    </Card>
  ))}
</div>
```

## 🔧 Mejores Prácticas

1. **Usa componentes del sistema** en lugar de HTML + clases CSS
2. **Importa solo lo que necesitas** para optimizar el bundle
3. **Respeta las variantes** definidas en lugar de crear estilos custom
4. **Usa el tema** para acceder a tokens de diseño
5. **Mantén la consistencia** usando los componentes establecidos

## 🚧 Próximos Pasos

- [ ] Agregar más componentes (Input, Modal, Dropdown)
- [ ] Implementar modo oscuro
- [ ] Añadir animaciones
- [ ] Crear más variantes
- [ ] Documentar con Storybook