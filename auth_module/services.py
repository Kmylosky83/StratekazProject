# auth_module/services.py
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.db import transaction
from typing import Dict, Tuple, Optional
from .models import User
from .serializers import UserSerializer
from .repositories import UserRepository


class AuthService:
    """
    Servicio central para todas las operaciones de autenticación.
    Separa la lógica de negocio de las vistas.
    """
    
    @staticmethod
    def register_user(user_data: Dict) -> Tuple[bool, Dict]:
        """
        Registra un nuevo usuario en el sistema.
        
        Args:
            user_data: Datos del usuario a registrar
            
        Returns:
            Tuple[bool, Dict]: (success, response_data)
        """
        serializer = UserSerializer(data=user_data)
        
        if not serializer.is_valid():
            return False, {
                'success': False,
                'errors': serializer.errors
            }
        
        with transaction.atomic():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            
            return True, {
                'success': True,
                'access': token.key,
                'refresh': None,
                'token': token.key,  # Compatibilidad legacy
                'user': {
                    'id': user.pk,
                    'username': user.username,
                    'email': user.email,
                    'user_type': user.user_type,
                    'profile_completed': user.profile_completed,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }
    
    @staticmethod
    def login_user(identifier: str, password: str) -> Tuple[bool, Dict]:
        """
        Autentica un usuario en el sistema.
        
        Args:
            identifier: Nombre de usuario o email
            password: Contraseña
            
        Returns:
            Tuple[bool, Dict]: (success, response_data)
        """
        user = None
        
        # Intentar autenticación directa con username
        if identifier:
            user = authenticate(username=identifier, password=password)
        
        # Si no funciona, intentar con email
        if not user and '@' in identifier:
            user_obj = UserRepository.get_by_email(identifier)
            if user_obj:
                user = authenticate(username=user_obj.username, password=password)
        
        if not user:
            return False, {
                'success': False,
                'error': 'Credenciales inválidas'
            }
        
        if not user.is_active:
            return False, {
                'success': False,
                'error': 'Cuenta desactivada'
            }
        
        token, _ = Token.objects.get_or_create(user=user)
        
        return True, {
            'success': True,
            'access': token.key,
            'refresh': None,
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
        }
    
    @staticmethod
    def get_user_profile(user: User) -> Dict:
        """
        Obtiene el perfil completo del usuario.
        
        Args:
            user: Instancia del usuario
            
        Returns:
            Dict: Datos del perfil del usuario
        """
        return {
            'id': user.pk,
            'username': user.username,
            'email': user.email,
            'user_type': user.user_type,
            'phone': user.phone,
            'city': user.city,
            'department': user.department,
            'profile_completed': user.profile_completed,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'profession': user.profession,
            'id_type': user.id_type,
            'id_number': user.id_number,
            'company_type': user.company_type,
            'company_name': user.company_name,
            'nit': user.nit,
            'industry': user.industry,
            'contact_position': user.contact_position,
            'contact_first_name': user.contact_first_name,
            'contact_last_name': user.contact_last_name,
            'contact_id_type': user.contact_id_type,
            'contact_id_number': user.contact_id_number,
            'account_verified': user.account_verified,
            'subdomain': user.subdomain
        }
    
    @staticmethod
    def update_user_profile(user: User, profile_data: Dict) -> Tuple[bool, Dict]:
        """
        Actualiza el perfil del usuario.
        
        Args:
            user: Instancia del usuario
            profile_data: Nuevos datos del perfil
            
        Returns:
            Tuple[bool, Dict]: (success, response_data)
        """
        serializer = UserSerializer(user, data=profile_data, partial=True)
        
        if not serializer.is_valid():
            return False, {
                'success': False,
                'errors': serializer.errors
            }
        
        with transaction.atomic():
            updated_user = serializer.save()
            
            return True, {
                'success': True,
                'user': AuthService.get_user_profile(updated_user)
            }
    
    @staticmethod
    def complete_user_profile(user: User, profile_data: Dict) -> Tuple[bool, Dict]:
        """
        Completa el perfil del usuario marcándolo como completado.
        
        Args:
            user: Instancia del usuario
            profile_data: Datos para completar el perfil
            
        Returns:
            Tuple[bool, Dict]: (success, response_data)
        """
        profile_data['profile_completed'] = True
        return AuthService.update_user_profile(user, profile_data)
    
    @staticmethod
    def check_profile_status(user: User) -> Dict:
        """
        Verifica el estado del perfil del usuario.
        
        Args:
            user: Instancia del usuario
            
        Returns:
            Dict: Estado del perfil
        """
        missing_fields = []
        
        # Campos requeridos según el tipo de usuario
        if user.user_type == 'professional':
            required_fields = ['first_name', 'last_name', 'profession', 'id_type', 'id_number', 'phone', 'city']
        elif user.user_type in ['consultant_company', 'direct_company']:
            required_fields = ['company_name', 'nit', 'industry', 'contact_first_name', 'contact_last_name', 
                             'contact_id_type', 'contact_id_number', 'phone', 'city']
        else:
            required_fields = []
        
        for field in required_fields:
            if not getattr(user, field, None):
                missing_fields.append(field)
        
        return {
            'profile_completed': user.profile_completed,
            'missing_fields': missing_fields,
            'completion_percentage': max(0, (len(required_fields) - len(missing_fields)) / len(required_fields) * 100) if required_fields else 100
        }


class UserService:
    """
    Servicio para operaciones generales de usuarios.
    """
    
    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[User]:
        """Obtiene un usuario por su ID."""
        return UserRepository.get_by_id(user_id)
    
    @staticmethod
    def get_user_by_username(username: str) -> Optional[User]:
        """Obtiene un usuario por su username."""
        return UserRepository.get_by_username(username)
    
    @staticmethod
    def get_user_by_email(email: str) -> Optional[User]:
        """Obtiene un usuario por su email."""
        return UserRepository.get_by_email(email)
    
    @staticmethod
    def get_users_stats() -> Dict:
        """Obtiene estadísticas de usuarios."""
        return UserRepository.count_by_user_type()