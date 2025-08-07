# auth_module/repositories.py
from typing import Optional, List, Dict
from django.db.models import QuerySet
from django.contrib.auth import get_user_model
from .models import User, Role, Permission

User = get_user_model()


class UserRepository:
    """
    Repository pattern para operaciones de User.
    Centraliza todas las consultas y operaciones de base de datos.
    """
    
    @staticmethod
    def create(user_data: Dict) -> User:
        """Crea un nuevo usuario."""
        return User.objects.create(**user_data)
    
    @staticmethod
    def get_by_id(user_id: int) -> Optional[User]:
        """Obtiene un usuario por ID."""
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
    
    @staticmethod
    def get_by_username(username: str) -> Optional[User]:
        """Obtiene un usuario por username."""
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None
    
    @staticmethod
    def get_by_email(email: str) -> Optional[User]:
        """Obtiene un usuario por email."""
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None
    
    @staticmethod
    def get_by_subdomain(subdomain: str) -> Optional[User]:
        """Obtiene un usuario por subdomain."""
        try:
            return User.objects.get(subdomain=subdomain)
        except User.DoesNotExist:
            return None
    
    @staticmethod
    def update(user: User, update_data: Dict) -> User:
        """Actualiza un usuario existente."""
        for key, value in update_data.items():
            setattr(user, key, value)
        user.save()
        return user
    
    @staticmethod
    def delete(user: User) -> bool:
        """Elimina un usuario."""
        try:
            user.delete()
            return True
        except Exception:
            return False
    
    @staticmethod
    def get_all() -> QuerySet[User]:
        """Obtiene todos los usuarios."""
        return User.objects.all()
    
    @staticmethod
    def get_by_user_type(user_type: str) -> QuerySet[User]:
        """Obtiene usuarios por tipo."""
        return User.objects.filter(user_type=user_type)
    
    @staticmethod
    def get_active_users() -> QuerySet[User]:
        """Obtiene usuarios activos."""
        return User.objects.filter(is_active=True)
    
    @staticmethod
    def get_verified_users() -> QuerySet[User]:
        """Obtiene usuarios verificados."""
        return User.objects.filter(account_verified=True)
    
    @staticmethod
    def get_users_with_completed_profile() -> QuerySet[User]:
        """Obtiene usuarios con perfil completado."""
        return User.objects.filter(profile_completed=True)
    
    @staticmethod
    def search_users(query: str) -> QuerySet[User]:
        """Busca usuarios por nombre, email o username."""
        return User.objects.filter(
            username__icontains=query
        ) or User.objects.filter(
            email__icontains=query
        ) or User.objects.filter(
            first_name__icontains=query
        ) or User.objects.filter(
            last_name__icontains=query
        ) or User.objects.filter(
            company_name__icontains=query
        )
    
    @staticmethod
    def count_by_user_type() -> Dict:
        """Cuenta usuarios por tipo."""
        return {
            'total': User.objects.count(),
            'professional': User.objects.filter(user_type='professional').count(),
            'consultant_company': User.objects.filter(user_type='consultant_company').count(),
            'direct_company': User.objects.filter(user_type='direct_company').count(),
            'super_admin': User.objects.filter(user_type='super_admin').count(),
        }


class RoleRepository:
    """
    Repository pattern para operaciones de Role.
    """
    
    @staticmethod
    def create(role_data: Dict) -> Role:
        """Crea un nuevo rol."""
        return Role.objects.create(**role_data)
    
    @staticmethod
    def get_by_id(role_id: int) -> Optional[Role]:
        """Obtiene un rol por ID."""
        try:
            return Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return None
    
    @staticmethod
    def get_by_name(name: str) -> Optional[Role]:
        """Obtiene un rol por nombre."""
        try:
            return Role.objects.get(name=name)
        except Role.DoesNotExist:
            return None
    
    @staticmethod
    def get_all() -> QuerySet[Role]:
        """Obtiene todos los roles."""
        return Role.objects.all()
    
    @staticmethod
    def update(role: Role, update_data: Dict) -> Role:
        """Actualiza un rol existente."""
        for key, value in update_data.items():
            if key == 'permissions' and isinstance(value, list):
                role.permissions.set(value)
            else:
                setattr(role, key, value)
        role.save()
        return role
    
    @staticmethod
    def delete(role: Role) -> bool:
        """Elimina un rol."""
        try:
            role.delete()
            return True
        except Exception:
            return False


class PermissionRepository:
    """
    Repository pattern para operaciones de Permission.
    """
    
    @staticmethod
    def create(permission_data: Dict) -> Permission:
        """Crea un nuevo permiso."""
        return Permission.objects.create(**permission_data)
    
    @staticmethod
    def get_by_id(permission_id: int) -> Optional[Permission]:
        """Obtiene un permiso por ID."""
        try:
            return Permission.objects.get(id=permission_id)
        except Permission.DoesNotExist:
            return None
    
    @staticmethod
    def get_by_name(name: str) -> Optional[Permission]:
        """Obtiene un permiso por nombre."""
        try:
            return Permission.objects.get(name=name)
        except Permission.DoesNotExist:
            return None
    
    @staticmethod
    def get_all() -> QuerySet[Permission]:
        """Obtiene todos los permisos."""
        return Permission.objects.all()
    
    @staticmethod
    def update(permission: Permission, update_data: Dict) -> Permission:
        """Actualiza un permiso existente."""
        for key, value in update_data.items():
            setattr(permission, key, value)
        permission.save()
        return permission
    
    @staticmethod
    def delete(permission: Permission) -> bool:
        """Elimina un permiso."""
        try:
            permission.delete()
            return True
        except Exception:
            return False