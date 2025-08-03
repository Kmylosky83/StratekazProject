"""
Vistas para la API de Tenants
"""

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from .models import Tenant, Domain, TenantUser, TenantInvitation
from .serializers import (
    TenantSerializer, CreateTenantSerializer, TenantUserSerializer,
    TenantInvitationSerializer, UpdateTenantSettingsSerializer,
    TenantPlanSerializer, DomainSerializer
)

User = get_user_model()


class TenantListCreateView(generics.ListCreateAPIView):
    """
    Lista todos los tenants o crea uno nuevo
    Solo accesible por superusuarios
    """
    queryset = Tenant.objects.all()
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateTenantSerializer
        return TenantSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TenantDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Obtiene, actualiza o elimina un tenant específico
    """
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        """Solo propietarios/admins del tenant o superusuarios"""
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    def check_object_permissions(self, request, obj):
        """Verificar permisos específicos del tenant"""
        if request.user.is_superuser:
            return
        
        try:
            membership = TenantUser.objects.get(
                user=request.user,
                tenant=obj,
                is_active=True
            )
            if membership.role not in ['owner', 'admin']:
                self.permission_denied(request)
        except TenantUser.DoesNotExist:
            self.permission_denied(request)


class CurrentTenantView(generics.RetrieveUpdateAPIView):
    """
    Obtiene o actualiza el tenant actual del usuario
    """
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        """Obtiene el tenant actual basado en el dominio o header"""
        # Primero intentar obtener de header
        tenant_id = self.request.META.get('HTTP_X_TENANT_ID')
        
        if tenant_id:
            try:
                return Tenant.objects.get(id=tenant_id)
            except Tenant.DoesNotExist:
                pass
        
        # Obtener del dominio
        domain = self.request.get_host()
        try:
            domain_obj = Domain.objects.select_related('tenant').get(domain=domain)
            return domain_obj.tenant
        except Domain.DoesNotExist:
            # Fallback: obtener el primer tenant del usuario
            try:
                membership = TenantUser.objects.select_related('tenant').filter(
                    user=self.request.user,
                    is_active=True
                ).first()
                if membership:
                    return membership.tenant
            except TenantUser.DoesNotExist:
                pass
        
        # Si no se encuentra tenant, devolver 404
        from django.http import Http404
        raise Http404("No se encontró tenant para este usuario")


class TenantMembersView(generics.ListCreateAPIView):
    """
    Lista los miembros del tenant o añade nuevos
    """
    serializer_class = TenantUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        tenant_slug = self.kwargs.get('tenant_slug')
        tenant = get_object_or_404(Tenant, slug=tenant_slug)
        
        # Verificar permisos
        self.check_tenant_permission(tenant)
        
        return TenantUser.objects.filter(
            tenant=tenant,
            is_active=True
        ).select_related('user')
    
    def perform_create(self, serializer):
        tenant_slug = self.kwargs.get('tenant_slug')
        tenant = get_object_or_404(Tenant, slug=tenant_slug)
        
        # Verificar permisos de administrador
        self.check_tenant_admin_permission(tenant)
        
        serializer.save(
            tenant=tenant,
            invited_by=self.request.user
        )
    
    def check_tenant_permission(self, tenant):
        """Verificar que el usuario pertenece al tenant"""
        if self.request.user.is_superuser:
            return
        
        if not TenantUser.objects.filter(
            user=self.request.user,
            tenant=tenant,
            is_active=True
        ).exists():
            self.permission_denied(self.request)
    
    def check_tenant_admin_permission(self, tenant):
        """Verificar que el usuario es admin del tenant"""
        if self.request.user.is_superuser:
            return
        
        try:
            membership = TenantUser.objects.get(
                user=self.request.user,
                tenant=tenant,
                is_active=True
            )
            if membership.role not in ['owner', 'admin']:
                self.permission_denied(self.request)
        except TenantUser.DoesNotExist:
            self.permission_denied(self.request)


class TenantMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Obtiene, actualiza o elimina un miembro específico del tenant
    """
    serializer_class = TenantUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        tenant_slug = self.kwargs.get('tenant_slug')
        tenant = get_object_or_404(Tenant, slug=tenant_slug)
        
        # Verificar permisos de administrador
        self.check_tenant_admin_permission(tenant)
        
        return TenantUser.objects.filter(tenant=tenant)
    
    def check_tenant_admin_permission(self, tenant):
        """Verificar que el usuario es admin del tenant"""
        if self.request.user.is_superuser:
            return
        
        try:
            membership = TenantUser.objects.get(
                user=self.request.user,
                tenant=tenant,
                is_active=True
            )
            if membership.role not in ['owner', 'admin']:
                self.permission_denied(self.request)
        except TenantUser.DoesNotExist:
            self.permission_denied(self.request)


class TenantInvitationListView(generics.ListCreateAPIView):
    """
    Lista las invitaciones del tenant o crea nuevas
    """
    serializer_class = TenantInvitationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        tenant_slug = self.kwargs.get('tenant_slug')
        tenant = get_object_or_404(Tenant, slug=tenant_slug)
        
        # Verificar permisos
        self.check_tenant_admin_permission(tenant)
        
        return TenantInvitation.objects.filter(tenant=tenant)
    
    def perform_create(self, serializer):
        tenant_slug = self.kwargs.get('tenant_slug')
        tenant = get_object_or_404(Tenant, slug=tenant_slug)
        
        # Verificar permisos
        self.check_tenant_admin_permission(tenant)
        
        serializer.save(
            tenant=tenant,
            invited_by=self.request.user
        )
    
    def check_tenant_admin_permission(self, tenant):
        """Verificar que el usuario es admin del tenant"""
        if self.request.user.is_superuser:
            return
        
        try:
            membership = TenantUser.objects.get(
                user=self.request.user,
                tenant=tenant,
                is_active=True
            )
            if membership.role not in ['owner', 'admin']:
                self.permission_denied(self.request)
        except TenantUser.DoesNotExist:
            self.permission_denied(self.request)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def accept_invitation(request, token):
    """
    Acepta una invitación al tenant
    """
    try:
        invitation = TenantInvitation.objects.get(
            token=token,
            status='pending'
        )
        
        if invitation.is_expired:
            return Response(
                {'error': 'La invitación ha expirado'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verificar que el email coincida
        if invitation.email.lower() != request.user.email.lower():
            return Response(
                {'error': 'El email no coincide con la invitación'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verificar que el usuario no sea ya miembro
        if TenantUser.objects.filter(
            user=request.user,
            tenant=invitation.tenant
        ).exists():
            return Response(
                {'error': 'Ya eres miembro de este tenant'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Aceptar invitación
        with transaction.atomic():
            if invitation.accept(request.user):
                return Response({
                    'message': 'Invitación aceptada exitosamente',
                    'tenant': TenantSerializer(invitation.tenant).data
                })
            else:
                return Response(
                    {'error': 'No se pudo aceptar la invitación'},
                    status=status.HTTP_400_BAD_REQUEST
                )
    
    except TenantInvitation.DoesNotExist:
        return Response(
            {'error': 'Invitación no encontrada'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def decline_invitation(request, token):
    """
    Rechaza una invitación al tenant
    """
    try:
        invitation = TenantInvitation.objects.get(
            token=token,
            status='pending'
        )
        
        # Verificar que el email coincida
        if invitation.email.lower() != request.user.email.lower():
            return Response(
                {'error': 'El email no coincide con la invitación'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        invitation.status = 'declined'
        invitation.save()
        
        return Response({'message': 'Invitación rechazada'})
    
    except TenantInvitation.DoesNotExist:
        return Response(
            {'error': 'Invitación no encontrada'},
            status=status.HTTP_404_NOT_FOUND
        )


class TenantSettingsView(generics.RetrieveUpdateAPIView):
    """
    Obtiene o actualiza la configuración del tenant
    """
    serializer_class = UpdateTenantSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Tenant.objects.all()
    
    def check_object_permissions(self, request, obj):
        """Verificar permisos de administrador"""
        if request.user.is_superuser:
            return
        
        try:
            membership = TenantUser.objects.get(
                user=request.user,
                tenant=obj,
                is_active=True
            )
            if membership.role not in ['owner', 'admin']:
                self.permission_denied(request)
        except TenantUser.DoesNotExist:
            self.permission_denied(request)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def tenant_usage_stats(request, slug):
    """
    Obtiene estadísticas de uso del tenant
    """
    tenant = get_object_or_404(Tenant, slug=slug)
    
    # Verificar permisos
    if not request.user.is_superuser:
        try:
            membership = TenantUser.objects.get(
                user=request.user,
                tenant=tenant,
                is_active=True
            )
            if membership.role not in ['owner', 'admin', 'manager']:
                return Response(
                    {'error': 'No tienes permisos para ver estas estadísticas'},
                    status=status.HTTP_403_FORBIDDEN
                )
        except TenantUser.DoesNotExist:
            return Response(
                {'error': 'No tienes acceso a este tenant'},
                status=status.HTTP_403_FORBIDDEN
            )
    
    stats = tenant.get_usage_stats()
    stats.update({
        'is_on_trial': tenant.is_on_trial,
        'is_subscription_active': tenant.is_subscription_active,
        'days_until_trial_ends': tenant.days_until_trial_ends,
        'plan': tenant.plan,
    })
    
    return Response(stats)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_tenants(request):
    """
    Obtiene todos los tenants del usuario actual
    """
    memberships = TenantUser.objects.filter(
        user=request.user,
        is_active=True
    ).select_related('tenant')
    
    tenants_data = []
    for membership in memberships:
        tenant_data = TenantSerializer(membership.tenant).data
        tenant_data['user_role'] = membership.role
        tenant_data['joined_at'] = membership.joined_at
        tenants_data.append(tenant_data)
    
    return Response(tenants_data)