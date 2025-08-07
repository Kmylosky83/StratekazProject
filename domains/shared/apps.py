# domains/shared/apps.py
from django.apps import AppConfig


class SharedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'domains.shared'
    label = 'domains_shared'
    verbose_name = 'Shared Domain Components'