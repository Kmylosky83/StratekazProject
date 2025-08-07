# domains/shared/models.py
from django.db import models
from django.contrib.auth import get_user_model
from tenants.models import Tenant

User = get_user_model()


class TenantAwareModel(models.Model):
    """
    Base model for all tenant-aware models.
    Provides common fields and methods for multi-tenant applications.
    """
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='%(app_label)s_%(class)s_created'
    )
    updated_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='%(app_label)s_%(class)s_updated'
    )
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        # Auto-set tenant from user if not provided
        if not self.tenant and hasattr(self, '_current_user'):
            # This would be set by middleware or in the service layer
            self.tenant = getattr(self._current_user, 'tenant', None)
        super().save(*args, **kwargs)


class ValueObject(models.Model):
    """
    Base class for Value Objects in DDD.
    Value objects are immutable and defined by their attributes.
    """
    class Meta:
        abstract = True
        
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.__dict__ == other.__dict__
    
    def __hash__(self):
        return hash(tuple(sorted(self.__dict__.items())))


class DomainEntity(TenantAwareModel):
    """
    Base class for Domain Entities in DDD.
    Entities have identity and are mutable.
    """
    # Entities are identified by their ID, not by their attributes
    class Meta:
        abstract = True