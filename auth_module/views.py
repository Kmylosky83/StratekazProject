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
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user_type': user.user_type
        })
    return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

# auth_module/views.py
# Añade estas nuevas vistas

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

# auth_module/views.py
# Añadir esta vista:

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_profile_status(request):
    """Verifica si el perfil del usuario está completo"""
    user = request.user
    return Response({
        'profile_completed': user.profile_completed,
        'user_type': user.user_type
    })

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