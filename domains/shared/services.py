# domains/shared/services.py
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Optional, List
from django.db import transaction
from django.core.exceptions import ValidationError

T = TypeVar('T')


class DomainService(ABC):
    """
    Base class for Domain Services.
    Domain services contain business logic that doesn't naturally fit in entities or value objects.
    """
    pass


class ApplicationService(ABC):
    """
    Base class for Application Services.
    Application services orchestrate use cases and coordinate between different domain objects.
    """
    
    def __init__(self):
        self.events = []
    
    @transaction.atomic
    def execute_use_case(self, use_case_method, *args, **kwargs):
        """
        Template method for executing use cases with transaction management.
        """
        try:
            result = use_case_method(*args, **kwargs)
            self._publish_domain_events()
            return result
        except Exception as e:
            self._clear_domain_events()
            raise e
    
    def _publish_domain_events(self):
        """
        Publish domain events after successful transaction.
        TODO: Implement event publishing mechanism
        """
        for event in self.events:
            # Here we would publish the event to an event bus
            pass
        self._clear_domain_events()
    
    def _clear_domain_events(self):
        """Clear domain events."""
        self.events.clear()
    
    def add_domain_event(self, event):
        """Add a domain event to be published."""
        self.events.append(event)


class Repository(Generic[T], ABC):
    """
    Base repository interface for domain entities.
    Repositories provide access to aggregate roots and hide the details of persistence.
    """
    
    @abstractmethod
    def get_by_id(self, entity_id: int) -> Optional[T]:
        """Get entity by ID."""
        pass
    
    @abstractmethod
    def save(self, entity: T) -> T:
        """Save entity."""
        pass
    
    @abstractmethod
    def delete(self, entity: T) -> bool:
        """Delete entity."""
        pass
    
    @abstractmethod
    def get_all(self) -> List[T]:
        """Get all entities."""
        pass
    
    @abstractmethod
    def find_by_criteria(self, **criteria) -> List[T]:
        """Find entities by criteria."""
        pass


class DomainException(Exception):
    """
    Base class for domain-specific exceptions.
    """
    def __init__(self, message: str, error_code: str = None):
        self.message = message
        self.error_code = error_code
        super().__init__(message)


class BusinessRuleViolation(DomainException):
    """
    Exception raised when a business rule is violated.
    """
    pass


class ValidationService:
    """
    Service for validating business rules and constraints.
    """
    
    @staticmethod
    def validate_required_fields(entity, required_fields: List[str]):
        """Validate that required fields are present."""
        errors = []
        for field in required_fields:
            if not hasattr(entity, field) or getattr(entity, field) is None:
                errors.append(f"{field} is required")
        
        if errors:
            raise ValidationError(errors)
    
    @staticmethod
    def validate_business_rule(condition: bool, message: str, error_code: str = None):
        """Validate a business rule condition."""
        if not condition:
            raise BusinessRuleViolation(message, error_code)