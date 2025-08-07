# domains/authentication/apps.py
from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'domains.authentication'
    label = 'domains_authentication'
    verbose_name = 'Authentication Domain'
    
    def ready(self):
        # Import event handlers when the app is ready
        try:
            from . import event_handlers
        except ImportError:
            pass