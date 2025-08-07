# api/v1/urls.py
"""
API v1 URL Configuration
Centraliza todas las rutas de la API versión 1
"""
from django.urls import path, include

app_name = 'v1'

urlpatterns = [
    # Authentication endpoints (new domain architecture)
    path('auth/', include('domains.authentication.api.urls', namespace='auth')),
    
    # Legacy authentication endpoints (for backward compatibility)
    path('legacy-auth/', include('auth_module.urls'), name='legacy-auth'),
    
    # Dashboard endpoints  
    path('dashboard/', include('dashboard_module.urls'), name='dashboard'),
    
    # Business modules endpoints
    path('companies/', include('empresas_module.urls'), name='companies'),
    path('tools/', include('herramientas_module.urls'), name='tools'),
    path('business-intelligence/', include('inteligencia_negocios_module.urls'), name='business-intelligence'),
    
    # Additional modules
    path('ecosystem/', include('ecosistema_module.urls'), name='ecosystem'),
    path('finance/', include('finanzas_module.urls'), name='finance'),
]

# Conditional tenant routes
from django.conf import settings
if 'tenants' in settings.INSTALLED_APPS:
    urlpatterns.append(
        path('tenants/', include('tenants.urls'), name='tenants')
    )