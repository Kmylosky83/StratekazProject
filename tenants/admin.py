"""
Configuración del administrador Django para Tenants
"""

from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Tenant, Domain, TenantUser, TenantInvitation


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'slug', 'plan', 'is_active', 'is_suspended',
        'members_count', 'domains_count', 'created_at'
    ]
    list_filter = [
        'plan', 'is_active', 'is_suspended', 'created_at',
        'subscription_ends_at', 'trial_ends_at'
    ]
    search_fields = ['name', 'slug', 'email', 'tax_id']
    readonly_fields = [
        'schema_name', 'created_at', 'updated_at',
        'members_count', 'domains_count', 'usage_stats_display'
    ]
    
    fieldsets = [
        ('Información Básica', {
            'fields': [
                'name', 'slug', 'schema_name', 'email', 'phone',
                'created_by', 'created_at', 'updated_at'
            ]
        }),
        ('Dirección', {
            'fields': [
                'address', 'city', 'state', 'country', 'postal_code'
            ],
            'classes': ['collapse']
        }),
        ('Información Fiscal', {
            'fields': ['tax_id']
        }),
        ('Plan y Límites', {
            'fields': [
                'plan', 'max_users', 'max_storage_gb', 'max_projects'
            ]
        }),
        ('Suscripción', {
            'fields': [
                'trial_ends_at', 'subscription_ends_at'
            ]
        }),
        ('Estado', {
            'fields': [
                'is_active', 'is_suspended', 'suspension_reason'
            ]
        }),
        ('Personalización', {
            'fields': [
                'theme', 'logo', 'primary_color', 'secondary_color'
            ],
            'classes': ['collapse']
        }),
        ('Configuración Avanzada', {
            'fields': ['settings', 'features'],
            'classes': ['collapse']
        }),
        ('Estadísticas', {
            'fields': ['members_count', 'domains_count', 'usage_stats_display'],
            'classes': ['collapse']
        })
    ]
    
    def members_count(self, obj):
        count = obj.members.filter(is_active=True).count()
        url = reverse('admin:tenants_tenantuser_changelist')
        return format_html(
            '<a href="{}?tenant__id__exact={}">{}</a>',
            url, obj.id, count
        )
    members_count.short_description = 'Miembros'
    
    def domains_count(self, obj):
        count = obj.domains.count()
        url = reverse('admin:tenants_domain_changelist')
        return format_html(
            '<a href="{}?tenant__id__exact={}">{}</a>',
            url, obj.id, count
        )
    domains_count.short_description = 'Dominios'
    
    def usage_stats_display(self, obj):
        stats = obj.get_usage_stats()
        return format_html(
            '''
            <strong>Usuarios:</strong> {}/{}<br>
            <strong>Almacenamiento:</strong> {} GB/{} GB<br>
            <strong>Proyectos:</strong> {}/{}
            ''',
            stats['users_count'], stats['users_limit'],
            stats['storage_used_gb'], stats['storage_limit_gb'],
            stats['projects_count'], stats['projects_limit']
        )
    usage_stats_display.short_description = 'Estadísticas de Uso'


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = [
        'domain', 'tenant', 'domain_type', 'is_primary',
        'ssl_enabled', 'created_at'
    ]
    list_filter = ['domain_type', 'is_primary', 'ssl_enabled', 'created_at']
    search_fields = ['domain', 'tenant__name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = [
        ('Información del Dominio', {
            'fields': [
                'domain', 'tenant', 'domain_type', 'is_primary'
            ]
        }),
        ('Configuración SSL', {
            'fields': ['ssl_enabled', 'ssl_certificate'],
            'classes': ['collapse']
        }),
        ('Metadatos', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse']
        })
    ]


@admin.register(TenantUser)
class TenantUserAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'tenant', 'role', 'is_active', 'joined_at'
    ]
    list_filter = ['role', 'is_active', 'joined_at']
    search_fields = [
        'user__email', 'user__first_name', 'user__last_name',
        'tenant__name'
    ]
    readonly_fields = ['joined_at']
    
    fieldsets = [
        ('Información Básica', {
            'fields': ['user', 'tenant', 'role', 'is_active']
        }),
        ('Permisos Adicionales', {
            'fields': ['permissions'],
            'classes': ['collapse']
        }),
        ('Metadatos', {
            'fields': ['joined_at', 'invited_by'],
            'classes': ['collapse']
        })
    ]


@admin.register(TenantInvitation)
class TenantInvitationAdmin(admin.ModelAdmin):
    list_display = [
        'email', 'tenant', 'role', 'status',
        'created_at', 'expires_at', 'invited_by'
    ]
    list_filter = ['role', 'status', 'created_at', 'expires_at']
    search_fields = ['email', 'tenant__name', 'invited_by__email']
    readonly_fields = [
        'token', 'created_at', 'expires_at', 'accepted_at'
    ]
    
    fieldsets = [
        ('Información de la Invitación', {
            'fields': [
                'tenant', 'email', 'role', 'status'
            ]
        }),
        ('Token y Seguridad', {
            'fields': ['token', 'expires_at'],
            'classes': ['collapse']
        }),
        ('Metadatos', {
            'fields': [
                'created_at', 'invited_by', 'accepted_at'
            ],
            'classes': ['collapse']
        })
    ]
    
    def has_change_permission(self, request, obj=None):
        # Solo permitir cambiar el estado
        return True
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editando
            return self.readonly_fields + ['tenant', 'email', 'role']
        return self.readonly_fields


# Personalización del sitio de administración
admin.site.site_header = "StrateKaz SaaS - Administración"
admin.site.site_title = "StrateKaz Admin"
admin.site.index_title = "Panel de Administración"