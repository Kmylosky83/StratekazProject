import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;