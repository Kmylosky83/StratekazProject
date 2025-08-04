import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserCheck, Building2, Factory, Home } from 'lucide-react';
import styled from 'styled-components';
import authService from '../../services/auth/AuthService';
import PolicyModal from '../../components/modals/PolicyModal';
import { Card_Selection, Grid, Button, Container_Auth, Auth_Card, Auth_Header, Auth_Content, Auth_Footer, Auth_NavButtons } from '../../design-system/components';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({

  // Datos comunes (mantener solo estos)
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// También necesitaremos estado para el indicador de seguridad
const [passwordStrength, setPasswordStrength] = useState({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false,
  score: 0
});
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Actualizar barra de progreso al cambiar de paso
  useEffect(() => {
    const progressValue = (currentStep - 1) * 50;
    setProgress(progressValue);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Evaluar fortaleza de contraseña si es ese campo
    if (name === 'password') {
      const strength = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
        score: 0
      };
      
      // Calcular puntuación
      strength.score = [
        strength.length,
        strength.uppercase,
        strength.lowercase,
        strength.number,
        strength.special
      ].filter(Boolean).length;
      
      setPasswordStrength(strength);
    }
    
    // Limpiar error específico cuando el usuario empieza a corregir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const selectUserType = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      user_type: type
    });
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!userType) {
        newErrors.userType = 'Debes seleccionar un tipo de usuario';
        return { valid: false, errors: newErrors };
      }
    }
    
    if (step === 2) {
      if (!formData.email) newErrors.email = 'El email es obligatorio';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
      
      if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
      else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (step === 3) {
      if (!termsAccepted) {
        newErrors.terms = 'Debes aceptar los términos y condiciones';
      }
    }
    
    setErrors(newErrors);
    return { valid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const nextStep = () => {
    const { valid } = validateStep(currentStep);
    if (valid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const { valid } = validateStep(3);
    if (!valid) return;

    // Preparar datos para enviar según tipo de usuario
    const dataToSend = {
    username: formData.email.split('@')[0], // Generar username del email
    email: formData.email,
    password: formData.password,
    user_type: userType
  };
    
    try {
      const response = await authService.register(dataToSend);
      if (response.success) {
        // Mostrar mensaje de éxito y redireccionar
        createConfetti(); // Función para crear efectos de confeti
        setTimeout(() => {
          navigate('/login', { state: { success: 'Registro exitoso. Por favor inicia sesión.' } });
        }, 2000);
      } else {
        setErrors({ general: response.message || 'Error en el registro. Por favor intenta nuevamente.' });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión. Por favor intenta más tarde.' });
    }
  };

  // Función para crear efectos de confeti (implementación simplificada)
  const createConfetti = () => {
    // Implementación de confeti
    console.log('Confeti effect triggered');
    // Aquí iría la implementación real con una librería como canvas-confetti
  };

  const [policyModal, setPolicyModal] = useState({
    show: false,
    type: 'privacy' // o 'terms'
  });

  return (
    <Container_Auth>
      <Auth_Card>
        <Auth_Header
          title="Crea tu cuenta"
          subtitle="Únete a StrateKaz y gestiona tus sistemas de forma eficiente"
          progress={progress}
        />

        <Auth_Content>
          {errors.general && (
            <ErrorAlert>{errors.general}</ErrorAlert>
          )}

                {currentStep === 1 && (
                  <StepContainer>
                    <StepTitle>¿Qué tipo de usuario eres?</StepTitle>
                    <Grid columns={3} tablet={1} mobile={1} gap="large">
                      <Card_Selection
                        title="Profesional Independiente"
                        description="Para profesionales que trabajan de manera independiente"
                        icon={<UserCheck size={32} />}
                        selected={userType === 'professional'}
                        onClick={() => selectUserType('professional')}
                      />
                      <Card_Selection
                        title="Empresa Consultora"
                        description="Para empresas que ofrecen servicios de consultoría"
                        icon={<Building2 size={32} />}
                        selected={userType === 'consultant_company'}
                        onClick={() => selectUserType('consultant_company')}
                      />
                      <Card_Selection
                        title="Empresa Directa"
                        description="Para empresas que utilizan la herramienta para su autogestión"
                        icon={<Factory size={32} />}
                        selected={userType === 'direct_company'}
                        onClick={() => selectUserType('direct_company')}
                      />
                    </Grid>
                    {errors.userType && <ErrorText>{errors.userType}</ErrorText>}
                  </StepContainer>
                )}

                {currentStep === 2 && (
                  <StepContainer>
                    <StepTitle>Información de acceso</StepTitle>
                    
                    <FormGroup>
                      <FormLabel>Email</FormLabel>
                      <FormInput
                        type="email"
                        $hasError={!!errors.email}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </FormGroup>
                    
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Contraseña</FormLabel>
                        <FormInput
                          type="password"
                          $hasError={!!errors.password}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {errors.password && <ErrorText>{errors.password}</ErrorText>}
                        
                        {formData.password && (
                          <PasswordStrengthContainer>
                            <PasswordStrengthBadge $score={passwordStrength.score}>
                              {passwordStrength.score === 0 ? 'Muy débil' :
                              passwordStrength.score === 1 ? 'Débil' :
                              passwordStrength.score === 2 ? 'Media' :
                              passwordStrength.score === 3 ? 'Fuerte' :
                              'Muy fuerte'}
                            </PasswordStrengthBadge>
                            <PasswordChecklist>
                              <ChecklistItem $valid={passwordStrength.length}>
                                {passwordStrength.length ? '✓' : '✗'} Mínimo 8 caracteres
                              </ChecklistItem>
                              <ChecklistItem $valid={passwordStrength.lowercase}>
                                {passwordStrength.lowercase ? '✓' : '✗'} Una letra minúscula
                              </ChecklistItem>
                              <ChecklistItem $valid={passwordStrength.uppercase}>
                                {passwordStrength.uppercase ? '✓' : '✗'} Una letra mayúscula
                              </ChecklistItem>
                              <ChecklistItem $valid={passwordStrength.number}>
                                {passwordStrength.number ? '✓' : '✗'} Un número
                              </ChecklistItem>
                              <ChecklistItem $valid={passwordStrength.special}>
                                {passwordStrength.special ? '✓' : '✗'} Un carácter especial
                              </ChecklistItem>
                            </PasswordChecklist>
                          </PasswordStrengthContainer>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormInput
                          type="password"
                          $hasError={!!errors.confirmPassword}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                  </StepContainer>
                )}
                
                {currentStep === 3 && (
                  <StepContainer>
                    <StepTitle>Términos y Condiciones</StepTitle>              
                    
                    <CheckboxGroup>
                      <FormCheckbox
                        type="checkbox"
                        $hasError={!!errors.terms}
                        id="acceptTerms"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                      />
                      <CheckboxLabel htmlFor="acceptTerms">
                        He leído y acepto los <PolicyLink onClick={() => setPolicyModal({ show: true, type: 'terms' })}>Términos y Condiciones</PolicyLink>
                      </CheckboxLabel>
                      {errors.terms && <ErrorText>{errors.terms}</ErrorText>}
                    </CheckboxGroup>
                    
                    <PrivacyText>
                      Al registrarte, también aceptas nuestra <PolicyLink onClick={() => setPolicyModal({ show: true, type: 'privacy' })}>Política de Privacidad</PolicyLink>
                    </PrivacyText>
                  </StepContainer>
                )}

          <PolicyModal 
            show={policyModal.show} 
            handleClose={() => setPolicyModal({ ...policyModal, show: false })} 
            type={policyModal.type} 
          />
        </Auth_Content>

        <Auth_Footer>
          <Auth_NavButtons
            leftButton={
              currentStep === 1 ? (
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="medium">
                    <Home size={20} style={{ marginRight: '8px' }} />
                    Ir al Home
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="medium" onClick={prevStep}>
                  <ArrowLeft size={20} style={{ marginRight: '8px' }} />
                  Anterior
                </Button>
              )
            }
            rightButton={
              currentStep < 3 ? (
                <Button 
                  variant="primary"
                  size="medium"
                  onClick={nextStep}
                  disabled={!userType && currentStep === 1}
                >
                  Siguiente
                  <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </Button>
              ) : (
                <Button 
                  variant="primary"
                  size="medium"
                  onClick={handleSubmit}
                >
                  Completar Registro
                </Button>
              )
            }
          />
          
          <FooterText>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </FooterText>
        </Auth_Footer>
      </Auth_Card>
    </Container_Auth>
  );
};

// Styled Components
const ErrorAlert = styled.div`
  background-color: ${colors.dangerLight};
  color: ${colors.danger};
  padding: ${spacing.medium};
  border-radius: ${spacing.s1};
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colors.danger};
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.h5`
  text-align: center;
  margin-bottom: ${spacing.large};
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.medium};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${spacing.s1};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.text};
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.medium};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.div`
  color: ${colors.danger};
  font-size: ${typography.fontSizes.note};
  margin-top: ${spacing.s1};
`;

const PasswordStrengthContainer = styled.div`
  margin-top: ${spacing.small};
`;

const PasswordStrengthBadge = styled.span`
  display: inline-block;
  padding: ${spacing.s1} ${spacing.small};
  border-radius: ${spacing.s1};
  font-size: ${typography.fontSizes.note};
  font-weight: ${typography.fontWeights.medium};
  
  ${({ $score }) => {
    if ($score === 0) return `
      background-color: ${colors.passwordStrength.veryWeak.bg};
      color: ${colors.passwordStrength.veryWeak.text};
    `;
    if ($score === 1) return `
      background-color: ${colors.passwordStrength.weak.bg};
      color: ${colors.passwordStrength.weak.text};
    `;
    if ($score === 2) return `
      background-color: ${colors.passwordStrength.medium.bg};
      color: ${colors.passwordStrength.medium.text};
    `;
    if ($score === 3) return `
      background-color: ${colors.passwordStrength.strong.bg};
      color: ${colors.passwordStrength.strong.text};
    `;
    return `
      background-color: ${colors.passwordStrength.veryStrong.bg};
      color: ${colors.passwordStrength.veryStrong.text};
    `;
  }}
`;

const PasswordChecklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${spacing.small} 0 0 0;
`;

const ChecklistItem = styled.li`
  color: ${({ $valid }) => $valid ? colors.passwordChecklist.valid : colors.passwordChecklist.invalid};
  font-size: ${typography.fontSizes.note};
  margin-bottom: ${spacing.s1};
`;

const CheckboxGroup = styled.div`
  margin-bottom: ${spacing.medium};
`;

const FormCheckbox = styled.input`
  margin-right: ${spacing.small};
  accent-color: ${colors.primary};
  
  ${({ $hasError }) => $hasError && `
    border-color: ${colors.danger};
  `}
`;

const CheckboxLabel = styled.label`
  font-size: ${typography.fontSizes.base};
  color: ${colors.text};
  cursor: pointer;
`;

const PolicyLink = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  text-decoration: underline;
  padding: 0;
  cursor: pointer;
  font-size: inherit;
  
  &:hover {
    opacity: 0.8;
  }
`;

const PrivacyText = styled.p`
  text-align: center;
  margin: 0;
  color: ${colors.textMuted};
  font-size: ${typography.fontSizes.base};
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: ${spacing.medium};
  
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

export default Register;