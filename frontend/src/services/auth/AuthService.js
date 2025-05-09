// URL base para la API
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const authService = {
  // Iniciar sesión
  login: async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      // Si la respuesta es exitosa, guardar el token
      if (response.ok) {
        return {
          success: true,
          token: result.token,
          user: result.user
        };
      }
      
      return {
        success: false,
        message: result.detail || 'Error al iniciar sesión'
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },
  
  // Registrar nuevo usuario
  register: async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          user: result
        };
      }
      
      return {
        success: false,
        message: result.detail || result.error || 'Error en el registro'
      };
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },
  
  // Obtener información del perfil de usuario
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        console.error('No hay token en localStorage ni sessionStorage');
        return {
          success: false,
          message: 'No hay sesión activa'
        };
      }
      console.log('Token encontrado:', token);
      
      const response = await fetch(`${API_URL}/auth/id/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`  // Cambiado de 'Bearer' a 'Token'
        }
      });

      console.log('Respuesta status:', response.status);
      
      const result = await response.json();
      console.log('Respuesta content:', result);
      
      if (response.ok) {
        return {
          success: true,
          data: result
        };
      }
      
      return {
        success: false,
        message: result.detail || 'Error al obtener el perfil'
      };
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  },
  
  // Actualizar perfil de usuario
  updateProfile: async (data) => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        return {
          success: false,
          message: 'No hay sesión activa'
        };
      }
      
      const response = await fetch(`${API_URL}/auth/profile/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          data: result
        };
      }
      
      return {
        success: false,
        message: result.detail || result.error || 'Error al actualizar el perfil'
      };
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  // Completar perfil de usuario
  completeProfile: async (data) => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        return {
          success: false,
          message: 'No hay sesión activa'
        };
      }
      
      const response = await fetch(`${API_URL}/auth/profile/complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`  // Usando Token
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          profile_completed: true,
          data: result
        };
      }
      
      return {
        success: false,
        message: result.detail || result.error || 'Error al completar el perfil'
      };
    } catch (error) {
      console.error('Error al completar perfil:', error);
      throw error;
    }
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('user');  // También eliminar datos de usuario
    
    return {
      success: true
    };
  },
  
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') ? true : false;
  }
};

export default authService;