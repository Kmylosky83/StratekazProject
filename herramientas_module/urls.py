# auth_module/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Temporalmente vacío hasta que definamos las vistas
    path('', views.api_overview, name='auth-overview'),
]