from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Permission, Role

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'user_type', 'profile_completed', 'is_active')
    list_filter = ('user_type', 'profile_completed', 'is_active')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'company_name', 'nit')
    
    # Agrupar campos según el flujo de registro/completar perfil
    fieldsets = (
        ('Información de acceso', {
            'fields': ('username', 'email', 'password')
        }),
        ('Estado del perfil', {
            'fields': ('user_type', 'profile_completed', 'is_active')
        }),
        ('Información de contacto', {
            'fields': ('phone', 'city', 'department')
        }),
        ('Información personal (Profesionales)', {
            'fields': ('first_name', 'last_name', 'profession'),
            'classes': ('collapse',),
            'description': 'Campos específicos para usuarios de tipo Profesional Independiente'
        }),
        ('Información empresarial', {
            'fields': ('company_name', 'nit', 'industry', 'contact_position', 'company_type'),
            'classes': ('collapse',),
            'description': 'Campos específicos para usuarios de tipo Empresa'
        }),
        ('Permisos del sistema', {
            'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',),
            'description': 'Configuración de permisos avanzados'
        }),
    )
    
    # Campos para la creación de nuevos usuarios
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'user_type', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')
        }),
    )
    
    # Acciones personalizadas
    actions = ['mark_profile_complete', 'mark_profile_incomplete']
    
    def mark_profile_complete(self, request, queryset):
        queryset.update(profile_completed=True)
    mark_profile_complete.short_description = "Marcar perfiles como completos"
    
    def mark_profile_incomplete(self, request, queryset):
        queryset.update(profile_completed=False)
    mark_profile_incomplete.short_description = "Marcar perfiles como incompletos"

class PermissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')

class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    filter_horizontal = ('permissions',)

# Registrar los modelos en el admin
admin.site.register(User, CustomUserAdmin)
admin.site.register(Permission, PermissionAdmin)
admin.site.register(Role, RoleAdmin)