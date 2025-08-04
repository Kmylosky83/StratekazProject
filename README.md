"# StratekazProject

**Plataforma SaaS Multi-Tenant para Gestión Empresarial Integral**

Una solución completa que combina inteligencia de negocios, herramientas especializadas y gestión empresarial en una arquitectura escalable y moderna.

---

## 🚀 Características Principales

- **🏢 Multi-Tenancy**: Arquitectura escalable para múltiples organizaciones
- **📊 Inteligencia de Negocios**: Módulos ISO, SST y PESV
- **🛠️ Herramientas Especializadas**: 10+ módulos de gestión empresarial
- **💰 Gestión Financiera**: Control completo de finanzas empresariales
- **🌐 Ecosistema Digital**: Actividades, eventos y networking
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

- [ ] Implementación completa de módulos de herramientas
- [ ] API GraphQL
- [ ] Aplicación móvil (React Native)
- [ ] Integración con servicios externos
- [ ] Dashboard de analytics avanzado
- [ ] Notificaciones en tiempo real

---

*Última actualización: Agosto 2025*" 
