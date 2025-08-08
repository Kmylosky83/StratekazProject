# StratekazProject - Frontend

Aplicación React 19 con Design System avanzado para plataforma SaaS multi-tenant empresarial.

## 🚀 Instalación Rápida

```bash
cd frontend/
npm install
npm start  # http://localhost:3000
```

## 🏗️ Stack Tecnológico

- **React 19** - Framework frontend
- **Styled Components** - CSS-in-JS con theming
- **Design System** - Sistema de diseño completo con tokens
- **React Router** - Navegación SPA
- **Lucide React** - Iconografía moderna

## 📱 Estructura del Proyecto

```
src/
├── design-system/           # Sistema de diseño completo
│   ├── tokens/             # Design tokens (colores, tipografías, espaciado)
│   ├── components/         # Componentes base reutilizables
│   ├── themes/             # Temas (claro/oscuro)
│   └── docs/              # Documentación completa del DS
├── components/             # Componentes específicos de negocio
├── pages/                  # Páginas de la aplicación
├── hooks/                  # Custom React hooks
└── utils/                  # Utilidades y helpers
```

## 🎨 Design System

**¡Característica destacada!** Este proyecto incluye un Design System completo y profesional.

- **Documentación completa**: `src/design-system/docs/README.md`
- **80+ Design Tokens**: Colores, tipografías, espaciado, shadows, etc.
- **30+ Componentes**: Botones, cards, forms, layouts, etc.
- **Theming avanzado**: Soporte para temas claro/oscuro
- **TypeScript**: Tipado completo para mejor DX

### Ejemplo de uso:

```jsx
import { Button, Card, Text } from '../design-system/components';

function Dashboard() {
  return (
    <Card variant="elevated" padding="lg">
      <Text variant="h2" color="primary">
        Panel de Control
      </Text>
      <Button variant="primary" size="lg">
        Acción Principal
      </Button>
    </Card>
  );
}
```

## 📋 Módulos Implementados

### ✅ Completamente Funcionales
- **Design System** - Sistema de diseño completo
- **Autenticación** - Login/registro de usuarios
- **Dashboard** - Panel principal con navegación

### 🚧 En Desarrollo
- **Herramientas** - Módulo principal con 10 submódulos
- **Inteligencia de Negocios** - ISO, SST, PESV
- **Empresas** - Gestión empresarial
- **Ecosistema** - Red de colaboración
- **Finanzas** - Control financiero

## 🛠️ Scripts Disponibles

### `npm start`
Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)

### `npm test`
Ejecuta los tests en modo watch (⚠️ Actualmente en configuración)

### `npm run build`
Genera build de producción optimizado en `build/`

### `npm run lint`
Ejecuta ESLint para análisis de código

## 🔗 Integración con Backend

- **API Base**: `http://localhost:8000/api/`
- **Autenticación**: Django REST + Session-based auth
- **Multi-tenancy**: Soporte para múltiples empresas

## 📚 Documentación Adicional

- **[Design System Guide](src/design-system/docs/README.md)** - Guía completa del sistema de diseño
- **[Best Practices](DESIGN_SYSTEM_BEST_PRACTICES.md)** - Mejores prácticas y patrones

## 🚨 Estado Actual del Proyecto

**Fase de Desarrollo Temprano** - La aplicación tiene bases sólidas con un excelente Design System, pero muchas funcionalidades están en desarrollo.

### Funcional:
- ✅ Design System completo y documentado
- ✅ Autenticación básica
- ✅ Navegación y layout base

### Pendiente:
- 🔄 Módulos de negocio (herramientas, inteligencia, etc.)
- 🔄 Integración completa con APIs backend
- 🔄 Testing suite
- 🔄 Optimizaciones de rendimiento

---

💡 **Para desarrolladores**: Revisa la documentación del Design System antes de crear nuevos componentes. El sistema está excepcionalmente bien diseñado y documentado.