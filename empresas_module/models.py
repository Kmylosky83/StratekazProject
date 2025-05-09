from django.db import models
from auth_module.models import User

class Empresa(models.Model):
    nombre = models.CharField(max_length=200)
    nit = models.CharField(max_length=20, unique=True)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    ciudad = models.CharField(max_length=100, blank=True, null=True)
    departamento = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    sector = models.CharField(max_length=100, blank=True, null=True)
    sitio_web = models.URLField(blank=True, null=True)
    creada_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='empresas_creadas')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class RolOrganizacional(models.Model):
    ROLES = [
        ('perfil_principal', 'Perfil Principal'),
        ('alta_direccion', 'Alta Dirección'),
        ('lider_proceso', 'Líder de Proceso'),
        ('mandos_medios', 'Mandos Medios'),
        ('colaborador_standard', 'Colaborador Standard'),
        ('colaborador_limitado', 'Colaborador Limitado'),
        ('contratista', 'Contratista/Consultor'),
        ('especial', 'Especial (Auditor/Asesor)')
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roles_empresas')
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='roles_usuarios')
    rol = models.CharField(max_length=50, choices=ROLES)
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
    permisos_especificos = models.JSONField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.usuario.username} - {self.get_rol_display()} en {self.empresa.nombre}"
    
    class Meta:
        unique_together = ('usuario', 'empresa', 'rol')