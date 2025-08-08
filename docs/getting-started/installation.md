# 🚀 Guía de Instalación - StratekazProject

Esta guía te llevará desde cero hasta tener StratekazProject funcionando completamente en tu entorno local.

## 📋 Prerrequisitos

### **Requerimientos del Sistema**
- **Python 3.11+** (recomendado 3.11)
- **Node.js 18+** (recomendado LTS)
- **npm 9+** o **yarn 1.22+**
- **Git** para control de versiones

### **Opcional pero Recomendado**
- **PostgreSQL 13+** (para producción, desarrollo usa SQLite)
- **Redis** (para caching y sesiones en producción)
- **Docker** (para deployment)

## 🔧 Instalación Paso a Paso

### **1. Clonar el Repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd StratekazProject
```

### **2. Configurar Backend (Django)**

#### **2.1. Crear Entorno Virtual**
```bash
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate
# En Mac/Linux:
source .venv/bin/activate
```

#### **2.2. Instalar Dependencias**
```bash
# Instalar dependencias de Python
pip install -r requirements.txt

# Verificar instalación
python --version  # Debería mostrar 3.11+
```

#### **2.3. Configurar Base de Datos**
```bash
# Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser
```

#### **2.4. Verificar Backend**
```bash
# Verificar que no hay errores
python manage.py check

# Iniciar servidor de desarrollo
python manage.py runserver
```

**✅ Éxito si ves:** `Starting development server at http://127.0.0.1:8000/`

### **3. Configurar Frontend (React)**

#### **3.1. Instalar Dependencias**
```bash
# Navegar al directorio frontend
cd frontend/

# Instalar dependencias
npm install

# Verificar instalación
npm --version  # Debería mostrar 9+
node --version # Debería mostrar 18+
```

#### **3.2. Iniciar Frontend**
```bash
# Iniciar servidor de desarrollo
npm start
```

**✅ Éxito si ves:** Aplicación abierta en `http://localhost:3000`

### **4. Verificación Complete**

Con ambos servidores corriendo:
- **Backend**: http://localhost:8000 - API funcionando
- **Frontend**: http://localhost:3000 - Aplicación React
- **Admin Django**: http://localhost:8000/admin - Panel administrativo

## 🎯 Quick Start (5 minutos)

Para desarrolladores experimentados que quieren setup rápido:

```bash
# 1. Clonar y navegar
git clone [REPO_URL] && cd StratekazProject

# 2. Backend
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

# 3. Frontend (nueva terminal)
cd frontend && npm install && npm start

# ✅ Listo en ~5 minutos
```

## 🔧 Configuración Avanzada

### **Variables de Entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
# Desarrollo
DEBUG=True
SECRET_KEY=tu-secret-key-aqui
DATABASE_URL=sqlite:///db.sqlite3

# Base de datos (opcional para desarrollo)
# DATABASE_URL=postgresql://user:password@localhost:5432/strategaz_db

# APIs externas (cuando estén disponibles)
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
```

### **Base de Datos PostgreSQL (Opcional)**

Para desarrollo con PostgreSQL:

```bash
# 1. Instalar PostgreSQL
# En Windows: Descargar desde postgresql.org
# En Mac: brew install postgresql
# En Ubuntu: apt-get install postgresql

# 2. Crear base de datos
createdb strategaz_db

# 3. Actualizar .env
DATABASE_URL=postgresql://username:password@localhost:5432/strategaz_db

# 4. Re-ejecutar migraciones
python manage.py migrate
```

## 🧪 Verificar Instalación

### **Backend Tests**
```bash
# Verificar sistema
python manage.py check

# Verificar que APIs principales funcionan
curl http://localhost:8000/api/auth/
# Debería devolver: {"message": "Authentication API overview"}

curl http://localhost:8000/api/dashboard/
# Debería devolver información del dashboard
```

### **Frontend Tests**
```bash
cd frontend/

# Verificar build
npm run build
# Debería generar carpeta build/ sin errores

# Verificar linting (si está configurado)
npm run lint
```

## 🚨 Troubleshooting

### **Problemas Comunes**

#### **Error: Python no encontrado**
```bash
# Verificar instalación de Python
python --version
python3 --version

# Si no funciona, reinstalar Python desde python.org
```

#### **Error: pip install fails**
```bash
# Actualizar pip
python -m pip install --upgrade pip

# Reinstalar dependencias
pip install -r requirements.txt --force-reinstall
```

#### **Error: No module named 'django'**
```bash
# Verificar que el entorno virtual está activo
which python  # Debería mostrar ruta del .venv

# Si no está activo:
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux
```

#### **Error: npm install fails**
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### **Error: Port 3000 already in use**
```bash
# Usar puerto diferente
npm start -- --port 3001

# O matar proceso existente
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -ti:3000 | xargs kill
```

#### **Error: CORS issues**
```bash
# Verificar que CORS está configurado en Django
# Debería estar en settings.py:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### **Logs de Debug**

#### **Backend Logs**
```bash
# Ver logs detallados de Django
python manage.py runserver --settings=core.settings --verbosity=2
```

#### **Frontend Logs**
```bash
# Ver logs detallados de React
GENERATE_SOURCEMAP=true npm start
```

## 🔄 Actualización del Proyecto

Cuando haya nuevos cambios en el repositorio:

```bash
# 1. Obtener cambios
git pull origin main

# 2. Actualizar backend
pip install -r requirements.txt
python manage.py migrate

# 3. Actualizar frontend
cd frontend/
npm install

# 4. Reiniciar servidores
```

## 📚 Siguientes Pasos

Una vez que tienes todo funcionando:

1. **[Quick Start Guide](quick-start.md)** - Tour de 5 minutos por la aplicación
2. **[Primeros Pasos](first-steps.md)** - Cómo navegar y usar la aplicación
3. **[Design System](../../frontend/src/design-system/docs/README.md)** - Si vas a trabajar en frontend
4. **[APIs Documentation](../api/README.md)** - Si vas a trabajar en backend
5. **[Arquitectura](../architecture/overview.md)** - Para entender la estructura completa

## 🤝 Obtener Ayuda

Si tienes problemas con la instalación:

1. **Revisa esta guía** completa
2. **Verifica prerrequisitos** - especialmente versiones de Python/Node
3. **Consulta troubleshooting** arriba
4. **Crea un issue** describiendo tu problema específico

---

💡 **Consejo**: Guarda esta guía como referencia. Es útil para reinstalaciones y onboarding de nuevos desarrolladores.

*Actualizado: 7 de Agosto 2025*