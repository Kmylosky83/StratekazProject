from django.urls import path
from . import views

urlpatterns = [
    # Por ahora, solo una ruta básica
    path('', views.api_overview, name='sistemas-overview'),
]