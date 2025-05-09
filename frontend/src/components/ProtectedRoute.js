import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth/AuthService';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(true);

  useEffect(() => {
    const checkProfileStatus = async () => {
      try {
        // Verificar si el usuario está autenticado
        if (!authService.isAuthenticated()) {
          setIsLoading(false);
          return;
        }
        
        // Verificar el estado del perfil consultando al servidor
        const response = await authService.getUserProfile();
        if (response.success) {
          setProfileCompleted(response.data.profile_completed);
        }
      } catch (error) {
        console.error('Error al verificar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkProfileStatus();
  }, []);

  // Mostrar indicador de carga mientras se verifica
  if (isLoading) {
    return <div className="loading">Verificando usuario...</div>;
  }

  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no ha completado el perfil
  if (!profileCompleted) {
    return <Navigate to="/complete-profile" replace />;
  }

  // Si está autenticado y ha completado el perfil, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;