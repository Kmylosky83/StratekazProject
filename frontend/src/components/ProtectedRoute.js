import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth/AuthService';
import { AuthContext } from '../context/SimpleAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, profileCompleted, loading } = useContext(AuthContext);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  useEffect(() => {
    const checkProfileStatus = async () => {
      // Si ya tenemos la información del contexto, usarla directamente
      if (!loading) {
        if (!isAuthenticated) {
          setIsCheckingProfile(false);
          return;
        }

        if (profileCompleted !== null) {
          setIsProfileComplete(profileCompleted);
          setIsCheckingProfile(false);
          return;
        }
      }

      // Si no hay información en el contexto, verificar con el servicio
      try {
        // Verificar si el usuario está autenticado
        if (!authService.isAuthenticated()) {
          setIsProfileComplete(false);
          setIsCheckingProfile(false);
          return;
        }
        
        // Intentar obtener el estado del perfil del almacenamiento local primero
        const storageType = localStorage.getItem('authToken') ? localStorage : sessionStorage;
        const userData = JSON.parse(storageType.getItem('user') || '{}');
        
        if (userData && userData.profile_completed !== undefined) {
          setIsProfileComplete(userData.profile_completed);
          setIsCheckingProfile(false);
          return;
        }
        
        // Si no está en almacenamiento local, consultar al servidor
        const response = await authService.getUserProfile();
        if (response.success) {
          setIsProfileComplete(response.data.profile_completed);
        } else {
          // Si hay error, asumir que no está completo
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error('Error al verificar perfil:', error);
        setIsProfileComplete(false);
      } finally {
        setIsCheckingProfile(false);
      }
    };
    
    checkProfileStatus();
  }, [isAuthenticated, profileCompleted, loading]);

  // Mostrar indicador de carga mientras se verifica
  if (isCheckingProfile) {
    return <div className="loading">Verificando usuario...</div>;
  }

  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no ha completado el perfil
  if (!isProfileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  // Si está autenticado y ha completado el perfil, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;