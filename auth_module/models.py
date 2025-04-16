from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Campos comunes
    user_type = models.CharField(max_length=20, choices=[
        ('professional', 'Profesional Independiente'),
        ('consultant_company', 'Empresa Consultora'),
        ('direct_company', 'Empresa Directa')
    ])
    phone = models.CharField(max_length=20, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    profile_completed = models.BooleanField(default=False)
    
    # Campos para profesionales
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    profession = models.CharField(max_length=100, blank=True, null=True)
    
    # Campos para empresas
    company_type = models.CharField(max_length=20, blank=True, null=True)
    company_name = models.CharField(max_length=200, blank=True, null=True)
    nit = models.CharField(max_length=20, blank=True, null=True, unique=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    contact_position = models.CharField(max_length=100, blank=True, null=True)
    
    # Campos de control
    account_verified = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    subdomain = models.CharField(max_length=50, blank=True, null=True, unique=True)
    
    def __str__(self):
        return self.username
    
class Permission(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    permissions = models.ManyToManyField(Permission, blank=True)
    
    def __str__(self):
        return self.name
    
