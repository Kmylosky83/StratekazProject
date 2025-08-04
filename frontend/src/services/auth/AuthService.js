/**
 * Servicio de autenticación para StrateKaz SaaS
 * Maneja todas las operaciones de autenticación y gestión de sesión
 */

import config, { getApiUrl, getStorageKey } from '../../config';

class AuthService {
  constructor() {
    this.tokenKey = getStorageKey(config.auth.tokenKey);
    this.refreshTokenKey = getStorageKey(config.auth.refreshTokenKey);
    this.userKey = getStorageKey(config.auth.userKey);
    this.tenantKey = getStorageKey(config.auth.tenantKey);
  }

  /**
   * Obtener el token actual
   */
  getToken() {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  /**
   * Obtener el tenant actual
   */
  getTenant() {
    return localStorage.getItem(this.tenantKey) || sessionStorage.getItem(this.tenantKey);
  }

  /**
   * Guardar token y datos de usuario
   */
  saveAuthData(token, refreshToken, user, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.tokenKey, token);
    if (refreshToken) {
      storage.setItem(this.refreshTokenKey, refreshToken);
    }
    if (user) {
      storage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  /**
   * Limpiar todos los datos de autenticación
   */
  clearAuthData() {
    [localStorage, sessionStorage].forEach(storage => {
      storage.removeItem(this.tokenKey);
      storage.removeItem(this.refreshTokenKey);
      storage.removeItem(this.userKey);
      storage.removeItem(this.tenantKey);
    });
  }

  /**
   * Hacer petición con autenticación
   */
  async makeAuthRequest(endpoint, options = {}) {
    const token = this.getToken();
    const tenant = this.getTenant();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (tenant) {
      headers[config.tenant.headerName] = tenant;
    }

    try {
      const response = await fetch(getApiUrl(endpoint), {
        ...options,
        headers,
      });

      // Si el token expiró, intentar refrescar
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Reintentar la petición con el nuevo token
          headers['Authorization'] = `Bearer ${this.getToken()}`;
          return fetch(getApiUrl(endpoint), {
            ...options,
            headers,
          });
        }
      }

      return response;
    } catch (error) {
      console.error('Error en petición autenticada:', error);
      throw error;
    }
  }

  /**
   * Iniciar sesión
   */
  async login(loginData) {
    try {
      // Soporte para ambos formatos: objeto o parámetros individuales
      let email, password, rememberMe;
      
      if (typeof loginData === 'object' && loginData.email) {
        // Formato nuevo: objeto con propiedades
        email = loginData.email;
        password = loginData.password;
        rememberMe = loginData.remember || false;
      } else {
        // Formato legacy: parámetros individuales
        email = arguments[0];
        password = arguments[1];
        rememberMe = arguments[2] || false;
      }

      const response = await fetch(getApiUrl('/auth/login/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.saveAuthData(
          data.access,
          data.refresh,
          data.user,
          rememberMe
        );

        // Guardar tenant si viene en la respuesta
        if (data.tenant) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem(this.tenantKey, data.tenant);
        }

        return {
          success: true,
          user: data.user,
          tenant: data.tenant,
        };
      }

      return {
        success: false,
        message: data.detail || data.error || 'Error al iniciar sesión',
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error de conexión. Por favor, intenta más tarde.',
      };
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(userData) {
    try {
      const response = await fetch(getApiUrl('/auth/register/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login después del registro
        if (data.access) {
          this.saveAuthData(data.access, data.refresh, data.user, false);
        }

        return {
          success: true,
          user: data.user,
          message: 'Registro exitoso',
        };
      }

      return {
        success: false,
        message: data.detail || data.error || 'Error en el registro',
        errors: data.errors || {},
      };
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: 'Error de conexión. Por favor, intenta más tarde.',
      };
    }
  }

  /**
   * Refrescar token
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey) || 
                        sessionStorage.getItem(this.refreshTokenKey);

    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(getApiUrl('/auth/token/refresh/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
        storage.setItem(this.tokenKey, data.access);
        return true;
      }

      // Si el refresh token no es válido, hacer logout
      this.logout();
      return false;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      return false;
    }
  }

  /**
   * Obtener perfil del usuario
   */
  async getUserProfile() {
    try {
      const response = await this.makeAuthRequest('/auth/profile/', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar datos del usuario en storage
        const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
        storage.setItem(this.userKey, JSON.stringify(data));

        return {
          success: true,
          data,
        };
      }

      return {
        success: false,
        message: data.detail || 'Error al obtener el perfil',
      };
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      
      // Intentar devolver datos cacheados
      const cachedUser = this.getCachedUser();
      if (cachedUser) {
        return {
          success: true,
          data: cachedUser,
          cached: true,
        };
      }

      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(profileData) {
    try {
      const response = await this.makeAuthRequest('/auth/profile/', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar datos cacheados
        const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
        const currentUser = JSON.parse(storage.getItem(this.userKey) || '{}');
        const updatedUser = { ...currentUser, ...data };
        storage.setItem(this.userKey, JSON.stringify(updatedUser));

        return {
          success: true,
          data: updatedUser,
        };
      }

      return {
        success: false,
        message: data.detail || 'Error al actualizar el perfil',
        errors: data.errors || {},
      };
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  /**
   * Completar perfil del usuario
   */
  async completeProfile(profileData) {
    try {
      const response = await this.makeAuthRequest('/auth/profile/complete/', {
        method: 'POST',
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar datos cacheados
        const storage = localStorage.getItem(this.tokenKey) ? localStorage : sessionStorage;
        const updatedUser = { ...profileData, profile_completed: true };
        storage.setItem(this.userKey, JSON.stringify(updatedUser));

        return {
          success: true,
          data: updatedUser,
        };
      }

      return {
        success: false,
        message: data.detail || 'Error al completar el perfil',
        errors: data.errors || {},
      };
    } catch (error) {
      console.error('Error al completar perfil:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      const token = this.getToken();
      
      if (token) {
        // Notificar al backend
        await this.makeAuthRequest('/auth/logout/', {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Error al hacer logout en el servidor:', error);
    } finally {
      // Siempre limpiar datos locales
      this.clearAuthData();
      window.location.href = '/login';
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    // Verificar si el token no ha expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir a millisegundos
      return Date.now() < exp;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtener usuario cacheado
   */
  getCachedUser() {
    try {
      const userStr = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verificar si el perfil está completo
   */
  isProfileComplete() {
    const user = this.getCachedUser();
    return user?.profile_completed || false;
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await this.makeAuthRequest('/auth/change-password/', {
        method: 'POST',
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      return {
        success: response.ok,
        message: data.message || (response.ok ? 'Contraseña actualizada' : 'Error al cambiar contraseña'),
      };
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  /**
   * Solicitar restablecimiento de contraseña
   */
  async requestPasswordReset(email) {
    try {
      const response = await fetch(getApiUrl('/auth/password-reset/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      return {
        success: response.ok,
        message: data.message || (response.ok ? 'Email enviado' : 'Error al enviar email'),
      };
    } catch (error) {
      console.error('Error al solicitar reset:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }

  /**
   * Confirmar restablecimiento de contraseña
   */
  async confirmPasswordReset(token, newPassword) {
    try {
      const response = await fetch(getApiUrl('/auth/password-reset/confirm/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      return {
        success: response.ok,
        message: data.message || (response.ok ? 'Contraseña restablecida' : 'Error al restablecer'),
      };
    } catch (error) {
      console.error('Error al confirmar reset:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }
}

// Exportar instancia única (Singleton)
const authService = new AuthService();
export default authService;