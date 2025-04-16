# auth_module/serializers.py
from rest_framework import serializers
from .models import User, Role, Permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type', 'phone', 'city', 'department', 
                 'first_name', 'last_name', 'profession', 'company_name', 'nit', 
                 'industry', 'contact_position', 'account_verified', 'last_login', 'subdomain']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'