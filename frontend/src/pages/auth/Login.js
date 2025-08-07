import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Mail, Lock, LogIn, AlertTriangle } from 'lucide-react';
import { 
  FormContainer,
  StepContainer,
  StepTitle,
  Button 
} from '../../design-system/components';
import authService from '../../services/auth/AuthService';
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
  const [showRememberWarning, setShowRememberWarning] = useState(false);
  
  // Obtener funciones del contexto de autenticación si existe
  const authContext = useContext(AuthContext);

  // Mostrar mensaje de éxito si viene redirigido del registro
  const successMessage = location.state?.success || '';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    // Mostrar advertencia cuando se marca el checkbox de recordar
    if (name === 'remember' && checked) {
      setShowRememberWarning(true);
    }
    
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
    <AuthPageWrapper>
      <FormContainer>
        <StepContainer>
          <StepTitle>Iniciar Sesión</StepTitle>
          
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
          
          <LoginForm onSubmit={handleSubmit}>
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
            
            {showRememberWarning && formData.remember && (
              <WarningMessage>
                <AlertTriangle size={16} />
                <span>
                  Utiliza esta opción solo en equipos privados. No la actives en equipos de uso público o compartido.
                </span>
              </WarningMessage>
            )}
            
            <SubmitButton
              type="submit"
              variant="primary"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <LogIn size={20} />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </SubmitButton>
          </LoginForm>
          
          <FooterText>
            ¿No tienes una cuenta? <Link to="/register" onClick={() => window.scrollTo(0, 0)}>Regístrate aquí</Link>
          </FooterText>
        </StepContainer>
      </FormContainer>
    </AuthPageWrapper>
  );
};

// Styled Components
const AuthPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.s4};
`;

const SuccessAlert = styled.div`
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  color: ${props => props.theme.colors.success || props.theme.colors.primary};
  padding: ${props => props.theme.spacing.s4};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.s4};
  border: 1px solid ${props => props.theme.colors.success || props.theme.colors.primary};
  text-align: center;
`;

const ErrorAlert = styled.div`
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  color: ${props => props.theme.colors.danger || props.theme.colors.text};
  padding: ${props => props.theme.spacing.s4};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.s4};
  border: 1px solid ${props => props.theme.colors.danger || props.theme.colors.border};
  text-align: center;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  margin-bottom: ${props => props.theme.spacing.s2};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.s2};
`;

const ForgotPasswordLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.note};
  
  &:hover {
    opacity: 0.8;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
  border: 1px solid ${({ $hasError, theme }) => $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.typography.fontSizes.base};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.focus};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const ErrorText = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.note};
  margin-top: ${props => props.theme.spacing.s2};
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FormCheckbox = styled.input`
  margin-right: ${props => props.theme.spacing.s3};
  accent-color: ${props => props.theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSizes.base};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.s4};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s2};
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
  margin-top: ${props => props.theme.spacing.s6};
  padding-top: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.borderSubtle};
  color: ${props => props.theme.colors.textMuted};
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const WarningMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.warning || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.typography.fontSizes.note};
  color: ${props => props.theme.colors.warning || props.theme.colors.text};
  margin-top: -${props => props.theme.spacing.s3};
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${props => props.theme.colors.warning || props.theme.colors.primary};
  }
  
  span {
    line-height: 1.4;
  }
`;

export default Login;