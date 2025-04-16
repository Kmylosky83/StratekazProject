# auth_module/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



@api_view(['GET'])
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard(request):
    """Obtiene la configuración del dashboard según el tipo de usuario"""
    user = request.user
    
    # Verificar si el perfil está completo
    if not user.profile_completed:
        return Response({
            'redirect': 'complete-profile',
            'message': 'Debe completar su perfil primero'
        })
    
    # Configuración según tipo de usuario
    if user.user_type == 'professional':
        # Dashboard de 4 pilares para profesional independiente
        pillars = [
            'herramientas_productividad',
            'inteligencia_negocios',
            'mis_empresas',
            'ecosistema_empresarial'
        ]
    elif user.user_type == 'consultant_company':
        # Dashboard de 4 pilares para empresa consultora
        pillars = [
            'herramientas_productividad',
            'inteligencia_negocios',
            'mis_empresas',
            'ecosistema_empresarial'
        ]
    elif user.user_type == 'direct_company':
        # Dashboard de 3 pilares para empresa directa
        pillars = [
            'herramientas_productividad',
            'inteligencia_negocios',
            'ecosistema_empresarial'
        ]
    else:
        pillars = []
    
    return Response({
        'user_type': user.user_type,
        'pillars': pillars
    })