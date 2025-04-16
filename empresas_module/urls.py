# auth_module/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.empresas_overview, name='empresas-overview'),
    path('lista/', views.listar_empresas, name='listar-empresas'),
    path('crear/', views.crear_empresa, name='crear-empresa'),
    path('<int:empresa_id>/roles/asignar/', views.asignar_rol, name='asignar-rol'),
]