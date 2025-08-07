# domains/authentication/api/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from domains.authentication.services import AuthenticationService
from auth_module.models import User


# Initialize domain service
auth_service = AuthenticationService()


@api_view(['GET'])
@permission_classes([AllowAny])
def api_overview(request):
    """API overview endpoint."""
    return Response({
        "message": "Authentication API v1 funcionando correctamente",
        "version": "1.0.0",
        "endpoints": {
            "register": "/api/v1/auth/register/",
            "login": "/api/v1/auth/login/",
            "profile": "/api/v1/auth/profile/",
            "profile_update": "/api/v1/auth/profile/update/",
            "profile_complete": "/api/v1/auth/profile/complete/"
        }
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user using domain service."""
    success, response_data = auth_service.register_user(request.data)
    return Response(
        response_data,
        status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user using domain service."""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Use username or email as identifier
    identifier = username or email
    success, response_data = auth_service.authenticate_user(identifier, password)
    
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get user profile with business logic validation."""
    try:
        # Get profile data through domain service
        profile_data = auth_service._get_user_data(request.user)
        
        # Add feature access information
        features = [
            'herramientas_productividad',
            'inteligencia_negocios',
            'mis_empresas', 
            'ecosistema_empresarial',
            'finanzas'
        ]
        
        feature_access = {
            feature: auth_service.check_feature_access(request.user, feature)
            for feature in features
        }
        
        return Response({
            **profile_data,
            'feature_access': feature_access
        })
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Update user profile through domain service."""
    # For now, use the existing auth service for simple updates
    # TODO: Move this to domain service
    from auth_module.services import AuthService
    success, response_data = AuthService.update_user_profile(request.user, request.data)
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    """Complete user profile using domain service."""
    success, response_data = auth_service.complete_user_profile(request.user, request.data)
    return Response(
        response_data,
        status=status.HTTP_200_OK if success else status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    """Request password reset."""
    email = request.data.get('email')
    # TODO: Implement domain service for password reset
    return Response({
        "message": "Si el correo existe, recibirás instrucciones para restablecer tu contraseña"
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def debug_auth(request):
    """Debug authentication endpoint."""
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    is_authenticated = request.user.is_authenticated
    
    data = {
        'authenticated': is_authenticated,
        'auth_header': auth_header,
        'api_version': 'v1',
        'domain_architecture': True,
    }
    
    if is_authenticated:
        data.update({
            'username': request.user.username,
            'email': request.user.email,
            'user_type': request.user.user_type,
            'profile_completed': request.user.profile_completed
        })
    
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def super_admin_dashboard(request):
    """Super admin dashboard endpoint."""
    # Check access through domain service
    if not auth_service.check_feature_access(request.user, 'admin_panel'):
        return Response(
            {'error': 'Acceso no autorizado'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Get stats through repository
    from auth_module.services import UserService
    stats = UserService.get_users_stats()
    
    return Response({
        **stats,
        'api_version': 'v1',
        'domain_architecture': True
    })