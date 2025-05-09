import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUserTie, faBuilding, faIndustry, faHome } from '@fortawesome/free-solid-svg-icons';
import authService from '../../services/auth/AuthService';
import '../../styles/register.css';
import PolicyModal from '../../components/modals/PolicyModal';

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
  department: '',
  city: '',
  contactNumber: '',
  idType: '',
  idNumber: '',
  
  // Datos para empresa
  companyName: '',
  nit: '',
  industry: '',
  contactPosition: '',
  contactFirstName: '',
  contactLastName: '',
  contactIdType: '',
  contactIdNumber: '',
  contactNumber: ''
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
      // Validación según tipo de usuario
      if (userType === 'professional') {
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        
        if (!formData.firstName) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio';
        if (!formData.idType) newErrors.idType = 'El tipo de identificación es obligatorio';
        if (!formData.idNumber) newErrors.idNumber = 'El número de identificación es obligatorio';
        if (!formData.contactNumber) newErrors.contactNumber = 'El número de contacto es obligatorio';
        else if (!/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = 'El número debe tener 10 dígitos';
      } else {
        if (!formData.email) newErrors.email = 'El email es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        
        if (!formData.companyName) newErrors.companyName = 'El nombre de la empresa es obligatorio';
        if (!formData.nit) newErrors.nit = 'El NIT es obligatorio';
        if (!formData.contactFirstName) newErrors.contactFirstName = 'El nombre del contacto es obligatorio';
        if (!formData.contactLastName) newErrors.contactLastName = 'El apellido del contacto es obligatorio';
        if (!formData.contactIdType) newErrors.contactIdType = 'El tipo de identificación del contacto es obligatorio';
        if (!formData.contactIdNumber) newErrors.contactIdNumber = 'El número de identificación del contacto es obligatorio';
        if (!formData.contactPhone) newErrors.contactPhone = 'El número de contacto es obligatorio';
        else if (!/^\d{10}$/.test(formData.contactPhone)) newErrors.contactPhone = 'El número debe tener 10 dígitos';
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
      dataToSend.department = formData.department;
      dataToSend.city = formData.city;
      dataToSend.id_type = formData.idType;
      dataToSend.id_number = formData.idNumber;
      dataToSend.contact_number = formData.contactNumber;
    } else {
      dataToSend.company_name = formData.companyName;
      dataToSend.nit = formData.nit;
      dataToSend.industry = formData.industry;
      dataToSend.contact_position = formData.contactPosition;
      dataToSend.contact_first_name = formData.contactFirstName;
      dataToSend.contact_last_name = formData.contactLastName;
      dataToSend.contact_id_type = formData.contactIdType;
      dataToSend.contact_id_number = formData.contactIdNumber;
      dataToSend.contact_phone = formData.contactPhone;
      dataToSend.department = formData.department;
      dataToSend.city = formData.city;
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
                            <FontAwesomeIcon icon={faUserTie} className="fa-3x mb-3" />
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
                            <FontAwesomeIcon icon={faBuilding} className="fa-3x mb-3" />
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
                            <FontAwesomeIcon icon={faIndustry} className="fa-3x mb-3" />
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
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Tipo de Identificación</label>
                          <select
                            className={`form-select ${errors.idType ? 'is-invalid' : ''}`}
                            name="idType"
                            value={formData.idType}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccionar tipo...</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>                            
                            <option value="PP">Pasaporte</option>
                            <option value="NIT">NIT</option>
                          </select>
                          {errors.idType && <div className="invalid-feedback">{errors.idType}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Número de Identificación</label>
                          <input
                            type="text"
                            className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                          />
                          {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
                        </div>
                      </div>
                      <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Profesión</label>
                        <input
                          type="text"
                          className="form-control"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="col-md-6">
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
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Número de Contacto</label>
                        <input
                          type="text"
                          className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="10 dígitos"
                        />
                        {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Departamento</label>
                          <select
                            className="form-select"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccionar departamento...</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Arauca">Arauca</option>
                            <option value="Atlántico">Atlántico</option>
                            <option value="Bolívar">Bolívar</option>
                            <option value="Boyacá">Boyacá</option>
                            <option value="Caldas">Caldas</option>
                            <option value="Caquetá">Caquetá</option>
                            <option value="Casanare">Casanare</option>
                            <option value="Cauca">Cauca</option>
                            <option value="Cesar">Cesar</option>
                            <option value="Chocó">Chocó</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Guainía">Guainía</option>
                            <option value="Guaviare">Guaviare</option>
                            <option value="Huila">Huila</option>
                            <option value="La Guajira">La Guajira</option>
                            <option value="Magdalena">Magdalena</option>
                            <option value="Meta">Meta</option>
                            <option value="Nariño">Nariño</option>
                            <option value="Norte de Santander">Norte de Santander</option>
                            <option value="Putumayo">Putumayo</option>
                            <option value="Quindío">Quindío</option>
                            <option value="Risaralda">Risaralda</option>
                            <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                            <option value="Santander">Santander</option>
                            <option value="Sucre">Sucre</option>
                            <option value="Tolima">Tolima</option>
                            <option value="Valle del Cauca">Valle del Cauca</option>
                            <option value="Vaupés">Vaupés</option>
                            <option value="Vichada">Vichada</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Ciudad</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                          />
                        </div>
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
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Departamento</label>
                          <select
                            className="form-select"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccionar departamento...</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Arauca">Arauca</option>
                            <option value="Atlántico">Atlántico</option>
                            <option value="Bolívar">Bolívar</option>
                            <option value="Boyacá">Boyacá</option>
                            <option value="Caldas">Caldas</option>
                            <option value="Caquetá">Caquetá</option>
                            <option value="Casanare">Casanare</option>
                            <option value="Cauca">Cauca</option>
                            <option value="Cesar">Cesar</option>
                            <option value="Chocó">Chocó</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Guainía">Guainía</option>
                            <option value="Guaviare">Guaviare</option>
                            <option value="Huila">Huila</option>
                            <option value="La Guajira">La Guajira</option>
                            <option value="Magdalena">Magdalena</option>
                            <option value="Meta">Meta</option>
                            <option value="Nariño">Nariño</option>
                            <option value="Norte de Santander">Norte de Santander</option>
                            <option value="Putumayo">Putumayo</option>
                            <option value="Quindío">Quindío</option>
                            <option value="Risaralda">Risaralda</option>
                            <option value="San Andrés y Providencia">San Andrés y Providencia</option>
                            <option value="Santander">Santander</option>
                            <option value="Sucre">Sucre</option>
                            <option value="Tolima">Tolima</option>
                            <option value="Valle del Cauca">Valle del Cauca</option>
                            <option value="Vaupés">Vaupés</option>
                            <option value="Vichada">Vichada</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Ciudad</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <h6 className="mt-4 mb-3">Información del Contacto</h6>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Nombres</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactFirstName ? 'is-invalid' : ''}`}
                            name="contactFirstName"
                            value={formData.contactFirstName}
                            onChange={handleInputChange}
                          />
                          {errors.contactFirstName && <div className="invalid-feedback">{errors.contactFirstName}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Apellidos</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactLastName ? 'is-invalid' : ''}`}
                            name="contactLastName"
                            value={formData.contactLastName}
                            onChange={handleInputChange}
                          />
                          {errors.contactLastName && <div className="invalid-feedback">{errors.contactLastName}</div>}
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Tipo de Identificación</label>
                          <select
                            className={`form-select ${errors.contactIdType ? 'is-invalid' : ''}`}
                            name="contactIdType"
                            value={formData.contactIdType}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccionar tipo...</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>                            
                            <option value="PP">Pasaporte</option>
                          </select>
                          {errors.contactIdType && <div className="invalid-feedback">{errors.contactIdType}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Número de Identificación</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactIdNumber ? 'is-invalid' : ''}`}
                            name="contactIdNumber"
                            value={formData.contactIdNumber}
                            onChange={handleInputChange}
                          />
                          {errors.contactIdNumber && <div className="invalid-feedback">{errors.contactIdNumber}</div>}
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Cargo</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contactPosition"
                            value={formData.contactPosition}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Número de Contacto</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactPhone ? 'is-invalid' : ''}`}
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            placeholder="10 dígitos"
                          />
                          {errors.contactPhone && <div className="invalid-feedback">{errors.contactPhone}</div>}
                        </div>
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
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Ir al Home
                      </Link>
                    ) : (
                      <button 
                        className="boton-secundario"
                        onClick={prevStep}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
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
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
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