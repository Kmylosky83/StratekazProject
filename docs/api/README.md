# Documentación de APIs - StratekazProject

*Última actualización: 7 de Agosto 2025*

## 🚀 Información General

**Base URL:** `http://localhost:8000/api/`
**Autenticación:** Django Session-based Authentication
**Formato de Respuesta:** JSON

---

## 🔐 Authentication API - FUNCIONAL ✅

**Base URL:** `/api/auth/`

### Endpoints Principales

#### **POST** `/api/auth/register/`
Registro de nuevos usuarios

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "user_type": "professional|consultant|company",
  "first_name": "string",
  "last_name": "string"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "user@example.com",
    "user_type": "professional",
    "is_profile_completed": false
  }
}
```

#### **POST** `/api/auth/login/`
Inicio de sesión de usuarios

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "user@example.com",
    "user_type": "professional",
    "is_profile_completed": true
  }
}
```

#### **GET** `/api/auth/profile/`
Obtener perfil del usuario autenticado

**Headers:**
```
Authorization: Session (Django session cookie)
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "user@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "user_type": "professional",
    "is_profile_completed": true,
    "profile_data": {
      "phone": "+57 300 123 4567",
      "company": "Mi Empresa"
    }
  }
}
```

#### **PUT** `/api/auth/profile/update/`
Actualizar perfil de usuario

**Request:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "company": "string"
}
```

#### **POST** `/api/auth/profile/complete/`
Completar perfil de usuario (primera vez)

#### **POST** `/api/auth/password-reset/`
Solicitar restablecimiento de contraseña

#### **GET** `/api/auth/debug/`
Endpoint de debugging (solo desarrollo)

#### **GET** `/api/auth/admin/`
Dashboard para super administradores

---

## 🏢 Tenants API - FUNCIONAL ✅

**Base URL:** `/api/tenants/`

### Endpoints Principales

#### **GET** `/api/tenants/`
Listar tenants del usuario

**Response Success (200):**
```json
{
  "count": 1,
  "results": [
    {
      "id": 1,
      "name": "Mi Empresa",
      "slug": "mi-empresa",
      "plan": "basic",
      "max_users": 5,
      "created_at": "2025-08-07T15:30:00Z",
      "is_owner": true
    }
  ]
}
```

#### **POST** `/api/tenants/`
Crear nuevo tenant

**Request:**
```json
{
  "name": "Nombre de la Empresa",
  "plan": "basic|premium|enterprise",
  "description": "Descripción opcional"
}
```

#### **GET** `/api/tenants/{slug}/`
Obtener detalles de un tenant específico

#### **PUT** `/api/tenants/{slug}/`
Actualizar información del tenant

#### **DELETE** `/api/tenants/{slug}/`
Eliminar tenant (solo owner)

#### **GET** `/api/tenants/current/`
Obtener tenant actual del usuario

#### **GET** `/api/tenants/{slug}/members/`
Listar miembros del tenant

#### **POST** `/api/tenants/{slug}/members/`
Invitar nuevo miembro al tenant

#### **GET** `/api/tenants/{slug}/invitations/`
Listar invitaciones pendientes

#### **POST** `/api/tenants/invitations/{token}/accept/`
Aceptar invitación a tenant

#### **POST** `/api/tenants/invitations/{token}/decline/`
Declinar invitación a tenant

#### **GET** `/api/tenants/{slug}/settings/`
Obtener configuraciones del tenant

#### **GET** `/api/tenants/{slug}/usage/`
Estadísticas de uso del tenant

---

## 📊 Dashboard API - BÁSICA 🚧

**Base URL:** `/api/dashboard/`

#### **GET** `/api/dashboard/`
Vista general del dashboard

**Response Success (200):**
```json
{
  "message": "Dashboard overview",
  "modules": [
    "herramientas",
    "inteligencia_negocios", 
    "empresas",
    "ecosistema",
    "finanzas"
  ]
}
```

#### **GET** `/api/dashboard/data/`
Datos principales del dashboard

*Nota: Implementación básica, funcionalidad limitada*

---

## 🛠️ Herramientas API - MUY LIMITADA ⚠️

**Base URL:** `/api/herramientas/`

#### **GET** `/api/herramientas/`
Vista general del módulo herramientas

**Response Success (200):**
```json
{
  "message": "Herramientas module overview",
  "submodules": [
    "formacion",
    "documentacion", 
    "analisis",
    "comunicacion",
    "diagnostico",
    "inspecciones",
    "matrices",
    "planificacion"
  ],
  "status": "Mayoría en desarrollo"
}
```

### Submódulo Formación - BÁSICO

#### **GET** `/api/herramientas/formacion/`
Vista del submódulo formación

*Nota: Solo 1 de 10 submódulos tiene implementación parcial*

---

## 🧠 Inteligencia de Negocios API - NO IMPLEMENTADA ❌

**Base URL:** `/api/inteligencia/`

#### **GET** `/api/inteligencia/`
Vista general (solo placeholder)

**Response Success (200):**
```json
{
  "message": "Inteligencia de Negocios module overview",
  "submodules": ["normas_iso", "sst", "pesv"],
  "status": "Por implementar"
}
```

*Nota: Los endpoints de normas ISO, SST y PESV no están implementados*

---

## 🏭 Empresas API - NO IMPLEMENTADA ❌

**Base URL:** `/api/empresas/`

#### **GET** `/api/empresas/`
Vista general de empresas

**Response Success (200):**
```json
{
  "message": "Empresas module overview"
}
```

#### **GET** `/api/empresas/list/`
Listar empresas (funcionalidad muy básica)

#### **POST** `/api/empresas/create/`
Crear empresa (implementación incompleta)

*Nota: Funcionalidad muy limitada, requiere desarrollo*

---

## 🌐 Ecosistema API - NO IMPLEMENTADA ❌

**Base URL:** `/api/ecosistema/`

*Sin endpoints implementados. Módulo completamente vacío.*

---

## 💰 Finanzas API - NO IMPLEMENTADA ❌

**Base URL:** `/api/finanzas/`

*Sin endpoints implementados. Módulo completamente vacío.*

---

## 📋 Códigos de Respuesta

### Success Responses
- **200 OK** - Solicitud exitosa
- **201 Created** - Recurso creado exitosamente
- **204 No Content** - Solicitud exitosa sin contenido de respuesta

### Error Responses
- **400 Bad Request** - Datos de entrada inválidos
- **401 Unauthorized** - Autenticación requerida
- **403 Forbidden** - Sin permisos para esta acción
- **404 Not Found** - Recurso no encontrado
- **500 Internal Server Error** - Error del servidor

### Formato de Errores
```json
{
  "success": false,
  "error": "Descripción del error",
  "details": {
    "field": ["Mensaje de error específico"]
  }
}
```

---

## 🔧 Autenticación y Permisos

### Tipos de Autenticación
1. **Session Authentication** - Para aplicaciones web (Django sessions)
2. **CSRF Protection** - Habilitado para operaciones que modifican datos

### Tipos de Usuarios
- **professional** - Usuario profesional individual
- **consultant** - Consultor independiente  
- **company** - Usuario empresarial

### Permisos por Módulo
- **Authentication**: Público para registro/login, autenticado para perfil
- **Tenants**: Autenticado + permisos específicos por tenant
- **Dashboard**: Autenticado
- **Herramientas**: Autenticado + tenant activo
- **Otros módulos**: Por implementar

---

## 🚧 Estado de Implementación

### APIs Completamente Funcionales ✅
- **Authentication API** - 100% funcional
- **Tenants API** - 95% funcional (multi-tenant completo)

### APIs Básicas 🚧  
- **Dashboard API** - 30% funcional (vista básica)
- **Herramientas API** - 10% funcional (solo 1 submódulo parcial)

### APIs No Implementadas ❌
- **Inteligencia de Negocios API** - 0% funcional
- **Empresas API** - 5% funcional (solo placeholders)
- **Ecosistema API** - 0% funcional
- **Finanzas API** - 0% funcional

---

## 🔮 Roadmap de APIs

### Próxima Semana
1. **Completar API de Herramientas/Formación** - Funcionalidad completa
2. **Implementar API básica de Empresas** - CRUD básico
3. **Documentar errores comunes** - Guía de troubleshooting

### Próximo Mes
1. **API de Inteligencia de Negocios** - Al menos 1 submódulo funcional
2. **API de Ecosistema** - Funcionalidad básica
3. **Testing automatizado** - Cobertura de APIs principales

### 3 Meses
1. **APIs completas para todos los módulos**
2. **Documentación interactiva (Swagger/OpenAPI)**
3. **Versionado de APIs** - /v1/, /v2/, etc.

---

## 💡 Notas para Desarrolladores

### Para usar las APIs existentes:
1. **Autenticarse primero** con `/api/auth/login/`
2. **Las cookies de sesión se manejan automáticamente** en el navegador
3. **Incluir CSRF token** para operaciones POST/PUT/DELETE
4. **Verificar que el tenant esté activo** antes de usar APIs de módulos

### Para desarrollo de nuevas APIs:
1. **Seguir el patrón de auth_module** como referencia
2. **Implementar serializers completos** en lugar de responses manuales
3. **Incluir permisos apropiados** por tenant/usuario
4. **Documentar en este archivo** cada nuevo endpoint

---

*Esta documentación refleja el estado real de las APIs al 7 de Agosto 2025. Se actualizará conforme se implementen nuevas funcionalidades.*