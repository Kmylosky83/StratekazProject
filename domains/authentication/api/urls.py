# domains/authentication/api/urls.py
from django.urls import path
from . import views

app_name = 'auth'

urlpatterns = [
    path('', views.api_overview, name='overview'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('profile/', views.get_user_profile, name='profile'),
    path('profile/update/', views.update_profile, name='update-profile'),
    path('profile/complete/', views.complete_profile, name='complete-profile'),
    path('password-reset/request/', views.request_password_reset, name='request-password-reset'),
    path('debug/', views.debug_auth, name='debug-auth'),
    path('super-admin/dashboard/', views.super_admin_dashboard, name='super-admin-dashboard'),
]