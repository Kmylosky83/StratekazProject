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
    
    // Campos específicos para empresa
    companyName: '',
    nit: '',
    industry: '',
    contactPosition: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log("CompleteProfile: useEffect ejecutándose");
    
    const fetchUserData = async () => {
      console.log("CompleteProfile: Iniciando fetchUserData");
      setIsLoading(true);
      try {
        console.log("CompleteProfile: Llamando a authService.getUserProfile()");
        const response = await authService.getUserProfile();
        console.log("CompleteProfile: Respuesta recibida", response);
        
        if (response.success) {
          console.log("CompleteProfile: Datos del usuario recibidos correctamente");
          console.log("CompleteProfile: Tipo de usuario:", response.data.user_type);
          setUserType(response.data.user_type);
          setUserData({
            phone: response.data.phone || '',
            city: response.data.city || '',
            department: response.data.department || '',
            
            // Datos específicos según tipo
            firstName: response.data.first_name || '',
            lastName: response.data.last_name || '',
            profession: response.data.profession || '',
            
            companyName: response.data.company_name || '',
            nit: response.data.nit || '',
            industry: response.data.industry || '',
            contactPosition: response.data.contact_position || ''
          });
        } else {
          console.error("CompleteProfile: Error en la respuesta", response);
          setErrors({ general: 'No se pudo cargar la información del perfil' });
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
    } else {
      if (!userData.companyName) newErrors.companyName = 'El nombre de la empresa es obligatorio';
      if (!userData.nit) newErrors.nit = 'El NIT es obligatorio';
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
      department: userData.department
    };
    
    if (userType === 'professional') {
      dataToSend.first_name = userData.firstName;
      dataToSend.last_name = userData.lastName;
      dataToSend.profession = userData.profession;
    } else {
      dataToSend.company_name = userData.companyName;
      dataToSend.nit = userData.nit;
      dataToSend.industry = userData.industry;
      dataToSend.contact_position = userData.contactPosition;
    }
    
    console.log("CompleteProfile: Datos a enviar", dataToSend);
    
    try {
      console.log("CompleteProfile: Llamando a authService.updateProfile()");
      const response = await authService.updateProfile(dataToSend);
      console.log("CompleteProfile: Respuesta de updateProfile", response);
      
      if (response.success) {
        console.log("CompleteProfile: Perfil actualizado correctamente");
        
        // Actualizar el estado de perfil en el contexto
        if (updateProfileStatus) {
          updateProfileStatus(true);
        }
        
        // Actualizar los datos de usuario en localStorage/sessionStorage
        const storageType = localStorage.getItem('authToken') ? localStorage : sessionStorage;
        const userData = JSON.parse(storageType.getItem('user') || '{}');
        userData.profile_completed = true;
        storageType.setItem('user', JSON.stringify(userData));
        
        setTimeout(() => {
          console.log("CompleteProfile: Redirigiendo al dashboard");
          navigate('/dashboard');
        }, 1500);
      } 
      
      else {
        console.error("CompleteProfile: Error al actualizar perfil", response);
        setErrors({ general: response.message || 'Error al actualizar el perfil' });
      }
    } catch (error) {
      console.error("CompleteProfile: Error de conexión", error);
      setErrors({ general: 'Error de conexión. Inténtalo más tarde.' });
    } finally {
      setIsSaving(false);
      console.log("CompleteProfile: Proceso de guardar completado");
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
                
                {userType === 'professional' ? (
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