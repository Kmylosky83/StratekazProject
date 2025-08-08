"# StratekazProject

**Plataforma SaaS Multi-Tenant para Gestión Empresarial Integral**

Una solución completa que combina inteligencia de negocios, herramientas especializadas y gestión empresarial en una arquitectura escalable y moderna.

---

## 🚀 Características Principales

- **🏢 Multi-Tenancy**: Arquitectura escalable para múltiples organizaciones
- **🆓 Recursos Libres**: Sistema completo funcional con herramienta ISO 9001:2015 operativa
- **🔄 Navegación SPA**: Flujo end-to-end sin recargas, URLs amigables
- **📊 Inteligencia de Negocios**: Módulos ISO, SST y PESV (en desarrollo)
- **🛠️ Herramientas Especializadas**: Template establecido para 15+ herramientas
- **💰 Gestión Financiera**: Control completo de finanzas empresariales (planificado)
- **🌐 Ecosistema Digital**: Actividades, eventos y networking (planificado)
- **🎨 Design System**: Interfaz consistente y personalizable

---

## 🏗️ Arquitectura

```
StratekazProject/
├── backend/           # Django REST API + Multi-tenant
│   ├── core/         # Configuración central
│   ├── auth_module/  # Autenticación JWT + Session
│   ├── tenants/      # Sistema multi-tenant
│   ├── herramientas_module/     # 10 submódulos de herramientas
│   ├── inteligencia_negocios/   # ISO, SST, PESV
│   ├── empresas_module/         # Gestión empresarial
│   ├── ecosistema_module/       # Networking y eventos
│   └── finanzas_module/         # Gestión financiera
├── frontend/          # React 19 + Design System
│   ├── src/design-system/      # Tokens, componentes, temas
│   ├── src/components/         # Componentes específicos
│   ├── src/pages/             # Páginas de la aplicación
│   └── src/services/          # Servicios de API
└── docs/             # Documentación técnica
```

### Stack Tecnológico

**Backend:**
- Django 4.2.7 + Django REST Framework
- PostgreSQL + Redis (cache/sessions)
- JWT + Session Authentication
- Celery (tareas asíncronas)
- AWS S3 (archivos estáticos)

**Frontend:**
- React 19 + styled-components
- Design System con tokens consistentes
- Lucide Icons + Storybook
- Responsive & Tematizable

---

## ⚡ Instalación Rápida

### Pre-requisitos
- Python 3.11+
- Node.js 18+
- Redis (opcional para desarrollo)
- PostgreSQL (opcional, usa SQLite por defecto)

### 1. Clonar y configurar backend

```bash
git clone <repository-url>
cd StratekazProject

# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
pip install django-tenants djangorestframework-simplejwt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
```

### 2. Configurar frontend

```bash
cd frontend/

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

### 3. Ejecutar aplicación

**Backend (Terminal 1):**
```bash
python manage.py runserver
# Disponible en: http://localhost:8000
```

**Frontend (Terminal 2):**
```bash
cd frontend/
npm start
# Disponible en: http://localhost:3000
```

---

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Desarrollo
SECRET_KEY=tu-secret-key-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos (SQLite por defecto)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# Cache con Redis (opcional)
REDIS_URL=redis://localhost:6379/0

# CORS para frontend
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Configuración de Producción

Para producción, actualiza estas variables:
```env
DEBUG=False
SECRET_KEY=<secret-key-fuerte>
DB_ENGINE=django.db.backends.postgresql
DB_NAME=stratekaz_production
USE_S3=True
```

---

## 📚 Módulos del Sistema

### 🆓 Recursos Libres (Herramientas Gratuitas)
**✅ Sistema Completamente Funcional:**
- **Flujo end-to-end operativo:** Landing → Acceso Gratuito → Sidebar → Herramienta
- **Navegación SPA sin recargas** con URLs amigables
- **Integración completa** con servicios de datos y exportación

**✅ ISO 9001:2015 - Diagnóstico Completo - 100% Funcional:**
- Acceso directo: `/herramientas/iso/diagnostico-9001`
- 21 preguntas en 7 secciones ISO con ponderación automática
- Dashboard ejecutivo con gráficos interactivos (Radar, Barras, Circular)
- Generación automática de plan de acción con priorización
- Reportes profesionales y exportación a PDF/Excel
- Auto-guardado en localStorage con integración a servicios

**🚧 Template Establecido para 15+ Herramientas Adicionales:**
- ISO 14001, ISO 45001, Resolución 0312, Decreto 1072
- Herramientas PESV, Innovación y más
- Patrón replicable: `/pages/herramientas/{pilar}/{herramienta}.js`

### 🛠️ Herramientas (10 submódulos)
1. **Documentación** - Gestión documental
2. **Formación** - Capacitaciones y entrenamientos
3. **Planeación** - Planificación estratégica
4. **Evaluaciones** - Sistemas de evaluación
5. **Matrices** - Matrices de gestión
6. **Intervenciones** - Acciones correctivas
7. **Análisis** - Análisis de datos
8. **Recursos** - Gestión de recursos
9. **Comunicación** - Comunicación interna
10. **Diagnóstico** - Herramientas de diagnóstico

### 📊 Inteligencia de Negocios
- **ISO** - Gestión de normas ISO
- **SST** - Seguridad y Salud en el Trabajo
- **PESV** - Plan Estratégico de Seguridad Vial

### 🏢 Gestión Empresarial
- **Empresas** - Registro y gestión de empresas
- **Finanzas** - Control financiero integral
- **Ecosistema** - Networking y colaboración

---

## 🧪 Testing

### Backend
```bash
# Ejecutar tests
python manage.py test

# Con coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend
```bash
cd frontend/
npm test
npm run test:coverage
```

---

## 🚀 Deployment

### Preparar para producción

```bash
# Backend
python manage.py collectstatic
python manage.py migrate
```

```bash
# Frontend
cd frontend/
npm run build
```

### Usar Docker (próximamente)
```bash
docker-compose up -d
```

---

## 🆓 Recursos Libres - Sistema Funcional

### ✅ Sistema de Navegación Completamente Operativo
**Flujo end-to-end sin recargas de página:**
```
HomePage → AccesoGratuitoPage → RecursosSection → PillarSidebar → ToolContainer → Herramienta
```

**Corrección crítica implementada:**
- **Problema resuelto:** RecursosSection intentaba archivos HTML estáticos
- **Solución:** Navegación SPA con `navigate('/herramientas/iso/diagnostico-9001')`
- **Resultado:** Flujo profesional sin interrupciones

### ✅ ISO 9001:2015 - Diagnóstico Completo (100% Funcional)
**Primera herramienta completamente operativa del proyecto**

**Características principales:**
- Diagnóstico interactivo de las 7 secciones ISO 9001:2015
- Sistema de evaluación por escala (0-5) con preguntas ponderadas
- Dashboard ejecutivo con puntuación global y nivel de madurez
- Gráficos interactivos profesionales (Radar, Barras, Circular, Líneas)
- Generación automática de plan de acción con priorización inteligente
- Sistema de reportes e informes profesionales
- Gestión integrada de datos empresariales
- Exportación a PDF y Excel sin restricciones
- Auto-guardado con LocalStorageManager integrado

**Acceso y estructura:**
```
URL: /herramientas/iso/diagnostico-9001
Archivo: /frontend/src/pages/herramientas/iso/diagnostico-9001.js
Integración: ToolContainer + Design System + Servicios
```

### 🛠️ Template Establecido para Futuras Herramientas
**Patrón exitoso replicable:**
```javascript
// Estructura: /pages/herramientas/{pilar}/{herramienta}.js
// Props: { initialData, onDataChange, pillar, toolId }
// Integración: ToolContainer + Design System + Servicios
```

## 🎨 Design System

El proyecto incluye un design system completo con:

- **Tokens**: Colores, tipografía, espaciado, sombras
- **Componentes**: Button, Card, Modal, Form, Grid
- **Temas**: Múltiples temas personalizables
- **Documentación**: Guías completas en `/frontend/src/design-system/docs/`

### Ejemplo de uso:
```jsx
import { Button, Card } from '../design-system/components';

<Card variant="elevated">
  <Button variant="primary" size="lg">
    Acción Principal
  </Button>
</Card>
```

---

## 📖 Documentación

- **Design System**: `/frontend/DESIGN_SYSTEM_BEST_PRACTICES.md`
- **Componentes**: `/frontend/src/design-system/COMPONENT_GUIDE.md`
- **Arquitectura**: `/docs/02_ARQUITECTURA_TECNICA/`
- **API Docs**: `/docs/09_INTEGRACIONES_SISTEMA/`

---

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Estándares de Código
- **Backend**: PEP 8, Django best practices
- **Frontend**: ESLint + Prettier, React best practices
- **Testing**: Cobertura mínima 80%

---

## 📞 Soporte

- **Documentación**: `/docs/`
- **Issues**: [GitHub Issues](link-to-issues)
- **Wiki**: [Proyecto Wiki](link-to-wiki)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎯 Roadmap

### ✅ Completado (Q3 2025)
- [x] **Sistema de Recursos Libres Funcional** - Flujo end-to-end operativo
- [x] **Herramienta ISO 9001:2015** - Diagnóstico completo 100% funcional
- [x] **Navegación SPA** - Sin recargas, URLs amigables, integración completa
- [x] **Template para herramientas** - Patrón establecido y replicable
- [x] Sistema de autenticación robusto
- [x] Design System profesional
- [x] Arquitectura multi-tenant

### 🚧 En Desarrollo (Q4 2025)
- [ ] **Replicar template exitoso** - ISO 14001, ISO 45001, Resolución 0312
- [ ] **Herramientas SGSST** - Decreto 1072, Matriz de Peligros, Investigación de Accidentes
- [ ] **Herramientas de Innovación** - Canvas, ROI, Matriz de Priorización
- [ ] **Integración con autenticación** - Conectar herramientas con sistema de usuarios
- [ ] **Dashboard unificado** - Vista global de todos los recursos libres

### 🔮 Futuro
- [ ] API GraphQL
- [ ] Aplicación móvil (React Native)
- [ ] Integración con servicios externos
- [ ] Dashboard de analytics avanzado
- [ ] Notificaciones en tiempo real

---

*Última actualización: 8 de Agosto 2025 - Sistema de Recursos Libres completamente funcional con herramienta ISO 9001:2015 operativa y navegación SPA sin recargas*" 
