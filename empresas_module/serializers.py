from rest_framework import serializers
from .models import Empresa, RolOrganizacional

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'
        read_only_fields = ['creada_por', 'fecha_creacion']

class RolOrganizacionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolOrganizacional
        fields = '__all__'