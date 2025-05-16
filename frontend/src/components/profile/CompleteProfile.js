import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUser, faBuilding, faPhone, faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import authService from '../../services/auth/AuthService';
import { AuthContext } from '../../context/AuthContext';

const CompleteProfile = () => {
  console.log("CompleteProfile: Componente montado");
  const navigate = useNavigate();
  const { updateProfileStatus } = React.useContext(AuthContext);
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({
    // Campos comunes
    phone: '',
    city: '',
    department: '',
    
    // Campos específicos para profesional
    firstName: '',
    lastName: '',
    profession: '',
    idType: '',          // Añadido
    idNumber: '',        // Añadido
    
    // Campos específicos para empresa
    companyName: '',
    nit: '',
    industry: '',
    contactPosition: '',
    contactFirstName: '', // Añadido
    contactLastName: '',  // Añadido
    contactIdType: '',    // Añadido
    contactIdNumber: ''   // Añadido
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Nuevo useEffect para verificar autenticación y estado del perfil
  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!authService.isAuthenticated()) {
      console.log("CompleteProfile: Usuario no autenticado, redirigiendo a login");
      navigate('/login');
      return;
    }
    
    // Si el perfil ya está completo, redirigir al dashboard
    const storageType = localStorage.getItem('authToken') ? localStorage : sessionStorage;
    const userData = JSON.parse(storageType.getItem('user') || '{}');
    if (userData.profile_completed) {
      console.log("CompleteProfile: Perfil ya completo, redirigiendo a dashboard");
      navigate('/dashboard');
    }
  }, [navigate]);

  // Añadir este nuevo useEffect para respaldo
  useEffect(() => {
    // Solo intentar recuperar si no tenemos userType
    if (!userType) {
      console.log("CompleteProfile: Intentando recuperar tipo de usuario del storage");
      const storageType = localStorage.getItem('authToken') ? localStorage : sessionStorage;
      const userData = JSON.parse(storageType.getItem('user') || '{}');
      
      if (userData.user_type) {
        console.log("CompleteProfile: Tipo de usuario recuperado del storage:", userData.user_type);
        setUserType(userData.user_type);
      }
    }
  }, [userType]);

  useEffect(() => {
    console.log("CompleteProfile: useEffect ejecutándose");
    
    const fetchUserData = async () => {
      console.log("CompleteProfile: Iniciando fetchUserData");
      setIsLoading(true);
      
      try {
        // Intentar obtener datos de respaldo primero
        const storageType = localStorage.getItem('authToken') ? localStorage : sessionStorage;
        const storedUser = JSON.parse(storageType.getItem('user') || '{}');
        
        console.log("CompleteProfile: Datos almacenados:", storedUser);
        
        // Intentar llamar a la API
        console.log("CompleteProfile: Llamando a authService.getUserProfile()");
        const response = await authService.getUserProfile();
        console.log("CompleteProfile: Respuesta recibida", response);
        
        if (response.success) {
          console.log("CompleteProfile: Datos del usuario recibidos correctamente");
          console.log("CompleteProfile: Tipo de usuario:", response.data.user_type);
          
          // Verificar que realmente tengamos un tipo de usuario
          if (response.data.user_type) {
            setUserType(response.data.user_type);
            setUserData({
              phone: response.data.phone || '',
              city: response.data.city || '',
              department: response.data.department || '',
              
              // Datos específicos según tipo
              firstName: response.data.first_name || '',
              lastName: response.data.last_name || '',
              profession: response.data.profession || '',
              idType: response.data.id_type || '',
              idNumber: response.data.id_number || '',
              
              companyName: response.data.company_name || '',
              nit: response.data.nit || '',
              industry: response.data.industry || '',
              contactPosition: response.data.contact_position || '',
              contactFirstName: response.data.contact_first_name || '',
              contactLastName: response.data.contact_last_name || '',
              contactIdType: response.data.contact_id_type || '',
              contactIdNumber: response.data.contact_id_number || ''
            });
          } else if (storedUser.user_type) {
            // Si la API no tiene tipo de usuario pero tenemos datos locales, usarlos
            console.log("CompleteProfile: Usando tipo de usuario del storage:", storedUser.user_type);
            setUserType(storedUser.user_type);
            
            // Rellenar campos con datos almacenados si existen
            setUserData({
              phone: storedUser.phone || '',
              city: storedUser.city || '',
              department: storedUser.department || '',
              firstName: storedUser.first_name || '',
              lastName: storedUser.last_name || '',
              profession: storedUser.profession || '',
              idType: storedUser.id_type || '',
              idNumber: storedUser.id_number || '',
              companyName: storedUser.company_name || '',
              nit: storedUser.nit || '',
              industry: storedUser.industry || '',
              contactPosition: storedUser.contact_position || '',
              contactFirstName: storedUser.contact_first_name || '',
              contactLastName: storedUser.contact_last_name || '',
              contactIdType: storedUser.contact_id_type || '',
              contactIdNumber: storedUser.contact_id_number || ''
            });
          } else {
            // Si no tenemos tipo de usuario de ninguna fuente, mostrar error
            console.error("CompleteProfile: No se pudo determinar el tipo de usuario");
            setErrors({ general: 'No se pudo determinar el tipo de usuario. Por favor, vuelve a iniciar sesión.' });
          }
        } else {
          // Si la API falla pero tenemos datos locales, usarlos
          if (storedUser.user_type) {
            console.log("CompleteProfile: Usando datos de usuario del storage como respaldo");
            setUserType(storedUser.user_type);
            setUserData({
              phone: storedUser.phone || '',
              city: storedUser.city || '',
              department: storedUser.department || '',
              firstName: storedUser.first_name || '',
              lastName: storedUser.last_name || '',
              profession: storedUser.profession || '',
              idType: storedUser.id_type || '',
              idNumber: storedUser.id_number || '',
              companyName: storedUser.company_name || '',
              nit: storedUser.nit || '',
              industry: storedUser.industry || '',
              contactPosition: storedUser.contact_position || '',
              contactFirstName: storedUser.contact_first_name || '',
              contactLastName: storedUser.contact_last_name || '',
              contactIdType: storedUser.contact_id_type || '',
              contactIdNumber: storedUser.contact_id_number || ''
            });
          } else {
            console.error("CompleteProfile: Error en la respuesta", response);
            setErrors({ general: 'No se pudo cargar la información del perfil. Por favor, intenta de nuevo.' });
          }
        }
      } catch (error) {
        console.error("CompleteProfile: Error al obtener datos del usuario", error);
        setErrors({ general: 'Error de conexión. Inténtalo más tarde.' });
      } finally {
        setIsLoading(false);
        console.log("CompleteProfile: fetchUserData completado");
      }
    };
    
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.phone) newErrors.phone = 'El teléfono es obligatorio';
    if (!userData.city) newErrors.city = 'La ciudad es obligatoria';
    if (!userData.department) newErrors.department = 'El departamento es obligatorio';
    
    if (userType === 'professional') {
      if (!userData.firstName) newErrors.firstName = 'El nombre es obligatorio';
      if (!userData.lastName) newErrors.lastName = 'El apellido es obligatorio';
      if (!userData.idType) newErrors.idType = 'El tipo de identificación es obligatorio';
      if (!userData.idNumber) newErrors.idNumber = 'El número de identificación es obligatorio';
    } else {
      if (!userData.companyName) newErrors.companyName = 'El nombre de la empresa es obligatorio';
      if (!userData.nit) newErrors.nit = 'El NIT es obligatorio';
      if (!userData.contactFirstName) newErrors.contactFirstName = 'El nombre del contacto es obligatorio';
      if (!userData.contactLastName) newErrors.contactLastName = 'El apellido del contacto es obligatorio';
      if (!userData.contactIdType) newErrors.contactIdType = 'El tipo de identificación del contacto es obligatorio';
      if (!userData.contactIdNumber) newErrors.contactIdNumber = 'El número de identificación del contacto es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CompleteProfile: Formulario enviado");
    
    if (!validateForm()) {
      console.log("CompleteProfile: Validación fallida", errors);
      return;
    }
    
    setIsSaving(true);
    
    const dataToSend = {
      phone: userData.phone,
      city: userData.city,
      department: userData.department,
      profile_completed: true // Agregar explícitamente
    };
    
    if (userType === 'professional') {
      dataToSend.first_name = userData.firstName;
      dataToSend.last_name = userData.lastName;
      dataToSend.profession = userData.profession;
      dataToSend.id_type = userData.idType;
      dataToSend.id_number = userData.idNumber;
    } else {
      dataToSend.company_name = userData.companyName;
      dataToSend.nit = userData.nit;
      dataToSend.industry = userData.industry;
      dataToSend.contact_position = userData.contactPosition;
      dataToSend.contact_first_name = userData.contactFirstName;
      dataToSend.contact_last_name = userData.contactLastName;
      dataToSend.contact_id_type = userData.contactIdType;
      dataToSend.contact_id_number = userData.contactIdNumber;
    }
    
    console.log("CompleteProfile: Datos a enviar", dataToSend);
    
    try {
      console.log("CompleteProfile: Llamando a authService.completeProfile()"); // CAMBIAR A completeProfile en lugar de updateProfile
      const response = await authService.completeProfile(dataToSend); // Usar completeProfile en lugar de updateProfile
      console.log("CompleteProfile: Respuesta de completeProfile", response);
      
      if (response.success) {
        console.log("CompleteProfile: Perfil actualizado correctamente");
        
        // Actualizar el estado de perfil en el contexto
        if (updateProfileStatus) {
          updateProfileStatus(true);
        }
        
        // Desactivar la navegación automática para evitar problemas
        setIsSaving(true);
        
        // Mensaje de éxito
        setErrors({ success: 'Perfil actualizado correctamente. Redirigiendo...' });
        
        // Usar window.location para forzar recarga completa
        setTimeout(() => {
          console.log("CompleteProfile: Redirigiendo al dashboard con recarga completa");
          window.location.href = '/dashboard';
        }, 1500);
      } 
      else {
        console.error("CompleteProfile: Error al actualizar perfil", response);
        setErrors({ general: response.message || 'Error al actualizar el perfil' });
        setIsSaving(false);
      }
    } catch (error) {
      console.error("CompleteProfile: Error de conexión", error);
      setErrors({ general: 'Error de conexión. Inténtalo más tarde.' });
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando información del perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h4 className="fw-bold">Completa tu Perfil</h4>
                <p className="text-muted">
                  Añade información para personalizar tu experiencia en StrateKaz
                </p>
              </div>
              
              {errors.general && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errors.general}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}

              {errors.success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {errors.success}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}              
                           
              <form onSubmit={handleSubmit}>
                <div className="card mb-4 bg-light">
                  <div className="card-body">
                    <h5 className="mb-3 border-bottom pb-2 text-primary">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Información General
                    </h5>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Teléfono</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input
                            type="tel"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            placeholder="Teléfono de contacto"
                          />
                          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Ciudad</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                          </span>
                          <input
                            type="text"
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange}
                            placeholder="Tu ciudad"
                          />
                          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-bold">Departamento</label>
                        <select
                          className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                          name="department"
                          value={userData.department}
                          onChange={handleInputChange}
                        >
                          <option value="">Seleccionar departamento...</option>
                          <option value="amazonas">Amazonas</option>
                          <option value="antioquia">Antioquia</option>
                          <option value="arauca">Arauca</option>
                          <option value="atlantico">Atlántico</option>
                          <option value="bolivar">Bolívar</option>
                          <option value="boyaca">Boyacá</option>
                          <option value="caldas">Caldas</option>
                          <option value="caqueta">Caquetá</option>
                          <option value="casanare">Casanare</option>
                          <option value="cauca">Cauca</option>
                          <option value="cesar">Cesar</option>
                          <option value="choco">Chocó</option>
                          <option value="cordoba">Córdoba</option>
                          <option value="cundinamarca">Cundinamarca</option>
                          <option value="guainia">Guainía</option>
                          <option value="guaviare">Guaviare</option>
                          <option value="huila">Huila</option>
                          <option value="laguajira">La Guajira</option>
                          <option value="magdalena">Magdalena</option>
                          <option value="meta">Meta</option>
                          <option value="narino">Nariño</option>
                          <option value="nortedesantander">Norte de Santander</option>
                          <option value="putumayo">Putumayo</option>
                          <option value="quindio">Quindío</option>
                          <option value="risaralda">Risaralda</option>
                          <option value="sanandres">San Andrés y Providencia</option>
                          <option value="santander">Santander</option>
                          <option value="sucre">Sucre</option>
                          <option value="tolima">Tolima</option>
                          <option value="valledelcauca">Valle del Cauca</option>
                          <option value="vaupes">Vaupés</option>
                          <option value="vichada">Vichada</option>
                        </select>
                        {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {(userType === 'professional' || !['consultant_company', 'direct_company'].includes(userType)) ? (
                  <div className="card mb-4 bg-light">
                    <div className="card-body">
                      <h5 className="mb-3 border-bottom pb-2 text-primary">
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        Información Profesional
                      </h5>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Nombres</label>
                          <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            placeholder="Tus nombres"
                          />
                          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Apellidos</label>
                          <input
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            placeholder="Tus apellidos"
                          />
                          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        
                        {/* Nuevos campos añadidos */}
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Tipo de Identificación</label>
                          <select
                            className={`form-select ${errors.idType ? 'is-invalid' : ''}`}
                            name="idType"
                            value={userData.idType}
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
                          <label className="form-label fw-bold">Número de Identificación</label>
                          <input
                            type="text"
                            className={`form-control ${errors.idNumber ? 'is-invalid' : ''}`}
                            name="idNumber"
                            value={userData.idNumber}
                            onChange={handleInputChange}
                            placeholder="Número de identificación"
                          />
                          {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
                        </div>
                        
                        <div className="col-12">
                          <label className="form-label fw-bold">Profesión</label>
                          <input
                            type="text"
                            className="form-control"
                            name="profession"
                            value={userData.profession}
                            onChange={handleInputChange}
                            placeholder="Tu profesión o especialidad"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card mb-4 bg-light">
                    <div className="card-body">
                      <h5 className="mb-3 border-bottom pb-2 text-primary">
                        <FontAwesomeIcon icon={faBuilding} className="me-2" />
                        Información Empresarial
                      </h5>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Nombre de la Empresa</label>
                          <input
                            type="text"
                            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                            name="companyName"
                            value={userData.companyName}
                            onChange={handleInputChange}
                            placeholder="Nombre de la empresa"
                          />
                          {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">NIT</label>
                          <input
                            type="text"
                            className={`form-control ${errors.nit ? 'is-invalid' : ''}`}
                            name="nit"
                            value={userData.nit}
                            onChange={handleInputChange}
                            placeholder="NIT de la empresa"
                          />
                          {errors.nit && <div className="invalid-feedback">{errors.nit}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Sector</label>
                          <select
                            className="form-select"
                            name="industry"
                            value={userData.industry}
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
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Cargo del Contacto</label>
                          <input
                            type="text"
                            className="form-control"
                            name="contactPosition"
                            value={userData.contactPosition}
                            onChange={handleInputChange}
                            placeholder="Tu cargo en la empresa"
                          />
                        </div>
                        
                        {/* Nuevos campos añadidos para información de contacto */}
                        <div className="col-12">
                          <h6 className="mt-3 mb-3 text-secondary">Información del Contacto Principal</h6>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Nombres del Contacto</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactFirstName ? 'is-invalid' : ''}`}
                            name="contactFirstName"
                            value={userData.contactFirstName}
                            onChange={handleInputChange}
                            placeholder="Nombres del contacto"
                          />
                          {errors.contactFirstName && <div className="invalid-feedback">{errors.contactFirstName}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Apellidos del Contacto</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactLastName ? 'is-invalid' : ''}`}
                            name="contactLastName"
                            value={userData.contactLastName}
                            onChange={handleInputChange}
                            placeholder="Apellidos del contacto"
                          />
                          {errors.contactLastName && <div className="invalid-feedback">{errors.contactLastName}</div>}
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Tipo de Identificación</label>
                          <select
                            className={`form-select ${errors.contactIdType ? 'is-invalid' : ''}`}
                            name="contactIdType"
                            value={userData.contactIdType}
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
                          <label className="form-label fw-bold">Número de Identificación</label>
                          <input
                            type="text"
                            className={`form-control ${errors.contactIdNumber ? 'is-invalid' : ''}`}
                            name="contactIdNumber"
                            value={userData.contactIdNumber}
                            onChange={handleInputChange}
                            placeholder="Número de identificación"
                          />
                          {errors.contactIdNumber && <div className="invalid-feedback">{errors.contactIdNumber}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        Guardar y Continuar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;