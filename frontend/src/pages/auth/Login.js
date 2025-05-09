import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import authService from '../../services/auth/AuthService';
import '../../styles/login.css';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Obtener funciones del contexto de autenticación si existe
  const authContext = useContext(AuthContext);

  // Mostrar mensaje de éxito si viene redirigido del registro
  const successMessage = location.state?.success || '';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: val
    });
    
    // Limpiar error específico
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log('Enviando datos de login:', formData);
      const response = await authService.login(formData);
      console.log('Respuesta de login:', response);
      
      if (response.success) {
        console.log('Login exitoso, token recibido:', response.token);
        // Añadir estos logs para ver el contenido exacto
        console.log('Datos completos del usuario:', JSON.stringify(response.user));
        console.log('Valor de profile_completed:', response.user.profile_completed);
        console.log('Tipo de profile_completed:', typeof response.user.profile_completed);
        
        // Guardar token en localStorage o sessionStorage según remember
        if (formData.remember) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log('Token y usuario guardados en localStorage');
        } else {
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
          console.log('Token y usuario guardados en sessionStorage');
        }
        
        // Actualizar el contexto si existe
        if (authContext) {
          if (authContext.login) {
            authContext.login(response);
          }
          if (authContext.updateProfileStatus) {
            authContext.updateProfileStatus(response.user.profile_completed === true);
          }
        }
        
        // Verificación más robusta
        if (response.user.profile_completed === true) {
          console.log('Perfil completo, redirigiendo al dashboard...');
          navigate('/dashboard');
        } else {
          console.log('Perfil incompleto, redirigiendo a completar perfil...');
          navigate('/complete-profile');
        }
      } else {
        console.error('Error en login:', response.message);
        setErrors({ general: response.message || 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setErrors({ general: 'Error de conexión. Inténtalo más tarde.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="auth-card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="auth-title">Iniciar Sesión</h4>
                  <p className="auth-subtitle">Accede a tu cuenta de StrateKaz</p>
                </div>
                
                {successMessage && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}
                
                {errors.general && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errors.general}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@correo.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label">
                        <FontAwesomeIcon icon={faLock} className="me-2" />
                        Contraseña
                      </label>
                      <Link to="/recuperar-contrasena" className="forgot-password">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Tu contraseña"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberCheck"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="rememberCheck">
                      Recordarme
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mt-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    )}
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </button>
                  
                  <div className="text-center mt-4">
                    <p>¿No tienes una cuenta? <Link to="/register" className="text-primary">Regístrate aquí</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;