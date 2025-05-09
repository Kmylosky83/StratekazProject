from django.http import JsonResponse

def index(request):
    return JsonResponse({"message": "API de diagnostico funcionando"})