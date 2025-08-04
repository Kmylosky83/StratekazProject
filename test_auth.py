#!/usr/bin/env python3
"""
Script para probar el sistema de autenticación completo
"""

import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8004/api"

def test_registration():
    """Probar registro completo"""
    print("Probando registro de usuario...")
    
    user_data = {
        "username": "testnew",
        "email": "testnew@example.com", 
        "password": "testpass123",
        "user_type": "professional"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", 
                               json=user_data,
                               headers={"Content-Type": "application/json"})
        
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and data.get('access'):
                print("Registro exitoso con auto-login")
                return data.get('access'), data.get('user')
            else:
                print("Registro exitoso pero sin token")
        else:
            print("Registro fallo")
            
    except Exception as e:
        print(f"Error en registro: {e}")
    
    return None, None

def test_login():
    """Probar login"""
    print("\nProbando login...")
    
    login_data = {
        "email": "test@example.com",
        "password": "test123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/login/",
                               json=login_data,
                               headers={"Content-Type": "application/json"})
        
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('access'):
                print("Login exitoso")
                return data.get('access'), data.get('user')
            else:
                print("Login sin formato correcto")
        else:
            print("Login fallo")
            
    except Exception as e:
        print(f"Error en login: {e}")
    
    return None, None

def test_complete_profile(token):
    """Probar completar perfil"""
    print("\nProbando completar perfil...")
    
    profile_data = {
        "first_name": "Juan",
        "last_name": "Pérez",
        "phone": "3001234567",
        "city": "Bogotá",
        "department": "cundinamarca",
        "profession": "Ingeniero",
        "id_type": "CC",
        "id_number": "12345678"
    }
    
    headers = {
        "Authorization": f"Token {token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/profile/complete/",
                               json=profile_data,
                               headers=headers)
        
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("Perfil completado exitosamente")
            return True
        else:
            print("Completar perfil fallo")
            
    except Exception as e:
        print(f"Error completando perfil: {e}")
    
    return False

def main():
    print("Iniciando pruebas de autenticacion completas\n")
    
    # Probar login con usuario existente
    token, user = test_login()
    
    if not token:
        # Si no funciona login, probar registro
        token, user = test_registration()
    
    if token and user:
        print(f"\nAutenticacion exitosa con token: {token[:20]}...")
        
        # Si el perfil no está completo, completarlo
        if not user.get('profile_completed'):
            print("\nPerfil incompleto, procediendo a completar...")
            test_complete_profile(token)
        else:
            print("\nPerfil ya esta completo")
            
        print("\nTodas las pruebas completadas!")
    else:
        print("\nNo se pudo autenticar. Revisa la configuracion del servidor.")
        sys.exit(1)

if __name__ == "__main__":
    main()