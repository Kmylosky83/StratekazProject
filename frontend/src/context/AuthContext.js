// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth/AuthService';

// Crear el contexto
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  profileCompleted: false,
  loading: true,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const cachedUser = authService.getCachedUser();
          if (cachedUser) {
            setUser(cachedUser);
          } else {
            // Intentar obtener usuario del servidor
            try {
              const response = await authService.getUserProfile();
              if (response.success) {
                setUser(response.data);
              }
            } catch (error) {
              console.log('No se pudo obtener el perfil, usando datos cacheados');
              // Si falla, mantener null
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password, rememberMe);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Forzar logout local incluso si falla el servidor
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    profileCompleted: user?.profile_completed || false,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};