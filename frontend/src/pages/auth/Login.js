import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Container_Auth, Auth_Card, Auth_Header, Auth_Content, Auth_Footer, Button } from '../../design-system/components';
import authService from '../../services/auth/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

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
    <Container_Auth>
      <Auth_Card>
        <Auth_Header
          title="Iniciar Sesión"
          subtitle="Accede a tu cuenta de StrateKaz"
        />

        <Auth_Content>
          {successMessage && (
            <SuccessAlert>
              {successMessage}
            </SuccessAlert>
          )}
          
          {errors.general && (
            <ErrorAlert>
              {errors.general}
            </ErrorAlert>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>
                <Mail size={16} />
                Email
              </FormLabel>
              <FormInput
                type="email"
                $hasError={!!errors.email}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com"
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>
            
            <FormGroup>
              <LabelRow>
                <FormLabel>
                  <Lock size={16} />
                  Contraseña
                </FormLabel>
                <ForgotPasswordLink to="/recuperar-contrasena">
                  ¿Olvidaste tu contraseña?
                </ForgotPasswordLink>
              </LabelRow>
              <FormInput
                type="password"
                $hasError={!!errors.password}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu contraseña"
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </FormGroup>
            
            <CheckboxGroup>
              <FormCheckbox
                type="checkbox"
                id="rememberCheck"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="rememberCheck">
                Recordarme
              </CheckboxLabel>
            </CheckboxGroup>
            
            <SubmitButton
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <LogIn size={20} />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </SubmitButton>
          </form>
        </Auth_Content>

        <Auth_Footer>
          <FooterText>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </FooterText>
        </Auth_Footer>
      </Auth_Card>
    </Container_Auth>
  );
};

// Styled Components
const SuccessAlert = styled.div`
  background-color: ${colors.successLight};
  color: ${colors.success};
  padding: ${spacing.medium};
  border-radius: ${spacing.s1};
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colors.success};
`;

const ErrorAlert = styled.div`
  background-color: ${colors.dangerLight};
  color: ${colors.danger};
  padding: ${spacing.medium};
  border-radius: ${spacing.s1};
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colors.danger};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.medium};
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.s1};
  margin-bottom: ${spacing.s1};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.text};
  font-size: ${typography.fontSizes.base};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.s1};
`;

const ForgotPasswordLink = styled(Link)`
  color: ${colors.primary};
  text-decoration: none;
  font-size: ${typography.fontSizes.note};
  
  &:hover {
    opacity: 0.8;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${({ $hasError }) => $hasError ? colors.danger : colors.border};
  border-radius: ${spacing.s1};
  font-size: ${typography.fontSizes.base};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.focus};
  }
  
  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const ErrorText = styled.div`
  color: ${colors.danger};
  font-size: ${typography.fontSizes.note};
  margin-top: ${spacing.s1};
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.medium};
`;

const FormCheckbox = styled.input`
  margin-right: ${spacing.small};
  accent-color: ${colors.primary};
`;

const CheckboxLabel = styled.label`
  font-size: ${typography.fontSizes.base};
  color: ${colors.text};
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  margin-top: ${spacing.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.s1};
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FooterText = styled.div`
  text-align: center;
  
  p {
    margin: 0;
    color: ${colors.textMuted};
  }
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Login;