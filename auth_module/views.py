# auth_module/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .services import AuthService, UserService
from .models import User

@api_view(['GET'])
@permission_classes([AllowAny])  # Añadir esta línea
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    success, response_data = AuthService.register_user(request.data)
    return Response(
        response_data,
        status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Intentar login con username primero, luego con email
    login_identifier = username or email
    success, response_data = AuthService.login_user(login_identifier, password)
    
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_401_UNAUTHORIZED
    )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Actualiza el perfil del usuario actual"""
    success, response_data = AuthService.update_user_profile(request.user, request.data)
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    """Solicita un reseteo de contraseña"""
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        # Aquí iría lógica para generar token y enviar email
        # Por ahora solo confirmamos que el usuario existe
        return Response({"message": "Si el correo existe, recibirás instrucciones para restablecer tu contraseña"})
    except User.DoesNotExist:
        # Por seguridad, no revelamos si el email existe o no
        return Response({"message": "Si el correo existe, recibirás instrucciones para restablecer tu contraseña"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_profile_status(request):
    """Verifica si el perfil del usuario está completo"""
    try:
        user_profile = AuthService.get_user_profile(request.user)
        profile_status = AuthService.check_profile_status(request.user)
        
        response_data = {
            **user_profile,
            **profile_status
        }
        
        return Response(response_data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    """Completa el perfil del usuario en su primer ingreso"""
    success, response_data = AuthService.complete_user_profile(request.user, request.data)
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET'])
@permission_classes([AllowAny])  # Usar AllowAny para depuración
def debug_auth(request):
    """Vista de depuración para verificar la autenticación"""
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    is_authenticated = request.user.is_authenticated
    
    data = {
        'authenticated': is_authenticated,
        'auth_header': auth_header,
        'headers': dict(request.headers),
    }
    
    if is_authenticated:
        data.update({
            'username': request.user.username,
            'email': request.user.email,
            'user_type': request.user.user_type
        })
    
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def super_admin_dashboard(request):
    """Vista del panel de control para Super Administrador"""
    if request.user.user_type != 'super_admin':
        return Response({'error': 'Acceso no autorizado'}, status=status.HTTP_403_FORBIDDEN)
    
    # Obtener estadísticas básicas
    stats = {
        'total_users': User.objects.count(),
        'professional_users': User.objects.filter(user_type='professional').count(),
        'consultant_companies': User.objects.filter(user_type='consultant_company').count(),
        'direct_companies': User.objects.filter(user_type='direct_company').count(),
    }
    
    return Response(stats)