// RecursoLibreModal - Modal para recursos libres con localStorage
// Componente especializado para explicar el funcionamiento de recursos gratuitos
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';
import { Icon } from '../../design-system/icons';

// Styled Components específicos para RecursoLibreModal
const RecursoContent = styled.div`
  padding: ${props => props.theme.spacing.s2} 0;
`;

const RecursoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const RecursoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => getThemeColor(props.recursoId, props.theme)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  flex-shrink: 0;
`;

const RecursoInfo = styled.div`
  flex: 1;
`;

const RecursoTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

const RecursoDescription = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin: 0;
  font-size: ${props => props.theme.typography.fontSizes.base};
`;

const ContentSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s4};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${props => props.theme.spacing.s2};
  
  li {
    display: flex;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.s2};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    
    &::before {
      content: '';
      width: 16px;
      height: 16px;
      background: ${props => props.theme.colors.success};
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 2px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 4px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;

const InfoBox = styled.div`
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s2} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const HighlightBox = styled.div`
  background: ${props => props.theme.colors.success}08;
  border: 1px solid ${props => props.theme.colors.success}20;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s3};
`;

const BenefitsList2 = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.s1};
  
  div {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.s2};
    color: ${props => props.theme.colors.success};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    font-weight: ${props => props.theme.typography.fontWeights.medium};
  }
`;

const InfoText = styled(Text)`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  margin: 0;
`;

// Función para obtener colores por recurso
const getThemeColor = (recursoId, theme) => {
  const colors = {
    'iso': '#3498db',
    'sgsst': '#e74c3c', 
    'pesv': '#9b59b6',
    'innovation': '#f39c12'
  };
  return colors[recursoId] || theme.colors.primary;
};

// Función para obtener iconos por recurso
const getRecursoIcon = (recursoId) => {
  const icons = {
    'iso': 'award',
    'sgsst': 'hard-hat',
    'pesv': 'car',
    'innovation': 'lightbulb'
  };
  return icons[recursoId] || 'file-text';
};

// Datos de recursos por tipo
const recursosData = {
  'iso': {
    title: 'ISO 9001 - Recursos Libres',
    description: 'Accede a herramientas básicas para implementar un Sistema de Gestión de Calidad basado en ISO 9001.',
    features: [
      'Plantillas de documentos básicos',
      'Lista de verificación de requisitos',
      'Ejemplos de procedimientos',
      'Guía de implementación paso a paso',
      'Formatos de auditoría interna'
    ],
    storageInfo: 'Los recursos se almacenan localmente en tu navegador para acceso offline.',
    benefits: [
      'Completamente gratuito sin limitaciones de tiempo',
      'Uso ilimitado para implementación empresarial',
      'Almacenamiento local - información privada',
      'Acceso directo sin registro obligatorio'
    ]
  },
  'sgsst': {
    title: 'SG-SST - Recursos Libres',
    description: 'Herramientas gratuitas para cumplir con la normatividad colombiana en Seguridad y Salud en el Trabajo.',
    features: [
      'Matriz de identificación de peligros',
      'Plantillas para política SST',
      'Formatos de inspección básicos',
      'Cronograma de actividades',
      'Indicadores mínimos de gestión'
    ],
    storageInfo: 'Todos los datos se guardan en tu dispositivo para garantizar la privacidad.',
    benefits: [
      'Herramientas gratuitas que reducen costos de consultoría',
      'Acceso permanente sin vencimientos',
      'Privacidad absoluta - datos no compartidos',
      'Cumplimiento de normativa colombiana incluido'
    ]
  },
  'pesv': {
    title: 'PESV - Recursos Libres',
    description: 'Implementa tu Plan Estratégico de Seguridad Vial con nuestras herramientas básicas gratuitas.',
    features: [
      'Diagnóstico inicial de flota',
      'Política de seguridad vial',
      'Registro de conductores',
      'Indicadores básicos de seguimiento',
      'Plantillas de capacitación'
    ],
    storageInfo: 'La información se almacena localmente para proteger datos sensibles de tu empresa.',
    benefits: [
      'Recursos libres sin costos ocultos',
      'Uso empresarial autorizado sin restricciones',
      'Almacenamiento seguro en dispositivo local',
      'Cumplimiento de Resolución 40595 de 2022'
    ]
  },
  'innovation': {
    title: 'Innovación - Recursos Libres',
    description: 'Impulsa la creatividad y transformación digital en tu organización con herramientas de innovación.',
    features: [
      'Canvas de modelo de negocio',
      'Matriz de ideas y proyectos',
      'Herramientas de lluvia de ideas',
      'Dashboard de seguimiento básico',
      'Metodologías de innovación'
    ],
    storageInfo: 'Tus ideas y proyectos se mantienen privados almacenándose solo en tu navegador.',
    benefits: [
      'Acceso gratuito permanente sin vencimientos',
      'Protección de ideas mediante almacenamiento local',
      'Desarrollo de innovación sin restricciones',
      'Metodologías empresariales probadas incluidas'
    ]
  }
};

const RecursoLibreModal = ({ 
  isOpen, 
  onClose, 
  recursoId = 'iso',
  onAccessRecurso
}) => {
  const recurso = recursosData[recursoId];
  const iconName = getRecursoIcon(recursoId);

  const handleAccessRecurso = () => {
    // Guardar en localStorage que el usuario accedió al recurso
    const accessedResources = JSON.parse(localStorage.getItem('accessedResources') || '[]');
    if (!accessedResources.includes(recursoId)) {
      accessedResources.push(recursoId);
      localStorage.setItem('accessedResources', JSON.stringify(accessedResources));
    }
    
    // Guardar timestamp del último acceso
    localStorage.setItem(`lastAccess_${recursoId}`, new Date().toISOString());
    
    // Callback para manejar el acceso
    if (onAccessRecurso) {
      onAccessRecurso(recursoId);
    }
    
    onClose();
  };

  if (!recurso) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Recurso Libre"
      size="medium"
    >
      <ModalBody>
        <RecursoContent>
          <RecursoHeader>
            <RecursoIcon recursoId={recursoId}>
              <Icon name={iconName} size={24} />
            </RecursoIcon>
            
            <RecursoInfo>
              <RecursoTitle>
                {recurso.title}
              </RecursoTitle>
              
              <RecursoDescription>
                {recurso.description}
              </RecursoDescription>
            </RecursoInfo>
          </RecursoHeader>
          
          <ContentSection>
            <SectionTitle>
              <Icon name="check-circle" size={16} />
              Incluye
            </SectionTitle>
            <FeaturesList>
              {recurso.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          </ContentSection>
          
          <ContentSection>
            <HighlightBox>
              <SectionTitle style={{ margin: '0 0 0.75rem 0', color: '#27ae60' }}>
                <Icon name="star" size={16} />
                Completamente Gratuito
              </SectionTitle>
              <BenefitsList2>
                {recurso.benefits.map((benefit, index) => (
                  <div key={index}>
                    <Icon name="check" size={14} />
                    {benefit}
                  </div>
                ))}
              </BenefitsList2>
            </HighlightBox>
          </ContentSection>
          
          <ContentSection>
            <InfoBox>
              <Icon name="shield-check" size={20} style={{ color: '#27ae60', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <InfoText style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: '#27ae60' }}>
                  Responsabilidad de Datos
                </InfoText>
                <InfoText style={{ fontSize: '0.8rem' }}>
                  {recurso.storageInfo} Tus datos permanecen 100% privados.
                </InfoText>
              </div>
            </InfoBox>
          </ContentSection>
        </RecursoContent>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAccessRecurso}>
          Acceder
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RecursoLibreModal;