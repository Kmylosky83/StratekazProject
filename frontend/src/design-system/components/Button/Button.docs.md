# Button Component - Sistema de Diseño StrateKaz

## Visión General

El componente Button ha sido rediseñado para crear una experiencia profesional, moderna y minimalista, optimizada para plataformas B2B. Se eliminaron efectos excesivos y se simplificaron las variantes para mantener consistencia y claridad.

## Principios de Diseño

### 🎯 **Profesionalismo B2B Moderno**
- Gradientes elegantes y efectos shimmer sutiles
- Elevación controlada con micro-interacciones
- Colores corporativos consistentes con personalidad

### ✨ **Minimalismo Atractivo**
- 5 variantes esenciales con efectos modernos
- 3 tamaños optimizados con proporciones perfectas
- Jerarquía visual clara y llamativa

### ♿ **Accesibilidad Premium**
- Estados focus visibles con doble ring
- Contraste WCAG AA+ compliant
- Transiciones suaves para mejor UX

### 🚀 **Efectos Modernos**
- Gradientes diagonales en botones principales
- Efectos shimmer para elementos destacados
- Micro-elevación en hover (1px máximo)
- Animaciones de carga integradas

## Variantes Disponibles

### 1. **Primary** (Defecto) ⭐
```jsx
<Button variant="primary">Acción Principal</Button>
```
- **Uso**: Acciones principales, CTA, envío de formularios
- **Diseño**: Gradiente diagonal magenta con efecto shimmer
- **Efectos Geniales**:
  - 🌟 Gradiente animado en hover
  - ✨ Efecto shimmer que cruza el botón
  - 🎯 Elevación sutil (-1px) en hover
  - 💎 Highlight interno superior
  - 🔥 Sombras coloridas multicapa

### 2. **Secondary** ✨
```jsx
<Button variant="secondary">Acción Secundaria</Button>
```
- **Uso**: Acciones secundarias, cancelar, navegación
- **Diseño**: Gradiente gris elegante con profundidad
- **Efectos Geniales**:
  - 🌫️ Gradiente sutil gris a blanco
  - 📊 Elevación profesional en hover
  - 🎨 Transición suave entre estados
  - 💼 Sombra neutra elegante

### 3. **Outline** 🎪
```jsx
<Button variant="outline">Ver Más</Button>
```
- **Uso**: Acciones alternativas, ver detalles
- **Diseño**: Borde magenta con relleno animado
- **Efectos Geniales**:
  - 🌊 Relleno gradual de izquierda a derecha
  - 🎭 Transformación completa en hover
  - ⚡ Animación de width del pseudo-elemento
  - 🚀 Cambio de color fluido

### 4. **Ghost** 👻
```jsx
<Button variant="ghost">Acción Sutil</Button>
```
- **Uso**: Acciones terciarias, navegación sutil
- **Diseño**: Transparente con efectos graduales
- **Efectos Geniales**:
  - 🌸 Gradiente magenta ultra-sutil en hover
  - 💨 Elevación mínima pero perceptible
  - 🦋 Transiciones delicadas y elegantes
  - 🌙 Borde que aparece suavemente

### 5. **Danger** 🔥
```jsx
<Button variant="danger">Eliminar</Button>
```
- **Uso**: Acciones destructivas, eliminación, advertencias
- **Diseño**: Gradiente rojo intenso con shimmer
- **Efectos Geniales**:
  - ⚠️ Gradiente diagonal rojo dramático
  - ✨ Efecto shimmer de advertencia
  - 💥 Sombras rojas intensas en hover
  - 🚨 Elevación que comunica peligro

## Tamaños

### Small (32px altura)
```jsx
<Button size="small">Pequeño</Button>
```
- **Padding**: 8px 16px
- **Font Size**: 14px
- **Uso**: Formularios compactos, acciones secundarias

### Medium (40px altura) - Defecto
```jsx
<Button size="medium">Mediano</Button>
```
- **Padding**: 12px 24px
- **Font Size**: 16px
- **Uso**: Botones estándar, uso general

### Large (48px altura)
```jsx
<Button size="large">Grande</Button>
```
- **Padding**: 16px 32px
- **Font Size**: 16px
- **Uso**: CTAs principales, páginas de destino

## Estados Interactivos Geniales

### Estados Ultra-Mejorados 🎯
- **Hover**: 
  - 🌟 Gradientes dinámicos más intensos
  - ✨ Efectos shimmer activados
  - 🚀 Micro-elevación (-1px) para profundidad
  - 💎 Sombras coloridas multicapa
- **Focus**: 
  - 🎪 Doble ring de enfoque con color del tema
  - 🌈 Combinación de focus + hover effects
  - ♿ Accesibilidad premium garantizada
- **Active**: 
  - ⚡ Retorno suave a posición (0px)
  - 🎭 Sombras más intensas momentáneamente
  - 💫 Feedback táctil visual inmediato
- **Disabled**: 
  - 😴 Opacidad 50% con pointer-events: none
  - 🚫 Todos los efectos deshabilitados
  - 🛡️ Protección completa contra interacción

### Estado Loading Espectacular 🎪
```jsx
<Button className="loading">Cargando...</Button>
```
- 🌀 Spinner animado integrado con border animado
- 👻 Texto invisible durante carga (color: transparent)
- 📐 Mantiene dimensiones exactas originales
- ⚡ Animación suave de 0.8s con cubic-bezier
- 🎯 Indicador visual claro y profesional

## Soporte para Iconos

### Con Lucide Icons
```jsx
import { ArrowRight, Plus, Download } from 'lucide-react';

<Button>
  <Plus />
  Agregar Nuevo
</Button>

<Button variant="outline">
  Descargar
  <Download />
</Button>
```

### Recomendaciones de Iconos por Acción

| Acción | Icono Recomendado | Posición |
|--------|------------------|----------|
| Agregar/Crear | `Plus` | Izquierda |
| Guardar | `Save` | Izquierda |
| Enviar | `Send` | Derecha |
| Descargar | `Download` | Derecha |
| Editar | `Edit2` | Izquierda |
| Eliminar | `Trash2` | Izquierda |
| Ver más | `ArrowRight` | Derecha |
| Cerrar | `X` | Derecha |

## Jerarquía Visual

### Orden de Importancia
1. **Primary** - Acción más importante (solo 1 por vista)
2. **Outline** - Acción secundaria importante
3. **Secondary** - Acciones estándar
4. **Ghost** - Acciones sutiles
5. **Danger** - Acciones destructivas (usar con cuidado)

### Combinaciones Recomendadas
```jsx
// Formulario típico
<div>
  <Button variant="primary">Guardar</Button>
  <Button variant="secondary">Cancelar</Button>
</div>

// Tarjeta con acciones
<div>
  <Button variant="outline">Ver Detalles</Button>
  <Button variant="ghost">Editar</Button>
</div>

// CTA Section
<div>
  <Button variant="primary" size="large">Comenzar Ahora</Button>
  <Button variant="outline" size="large">Saber Más</Button>
</div>
```

## Mejoras Técnicas

### Performance
- Transiciones optimizadas: `cubic-bezier(0.4, 0, 0.2, 1)`
- Eliminación de sombras complejas innecesarias
- CSS-in-JS optimizado con styled-components

### Accesibilidad
- `focus-visible` para navegación por teclado
- `aria-disabled` y `pointer-events: none` para estados disabled
- Contraste mínimo 4.5:1 en todos los estados

### Flexibilidad
- Soporte nativo para iconos con `gap: 8px`
- Estado loading integrado
- Responsive por defecto

## Migración desde Versión Anterior

### Variantes Eliminadas
- ❌ `cta` → ✅ Usar `primary` con `size="large"`
- ❌ `text` → ✅ Usar `ghost`
- ❌ `link` → ✅ Crear componente Link separado
- ❌ `success` → ✅ Usar `primary` para feedback positivo
- ❌ `card` → ✅ Crear CardButton específico

### Tamaños Eliminados
- ❌ `xs`, `xl`, `cta` → ✅ Usar `small`, `medium`, `large`

### Cambios en Efectos
- ❌ `translateY(-3px)` → ✅ `translateY(1px)` solo en active
- ❌ Sombras intensas → ✅ Sombras sutiles (`shadows.sm`)

## Código de Ejemplo Espectacular 🚀

```jsx
import { Button } from '@design-system/components';
import { Plus, ArrowRight, Download, Trash2, Settings } from 'lucide-react';

function SpectacularButtons() {
  return (
    <div className="button-showcase">
      {/* 🌟 Botón Principal - CTA Hero */}
      <Button variant="primary" size="large">
        <Plus />
        Crear Proyecto Increíble
      </Button>
      
      {/* 🎪 Botón Outline - Animación de Relleno */}
      <Button variant="outline">
        Ver Todos los Proyectos
        <ArrowRight />
      </Button>
      
      {/* ✨ Botón Secondary - Elegancia Profesional */}
      <Button variant="secondary">
        <Download />
        Descargar Recursos
      </Button>
      
      {/* 👻 Botón Ghost - Sutil pero Efectivo */}
      <Button variant="ghost" size="small">
        <Settings />
        Configuraciones
      </Button>
      
      {/* 🔥 Botón Danger - Impacto Visual */}
      <Button variant="danger">
        <Trash2 />
        Eliminar Permanente
      </Button>
      
      {/* 🎯 Botón con Estado Loading */}
      <Button variant="primary" className="loading">
        Procesando...
      </Button>
      
      {/* 🌈 Combinaciones Dinámicas */}
      <div className="button-groups">
        <Button variant="primary">Guardar</Button>
        <Button variant="secondary">Cancelar</Button>
        
        <Button variant="outline">Previsualizar</Button>
        <Button variant="ghost">Más Opciones</Button>
      </div>
    </div>
  );
}
```

## Efectos Técnicos Implementados 🛠️

### Gradientes Avanzados
```css
/* Primary Button */
background: linear-gradient(135deg, #ec268f 0%, #d11f7d 100%);

/* Shimmer Effect */
&::before {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 0.6s ease;
}
```

### Sombras Multicapa
```css
/* Hover State */
box-shadow: 
  0 4px 12px rgba(236, 38, 143, 0.3),    /* Sombra principal */
  0 0 0 3px rgba(236, 38, 143, 0.2),     /* Ring exterior */
  inset 0 1px 0 rgba(255, 255, 255, 0.3); /* Highlight interno */
```

### Transiciones Premium
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Filosofía de Diseño Visual 🎨

> **"Cada botón debe ser un pequeño momento de deleite"**

- ✨ **Micro-interacciones**: Cada hover es una experiencia
- 🎯 **Feedback inmediato**: El usuario siempre sabe qué está pasando  
- 🌟 **Atención controlada**: Los efectos llaman la atención sin ser molestos
- 💎 **Calidad premium**: Detalles que comunican profesionalismo
- 🚀 **Modernidad**: Efectos actuales sin sacrificar usabilidad

---

**Versión**: 2.0 - Profesional & Minimalista
**Última actualización**: Agosto 2025
**Compatibilidad**: React 18+, styled-components 5+