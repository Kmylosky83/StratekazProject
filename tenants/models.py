"""
Modelos para arquitectura multi-tenant de StrateKaz SaaS
"""

from django.db import models
from django.contrib.auth import get_user_model
from django_tenants.models import TenantMixin, DomainMixin
from django.utils import timezone
from django.core.validators import RegexValidator

User = get_user_model()

class Tenant(TenantMixin):
    """
    Modelo principal de Tenant para cada organización cliente
    """
    # Información básica
    name = models.CharField(max_length=255, verbose_name='Nombre de la empresa')
    slug = models.SlugField(max_length=100, unique=True, verbose_name='Identificador único')
    
    # Información de contacto
    email = models.EmailField(verbose_name='Email principal')
    phone = models.CharField(
        max_length=20, 
        blank=True,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$')],
        verbose_name='Teléfono'
    )
    
    # Dirección
    address = models.TextField(blank=True, verbose_name='Dirección')
    city = models.CharField(max_length=100, blank=True, verbose_name='Ciudad')
    state = models.CharField(max_length=100, blank=True, verbose_name='Departamento')
    country = models.CharField(max_length=100, default='Colombia', verbose_name='País')
    postal_code = models.CharField(max_length=20, blank=True, verbose_name='Código postal')
    
    # Información fiscal
    tax_id = models.CharField(
        max_length=50, 
        unique=True,
        verbose_name='NIT/RUT'
    )
    
    # Plan y suscripción
    PLAN_CHOICES = [
        ('free', 'Gratuito'),
        ('starter', 'Starter'),
        ('professional', 'Profesional'),
        ('enterprise', 'Empresarial'),
        ('custom', 'Personalizado'),
    ]
    
    plan = models.CharField(
        max_length=20, 
        choices=PLAN_CHOICES, 
        default='free',
        verbose_name='Plan'
    )
    
    # Límites del plan
    max_users = models.IntegerField(default=5, verbose_name='Máximo de usuarios')
    max_storage_gb = models.IntegerField(default=1, verbose_name='Almacenamiento máximo (GB)')
    max_projects = models.IntegerField(default=3, verbose_name='Máximo de proyectos')
    
    # Fechas importantes
    trial_ends_at = models.DateTimeField(null=True, blank=True, verbose_name='Fin del período de prueba')
    subscription_ends_at = models.DateTimeField(null=True, blank=True, verbose_name='Fin de la suscripción')
    
    # Estado
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    is_suspended = models.BooleanField(default=False, verbose_name='Suspendido')
    suspension_reason = models.TextField(blank=True, verbose_name='Razón de suspensión')
    
    # Configuración del tenant
    settings = models.JSONField(default=dict, blank=True, verbose_name='Configuración personalizada')
    
    # Tema y personalización
    theme = models.CharField(
        max_length=50, 
        default='default',
        verbose_name='Tema'
    )
    logo = models.ImageField(
        upload_to='tenants/logos/', 
        blank=True, 
        null=True,
        verbose_name='Logo'
    )
    primary_color = models.CharField(
        max_length=7, 
        default='#ec268f',
        validators=[RegexValidator(r'^#[0-9A-Fa-f]{6}$')],
        verbose_name='Color primario'
    )
    secondary_color = models.CharField(
        max_length=7, 
        default='#333333',
        validators=[RegexValidator(r'^#[0-9A-Fa-f]{6}$')],
        verbose_name='Color secundario'
    )
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última actualización')
    created_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='tenants_created',
        verbose_name='Creado por'
    )
    
    # Features habilitadas
    features = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Características habilitadas',
        help_text='Diccionario de features habilitadas para este tenant'
    )
    
    # Auto-creación del esquema es manejada por django-tenants
    auto_create_schema = True
    auto_drop_schema = True
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Tenant'
        verbose_name_plural = 'Tenants'
    
    def __str__(self):
        return f"{self.name} ({self.schema_name})"
    
    def save(self, *args, **kwargs):
        if not self.schema_name:
            # Generar schema_name basado en el slug
            self.schema_name = self.slug.lower().replace('-', '_')
        super().save(*args, **kwargs)
    
    @property
    def is_on_trial(self):
        """Verifica si el tenant está en período de prueba"""
        if self.trial_ends_at:
            return timezone.now() < self.trial_ends_at
        return False
    
    @property
    def is_subscription_active(self):
        """Verifica si la suscripción está activa"""
        if self.subscription_ends_at:
            return timezone.now() < self.subscription_ends_at
        return self.plan == 'free'
    
    @property
    def days_until_trial_ends(self):
        """Días restantes del período de prueba"""
        if self.trial_ends_at and self.is_on_trial:
            delta = self.trial_ends_at - timezone.now()
            return delta.days
        return 0
    
    def has_feature(self, feature_name):
        """Verifica si el tenant tiene una característica habilitada"""
        return self.features.get(feature_name, False)
    
    def get_usage_stats(self):
        """Obtiene estadísticas de uso del tenant"""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        return {
            'users_count': User.objects.filter(tenant=self).count(),
            'users_limit': self.max_users,
            'storage_used_gb': 0,  # TODO: Implementar cálculo real
            'storage_limit_gb': self.max_storage_gb,
            'projects_count': 0,  # TODO: Implementar cuando exista el modelo
            'projects_limit': self.max_projects,
        }


class Domain(DomainMixin):
    """
    Modelo de dominio para cada tenant
    """
    tenant = models.ForeignKey(
        Tenant, 
        on_delete=models.CASCADE, 
        related_name='domains'
    )
    
    # Tipo de dominio
    DOMAIN_TYPE_CHOICES = [
        ('primary', 'Primario'),
        ('secondary', 'Secundario'),
        ('alias', 'Alias'),
    ]
    
    domain_type = models.CharField(
        max_length=20,
        choices=DOMAIN_TYPE_CHOICES,
        default='primary',
        verbose_name='Tipo de dominio'
    )
    
    # SSL
    ssl_enabled = models.BooleanField(default=True, verbose_name='SSL habilitado')
    ssl_certificate = models.TextField(blank=True, verbose_name='Certificado SSL')
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Última actualización')
    
    class Meta:
        ordering = ['domain']
        verbose_name = 'Dominio'
        verbose_name_plural = 'Dominios'
    
    def __str__(self):
        return f"{self.domain} ({self.tenant.name})"


class TenantUser(models.Model):
    """
    Relación entre usuarios y tenants con roles específicos
    """
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='tenant_memberships'
    )
    tenant = models.ForeignKey(
        Tenant, 
        on_delete=models.CASCADE,
        related_name='members'
    )
    
    # Roles
    ROLE_CHOICES = [
        ('owner', 'Propietario'),
        ('admin', 'Administrador'),
        ('manager', 'Gerente'),
        ('user', 'Usuario'),
        ('viewer', 'Observador'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='user',
        verbose_name='Rol'
    )
    
    # Estado
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    
    # Permisos específicos
    permissions = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Permisos adicionales'
    )
    
    # Metadatos
    joined_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de ingreso')
    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='invitations_sent',
        verbose_name='Invitado por'
    )
    
    class Meta:
        unique_together = ['user', 'tenant']
        ordering = ['-joined_at']
        verbose_name = 'Usuario del Tenant'
        verbose_name_plural = 'Usuarios del Tenant'
    
    def __str__(self):
        return f"{self.user.email} - {self.tenant.name} ({self.role})"
    
    def has_permission(self, permission):
        """Verifica si el usuario tiene un permiso específico"""
        # Los propietarios y administradores tienen todos los permisos
        if self.role in ['owner', 'admin']:
            return True
        
        # Verificar permisos específicos
        return self.permissions.get(permission, False)


class TenantInvitation(models.Model):
    """
    Invitaciones pendientes para unirse a un tenant
    """
    tenant = models.ForeignKey(
        Tenant,
        on_delete=models.CASCADE,
        related_name='invitations'
    )
    email = models.EmailField(verbose_name='Email')
    role = models.CharField(
        max_length=20,
        choices=TenantUser.ROLE_CHOICES,
        default='user',
        verbose_name='Rol'
    )
    
    # Token de invitación
    token = models.CharField(
        max_length=64,
        unique=True,
        verbose_name='Token'
    )
    
    # Estado
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('accepted', 'Aceptada'),
        ('declined', 'Rechazada'),
        ('expired', 'Expirada'),
    ]
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Estado'
    )
    
    # Metadatos
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    expires_at = models.DateTimeField(verbose_name='Fecha de expiración')
    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='invitations_created',
        verbose_name='Invitado por'
    )
    accepted_at = models.DateTimeField(null=True, blank=True, verbose_name='Fecha de aceptación')
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Invitación'
        verbose_name_plural = 'Invitaciones'
    
    def __str__(self):
        return f"Invitación para {self.email} - {self.tenant.name}"
    
    @property
    def is_expired(self):
        """Verifica si la invitación ha expirado"""
        return timezone.now() > self.expires_at
    
    def accept(self, user):
        """Acepta la invitación y crea la membresía"""
        if self.status != 'pending' or self.is_expired:
            return False
        
        # Crear membresía
        TenantUser.objects.create(
            user=user,
            tenant=self.tenant,
            role=self.role,
            invited_by=self.invited_by
        )
        
        # Actualizar invitación
        self.status = 'accepted'
        self.accepted_at = timezone.now()
        self.save()
        
        return True