from django.urls import path
from . import views

app_name = 'formacion'

urlpatterns = [
    # Aquí vendrán tus patrones de URL
    path('', views.index, name='index'),
]