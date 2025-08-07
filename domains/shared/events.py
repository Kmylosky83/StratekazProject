# domains/shared/events.py
from datetime import datetime
from dataclasses import dataclass
from typing import Any, Dict
from abc import ABC


@dataclass
class DomainEvent(ABC):
    """
    Base class for domain events.
    Domain events represent something important that happened in the domain.
    """
    occurred_at: datetime = None
    event_version: str = "1.0"
    
    def __post_init__(self):
        if self.occurred_at is None:
            self.occurred_at = datetime.now()


@dataclass
class UserEvent(DomainEvent):
    """Base class for user-related events."""
    user_id: int
    user_type: str


@dataclass
class UserRegisteredEvent(UserEvent):
    """Event raised when a user registers."""
    email: str
    username: str


@dataclass
class UserProfileCompletedEvent(UserEvent):
    """Event raised when a user completes their profile."""
    pass


@dataclass
class UserLoggedInEvent(UserEvent):
    """Event raised when a user logs in."""
    pass


@dataclass
class TenantEvent(DomainEvent):
    """Base class for tenant-related events."""
    tenant_id: int
    user_id: int


@dataclass
class TenantCreatedEvent(TenantEvent):
    """Event raised when a tenant is created."""
    tenant_name: str
    schema_name: str


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