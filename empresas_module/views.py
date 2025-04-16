# auth_module/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Empresa, RolOrganizacional
from .serializers import EmpresaSerializer, RolOrganizacionalSerializer

@api_view(['GET'])
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def empresas_overview(request):
    return Response({"message": "API de Empresas funcionando correctamente"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_empresas(request):
    """Lista empresas según el tipo de usuario"""
    user = request.user
    
    if user.user_type == 'professional':
        # Profesionales ven empresas que crearon
        empresas = Empresa.objects.filter(creada_por=user)
    elif user.user_type == 'consultant_company':
        # Consultoras ven todas sus empresas
        empresas = Empresa.objects.filter(creada_por=user)
    elif user.user_type == 'direct_company':
        # Empresas directas solo ven su propia empresa
        empresas = Empresa.objects.filter(creada_por=user)
    else:
        empresas = []
    
    serializer = EmpresaSerializer(empresas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crear_empresa(request):
    """Crea una empresa según restricciones del tipo de usuario"""
    user = request.user
    
    # Verificar limitaciones según tipo de usuario
    if user.user_type == 'professional':
        # Verificar si ya tiene una empresa creada
        empresas_count = Empresa.objects.filter(creada_por=user).count()
        if empresas_count >= 1:
            return Response({"error": "Profesionales solo pueden crear una empresa sin plan premium"}, 
                           status=status.HTTP_403_FORBIDDEN)
    
    serializer = EmpresaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(creada_por=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def asignar_rol(request, empresa_id):
    """Asigna un rol a un usuario en una empresa"""
    try:
        empresa = Empresa.objects.get(pk=empresa_id)
        
        # Verificar permisos
        if request.user != empresa.creada_por:
            return Response({"error": "No tienes permisos para asignar roles en esta empresa"},
                           status=status.HTTP_403_FORBIDDEN)
        
        data = request.data.copy()
        data['empresa'] = empresa_id
        
        serializer = RolOrganizacionalSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Empresa.DoesNotExist:
        return Response({"error": "Empresa no encontrada"}, status=status.HTTP_404_NOT_FOUND)