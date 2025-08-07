import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserCheck, Building2, Factory, FileText } from 'lucide-react';
import styled from 'styled-components';
import authService from '../../services/auth/AuthService';
import TermsModal from '../../components/modals/TermsModal';
import PrivacyModal from '../../components/modals/PrivacyModal';
import { 
  Card_Selection, 
  Button,
  Section,
  Container
} from '../../design-system/components';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  // const [progress, setProgress] = useState(0); // Removed unused state
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

  // Progress tracking removed for compact design

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

  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <AuthPageWrapper>
      <CompactFormContainer $currentStep={currentStep}>
        {errors.general && (
          <ErrorAlert>{errors.general}</ErrorAlert>
        )}

        {currentStep === 1 && (
          <CompactStepContainer>
            <CompactStepTitle>¿Qué tipo de usuario eres?</CompactStepTitle>
            <UserTypeGrid>
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
            </UserTypeGrid>
            {errors.userType && <ErrorText>{errors.userType}</ErrorText>}
          </CompactStepContainer>
        )}

        {currentStep === 2 && (
          <CompactStepContainer>
            <CompactStepTitle>Información de acceso</CompactStepTitle>
            
            <SingleColumnForm>
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
              
              <FormGroup>
                <FormLabel>Contraseña</FormLabel>
                <FormInput
                  type="password"
                  $hasError={!!errors.password}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 8 caracteres"
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
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              </FormGroup>
            </SingleColumnForm>
          </CompactStepContainer>
        )}
        
        {currentStep === 3 && (
          <CompactStepContainer>
            <CompactStepTitle>Términos y Condiciones</CompactStepTitle>
            
            <SingleColumnForm>
              <TermsContainer>
                <TermsSummary>
                  <TermsIcon>
                    <FileText size={24} />
                  </TermsIcon>
                  <TermsContent>
                    <TermsTitle>Términos de Uso y Política de Privacidad</TermsTitle>
                    <TermsDescription>
                      Al crear tu cuenta aceptas nuestros términos de servicio y la forma en que protegemos tu información.
                    </TermsDescription>
                    <TermsActions>
                      <PolicyLink onClick={() => setTermsModalOpen(true)}>
                        Leer Términos Completos
                      </PolicyLink>
                      <span> • </span>
                      <PolicyLink onClick={() => setPrivacyModalOpen(true)}>
                        Política de Privacidad
                      </PolicyLink>
                    </TermsActions>
                  </TermsContent>
                </TermsSummary>
                
                <CheckboxGroup>
                  <FormCheckbox
                    type="checkbox"
                    $hasError={!!errors.terms}
                    id="acceptTerms"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                  <CheckboxLabel htmlFor="acceptTerms">
                    Acepto los términos y condiciones
                  </CheckboxLabel>
                </CheckboxGroup>
                {errors.terms && <ErrorText>{errors.terms}</ErrorText>}
              </TermsContainer>
            </SingleColumnForm>
          </CompactStepContainer>
        )}

        {/* Navegación */}
        <NavigationContainer>
          {currentStep === 1 ? (
            <Link to="/">
              <Button variant="outline" size="medium" icon={<ArrowLeft size={20} />}>
                Volver al Home
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="medium" onClick={prevStep} icon={<ArrowLeft size={20} />}>
              Anterior
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button 
              variant="primary"
              size="medium"
              onClick={nextStep}
              disabled={!userType && currentStep === 1}
              iconRight={<ArrowRight size={20} />}
            >
              Siguiente
            </Button>
          ) : (
            <Button 
              variant="primary"
              size="medium"
              onClick={handleSubmit}
            >
              Completar Registro
            </Button>
          )}
        </NavigationContainer>
        
        <FooterText>
          ¿Ya tienes una cuenta? <Link to="/login" onClick={() => window.scrollTo(0, 0)}>Inicia sesión aquí</Link>
        </FooterText>

        <TermsModal 
          isOpen={termsModalOpen} 
          onClose={() => setTermsModalOpen(false)}
          hideRegisterButton={true}
        />
        
        <PrivacyModal 
          isOpen={privacyModalOpen} 
          onClose={() => setPrivacyModalOpen(false)} 
        />
      </CompactFormContainer>
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
  padding: ${props => props.theme.spacing.s2};
`;

const CompactFormContainer = styled.div`
  max-width: ${({ $currentStep }) => $currentStep === 1 ? '1100px' : '480px'};
  width: 100%;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.s6};
  border-radius: ${props => props.theme.borderRadius.large};
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  border: 1px solid ${props => props.theme.card?.border || props.theme.colors.borderSubtle};
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.card};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.ctaHover(props.theme.colors.primary)};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.s4};
    margin: ${props => props.theme.spacing.s2};
  }
`;

const CompactStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s4};
  text-align: center;
  width: 100%;
`;

const CompactStepTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  text-align: center;
`;

const UserTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${props => props.theme.spacing.s3};
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s3};
  }
`;

const ErrorAlert = styled.div`
  background-color: #fee;
  color: #c33;
  padding: ${props => props.theme.spacing.s4};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.s4};
  border: 1px solid #c33;
  text-align: center;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.s5};
  gap: ${props => props.theme.spacing.s3};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s3};
  }
  
  a {
    text-decoration: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.s1};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s4};
  border: 1px solid ${({ $hasError, theme }) => $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${props => props.theme.spacing.s1};
  font-size: ${props => props.theme.typography.fontSizes.base};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.focus || `${props.theme.colors.primary}20`};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.s4};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorText = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.note};
  margin-top: ${props => props.theme.spacing.s1};
`;

const PasswordStrengthContainer = styled.div`
  margin-top: ${props => props.theme.spacing.s2};
`;

const PasswordStrengthBadge = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.spacing.s1};
  font-size: ${props => props.theme.typography.fontSizes.note};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  
  ${({ $score, theme }) => {
    if ($score === 0) return `
      background-color: ${theme.colors.passwordStrength.veryWeak.bg};
      color: ${theme.colors.passwordStrength.veryWeak.text};
    `;
    if ($score === 1) return `
      background-color: ${theme.colors.passwordStrength.weak.bg};
      color: ${theme.colors.passwordStrength.weak.text};
    `;
    if ($score === 2) return `
      background-color: ${theme.colors.passwordStrength.medium.bg};
      color: ${theme.colors.passwordStrength.medium.text};
    `;
    if ($score === 3) return `
      background-color: ${theme.colors.passwordStrength.strong.bg};
      color: ${theme.colors.passwordStrength.strong.text};
    `;
    return `
      background-color: ${theme.colors.passwordStrength.veryStrong.bg};
      color: ${theme.colors.passwordStrength.veryStrong.text};
    `;
  }}
`;

const PasswordChecklist = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.s2} 0 0 0;
`;

const ChecklistItem = styled.li`
  color: ${({ $valid, theme }) => $valid ? theme.colors.passwordChecklist.valid : theme.colors.passwordChecklist.invalid};
  font-size: ${props => props.theme.typography.fontSizes.note};
  margin-bottom: ${props => props.theme.spacing.s1};
`;

const CheckboxGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FormCheckbox = styled.input`
  margin-right: ${props => props.theme.spacing.s2};
  accent-color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  
  ${({ $hasError, theme }) => $hasError && `
    border-color: ${theme.colors.danger};
  `}
`;

const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSizes.base};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
`;

const PolicyLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
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
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.base};
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.s6};
  padding-top: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.borderSubtle};
  color: ${props => props.theme.colors.textMuted};
  
  a {
    color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const SingleColumnForm = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
`;

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
  width: 100%;
`;

const TermsSummary = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.card?.backgroundLight || props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.card?.border || props.theme.colors.borderSubtle};
`;

const TermsIcon = styled.div`
  color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.primary};
  flex-shrink: 0;
  padding-top: ${props => props.theme.spacing.s1};
`;

const TermsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s2};
`;

const TermsTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const TermsDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const TermsActions = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  
  span {
    color: ${props => props.theme.colors.borderSubtle};
  }
`;

export default Register;