// CompleteProfile - Página para completar perfil después del registro
// Formulario para completar información adicional del usuario

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User, Building, Phone, MapPin, Save } from 'lucide-react';
import { Button } from '../../design-system/components';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth/AuthService';

const CompleteProfileContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors?.surface || '#f8f9fa'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing?.s4 || '16px'};
`;

const FormCard = styled.div`
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-radius: ${props => props.theme.borderRadius?.large || '12px'};
  box-shadow: ${props => props.theme.shadows?.card || '0 4px 12px rgba(0, 0, 0, 0.1)'};
  padding: ${props => props.theme.spacing?.s8 || '32px'};
  width: 100%;
  max-width: 500px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing?.s8 || '32px'};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.hero || '1.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
  margin: 0 0 ${props => props.theme.spacing?.s2 || '8px'} 0;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing?.s6 || '24px'};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
`;

const Label = styled.label`
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing?.s3 || '12px'} ${props => props.theme.spacing?.s4 || '16px'};
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  background: ${props => props.theme.colors?.white || '#ffffff'};
  color: ${props => props.theme.colors?.text || '#1f2937'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
    box-shadow: 0 0 0 3px ${props => props.theme.colors?.primary || '#ec268f'}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing?.s3 || '12px'} ${props => props.theme.spacing?.s4 || '16px'};
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  background: ${props => props.theme.colors?.white || '#ffffff'};
  color: ${props => props.theme.colors?.text || '#1f2937'};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
    box-shadow: 0 0 0 3px ${props => props.theme.colors?.primary || '#ec268f'}20;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors?.danger || '#ef4444'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  margin-top: ${props => props.theme.spacing?.s1 || '4px'};
`;

const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  margin-top: ${props => props.theme.spacing?.s4 || '16px'};
  
  &:hover {
    color: ${props => props.theme.colors?.text || '#1f2937'};
  }
`;

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    phone: '',
    city: '',
    industry: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await authService.completeProfile(formData);
      
      if (result.success) {
        // Actualizar información del usuario en el contexto
        updateUser(result.data);
        
        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.error || 'Error al completar el perfil' });
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      setErrors({ submit: 'Error al completar el perfil. Por favor, inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Marcar perfil como completado sin información adicional
    navigate('/dashboard');
  };

  return (
    <CompleteProfileContainer>
      <FormCard>
        <Header>
          <Title>Completa tu Perfil</Title>
          <Subtitle>
            Ayúdanos a personalizar tu experiencia proporcionando información adicional
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <User size={20} />
              Nombre *
            </Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Tu nombre"
              required
            />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <User size={20} />
              Apellido *
            </Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Tu apellido"
              required
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <Building size={20} />
              Empresa
            </Label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Nombre de tu empresa"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Building size={20} />
              Cargo
            </Label>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Tu cargo o posición"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Phone size={20} />
              Teléfono
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Tu número de teléfono"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <MapPin size={20} />
              Ciudad
            </Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Tu ciudad"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Building size={20} />
              Industria
            </Label>
            <Select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una industria</option>
              <option value="tecnologia">Tecnología</option>
              <option value="manufactura">Manufactura</option>
              <option value="servicios">Servicios</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educación</option>
              <option value="construccion">Construcción</option>
              <option value="retail">Retail</option>
              <option value="alimentos">Alimentos y Bebidas</option>
              <option value="financiero">Financiero</option>
              <option value="otro">Otro</option>
            </Select>
          </FormGroup>

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          <Button
            type="submit"
            variant="primary"
            size="large"
            icon={<Save size={20} />}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Completar Perfil'}
          </Button>

          <SkipButton type="button" onClick={handleSkip}>
            Omitir por ahora
          </SkipButton>
        </Form>
      </FormCard>
    </CompleteProfileContainer>
  );
};

export default CompleteProfile;