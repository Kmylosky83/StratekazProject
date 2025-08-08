# ⚡ Quick Start - StratekazProject

**Tiempo estimado: 5 minutos**

Esta guía te llevará desde la instalación hasta ver StratekazProject funcionando en tu navegador.

## 🚀 Setup en 5 Minutos

### **Prerrequisitos Verificados**
- ✅ Python 3.11+ instalado
- ✅ Node.js 18+ instalado
- ✅ Git instalado

### **Comandos de Setup**

```bash
# 1. Clonar repositorio (30 segundos)
git clone [REPOSITORY_URL]
cd StratekazProject

# 2. Backend setup (2 minutos)
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate

# 3. Frontend setup (2 minutos)
cd frontend
npm install

# 4. Iniciar servidores (30 segundos)
# Terminal 1 - Backend
cd .. && python manage.py runserver

# Terminal 2 - Frontend  
cd frontend && npm start
```

**🎉 ¡Listo!** Aplicación disponible en:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🎯 Primera Experiencia (2 minutos)

### **1. Ver la Aplicación (30 segundos)**

Ve a http://localhost:3000

**Deberías ver:**
- ✅ Pantalla de bienvenida de StratekazProject
- ✅ Design system funcionando (botones, colores, tipografías)
- ✅ Navegación básica

### **2. Probar Autenticación (1 minuto)**

#### **Registrar usuario:**
1. Click en "Registrarse" 
2. Llenar formulario:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Tipo: `professional`
3. Click "Crear cuenta"

**✅ Éxito si:** Eres redirigido al dashboard

#### **Explorar Dashboard:**
- ✅ Ves módulos disponibles
- ✅ Navegación lateral funciona
- ✅ Perfil de usuario se muestra

### **3. Probar APIs (30 segundos)**

Abrir nueva pestaña y probar:

```bash
# API Overview
http://localhost:8000/api/auth/
# Debería mostrar: {"message": "Authentication API overview"}

# Dashboard API
http://localhost:8000/api/dashboard/
# Debería mostrar información de módulos
```

**✅ Éxito si:** Ambas URLs devuelven JSON válido

## 🧭 Tour Rápido de la Aplicación

### **Áreas Funcionales ✅**

1. **Sistema de Autenticación** - 100% funcional
   - Registro de usuarios
   - Login/logout
   - Tipos de usuario (professional, consultant, company)
   
2. **Design System** - Excelente implementación
   - Componentes consistentes
   - Theming (claro/oscuro)
   - Tokens de diseño bien definidos

3. **Dashboard Básico** - Navegación funcional
   - Vista general de módulos
   - Navegación lateral
   - Área de contenido

### **Áreas en Desarrollo 🚧**

1. **Módulos de Negocio** - 10-20% implementados
   - Herramientas (solo formación parcial)
   - Inteligencia de Negocios (por implementar)
   - Empresas (básico)

2. **Funcionalidades Avanzadas** - Por implementar
   - Ecosistema
   - Finanzas
   - Integraciones

## 🎨 Explorar el Design System (2 minutos)

**¡Imprescindible para frontend!**

### **Ver Documentación del Design System:**
1. Ve a `frontend/src/design-system/docs/README.md`
2. Abre el archivo en tu editor
3. Explora los ejemplos de componentes

### **Probar Componentes en Vivo:**
1. Ve a cualquier página de la app
2. Abre DevTools (F12)
3. Inspecciona elementos para ver:
   - Design tokens en CSS custom properties
   - Componentes styled-components
   - Arquitectura de temas

### **Ejemplo Rápido:**
```jsx
// Esto funciona en cualquier componente
import { Button, Card, Text } from '../design-system/components';

<Card variant="elevated" padding="lg">
  <Text variant="h2" color="primary">
    ¡Funciona perfectamente!
  </Text>
  <Button variant="primary" size="lg">
    Botón Primario
  </Button>
</Card>
```

## 🛠️ Próximos Pasos Recomendados

### **Si eres Frontend Developer:**
1. **[Documentación Design System](../../frontend/src/design-system/docs/README.md)** - ¡Esencial!
2. **[Frontend README](../../frontend/README.md)** - Estructura y convenciones
3. **[Architecture Overview](../architecture/frontend.md)** - Arquitectura React

### **Si eres Backend Developer:**  
1. **[API Documentation](../api/README.md)** - APIs disponibles y funcionales
2. **[Modules Status](../modules/status.md)** - Qué está implementado
3. **[Architecture Overview](../architecture/backend.md)** - Arquitectura Django

### **Si eres Full-Stack:**
1. **[Project Architecture](../architecture/overview.md)** - Vista general completa
2. **[Development Workflow](../development/contributing.md)** - Flujo de trabajo
3. **[APIs + Frontend Integration](../api/README.md)** - Integración completa

### **Si eres Project Manager:**
1. **[Modules Status](../modules/status.md)** - Estado real vs. documentado
2. **[Project Roadmap](../architecture/migration.md)** - Fases de desarrollo
3. **[Current Capabilities](../api/README.md)** - Funcionalidades disponibles

## ⚡ Comandos de Desarrollo Diario

### **Iniciar Ambiente de Desarrollo:**
```bash
# Terminal 1 - Backend
.venv\Scripts\activate
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm start
```

### **Verificar Estado del Proyecto:**
```bash
# Backend health check
python manage.py check

# Frontend health check  
cd frontend && npm run build
```

### **Reset completo (si algo se rompe):**
```bash
# Backend reset
python manage.py migrate --run-syncdb

# Frontend reset
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🚨 Problemas Comunes (30 segundos de fix)

### **"Port already in use"**
```bash
# Cambiar puerto de frontend
npm start -- --port 3001

# O matar procesos
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

### **"Module not found" en Django**
```bash
# Verificar entorno virtual activo
.venv\Scripts\activate
pip install -r requirements.txt
```

### **Frontend no carga correctamente**
```bash
cd frontend
npm cache clean --force
npm install
```

## 🎯 Lo Que Puedes Hacer AHORA

### **✅ Funcional al 100%:**
- Crear cuentas de usuario
- Login/logout
- Navegar dashboard
- Usar componentes del Design System
- Llamar APIs de auth y tenants

### **🚧 Parcialmente Funcional:**
- Explorar módulo de herramientas (básico)
- Ver estructura de otros módulos
- Probar funcionalidades de tenant básicas

### **❌ No Funcional (aún):**
- Funcionalidades avanzadas de módulos
- Integraciones externas
- Reportes y analytics
- Flujos de trabajo complejos

## 🤝 ¿Necesitas Ayuda?

**Setup Issues:**
- Revisa [Installation Guide](installation.md) completa
- Verifica prerrequisitos de sistema
- Consulta troubleshooting section

**Understanding the Project:**
- Revisa [Project Status](../modules/status.md) - Estado real vs. aspiracional
- Ve [Architecture Overview](../architecture/overview.md) - Diseño completo
- Consulta [API Documentation](../api/README.md) - Lo que SÍ funciona

---

🎉 **¡Felicitaciones!** Tienes StratekazProject funcionando. Ahora explora la aplicación y la documentación para entender sus capacidades actuales.

*Actualizado: 7 de Agosto 2025*