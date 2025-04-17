import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUserTie, faBuilding, faIndustry } from '@fortawesome/free-solid-svg-icons';
import authService from '../../services/AuthService';
import '../../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    // Datos comunes
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Datos para profesional
    firstName: '',
    lastName: '',
    profession: '',
    
    // Datos para empresa
    companyName: '',
    nit: '',
    industry: '',
    contactPosition: ''
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
      // Validación según tipo de usuario
      if (userType === 'professional') {
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        
        if (!formData.firstName) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio';
      } else {
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        
        if (!formData.companyName) newErrors.companyName = 'El nombre de la empresa es obligatorio';
        if (!formData.nit) newErrors.nit = 'El NIT es obligatorio';
      }
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
    
    if (userType === 'professional') {
      dataToSend.first_name = formData.firstName;
      dataToSend.last_name = formData.lastName;
      dataToSend.profession = formData.profession;
    } else {
      dataToSend.company_name = formData.companyName;
      dataToSend.nit = formData.nit;
      dataToSend.industry = formData.industry;
      dataToSend.contact_position = formData.contactPosition;
    }
    
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

  return (
    <div className="register-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="auth-card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h4 className="auth-title">Crea tu cuenta</h4>
                  <p className="auth-subtitle">Únete a StrateKaz y gestiona tus sistemas de forma eficiente</p>
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
                          className={`user-type-card ${userType === 'professional' ? 'selected' : ''}`}
                          onClick={() => selectUserType('professional')}
                        >
                          <div className="card-body text-center p-4">
                            <FontAwesomeIcon icon={faUserTie} className="fa-3x mb-3" />
                            <h6>Profesional Independiente</h6>
                            <p className="small text-muted">Para profesionales que trabajan de manera independiente</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`user-type-card ${userType === 'consultant_company' ? 'selected' : ''}`}
                          onClick={() => selectUserType('consultant_company')}
                        >
                          <div className="card-body text-center p-4">
                            <FontAwesomeIcon icon={faBuilding} className="fa-3x mb-3" />
                            <h6>Empresa Consultora</h6>
                            <p className="small text-muted">Para empresas que ofrecen servicios de consultoría</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`user-type-card ${userType === 'direct_company' ? 'selected' : ''}`}
                          onClick={() => selectUserType('direct_company')}
                        >
                          <div className="card-body text-center p-4">
                            <FontAwesomeIcon icon={faIndustry} className="fa-3x mb-3" />
                            <h6>Empresa Directa</h6>
                            <p className="small text-muted">Para empresas que utilizan la herramienta para su autogestión</p>
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
                    <h5 className="text-center mb-4">
                      {userType === 'professional' 
                        ? 'Información del Profesional' 
                        : 'Información de la Empresa'}
                    </h5>
                    
                    {userType === 'professional' ? (
                      <div className="professional-form">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Nombres</label>
                            <input
                              type="text"
                              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Apellidos</label>
                            <input
                              type="text"
                              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Profesión</label>
                          <input
                            type="text"
                            className="form-control"
                            name="profession"
                            value={formData.profession}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                    ) : (
                      <div className="company-form">
                        <div className="mb-3">
                          <label className="form-label">Nombre de la Empresa</label>
                          <input
                            type="text"
                            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                          />
                          {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">NIT</label>
                            <input
                              type="text"
                              className={`form-control ${errors.nit ? 'is-invalid' : ''}`}
                              name="nit"
                              value={formData.nit}
                              onChange={handleInputChange}
                            />
                            {errors.nit && <div className="invalid-feedback">{errors.nit}</div>}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Sector</label>
                            <select
                              className="form-select"
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                            >
                              <option value="">Seleccionar sector...</option>
                              <option value="tecnologia">Tecnología</option>
                              <option value="construccion">Construcción</option>
                              <option value="servicios">Servicios</option>
                              <option value="manufactura">Manufactura</option>
                              <option value="salud">Salud</option>
                              <option value="educacion">Educación</option>
                              <option value="energia">Energía</option>
                              <option value="transporte">Transporte</option>
                              <option value="otros">Otros</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Cargo del Contacto</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contactPosition"
                            value={formData.contactPosition}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email de Contacto</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                  </div>
                )}

                {/* Paso 3: Términos y condiciones */}
                {currentStep === 3 && (
                  <div className="step">
                    <h5 className="text-center mb-4">Términos y Condiciones</h5>
                    <div className="terms-container p-3 mb-3" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
                      <h6>1. Aceptación de los Términos</h6>
                      <p>Al registrarse y utilizar StrateKaz, usted acepta estar sujeto a estos términos y condiciones.</p>
                      
                      <h6>2. Uso del Servicio</h6>
                      <p>El servicio debe utilizarse de acuerdo con todas las leyes aplicables y de manera ética.</p>
                      
                      <h6>3. Cuenta de Usuario</h6>
                      <p>Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</p>
                      
                      <h6>4. Privacidad y Datos</h6>
                      <p>La información proporcionada será tratada según nuestra política de privacidad.</p>
                      
                      <h6>5. Limitación de Responsabilidad</h6>
                      <p>StrateKaz no será responsable por daños indirectos, incidentales o consecuentes.</p>
                    </div>
                    
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                        id="acceptTerms"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                      />
                      <label className="form-check-label" htmlFor="acceptTerms">
                        He leído y acepto los términos y condiciones
                      </label>
                      {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                    </div>
                    
                    <p className="text-center mb-0">
                      Al registrarte, también aceptas nuestra <a href="#" className="text-decoration-underline">Política de Privacidad</a>
                    </p>
                  </div>
                )}

                {/* Botones de navegación */}
                <div className="nav-buttons d-flex justify-content-between mt-4">
                  {currentStep > 1 && (
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={prevStep}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                      Anterior
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button 
                      id="nextBtn"
                      className={`btn btn-primary ${!userType && currentStep === 1 ? 'disabled' : ''}`}
                      onClick={nextStep}
                    >
                      Siguiente
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Completar Registro
                    </button>
                  )}
                </div>
                
                <div className="text-center mt-4">
                  <p>¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Inicia sesión aquí</Link></p>
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