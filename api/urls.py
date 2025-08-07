# api/urls.py
"""
Main API URL Configuration
Handles API versioning and routing
"""
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    """API root endpoint with version information"""
    return JsonResponse({
        'message': 'StrateKaz SaaS API',
        'version': '1.0.0',
        'available_versions': ['v1'],
        'documentation': '/api/v1/docs/',
        'current_version': 'v1',
        'endpoints': {
            'v1': '/api/v1/'
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('v1/', include('api.v1.urls', namespace='v1')),
]