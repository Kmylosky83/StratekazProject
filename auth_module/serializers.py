# auth_module/serializers.py
from rest_framework import serializers
from .models import User, Role, Permission

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'user_type', 'phone', 'city', 'department', 
                 'first_name', 'last_name', 'profession', 'id_type', 'id_number',
                 'company_name', 'nit', 'industry', 'contact_position', 
                 'contact_first_name', 'contact_last_name', 'contact_id_type', 'contact_id_number',
                 'profile_completed', 'account_verified', 'last_login', 'subdomain']
    
    def create(self, validated_data):
        # Extraer la contraseña
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        
        # Establecer la contraseña correctamente
        if password:
            user.set_password(password)
            user.save()
            
        return user

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'