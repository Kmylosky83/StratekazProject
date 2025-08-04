// NormativaModal - Migrado al Design System StrateKaz
// Componente especializado para mostrar información detallada de normativas
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';
import { Icon } from '../../design-system/icons';

// Styled Components específicos para NormativaModal
const NormativaContent = styled.div`
  padding: ${props => props.theme.spacing.s2} 0;
`;

const NormativaHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s5};
`;

const NormativaIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => getThemeColor(props.normativaId, props.theme)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  flex-shrink: 0;
`;

const NormativaInfo = styled.div`
  flex: 1;
`;

const NormativaSubtitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

const NormativaDescription = styled(Text)`
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

const BenefitsList = styled.ul`
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

const HighlightBox = styled.div`
  background: ${props => props.theme.colors.primary}08;
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s3};
  
  p {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    margin: 0;
    font-style: italic;
  }
`;

// Función para obtener colores por normativa
const getThemeColor = (normativaId, theme) => {
  const colors = {
    'iso': '#3498db',
    'sgsst': '#e74c3c', 
    'pesv': '#9b59b6',
    'innovation': '#f39c12'
  };
  return colors[normativaId] || theme.colors.primary;
};

// Función para obtener iconos por normativa
const getNormativaIcon = (normativaId) => {
  const icons = {
    'iso': 'award',
    'sgsst': 'shield',
    'pesv': 'car',
    'innovation': 'lightbulb'
  };
  return icons[normativaId] || 'award';
};

const NormativaModal = ({ 
  isOpen, 
  onClose, 
  normativa,
  // Props de compatibilidad con versión anterior
  show, 
  handleClose 
}) => {
  // Soporte para props de la versión anterior
  const modalIsOpen = isOpen ?? show;
  const modalOnClose = onClose ?? handleClose;
  
  // Configuración por defecto en caso de que no se pase una normativa
  const defaultNormativa = {
    id: 'default',
    title: 'Normativa',
    subtitle: 'Sistema de Gestión',
    description: 'Descripción de la normativa.',
    benefits: [
      'Beneficio 1',
      'Beneficio 2', 
      'Beneficio 3',
      'Beneficio 4'
    ],
    conclusion: 'Implementa esta normativa con StrateKaz para obtener mejores resultados.'
  };

  // Usar los datos de normativa o los por defecto
  const data = normativa || defaultNormativa;
  const iconName = getNormativaIcon(data.id);

  return (
    <Modal 
      isOpen={modalIsOpen} 
      onClose={modalOnClose} 
      title={data.title}
      size="medium"
    >
      <ModalBody>
        <NormativaContent>
          <NormativaHeader>
            <NormativaIcon normativaId={data.id}>
              <Icon name={iconName} size={24} />
            </NormativaIcon>
            
            <NormativaInfo>
              <NormativaSubtitle>
                {data.subtitle || data.title}
              </NormativaSubtitle>
              
              <NormativaDescription>
                {data.description}
              </NormativaDescription>
            </NormativaInfo>
          </NormativaHeader>
          
          {data.benefits && data.benefits.length > 0 && (
            <ContentSection>
              <SectionTitle>
                <Icon name="check-circle" size={16} />
                Beneficios principales
              </SectionTitle>
              <BenefitsList>
                {data.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </BenefitsList>
            </ContentSection>
          )}
          
          {data.conclusion && (
            <ContentSection>
              <HighlightBox>
                <p>{data.conclusion}</p>
              </HighlightBox>
            </ContentSection>
          )}
        </NormativaContent>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={modalOnClose}>
          Cerrar
        </Button>
        <Button 
          as={Link} 
          to="/registro" 
          variant="primary"
          onClick={modalOnClose}
        >
          Más información
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NormativaModal;