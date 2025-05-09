# pyright: reportMissingModuleSource=false
"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth_module.urls')),
    path('api/dashboard/', include('dashboard_module.urls')),
    path('api/empresas/', include('empresas_module.urls')),
    path('api/herramientas/', include('herramientas_module.urls')),
    path('api/inteligencia/', include('inteligencia_negocios_module.urls')),
    
    # Ruta explícita para la página principal
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    
    # Captura todas las demás rutas para que React Router las maneje
    re_path(r'^(?!admin|api).*$', TemplateView.as_view(template_name='index.html')),
]

# Añadir configuración para servir archivos estáticos en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)