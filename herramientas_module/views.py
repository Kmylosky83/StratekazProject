# auth_module/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_overview(request):
    """Vista de prueba para verificar que el módulo funciona"""
    return Response({"message": "Auth Module API funcionando correctamente"})