# auth_module/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from .models import User

@api_view(['GET'])
@permission_classes([AllowAny])  # Añadir esta línea
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    # Obtener datos del request
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Debug: imprime los datos recibidos
    print(f"Login attempt: username={username}, email={email}")
    
    # Intentar autenticación con username
    user = None
    if username:
        user = authenticate(username=username, password=password)
    
    # Si no hay username o falló la autenticación, intentar con email
    if not user and email:
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            pass
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.pk,
                'username': user.username,
                'email': user.email,
                'user_type': user.user_type,
                'profile_completed': user.profile_completed,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })
    return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Actualiza el perfil del usuario actual"""
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        user = request.user
        response_data = {
            'id': user.pk,
            'username': user.username,
            'email': user.email,
            'user_type': user.user_type,
            'profile_completed': user.profile_completed,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
        
        # Añadir campos específicos según el tipo de usuario
        if user.user_type == 'professional':
            response_data.update({
                'profession': user.profession,
                'phone': user.phone,
                'city': user.city,
                'department': user.department,
                'id_type': user.id_type,  # Añadido
                'id_number': user.id_number  # Añadido
            })
        else:
            response_data.update({
                'company_name': user.company_name,
                'nit': user.nit,
                'industry': user.industry,
                'contact_position': user.contact_position,
                'contact_first_name': user.contact_first_name,  # Añadido
                'contact_last_name': user.contact_last_name,  # Añadido
                'contact_id_type': user.contact_id_type,  # Añadido
                'contact_id_number': user.contact_id_number,  # Añadido
                'phone': user.phone,
                'city': user.city,
                'department': user.department
            })
            
        return Response(response_data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    """Completa el perfil del usuario en su primer ingreso"""
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    
    if serializer.is_valid():
        # Marcar el perfil como completo
        serializer.save(profile_completed=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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