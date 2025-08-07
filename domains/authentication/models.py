# domains/authentication/models.py
from django.db import models
from domains.shared.models import DomainEntity
from domains.shared.events import UserRegisteredEvent, UserProfileCompletedEvent
from domains.shared.services import BusinessRuleViolation


class UserProfile(DomainEntity):
    """
    Domain model for User Profile.
    This extends the base User model with domain-specific behavior.
    """
    # Reference to the Django User model
    user = models.OneToOneField(
        'auth_module.User', 
        on_delete=models.CASCADE, 
        related_name='domain_profile'
    )
    
    # Domain-specific fields that might not be in the original User model
    profile_completion_score = models.IntegerField(default=0)
    last_profile_update = models.DateTimeField(null=True, blank=True)
    verification_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('verified', 'Verified'),
            ('rejected', 'Rejected')
        ],
        default='pending'
    )
    
    class Meta:
        db_table = 'domains_user_profile'
    
    def complete_profile(self, profile_data: dict):
        """
        Domain method to complete user profile.
        Encapsulates business logic for profile completion.
        """
        # Business rule: Profile can only be completed once
        if self.user.profile_completed:
            raise BusinessRuleViolation(
                "Profile is already completed",
                error_code="PROFILE_ALREADY_COMPLETED"
            )
        
        # Business rule: Required fields must be present
        required_fields = self._get_required_fields_for_user_type(self.user.user_type)
        missing_fields = self._validate_required_fields(profile_data, required_fields)
        
        if missing_fields:
            raise BusinessRuleViolation(
                f"Missing required fields: {', '.join(missing_fields)}",
                error_code="MISSING_REQUIRED_FIELDS"
            )
        
        # Update user fields
        for field, value in profile_data.items():
            if hasattr(self.user, field):
                setattr(self.user, field, value)
        
        self.user.profile_completed = True
        self.profile_completion_score = 100
        
        # Save both models
        self.user.save()
        self.save()
        
        # Raise domain event
        return UserProfileCompletedEvent(
            user_id=self.user.id,
            user_type=self.user.user_type
        )
    
    def calculate_completion_score(self) -> int:
        """Calculate profile completion score based on filled fields."""
        required_fields = self._get_required_fields_for_user_type(self.user.user_type)
        filled_fields = sum(1 for field in required_fields if getattr(self.user, field, None))
        
        if not required_fields:
            return 100
            
        return int((filled_fields / len(required_fields)) * 100)
    
    def can_access_feature(self, feature_name: str) -> bool:
        """
        Business logic to determine if user can access a specific feature.
        """
        # Basic rule: profile must be completed for most features
        if not self.user.profile_completed:
            return feature_name in ['complete_profile', 'logout']
        
        # Role-based access control
        return self._check_feature_access_by_user_type(feature_name, self.user.user_type)
    
    def _get_required_fields_for_user_type(self, user_type: str) -> list:
        """Get required fields based on user type."""
        base_fields = ['email', 'phone', 'city', 'department']
        
        if user_type == 'professional':
            return base_fields + ['first_name', 'last_name', 'profession', 'id_type', 'id_number']
        elif user_type in ['consultant_company', 'direct_company']:
            return base_fields + [
                'company_name', 'nit', 'industry', 'contact_first_name', 
                'contact_last_name', 'contact_id_type', 'contact_id_number'
            ]
        return base_fields
    
    def _validate_required_fields(self, data: dict, required_fields: list) -> list:
        """Validate required fields and return missing ones."""
        missing = []
        for field in required_fields:
            if field not in data or not data[field]:
                if not getattr(self.user, field, None):
                    missing.append(field)
        return missing
    
    def _check_feature_access_by_user_type(self, feature_name: str, user_type: str) -> bool:
        """Check feature access based on user type."""
        feature_access_map = {
            'professional': [
                'herramientas_productividad', 'inteligencia_negocios', 
                'mis_empresas', 'ecosistema_empresarial'
            ],
            'consultant_company': [
                'herramientas_productividad', 'inteligencia_negocios', 
                'mis_empresas', 'ecosistema_empresarial'
            ],
            'direct_company': [
                'herramientas_productividad', 'inteligencia_negocios', 
                'ecosistema_empresarial'
            ],
            'super_admin': [
                'herramientas_productividad', 'inteligencia_negocios',
                'mis_empresas', 'ecosistema_empresarial', 'finanzas', 'admin_panel'
            ]
        }
        
        allowed_features = feature_access_map.get(user_type, [])
        return feature_name in allowed_features