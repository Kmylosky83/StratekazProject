# Design System - Guía de Componentes

Esta guía documenta todos los componentes del Design System y cómo migrar desde patrones legacy de Bootstrap/CSS.

## 🔄 Migración Rápida

### Botones
```jsx
// ❌ ANTES (Bootstrap/CSS)
<button className="btn btn-primary">Acción</button>
<button className="boton-cta">CTA</button>

// ✅ DESPUÉS (Design System)
import { Button } from '../design-system/components';

<Button variant="primary">Acción</Button>
<Button size="large" variant="primary">CTA</Button>
```

### Grid/Layout
```jsx
// ❌ ANTES (Bootstrap)
<div className="container">
  <div className="row">
    <div className="col-md-6">Content</div>
    <div className="col-md-6">Content</div>
  </div>
</div>

// ✅ DESPUÉS (Design System)
import { Container, Grid } from '../design-system/components';

<Container>
  <Grid columns={2} tablet={1} gap="large">
    <div>Content</div>
    <div>Content</div>
  </Grid>
</Container>
```

### Secciones
```jsx
// ❌ ANTES (CSS personalizado)
<section className="seccion-hero">
  <div className="container">
    <h2>Título</h2>
    <p>Descripción</p>
  </div>
</section>

// ✅ DESPUÉS (Design System)
import { Section, SectionHeader } from '../design-system/components';

<Section variant="primary" size="large">
  <SectionHeader 
    title="Título"
    subtitle="Descripción"
    centered
  />
</Section>
```

## 📦 Componentes Disponibles

### Button
Sistema completo de botones con 10 variantes y 6 tamaños.

```jsx
import { Button } from '../design-system/components';

// Variantes
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="success">Éxito</Button>
<Button variant="danger">Peligro</Button>

// Tamaños
<Button size="xs">Extra pequeño</Button>
<Button size="small">Pequeño</Button>
<Button size="medium">Mediano</Button>
<Button size="large">Grande</Button>
<Button size="xl">Extra grande</Button>
<Button size="cta">CTA</Button>

// Estados
<Button loading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>
<Button fullWidth>Ancho completo</Button>
```

**Props:**
- `variant`: primary, secondary, outline, ghost, link, success, danger, warning, info, dark
- `size`: xs, small, medium, large, xl, cta
- `loading`: boolean - muestra spinner
- `disabled`: boolean
- `fullWidth`: boolean
- `onClick`: function

### Section & SectionHeader
Componentes para estructurar páginas de manera consistente.

```jsx
import { Section, SectionHeader, SectionContent } from '../design-system/components';

<Section variant="primary" size="large" centered>
  <SectionHeader
    title="Título Principal"
    subtitle="Descripción de la sección"
    centered
  />
  <SectionContent>
    {/* Contenido de la sección */}
  </SectionContent>
</Section>
```

**Section Props:**
- `variant`: default, primary, secondary, light, dark, gradient
- `size`: xs, small, medium, large, xl
- `centered`: boolean
- `noPadding`: boolean

**SectionHeader Props:**
- `title`: string (requerido)
- `subtitle`: string
- `centered`: boolean
- `level`: 1-6 (nivel de heading)

### Grid System
Sistema moderno basado en CSS Grid que reemplaza Bootstrap.

```jsx
import { Grid, Row, Col, Container } from '../design-system/components';

// CSS Grid (recomendado)
<Grid columns={4} mobile={1} tablet={2} gap="large">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

// Auto-responsive
<Grid autoFit minWidth="300px" gap="medium">
  <div>Auto item 1</div>
  <div>Auto item 2</div>
</Grid>

// Flexbox (para layouts complejos)
<Row align="center" justify="space-between">
  <Col width="200px">Sidebar</Col>
  <Col>Main content</Col>
  <Col width="150px">Aside</Col>
</Row>
```

**Grid Props:**
- `columns`: número de columnas
- `mobile`: columnas en móvil
- `tablet`: columnas en tablet
- `desktop`: columnas en desktop
- `gap`: xs, small, medium, large, xl o valor custom
- `autoFit`: boolean - responsive automático
- `autoFill`: boolean - fill automático
- `minWidth`: string - ancho mínimo para auto-fit/fill

### Modal System
Sistema completo de modales con animaciones y portal rendering.

```jsx
import { Modal, ModalBody, ModalFooter, ConfirmModal, AlertModal } from '../design-system/components';

// Modal básico
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Título del Modal"
  size="medium"
>
  <ModalBody>
    <p>Contenido del modal</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Guardar
    </Button>
  </ModalFooter>
</Modal>

// Modal de confirmación
<ConfirmModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  title="Eliminar elemento"
  message="¿Estás seguro de que deseas eliminar este elemento?"
  confirmText="Eliminar"
  cancelText="Cancelar"
  variant="danger"
/>

// Modal de alerta
<AlertModal
  isOpen={showAlert}
  onClose={() => setShowAlert(false)}
  title="Operación exitosa"
  message="El elemento se ha guardado correctamente."
  buttonText="Entendido"
/>
```

**Modal Props:**
- `isOpen`: boolean (requerido)
- `onClose`: function (requerido)
- `title`: string
- `size`: xs, small, medium, large, xl, full
- `centered`: boolean
- `closeOnOverlayClick`: boolean (default: true)
- `closeOnEscape`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

### Form Components
Sistema completo de formularios con validación y estados.

```jsx
import { 
  Form, 
  FormField, 
  FormGroup, 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio,
  Label 
} from '../design-system/components';

<Form onSubmit={handleSubmit}>
  {/* Campo completo con label y validación */}
  <FormField
    label="Nombre completo"
    error={errors.name}
    help="Ingresa tu nombre completo"
    required
  >
    <Input
      name="name"
      placeholder="Ej: Juan Pérez"
      value={formData.name}
      onChange={handleChange}
      state={errors.name ? 'error' : 'default'}
    />
  </FormField>

  {/* Input con icono */}
  <FormField label="Email" required>
    <Input
      type="email"
      name="email"
      icon="mail"
      placeholder="tu@email.com"
      value={formData.email}
      onChange={handleChange}
    />
  </FormField>

  {/* Textarea */}
  <FormField label="Mensaje">
    <Textarea
      name="message"
      placeholder="Escribe tu mensaje aquí..."
      value={formData.message}
      onChange={handleChange}
      rows={4}
    />
  </FormField>

  {/* Select */}
  <FormField label="País" required>
    <Select name="country" value={formData.country} onChange={handleChange}>
      <option value="">Selecciona un país</option>
      <option value="CO">Colombia</option>
      <option value="MX">México</option>
    </Select>
  </FormField>

  {/* Checkbox */}
  <FormField>
    <Checkbox
      name="terms"
      label="Acepto los términos y condiciones"
      checked={formData.terms}
      onChange={handleChange}
      required
    />
  </FormField>

  {/* Grupo de Radio buttons */}
  <FormGroup>
    <Label>Tipo de empresa</Label>
    <Radio
      name="companyType"
      value="startup"
      label="Startup"
      checked={formData.companyType === 'startup'}
      onChange={handleChange}
    />
    <Radio
      name="companyType"
      value="pyme"
      label="PYME"
      checked={formData.companyType === 'pyme'}
      onChange={handleChange}
    />
  </FormGroup>

  <Button type="submit" variant="primary" size="large" fullWidth>
    Enviar Formulario
  </Button>
</Form>
```

**Form Component Props:**

**Input:**
- `type`: text, email, password, number, etc.
- `size`: small, medium, large
- `state`: default, error, success
- `icon`: nombre del icono
- `iconPosition`: left, right
- `disabled`: boolean
- `fullWidth`: boolean

**FormField:**
- `label`: string
- `error`: string - mensaje de error
- `help`: string - texto de ayuda
- `required`: boolean
- `horizontal`: boolean - layout horizontal
- `labelWidth`: string - ancho del label en layout horizontal

## 🎨 Patrones de Diseño

### Página Completa
```jsx
import { 
  Header, 
  Footer, 
  Section, 
  SectionHeader, 
  Container,
  Grid,
  Button,
  Card 
} from '../design-system/components';

const MyPage = () => (
  <div>
    <Header />
    
    <main style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <Section variant="gradient" size="xl">
        <SectionHeader
          title="Título Principal"
          subtitle="Descripción atractiva que explica el valor"
          centered
        />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button size="cta" variant="primary">
            Comenzar Ahora
          </Button>
        </div>
      </Section>

      {/* Features Section */}
      <Section size="large">
        <SectionHeader
          title="Características"
          subtitle="Lo que ofrecemos"
          centered
        />
        <Grid columns={3} tablet={2} mobile={1} gap="large">
          <Card>Feature 1</Card>
          <Card>Feature 2</Card>
          <Card>Feature 3</Card>
        </Grid>
      </Section>
    </main>

    <Footer />
  </div>
);
```

### Formulario Completo
```jsx
const ContactForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  return (
    <Section>
      <Container maxWidth="600px">
        <SectionHeader
          title="Contacto"
          subtitle="Envíanos un mensaje"
          centered
        />
        
        <Form onSubmit={handleSubmit}>
          <Grid columns={2} mobile={1} gap="medium">
            <FormField label="Nombre" error={errors.name} required>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                state={errors.name ? 'error' : 'default'}
              />
            </FormField>
            
            <FormField label="Email" error={errors.email} required>
              <Input
                type="email"
                name="email"
                icon="mail"
                value={formData.email}
                onChange={handleChange}
                state={errors.email ? 'error' : 'default'}
              />
            </FormField>
          </Grid>

          <FormField label="Mensaje" error={errors.message} required>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              state={errors.message ? 'error' : 'default'}
            />
          </FormField>

          <Button type="submit" variant="primary" size="large" fullWidth>
            Enviar Mensaje
          </Button>
        </Form>
      </Container>
    </Section>
  );
};
```

## 🔧 Mejores Prácticas

### 1. Importación
```jsx
// ✅ Importar desde el índice principal
import { Button, Modal, Grid } from '../design-system/components';

// ❌ No importar componentes individuales
import Button from '../design-system/components/Button/Button';
```

### 2. Responsive Design
```jsx
// ✅ Usar props responsive del Grid
<Grid columns={4} tablet={2} mobile={1} gap="large">

// ✅ Usar breakpoints consistentes en Section
<Section size="large" // Automáticamente responsive
```

### 3. Espaciado Consistente
```jsx
// ✅ Usar tokens de spacing del theme
<Section size="large"> // Pre-definido
<Grid gap="medium"> // Token del theme

// ❌ No usar valores hardcoded
<div style={{ padding: '20px' }}>
```

### 4. Estados de Formulario
```jsx
// ✅ Manejar estados consistentemente
<Input
  state={errors.field ? 'error' : 'default'}
  value={value}
  onChange={handleChange}
/>

<FormField
  error={errors.field}
  help="Texto de ayuda"
>
```

### 5. Variables de Color
```jsx
// ✅ Usar variantes del theme
<Button variant="danger">
<Section variant="primary">

// ❌ No usar colores custom inline
<button style={{ backgroundColor: '#red' }}>
```

## 🚀 Migración por Fases

### Fase 1: Botones
1. Identificar todos los botones con clases CSS
2. Reemplazar con componente Button
3. Mapear clases a variantes apropiadas

### Fase 2: Layout
1. Reemplazar contenedores Bootstrap
2. Migrar sistema de grid
3. Usar componentes Section

### Fase 3: Formularios
1. Migrar inputs y campos
2. Implementar validación consistente
3. Usar FormField para estructura completa

### Fase 4: Modales
1. Reemplazar modales existentes
2. Migrar a nuevo sistema con portal
3. Usar ConfirmModal/AlertModal para casos comunes

## 📱 Testing

### Responsive Testing
- Probar en breakpoints: 768px (mobile), 1024px (tablet), 1200px+ (desktop)
- Verificar que Grid funcione correctamente
- Comprobar que Section se adapte

### Accessibility Testing
- Labels asociados correctamente
- Navegación por teclado funcional
- Contraste de colores adecuado
- ARIA labels en modales

---

💡 **Tip**: Migra gradualmente, página por página, para mantener la funcionalidad mientras actualizas el diseño.