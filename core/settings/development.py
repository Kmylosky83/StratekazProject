"""
Configuración de desarrollo para StrateKaz
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Para desarrollo local
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.localhost', '*.localhost']

# Base de datos local (SQLite para desarrollo rápido)
if env('DB_ENGINE', default='').endswith('sqlite3'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
    
    # Desactivar django-tenants para SQLite
    INSTALLED_APPS = [app for app in INSTALLED_APPS if app != 'django_tenants' and app != 'tenants']
    MIDDLEWARE = [mw for mw in MIDDLEWARE if 'django_tenants' not in mw and 'SecurityMiddleware' not in mw]
    DATABASE_ROUTERS = ()
    
    # Usar todas las apps normalmente sin separación tenant/shared (excepto tenants)
    DEVELOPMENT_APPS = SHARED_APPS + [app for app in TENANT_APPS if app not in SHARED_APPS and app != 'tenants']
    INSTALLED_APPS = [app for app in DEVELOPMENT_APPS if app != 'django_tenants']

# Email backend para desarrollo (muestra emails en consola)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Django Debug Toolbar - Comentado temporalmente para pruebas de API
# INSTALLED_APPS += ['debug_toolbar']
# MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')
# INTERNAL_IPS = ['127.0.0.1', 'localhost']

# CORS más permisivo para desarrollo
CORS_ALLOW_ALL_ORIGINS = True

# Desactivar caché en desarrollo
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Logging más detallado
LOGGING['root']['level'] = 'DEBUG'
LOGGING['loggers']['django']['level'] = 'DEBUG'

# Static files
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/build/static'),
    os.path.join(BASE_DIR, 'frontend/public'),
]

# Media files
MEDIA_ROOT = os.path.join(BASE_DIR, 'media_dev')

# Desactivar seguridad HTTPS
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

print("=" * 50)
print("RUNNING IN DEVELOPMENT MODE")
print("=" * 50)