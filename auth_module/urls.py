# auth_module/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='auth-overview'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.check_profile_status, name='profile'),  # Nuevo alias para profile
    path('profile/update/', views.update_profile, name='update-profile'),
    path('password-reset/request/', views.request_password_reset, name='request-password-reset'),
    path('profile/status/', views.check_profile_status, name='profile-status'),
    path('profile/complete/', views.complete_profile, name='complete-profile'),
    path('debug/', views.debug_auth, name='debug-auth'),
    path('super-admin/dashboard/', views.super_admin_dashboard, name='super-admin-dashboard'),
]