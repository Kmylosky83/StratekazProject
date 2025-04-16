# auth_module/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='auth-overview'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
]

# auth_module/urls.py
# Añade estas rutas
path('profile/update/', views.update_profile, name='update-profile'),
path('password-reset/request/', views.request_password_reset, name='request-password-reset'),

# Añadir estas rutas:
path('profile/status/', views.check_profile_status, name='profile-status'),
path('profile/complete/', views.complete_profile, name='complete-profile'),