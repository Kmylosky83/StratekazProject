from rest_framework import serializers
from .models import Empresa, RolOrganizacional

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['id', 'nombre', 'nit', 'direccion', 'ciudad', 'departamento', 
                 'telefono', 'sector', 'sitio_web', 'fecha_creacion', 'activa']
        read_only_fields = ['id', 'fecha_creacion']

class RolOrganizacionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolOrganizacional
        fields = ['id', 'usuario', 'empresa', 'rol', 'fecha_asignacion', 
                 'activo', 'permisos_especificos']
        read_only_fields = ['id', 'fecha_asignacion']