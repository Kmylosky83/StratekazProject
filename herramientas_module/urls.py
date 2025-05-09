# herramientas_module/urls.py
from django.urls import path, include

app_name = 'herramientas'

urlpatterns = [
    path('formacion/', include('herramientas_module.formacion.urls')),
    path('documentacion/', include('herramientas_module.documentacion.urls')),
    path('diagnostico/', include('herramientas_module.diagnostico.urls')),
    path('inspecciones/', include('herramientas_module.inspecciones.urls')),
    path('comunicacion/', include('herramientas_module.comunicacion.urls')),
    path('analisis/', include('herramientas_module.analisis.urls')),
    path('matrices/', include('herramientas_module.matrices.urls')),
    path('planificacion/', include('herramientas_module.planificacion.urls')),
]