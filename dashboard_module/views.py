# dashboard_module/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import DashboardService



@api_view(['GET'])
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard(request):
    """Obtiene la configuración del dashboard según el tipo de usuario"""
    dashboard_config = DashboardService.get_user_dashboard_config(request.user)
    dashboard_stats = DashboardService.get_dashboard_stats(request.user)
    
    response_data = {
        **dashboard_config,
        'stats': dashboard_stats
    }
    
    return Response(response_data)