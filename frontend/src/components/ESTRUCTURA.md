# Estructura de Componentes - StrateKaz

## Organización Actual

### 📁 `/components`
Componentes específicos de páginas que NO son parte del Design System

```
components/
├── home/                    # Componentes exclusivos de HomePage
│   ├── NormativasSection.js    ✅ Sección de normativas ISO
│   ├── CaracteristicasSection.js ✅ Características del sistema
│   ├── MethodologySection.js   ✅ Metodología de trabajo
│   └── CTASection.js            ✅ Call-to-action principal
│
├── portfolio/               # Componentes exclusivos de PortfolioPage
│   └── ServiceSection.js       ✅ Servicios profesionales
│
├── dashboard/               # Componentes del Dashboard
│   └── pilares/                # Módulos del dashboard
│
├── modals/                  # Modales reutilizables
│   ├── NormativaModal.js
│   └── PolicyModal.js
│
└── auth/                    # Componentes de autenticación
```

### 🎨 `/design-system/components`
Componentes globales del Design System

```
design-system/components/
├── HeroSection/     ✅ Hero unificado (variants: home, portfolio)
├── Header/          ✅ Header global con temas
├── Footer/          ✅ Footer global
├── Section/         ✅ Contenedores de sección
├── Button/          ✅ Sistema de botones
├── Card/            ✅ Sistema de tarjetas
├── Typography/      ✅ H1-H6, Text, etc
├── Modal/           ✅ Sistema de modales
├── Form/            ✅ Sistema de formularios
└── Layout/          ✅ Container, Grid, etc
```

## Páginas y sus Componentes

### 🏠 HomePage (`/src/pages/Home.js`)
```jsx
<Header />
<HeroSection variant="home" />        // Design System
<NormativasSection />                 // components/home
<CaracteristicasSection />            // components/home  
<MethodologySection />                // components/home
<CTASection />                        // components/home
<Footer />
```

### 💼 PortfolioPage (`/src/pages/PortfolioPage.js`)
```jsx
<Header />
<ServiceSection />                    // components/portfolio (única sección)
<Footer />
```

## Tareas Pendientes

1. **Migrar a styled-components:**
   - [ ] CasesSection
   - [ ] TestimonialSection
   
2. **Eliminar archivos no usados:**
   - [ ] Verificar y eliminar CSS antiguos
   - [ ] Limpiar imports no utilizados

3. **Optimización:**
   - [ ] Crear variantes de CTASection si es necesario
   - [ ] Considerar mover más componentes al Design System

## Reglas de Organización

1. **Design System**: Componentes 100% reutilizables y genéricos
2. **components/[page]**: Componentes específicos de una página
3. **components/shared**: Componentes usados en 2+ páginas
4. **NO duplicar**: Si se usa en múltiples lugares, va en shared o design-system
5. **Styled-components**: TODO debe usar styled-components, no CSS