// features/auth/services/authService.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class AuthService {
  constructor() {
    this.baseURL = `${API_BASE}/api/v1/auth`;
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user, token: data.access };
      }
      
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user, token: data.access };
      }
      
      return { success: false, errors: data.errors };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  async getProfile() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/profile/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  }

  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/profile/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      
      return { success: false, errors: data.errors };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  async completeProfile(profileData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/profile/complete/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      
      return { success: false, errors: data.errors };
    } catch (error) {
      console.error('Complete profile error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }
}

export default new AuthService();