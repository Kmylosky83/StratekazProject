// features/auth/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    const result = await authService.login(credentials);
    
    if (result.success) {
      setUser(result.user);
      setError(null);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    const result = await authService.register(userData);
    
    if (result.success) {
      setUser(result.user);
      setError(null);
    } else {
      setError(result.error || 'Error en el registro');
    }
    
    setLoading(false);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);

    const result = await authService.updateProfile(profileData);
    
    if (result.success) {
      setUser(result.user);
      setError(null);
    } else {
      setError(result.error || 'Error al actualizar perfil');
    }
    
    setLoading(false);
    return result;
  }, []);

  const completeProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);

    const result = await authService.completeProfile(profileData);
    
    if (result.success) {
      setUser(result.user);
      setError(null);
    } else {
      setError(result.error || 'Error al completar perfil');
    }
    
    setLoading(false);
    return result;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!authService.isAuthenticated()) return;

    const profile = await authService.getProfile();
    if (profile) {
      setUser(profile);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    completeProfile,
    refreshProfile
  };
}