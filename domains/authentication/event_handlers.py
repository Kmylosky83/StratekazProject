# domains/authentication/event_handlers.py
from domains.shared.events import (
    event_bus, 
    UserRegisteredEvent, 
    UserProfileCompletedEvent, 
    UserLoggedInEvent
)


def handle_user_registered(event: UserRegisteredEvent):
    """Handle user registration event."""
    print(f"Usuario registrado: {event.username} ({event.email}) - Tipo: {event.user_type}")
    # Here you could:
    # - Send welcome email
    # - Create tenant if needed
    # - Log to analytics
    # - etc.


def handle_profile_completed(event: UserProfileCompletedEvent):
    """Handle profile completion event."""
    print(f"Perfil completado para usuario ID: {event.user_id} - Tipo: {event.user_type}")
    # Here you could:
    # - Send confirmation email
    # - Enable additional features
    # - Update analytics
    # - etc.


def handle_user_logged_in(event: UserLoggedInEvent):
    """Handle user login event."""
    print(f"Usuario logueado: ID {event.user_id} - Tipo: {event.user_type}")
    # Here you could:
    # - Update last login timestamp
    # - Log to security system
    # - Track user activity
    # - etc.


# Register event handlers
event_bus.register_handler(UserRegisteredEvent, handle_user_registered)
event_bus.register_handler(UserProfileCompletedEvent, handle_profile_completed)
event_bus.register_handler(UserLoggedInEvent, handle_user_logged_in)