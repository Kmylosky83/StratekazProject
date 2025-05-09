// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth/AuthService';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Obtener datos de usuario almacenados
          const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
          setUser(storedUser);
          setIsAuthenticated(true);
          setProfileCompleted(!!storedUser.profile_completed);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Método para iniciar sesión
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      setUser(response.user);
      setIsAuthenticated(true);
      setProfileCompleted(!!response.user.profile_completed);
    }
    return response;
  };

  // Método para cerrar sesión
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setProfileCompleted(false);
  };

  // Método para actualizar estado del perfil
  const updateProfileStatus = (status) => {
    setProfileCompleted(status);
    // Actualizar también en almacenamiento local
    if (user) {
      const updatedUser = { ...user, profile_completed: status };
      setUser(updatedUser);
      
      if (localStorage.getItem('authToken')) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else if (sessionStorage.getItem('authToken')) {
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        profileCompleted, 
        loading, 
        login, 
        logout,
        updateProfileStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};