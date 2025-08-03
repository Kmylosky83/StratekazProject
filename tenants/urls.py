"""
URLs para la API de Tenants
"""

from django.urls import path, include
from . import views

app_name = 'tenants'

urlpatterns = [
    # Gestión de tenants (solo admin)
    path('', views.TenantListCreateView.as_view(), name='tenant-list'),
    path('<slug:slug>/', views.TenantDetailView.as_view(), name='tenant-detail'),
    
    # Tenant actual del usuario
    path('current/', views.CurrentTenantView.as_view(), name='current-tenant'),
    
    # Tenants del usuario
    path('user/tenants/', views.user_tenants, name='user-tenants'),
    
    # Miembros del tenant
    path('<slug:tenant_slug>/members/', views.TenantMembersView.as_view(), name='tenant-members'),
    path('<slug:tenant_slug>/members/<int:pk>/', views.TenantMemberDetailView.as_view(), name='tenant-member-detail'),
    
    # Invitaciones
    path('<slug:tenant_slug>/invitations/', views.TenantInvitationListView.as_view(), name='tenant-invitations'),
    path('invitations/<str:token>/accept/', views.accept_invitation, name='accept-invitation'),
    path('invitations/<str:token>/decline/', views.decline_invitation, name='decline-invitation'),
    
    # Configuración del tenant
    path('<slug:slug>/settings/', views.TenantSettingsView.as_view(), name='tenant-settings'),
    
    # Estadísticas del tenant
    path('<slug:slug>/stats/', views.tenant_usage_stats, name='tenant-stats'),
]