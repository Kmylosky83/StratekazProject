"""
Serializadores para la API de Tenants
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tenant, Domain, TenantUser, TenantInvitation
from django.utils.text import slugify
import secrets

User = get_user_model()


class DomainSerializer(serializers.ModelSerializer):
    """Serializador para dominios"""
    
    class Meta:
        model = Domain
        fields = [
            'id', 'domain', 'domain_type', 'is_primary',
            'ssl_enabled', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class TenantUserSerializer(serializers.ModelSerializer):
    """Serializador para usuarios del tenant"""
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = TenantUser
        fields = [
            'id', 'user', 'user_email', 'user_name', 'role',
            'is_active', 'permissions', 'joined_at', 'invited_by'
        ]
        read_only_fields = ['joined_at', 'invited_by']


class TenantSerializer(serializers.ModelSerializer):
    """Serializador principal para Tenants"""
    domains = DomainSerializer(many=True, read_only=True)
    members_count = serializers.SerializerMethodField()
    usage_stats = serializers.SerializerMethodField()
    is_on_trial = serializers.BooleanField(read_only=True)
    is_subscription_active = serializers.BooleanField(read_only=True)
    days_until_trial_ends = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Tenant
        fields = [
            'id', 'name', 'slug', 'email', 'phone', 'address',
            'city', 'state', 'country', 'postal_code', 'tax_id',
            'plan', 'max_users', 'max_storage_gb', 'max_projects',
            'trial_ends_at', 'subscription_ends_at', 'is_active',
            'is_suspended', 'suspension_reason', 'settings',
            'theme', 'logo', 'primary_color', 'secondary_color',
            'features', 'created_at', 'updated_at', 'domains',
            'members_count', 'usage_stats', 'is_on_trial',
            'is_subscription_active', 'days_until_trial_ends'
        ]
        read_only_fields = [
            'created_at', 'updated_at', 'schema_name', 'created_by'
        ]
    
    def get_members_count(self, obj):
        return obj.members.filter(is_active=True).count()
    
    def get_usage_stats(self, obj):
        return obj.get_usage_stats()
    
    def validate_slug(self, value):
        """Valida que el slug sea único y válido"""
        if not value:
            raise serializers.ValidationError("El slug es requerido")
        
        # Asegurar que el slug sea válido
        slug = slugify(value)
        if slug != value:
            raise serializers.ValidationError(
                "El slug solo puede contener letras, números y guiones"
            )
        
        # Verificar unicidad
        if Tenant.objects.filter(slug=slug).exists():
            raise serializers.ValidationError("Este slug ya está en uso")
        
        return slug
    
    def validate_tax_id(self, value):
        """Valida que el NIT/RUT sea único"""
        if Tenant.objects.filter(tax_id=value).exists():
            raise serializers.ValidationError("Este NIT/RUT ya está registrado")
        return value


class CreateTenantSerializer(serializers.ModelSerializer):
    """Serializador para crear un nuevo Tenant"""
    domain = serializers.CharField(write_only=True, required=False)
    owner_email = serializers.EmailField(write_only=True, required=False)
    
    class Meta:
        model = Tenant
        fields = [
            'name', 'slug', 'email', 'phone', 'address',
            'city', 'state', 'country', 'postal_code', 'tax_id',
            'plan', 'domain', 'owner_email', 'theme',
            'primary_color', 'secondary_color'
        ]
    
    def validate_slug(self, value):
        """Genera un slug único si no se proporciona"""
        if not value:
            # Generar slug basado en el nombre
            base_slug = slugify(self.initial_data.get('name', ''))
            slug = base_slug
            counter = 1
            
            while Tenant.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            return slug
        
        # Validar slug proporcionado
        slug = slugify(value)
        if Tenant.objects.filter(slug=slug).exists():
            raise serializers.ValidationError("Este slug ya está en uso")
        
        return slug
    
    def create(self, validated_data):
        """Crea el tenant y configura el dominio inicial"""
        domain_name = validated_data.pop('domain', None)
        owner_email = validated_data.pop('owner_email', None)
        
        # Crear el tenant
        tenant = Tenant.objects.create(**validated_data)
        
        # Crear dominio si se proporciona
        if domain_name:
            Domain.objects.create(
                domain=domain_name,
                tenant=tenant,
                is_primary=True,
                domain_type='primary'
            )
        else:
            # Crear subdominio por defecto
            Domain.objects.create(
                domain=f"{tenant.slug}.stratekaz.com",
                tenant=tenant,
                is_primary=True,
                domain_type='primary'
            )
        
        # Asignar propietario si se especifica
        if owner_email:
            try:
                owner = User.objects.get(email=owner_email)
                TenantUser.objects.create(
                    user=owner,
                    tenant=tenant,
                    role='owner'
                )
            except User.DoesNotExist:
                pass
        
        return tenant


class TenantInvitationSerializer(serializers.ModelSerializer):
    """Serializador para invitaciones de tenant"""
    invited_by_name = serializers.CharField(
        source='invited_by.get_full_name',
        read_only=True
    )
    tenant_name = serializers.CharField(
        source='tenant.name',
        read_only=True
    )
    
    class Meta:
        model = TenantInvitation
        fields = [
            'id', 'tenant', 'tenant_name', 'email', 'role',
            'token', 'status', 'created_at', 'expires_at',
            'invited_by', 'invited_by_name', 'accepted_at'
        ]
        read_only_fields = [
            'token', 'status', 'created_at', 'expires_at',
            'invited_by', 'accepted_at'
        ]
    
    def create(self, validated_data):
        """Crea una invitación con token único"""
        # Generar token único
        validated_data['token'] = secrets.token_urlsafe(32)
        
        # Establecer expiración (7 días por defecto)
        from datetime import timedelta
        from django.utils import timezone
        validated_data['expires_at'] = timezone.now() + timedelta(days=7)
        
        return super().create(validated_data)


class UpdateTenantSettingsSerializer(serializers.ModelSerializer):
    """Serializador para actualizar configuración del tenant"""
    
    class Meta:
        model = Tenant
        fields = [
            'theme', 'logo', 'primary_color', 'secondary_color',
            'settings', 'features'
        ]


class TenantPlanSerializer(serializers.ModelSerializer):
    """Serializador para actualizar el plan del tenant"""
    
    class Meta:
        model = Tenant
        fields = [
            'plan', 'max_users', 'max_storage_gb', 'max_projects',
            'trial_ends_at', 'subscription_ends_at'
        ]