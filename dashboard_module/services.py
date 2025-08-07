# dashboard_module/services.py
from typing import Dict, List
from auth_module.models import User


class DashboardService:
    """
    Servicio para la lógica del dashboard.
    Centraliza la configuración y datos del dashboard según el tipo de usuario.
    """
    
    @staticmethod
    def get_user_dashboard_config(user: User) -> Dict:
        """
        Obtiene la configuración del dashboard según el tipo de usuario.
        
        Args:
            user: Instancia del usuario
            
        Returns:
            Dict: Configuración del dashboard
        """
        if not user.profile_completed:
            return {
                'redirect': 'complete-profile',
                'message': 'Debe completar su perfil primero',
                'user_type': user.user_type,
                'pillars': []
            }
        
        pillars_config = DashboardService._get_pillars_by_user_type(user.user_type)
        
        return {
            'user_type': user.user_type,
            'pillars': pillars_config['pillars'],
            'pillar_details': pillars_config['details'],
            'user_info': {
                'name': DashboardService._get_user_display_name(user),
                'email': user.email,
                'profile_completed': user.profile_completed
            }
        }
    
    @staticmethod
    def _get_pillars_by_user_type(user_type: str) -> Dict:
        """
        Obtiene los pilares según el tipo de usuario.
        
        Args:
            user_type: Tipo de usuario
            
        Returns:
            Dict: Configuración de pilares
        """
        pillar_definitions = {
            'herramientas_productividad': {
                'name': 'Herramientas de Productividad',
                'description': 'Suite completa de herramientas para la gestión empresarial',
                'icon': 'tools',
                'modules': [
                    'formacion',
                    'documentacion', 
                    'analisis',
                    'comunicacion',
                    'diagnostico',
                    'inspecciones',
                    'matrices',
                    'planificacion'
                ]
            },
            'inteligencia_negocios': {
                'name': 'Inteligencia de Negocios',
                'description': 'Análisis y reportes para la toma de decisiones',
                'icon': 'analytics',
                'modules': [
                    'normas_iso',
                    'sst',
                    'pesv'
                ]
            },
            'mis_empresas': {
                'name': 'Mis Empresas',
                'description': 'Gestión de empresas clientes',
                'icon': 'building',
                'modules': [
                    'gestion_empresas',
                    'contratos',
                    'proyectos'
                ]
            },
            'ecosistema_empresarial': {
                'name': 'Ecosistema Empresarial',
                'description': 'Red de conexiones y oportunidades',
                'icon': 'network',
                'modules': [
                    'directorio',
                    'oportunidades',
                    'colaboraciones'
                ]
            },
            'finanzas': {
                'name': 'Finanzas',
                'description': 'Gestión financiera y facturación',
                'icon': 'money',
                'modules': [
                    'facturacion',
                    'reportes_financieros',
                    'presupuestos'
                ]
            }
        }
        
        if user_type == 'professional':
            pillars = [
                'herramientas_productividad',
                'inteligencia_negocios',
                'mis_empresas',
                'ecosistema_empresarial'
            ]
        elif user_type == 'consultant_company':
            pillars = [
                'herramientas_productividad',
                'inteligencia_negocios',
                'mis_empresas',
                'ecosistema_empresarial'
            ]
        elif user_type == 'direct_company':
            pillars = [
                'herramientas_productividad',
                'inteligencia_negocios',
                'ecosistema_empresarial'
            ]
        elif user_type == 'super_admin':
            pillars = [
                'herramientas_productividad',
                'inteligencia_negocios',
                'mis_empresas',
                'ecosistema_empresarial',
                'finanzas'
            ]
        else:
            pillars = []
        
        return {
            'pillars': pillars,
            'details': {pillar: pillar_definitions[pillar] for pillar in pillars if pillar in pillar_definitions}
        }
    
    @staticmethod
    def _get_user_display_name(user: User) -> str:
        """
        Obtiene el nombre de visualización del usuario.
        
        Args:
            user: Instancia del usuario
            
        Returns:
            str: Nombre para mostrar
        """
        if user.user_type == 'professional':
            if user.first_name and user.last_name:
                return f"{user.first_name} {user.last_name}"
            elif user.first_name:
                return user.first_name
        elif user.user_type in ['consultant_company', 'direct_company']:
            if user.company_name:
                return user.company_name
            elif user.contact_first_name and user.contact_last_name:
                return f"{user.contact_first_name} {user.contact_last_name}"
        
        return user.username
    
    @staticmethod
    def get_dashboard_stats(user: User) -> Dict:
        """
        Obtiene estadísticas básicas del dashboard para el usuario.
        
        Args:
            user: Instancia del usuario
            
        Returns:
            Dict: Estadísticas del dashboard
        """
        # Por ahora retornamos estadísticas básicas
        # TODO: Implementar estadísticas reales cuando los módulos estén listos
        return {
            'total_projects': 0,
            'active_companies': 0,
            'pending_tasks': 0,
            'this_month_activity': 0,
            'notifications': []
        }