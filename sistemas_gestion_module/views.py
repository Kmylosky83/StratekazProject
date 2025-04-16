from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_overview(request):
    return Response({"message": "Sistemas de Gestión API funcionando correctamente"})