import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserCheck, Building2, Factory, Home } from 'lucide-react';
import authService from '../../services/auth/AuthService';
import PolicyModal from '../../components/modals/PolicyModal';

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
    
    // Habilitar el botón de siguiente
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      nextBtn.classList.remove('disabled');
    }
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
    <div className="register-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="auth-card">
              <div className="card-body p-3">
                <div className="text-center mb-4">
                  <h4 className="titulo-seccion">Crea tu cuenta</h4>
                  <p className="subtitulo-seccion">Únete a StrateKaz y gestiona tus sistemas de forma eficiente</p>
                </div>

                <div className="progress mb-4" style={{ height: '4px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${progress}%` }} 
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                  </div>
                </div>

                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                {/* Paso 1: Selección de tipo de usuario */}
                {currentStep === 1 && (
                  <div className="step">
                    <h5 className="text-center mb-4">¿Qué tipo de usuario eres?</h5>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div 
                          className={`tarjeta-seleccion ${userType === 'professional' ? 'selected' : ''}`}
                          onClick={() => selectUserType('professional')}
                        >
                          <div className="card-body text-center p-4">
                            <UserCheck size={48} className="mb-3" />
                            <h6>Profesional Independiente</h6>
                            <p className="subtitulo-tarjeta">Para profesionales que trabajan de manera independiente</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`tarjeta-seleccion ${userType === 'consultant_company' ? 'selected' : ''}`}
                          onClick={() => selectUserType('consultant_company')}
                        >
                          <div className="card-body text-center p-4">
                            <Building2 size={48} className="mb-3" />
                            <h6>Empresa Consultora</h6>
                            <p className="subtitulo-tarjeta">Para empresas que ofrecen servicios de consultoría</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`tarjeta-seleccion ${userType === 'direct_company' ? 'selected' : ''}`}
                          onClick={() => selectUserType('direct_company')}
                        >
                          <div className="card-body text-center p-4">
                            <Factory size={48} className="mb-3" />
                            <h6>Empresa Directa</h6>
                            <p className="subtitulo-tarjeta">Para empresas que utilizan la herramienta para su autogestión</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.userType && <div className="text-danger mt-2">{errors.userType}</div>}
                  </div>
                )}

                {/* Paso 2: Formulario según tipo de usuario */}
                {currentStep === 2 && (
                  <div className="step">
                    <h5 className="text-center mb-4">Información de acceso</h5>
                    
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        
                        {/* Indicador de seguridad */}
                        {formData.password && (
                          <div className="mt-2">
                            <div className="password-strength">
                              <span className={`strength-badge ${
                                passwordStrength.score === 0 ? 'very-weak' :
                                passwordStrength.score === 1 ? 'weak' :
                                passwordStrength.score === 2 ? 'medium' :
                                passwordStrength.score === 3 ? 'strong' :
                                'very-strong'
                              }`}>
                                {passwordStrength.score === 0 ? 'Muy débil' :
                                passwordStrength.score === 1 ? 'Débil' :
                                passwordStrength.score === 2 ? 'Media' :
                                passwordStrength.score === 3 ? 'Fuerte' :
                                'Muy fuerte'}
                              </span>
                            </div>
                            <ul className="password-checklist">
                              <li className={passwordStrength.length ? 'valid' : 'invalid'}>
                                {passwordStrength.length ? '✓' : '✗'} Mínimo 8 caracteres
                              </li>
                              <li className={passwordStrength.lowercase ? 'valid' : 'invalid'}>
                                {passwordStrength.lowercase ? '✓' : '✗'} Una letra minúscula
                              </li>
                              <li className={passwordStrength.uppercase ? 'valid' : 'invalid'}>
                                {passwordStrength.uppercase ? '✓' : '✗'} Una letra mayúscula
                              </li>
                              <li className={passwordStrength.number ? 'valid' : 'invalid'}>
                                {passwordStrength.number ? '✓' : '✗'} Un número
                              </li>
                              <li className={passwordStrength.special ? 'valid' : 'invalid'}>
                                {passwordStrength.special ? '✓' : '✗'} Un carácter especial
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input
                          type="password"
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Paso 3: Términos y condiciones */}
                {currentStep === 3 && (
                  <div className="step">
                    <h5 className="text-center mb-4">Términos y Condiciones</h5>              
                    
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                        id="acceptTerms"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                      />
                      <label className="form-check-label" htmlFor="acceptTerms">
                        He leído y acepto los <a href="#" onClick={(e) => { 
                          e.preventDefault(); 
                          setPolicyModal({ show: true, type: 'terms' }); 
                        }} className="boton-texto">Términos y Condiciones</a>
                      </label>
                      {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                    </div>
                    
                    <p className="text-center mb-0">
                      Al registrarte, también aceptas nuestra <a href="#" onClick={(e) => { 
                        e.preventDefault(); 
                        setPolicyModal({ show: true, type: 'privacy' }); 
                      }} className="text-decoration-underline">Política de Privacidad</a>
                    </p>
                    </div>
                )}

                    <PolicyModal 
                      show={policyModal.show} 
                      handleClose={() => setPolicyModal({ ...policyModal, show: false })} 
                      type={policyModal.type} 
                    />

                {/* Botones de navegación */}
                <div className="nav-buttons d-flex justify-content-between mt-4">
                  {/* Lado izquierdo */}
                  <div>
                    {currentStep === 1 ? (
                      <Link 
                        to="/" 
                        className="boton-secundario"
                      >
                        <Home size={20} className="me-2" />
                        Ir al Home
                      </Link>
                    ) : (
                      <button 
                        className="boton-secundario"
                        onClick={prevStep}
                      >
                        <ArrowLeft size={20} className="me-2" />
                        Anterior
                      </button>
                    )}
                  </div>
                  
                  {/* Lado derecho */}
                  <div>
                    {currentStep < 3 ? (
                      <button 
                        id="nextBtn"
                        className={`boton-tarjeta ${userType ? 'activo' : 'disabled'}`}
                        onClick={nextStep}
                        disabled={!userType && currentStep === 1}
                      >
                        Siguiente
                        <ArrowRight size={20} className="ms-2" />
                      </button>
                    ) : (
                      <button 
                        className="boton-primario"
                        onClick={handleSubmit}
                      >
                        Completar Registro
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="subtitulo-tarjeta">
                  <p>¿Ya tienes una cuenta? <Link to="/login" className="boton-texto">Inicia sesión aquí</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;