// URL base para la API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

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
          user: result.user
        };
      }
      
      return {
        success: false,
        message: result.detail || 'Error en el registro'
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
        return {
          success: false,
          message: 'No hay sesión activa'
        };
      }
      
      const response = await fetch(`${API_URL}/auth/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
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
          'Authorization': `Bearer ${token}`
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
        message: result.detail || 'Error al actualizar el perfil'
      };
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },
  
  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
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