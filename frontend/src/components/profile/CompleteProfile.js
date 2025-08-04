import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Save, User, Building, Phone, MapPin, Briefcase } from 'lucide-react';
import authService from '../../services/auth/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';
import { Button } from '../../design-system/components';

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
      <LoadingContainer>
        <Spinner />
        <LoadingText>Cargando información del perfil...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <FormCard>
          <CardHeader>
            <Title>Completa tu Perfil</Title>
            <Subtitle>
              Añade información para personalizar tu experiencia en StrateKaz
            </Subtitle>
          </CardHeader>
              
              {errors.general && (
                <ErrorAlert>
                  {errors.general}
                </ErrorAlert>
              )}

              {errors.success && (
                <SuccessAlert>
                  {errors.success}
                </SuccessAlert>
              )}              
                           
              <form onSubmit={handleSubmit}>
                <SectionCard>
                  <SectionHeader>
                    <User size={20} />
                    Información General
                  </SectionHeader>
                    
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Teléfono</FormLabel>
                      <InputGroup>
                        <InputAddon>
                          <Phone size={16} />
                        </InputAddon>
                        <FormInput
                          type="tel"
                          $hasError={!!errors.phone}
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          placeholder="Teléfono de contacto"
                        />
                      </InputGroup>
                      {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                    </FormGroup>
                      
                    <FormGroup>
                      <FormLabel>Ciudad</FormLabel>
                      <InputGroup>
                        <InputAddon>
                          <MapPin size={16} />
                        </InputAddon>
                        <FormInput
                          type="text"
                          $hasError={!!errors.city}
                          name="city"
                          value={userData.city}
                          onChange={handleInputChange}
                          placeholder="Tu ciudad"
                        />
                      </InputGroup>
                      {errors.city && <ErrorText>{errors.city}</ErrorText>}
                    </FormGroup>
                  </FormRow>
                      
                  <FormGroup>
                    <FormLabel>Departamento</FormLabel>
                    <FormSelect
                      $hasError={!!errors.department}
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
                    </FormSelect>
                    {errors.department && <ErrorText>{errors.department}</ErrorText>}
                  </FormGroup>
                </SectionCard>
                
                {(userType === 'professional' || !['consultant_company', 'direct_company'].includes(userType)) ? (
                  <SectionCard>
                    <SectionHeader>
                      <Briefcase size={20} />
                      Información Profesional
                    </SectionHeader>
                      
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Nombres</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.firstName}
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          placeholder="Tus nombres"
                        />
                        {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>Apellidos</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.lastName}
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          placeholder="Tus apellidos"
                        />
                        {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                        
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Tipo de Identificación</FormLabel>
                        <FormSelect
                          $hasError={!!errors.idType}
                          name="idType"
                          value={userData.idType}
                          onChange={handleInputChange}
                        >
                            <option value="">Seleccionar tipo...</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>                            
                            <option value="PP">Pasaporte</option>
                            <option value="NIT">NIT</option>
                        </FormSelect>
                        {errors.idType && <ErrorText>{errors.idType}</ErrorText>}
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>Número de Identificación</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.idNumber}
                          name="idNumber"
                          value={userData.idNumber}
                          onChange={handleInputChange}
                          placeholder="Número de identificación"
                        />
                        {errors.idNumber && <ErrorText>{errors.idNumber}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                        
                    <FormGroup>
                      <FormLabel>Profesión</FormLabel>
                      <FormInput
                        type="text"
                        name="profession"
                        value={userData.profession}
                        onChange={handleInputChange}
                        placeholder="Tu profesión o especialidad"
                      />
                    </FormGroup>
                  </SectionCard>
                ) : (
                  <SectionCard>
                    <SectionHeader>
                      <Building size={20} />
                      Información Empresarial
                    </SectionHeader>
                      
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Nombre de la Empresa</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.companyName}
                          name="companyName"
                          value={userData.companyName}
                          onChange={handleInputChange}
                          placeholder="Nombre de la empresa"
                        />
                        {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>NIT</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.nit}
                          name="nit"
                          value={userData.nit}
                          onChange={handleInputChange}
                          placeholder="NIT de la empresa"
                        />
                        {errors.nit && <ErrorText>{errors.nit}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                        
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Sector</FormLabel>
                        <FormSelect
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
                        </FormSelect>
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>Cargo del Contacto</FormLabel>
                        <FormInput
                          type="text"
                          name="contactPosition"
                          value={userData.contactPosition}
                          onChange={handleInputChange}
                          placeholder="Tu cargo en la empresa"
                        />
                      </FormGroup>
                    </FormRow>
                        
                    <SubsectionTitle>
                      Información del Contacto Principal
                    </SubsectionTitle>
                        
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Nombres del Contacto</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.contactFirstName}
                          name="contactFirstName"
                          value={userData.contactFirstName}
                          onChange={handleInputChange}
                          placeholder="Nombres del contacto"
                        />
                        {errors.contactFirstName && <ErrorText>{errors.contactFirstName}</ErrorText>}
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>Apellidos del Contacto</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.contactLastName}
                          name="contactLastName"
                          value={userData.contactLastName}
                          onChange={handleInputChange}
                          placeholder="Apellidos del contacto"
                        />
                        {errors.contactLastName && <ErrorText>{errors.contactLastName}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                        
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Tipo de Identificación</FormLabel>
                        <FormSelect
                          $hasError={!!errors.contactIdType}
                          name="contactIdType"
                          value={userData.contactIdType}
                          onChange={handleInputChange}
                        >
                            <option value="">Seleccionar tipo...</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="PP">Pasaporte</option>
                        </FormSelect>
                        {errors.contactIdType && <ErrorText>{errors.contactIdType}</ErrorText>}
                      </FormGroup>
                        
                      <FormGroup>
                        <FormLabel>Número de Identificación</FormLabel>
                        <FormInput
                          type="text"
                          $hasError={!!errors.contactIdNumber}
                          name="contactIdNumber"
                          value={userData.contactIdNumber}
                          onChange={handleInputChange}
                          placeholder="Número de identificación"
                        />
                        {errors.contactIdNumber && <ErrorText>{errors.contactIdNumber}</ErrorText>}
                      </FormGroup>
                    </FormRow>
                  </SectionCard>
                )}
                
                <SubmitContainer>
                  <SubmitButton
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Spinner />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Guardar y Continuar
                      </>
                    )}
                  </SubmitButton>
                </SubmitContainer>
              </form>
        </FormCard>
      </ContentWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: ${spacing.xlarge} ${spacing.medium};
  background-color: ${colors.backgroundLight};
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background-color: ${colors.white};
  border-radius: ${spacing.medium};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: ${spacing.xlarge};
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xlarge};
`;

const Title = styled.h4`
  font-size: ${typography.fontSizes.sectionTitle};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.small};
`;

const Subtitle = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${colors.textMuted};
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: ${spacing.medium};
`;

const LoadingText = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${colors.textMuted};
  margin: 0;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${colors.border};
  border-top: 3px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorAlert = styled.div`
  background-color: ${colors.dangerLight};
  color: ${colors.danger};
  padding: ${spacing.medium};
  border-radius: ${spacing.s1};
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colors.danger};
`;

const SuccessAlert = styled.div`
  background-color: ${colors.successLight};
  color: ${colors.success};
  padding: ${spacing.medium};
  border-radius: ${spacing.s1};
  margin-bottom: ${spacing.medium};
  border: 1px solid ${colors.success};
`;

const SectionCard = styled.div`
  background-color: ${colors.surface};
  border-radius: ${spacing.medium};
  padding: ${spacing.large};
  margin-bottom: ${spacing.large};
`;

const SectionHeader = styled.h5`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.primary};
  margin-bottom: ${spacing.medium};
  padding-bottom: ${spacing.small};
  border-bottom: 2px solid ${colors.borderLight};
`;

const SubsectionTitle = styled.h6`
  font-size: ${typography.fontSizes.cardSubtitle};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.textLight};
  margin: ${spacing.medium} 0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.medium};
  margin-bottom: ${spacing.medium};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.medium};
`;

const FormLabel = styled.label`
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.text};
  margin-bottom: ${spacing.s1};
`;

const InputGroup = styled.div`
  display: flex;
  align-items: stretch;
`;

const InputAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.small} ${spacing.medium};
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-right: none;
  border-radius: ${spacing.s1} 0 0 ${spacing.s1};
  color: ${colors.textMuted};
`;

const FormInput = styled.input`
  flex: 1;
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${({ $hasError }) => $hasError ? colors.danger : colors.border};
  border-radius: ${({ $hasError }) => $hasError ? spacing.s1 : '0 ' + spacing.s1 + ' ' + spacing.s1 + ' 0'};
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

const FormSelect = styled.select`
  width: 100%;
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${({ $hasError }) => $hasError ? colors.danger : colors.border};
  border-radius: ${spacing.s1};
  font-size: ${typography.fontSizes.base};
  background-color: ${colors.white};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.focus};
  }
`;

const ErrorText = styled.div`
  color: ${colors.danger};
  font-size: ${typography.fontSizes.note};
  margin-top: ${spacing.s1};
`;

const SubmitContainer = styled.div`
  text-align: center;
  margin-top: ${spacing.xlarge};
`;

const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  padding: ${spacing.medium} ${spacing.xlarge};
`;

export default CompleteProfile;