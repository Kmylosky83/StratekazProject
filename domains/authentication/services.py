# domains/authentication/services.py
from typing import Dict, Tuple, Optional
from django.contrib.auth import authenticate
from django.db import transaction
from rest_framework.authtoken.models import Token

from domains.shared.services import ApplicationService, BusinessRuleViolation
from domains.shared.events import UserRegisteredEvent, UserLoggedInEvent, event_bus
from auth_module.models import User
from auth_module.repositories import UserRepository
from .models import UserProfile


class AuthenticationService(ApplicationService):
    """
    Domain service for authentication operations.
    Contains the core business logic for user authentication.
    """
    
    def __init__(self):
        super().__init__()
        self.user_repository = UserRepository()
    
    def register_user(self, user_data: Dict) -> Tuple[bool, Dict]:
        """
        Use case: Register a new user in the system.
        """
        def _register_user_use_case():
            # Validate business rules
            self._validate_registration_data(user_data)
            
            # Check if user already exists
            if self.user_repository.get_by_email(user_data.get('email')):
                raise BusinessRuleViolation("User with this email already exists")
            
            if self.user_repository.get_by_username(user_data.get('username')):
                raise BusinessRuleViolation("Username already taken")
            
            # Create user
            user = User.objects.create_user(
                username=user_data.get('username'),
                email=user_data.get('email'),
                password=user_data.get('password'),
                user_type=user_data.get('user_type', 'professional'),
                first_name=user_data.get('first_name', ''),
                last_name=user_data.get('last_name', '')
            )
            
            # Create domain profile
            profile = UserProfile.objects.create(user=user)
            
            # Generate auth token
            token, _ = Token.objects.get_or_create(user=user)
            
            # Raise domain event
            event = UserRegisteredEvent(
                user_id=user.id,
                user_type=user.user_type,
                email=user.email,
                username=user.username
            )
            self.add_domain_event(event)
            
            return {
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
        
        try:
            result = self.execute_use_case(_register_user_use_case)
            return True, result
        except BusinessRuleViolation as e:
            return False, {'success': False, 'errors': {'general': e.message}}
        except Exception as e:
            return False, {'success': False, 'errors': {'general': str(e)}}
    
    def authenticate_user(self, identifier: str, password: str) -> Tuple[bool, Dict]:
        """
        Use case: Authenticate a user in the system.
        """
        def _authenticate_user_use_case():
            user = None
            
            # Try authentication with username first
            if identifier:
                user = authenticate(username=identifier, password=password)
            
            # If failed and looks like email, try email authentication
            if not user and '@' in identifier:
                user_obj = self.user_repository.get_by_email(identifier)
                if user_obj:
                    user = authenticate(username=user_obj.username, password=password)
            
            if not user:
                raise BusinessRuleViolation("Invalid credentials")
            
            if not user.is_active:
                raise BusinessRuleViolation("Account is deactivated")
            
            # Generate or get token
            token, _ = Token.objects.get_or_create(user=user)
            
            # Raise domain event
            event = UserLoggedInEvent(
                user_id=user.id,
                user_type=user.user_type
            )
            self.add_domain_event(event)
            
            return {
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
        
        try:
            result = self.execute_use_case(_authenticate_user_use_case)
            return True, result
        except BusinessRuleViolation as e:
            return False, {'success': False, 'error': e.message}
        except Exception as e:
            return False, {'success': False, 'error': str(e)}
    
    def complete_user_profile(self, user: User, profile_data: Dict) -> Tuple[bool, Dict]:
        """
        Use case: Complete user profile.
        """
        def _complete_profile_use_case():
            # Get or create domain profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            
            # Use domain method to complete profile
            event = profile.complete_profile(profile_data)
            self.add_domain_event(event)
            
            return {
                'success': True,
                'user': self._get_user_data(user)
            }
        
        try:
            result = self.execute_use_case(_complete_profile_use_case)
            return True, result
        except BusinessRuleViolation as e:
            return False, {'success': False, 'errors': {'general': e.message}}
        except Exception as e:
            return False, {'success': False, 'errors': {'general': str(e)}}
    
    def check_feature_access(self, user: User, feature_name: str) -> bool:
        """
        Use case: Check if user can access a specific feature.
        """
        try:
            profile, created = UserProfile.objects.get_or_create(user=user)
            return profile.can_access_feature(feature_name)
        except Exception:
            return False
    
    def _validate_registration_data(self, data: Dict):
        """Validate registration data according to business rules."""
        required_fields = ['username', 'email', 'password', 'user_type']
        
        for field in required_fields:
            if not data.get(field):
                raise BusinessRuleViolation(f"{field} is required")
        
        # Validate email format
        import re
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', data['email']):
            raise BusinessRuleViolation("Invalid email format")
        
        # Validate password strength
        if len(data['password']) < 8:
            raise BusinessRuleViolation("Password must be at least 8 characters long")
        
        # Validate user type
        valid_user_types = ['professional', 'consultant_company', 'direct_company']
        if data['user_type'] not in valid_user_types:
            raise BusinessRuleViolation("Invalid user type")
    
    def _get_user_data(self, user: User) -> Dict:
        """Get complete user data for response."""
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