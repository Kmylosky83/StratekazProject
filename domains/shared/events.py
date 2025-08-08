# domains/shared/events.py
from datetime import datetime
from typing import Any, Dict
from abc import ABC


class DomainEvent(ABC):
    """
    Base class for domain events.
    Domain events represent something important that happened in the domain.
    """
    def __init__(self, occurred_at: datetime = None, event_version: str = "1.0"):
        self.occurred_at = occurred_at or datetime.now()
        self.event_version = event_version
    


class UserEvent(DomainEvent):
    """Base class for user-related events."""
    def __init__(self, user_id: int, user_type: str, **kwargs):
        super().__init__(**kwargs)
        self.user_id = user_id
        self.user_type = user_type


class UserRegisteredEvent(UserEvent):
    """Event raised when a user registers."""
    def __init__(self, user_id: int, user_type: str, email: str, username: str, **kwargs):
        super().__init__(user_id, user_type, **kwargs)
        self.email = email
        self.username = username


class UserProfileCompletedEvent(UserEvent):
    """Event raised when a user completes their profile."""
    pass


class UserLoggedInEvent(UserEvent):
    """Event raised when a user logs in."""
    pass


class TenantEvent(DomainEvent):
    """Base class for tenant-related events."""
    def __init__(self, tenant_id: int, user_id: int, **kwargs):
        super().__init__(**kwargs)
        self.tenant_id = tenant_id
        self.user_id = user_id


class TenantCreatedEvent(TenantEvent):
    """Event raised when a tenant is created."""
    def __init__(self, tenant_id: int, user_id: int, tenant_name: str, schema_name: str, **kwargs):
        super().__init__(tenant_id, user_id, **kwargs)
        self.tenant_name = tenant_name
        self.schema_name = schema_name


class EventBus:
    """
    Simple event bus for handling domain events.
    In a production system, this would be replaced with a more robust event handling system.
    """
    
    def __init__(self):
        self.handlers = {}
    
    def register_handler(self, event_type: type, handler):
        """Register an event handler."""
        if event_type not in self.handlers:
            self.handlers[event_type] = []
        self.handlers[event_type].append(handler)
    
    def publish(self, event: DomainEvent):
        """Publish an event to all registered handlers."""
        event_type = type(event)
        if event_type in self.handlers:
            for handler in self.handlers[event_type]:
                try:
                    handler(event)
                except Exception as e:
                    # Log error but don't stop other handlers
                    print(f"Error handling event {event_type.__name__}: {e}")
    
    def publish_many(self, events: list):
        """Publish multiple events."""
        for event in events:
            self.publish(event)


# Global event bus instance
event_bus = EventBus()