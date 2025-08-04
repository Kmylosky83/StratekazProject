#!/usr/bin/env python3
"""
Script para probar todos los tipos de usuario y sus flujos de completar perfil
"""

import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8004/api"

def register_and_complete_profile(user_type, user_data, profile_data):
    """Registrar usuario y completar perfil según tipo"""
    print(f"\n{'='*60}")
    print(f"PROBANDO TIPO DE USUARIO: {user_type.upper()}")
    print(f"{'='*60}")
    
    # 1. Registro
    print(f"1. Registrando usuario {user_type}...")
    registration_data = {
        "username": f"test_{user_type}",
        "email": f"test_{user_type}@example.com",
        "password": "testpass123",
        "user_type": user_type
    }
    registration_data.update(user_data)
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", 
                               json=registration_data,
                               headers={"Content-Type": "application/json"})
        
        print(f"   Status: {response.status_code}")
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and data.get('access'):
                token = data.get('access')
                user = data.get('user')
                print(f"   Registro exitoso - Token: {token[:20]}...")
                print(f"   Usuario ID: {user.get('id')}, profile_completed: {user.get('profile_completed')}")
                
                # 2. Completar perfil
                print(f"2. Completando perfil para {user_type}...")
                headers = {
                    "Authorization": f"Token {token}",
                    "Content-Type": "application/json"
                }
                
                complete_response = requests.post(f"{BASE_URL}/auth/profile/complete/",
                                               json=profile_data,
                                               headers=headers)
                
                print(f"   Status: {complete_response.status_code}")
                if complete_response.status_code == 200:
                    complete_data = complete_response.json()
                    print(f"   Perfil completado exitosamente")
                    print(f"   profile_completed: {complete_data.get('profile_completed')}")
                    
                    # Mostrar campos específicos por tipo
                    if user_type == 'professional':
                        print(f"   Nombre: {complete_data.get('first_name')} {complete_data.get('last_name')}")
                        print(f"   Profesion: {complete_data.get('profession')}")
                        print(f"   Identificacion: {complete_data.get('id_type')} {complete_data.get('id_number')}")
                    elif user_type in ['consultant_company', 'direct_company']:
                        print(f"   Empresa: {complete_data.get('company_name')}")
                        print(f"   NIT: {complete_data.get('nit')}")
                        print(f"   Contacto: {complete_data.get('contact_first_name')} {complete_data.get('contact_last_name')}")
                    
                    return True
                else:
                    print(f"   Error completando perfil: {complete_response.text}")
            else:
                print(f"   Registro sin token valido: {data}")
        else:
            result = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
            print(f"   Error en registro: {result}")
            
    except Exception as e:
        print(f"   Excepcion: {e}")
    
    return False

def main():
    print("Iniciando pruebas de tipos de usuario y flujos de completar perfil\n")
    
    tests = [
        # Profesional Independiente
        {
            'user_type': 'professional',
            'user_data': {},
            'profile_data': {
                'first_name': 'María',
                'last_name': 'García',
                'phone': '3157890123',
                'city': 'Medellín',
                'department': 'antioquia',
                'profession': 'Ingeniera Industrial',
                'id_type': 'CC',
                'id_number': '43567890'
            }
        },
        
        # Empresa Consultora
        {
            'user_type': 'consultant_company',
            'user_data': {},  
            'profile_data': {
                'company_name': 'Consultoría Estratégica SAS',
                'nit': '900123456-1',
                'phone': '6015551234',
                'city': 'Bogotá',
                'department': 'cundinamarca',
                'industry': 'Consultoría',
                'contact_first_name': 'Carlos',
                'contact_last_name': 'Rodríguez',
                'contact_id_type': 'CC',
                'contact_id_number': '80123456',
                'contact_position': 'Gerente General'
            }
        },
        
        # Empresa Directa
        {
            'user_type': 'direct_company',
            'user_data': {},
            'profile_data': {
                'company_name': 'Manufacturas del Norte LTDA',
                'nit': '800987654-2',
                'phone': '6047778899',
                'city': 'Barranquilla',
                'department': 'atlantico',
                'industry': 'Manufactura',
                'contact_first_name': 'Ana',
                'contact_last_name': 'Martínez',
                'contact_id_type': 'CC',
                'contact_id_number': '72456789',
                'contact_position': 'Directora de Operaciones'
            }
        },
        
        # Super Admin (registro básico)
        {
            'user_type': 'super_admin',
            'user_data': {},
            'profile_data': {
                'first_name': 'Admin',
                'last_name': 'Sistema',
                'phone': '3001112233'
            }
        }
    ]
    
    successful_tests = 0
    for test in tests:
        success = register_and_complete_profile(
            test['user_type'], 
            test['user_data'], 
            test['profile_data']
        )
        if success:
            successful_tests += 1
    
    print(f"\n{'='*60}")
    print(f"RESUMEN FINAL")
    print(f"{'='*60}")
    print(f"Pruebas exitosas: {successful_tests}/{len(tests)}")
    print(f"Tipos de usuario probados: {len(tests)}")
    
    if successful_tests == len(tests):
        print("\nTODOS LOS TIPOS DE USUARIO FUNCIONAN CORRECTAMENTE!")
        print("Sistema listo para manejo completo de tipos de usuario")
    else:
        print(f"\n{len(tests) - successful_tests} tipos de usuario requieren atencion")

if __name__ == "__main__":
    main()