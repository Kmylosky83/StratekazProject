// RecursosLibresInfoModal - Modal informativo para explicar recursos libres
// Se muestra automáticamente en la primera visita a AccesoGratuitoPage
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';
import { Icon } from '../../design-system/icons';

// Styled Components específicos
const InfoContent = styled.div`
  padding: ${props => props.theme.spacing.s2} 0;
`;

const InfoHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.s5};
`;

const InfoIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.white};
  box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
`;

const InfoTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  text-align: center;
  font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

const InfoDescription = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  text-align: center;
  margin: 0 0 ${props => props.theme.spacing.s5} 0;
  font-size: ${props => props.theme.typography.fontSizes.base};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s5} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.div`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-size: ${props => props.theme.typography.fontSizes.base};
  margin-bottom: ${props => props.theme.spacing.s1};
`;

const FeatureText = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.note};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  text-align: center;
  margin: ${props => props.theme.spacing.s4} 0;
`;

const HighlightTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  margin-bottom: ${props => props.theme.spacing.s2};
`;

const HighlightText = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.base};
  opacity: 0.95;
`;

const RecursosLibresInfoModal = ({ 
  isOpen, 
  onClose 
}) => {
  const features = [
    {
      icon: 'download',
      color: '#3498db',
      title: 'Acceso Inmediato',
      description: 'Sin registro obligatorio. Accede directamente a las herramientas básicas.'
    },
    {
      icon: 'shield-check',
      color: '#27ae60',
      title: 'Datos Seguros',
      description: 'Todo se almacena localmente en tu navegador. Máxima privacidad.'
    },
    {
      icon: 'infinity',
      color: '#9b59b6',
      title: 'Uso Ilimitado',
      description: 'Sin restricciones de tiempo. Úsalos tantas veces como necesites.'
    },
    {
      icon: 'users',
      color: '#e74c3c',
      title: 'Uso Empresarial',
      description: 'Permitido para uso comercial. Implementa en tu organización.'
    }
  ];

  const handleGetStarted = () => {
    // Marcar que el usuario ya vio la introducción
    localStorage.setItem('hasSeenRecursosLibresIntro', 'true');
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleGetStarted} 
      title="Recursos Libres"
      size="medium"
    >
      <ModalBody>
        <InfoContent>
          <InfoHeader>
            <InfoIcon>
              <Icon name="gift" size={36} />
            </InfoIcon>
            
            <InfoTitle>
              Recursos Libres de Gestión Empresarial
            </InfoTitle>
            
            <InfoDescription>
              Accede a herramientas básicas de gestión empresarial completamente gratuitas. 
              Sin costos ocultos, sin registro obligatorio, sin limitaciones de tiempo.
            </InfoDescription>
          </InfoHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon color={feature.color}>
                  <Icon name={feature.icon} size={20} />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.description}</FeatureText>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturesGrid>

          <HighlightBox>
            <HighlightTitle>
              4 Sistemas de Gestión Disponibles
            </HighlightTitle>
            <HighlightText>
              ISO 9001 • SG-SST • PESV • Innovación
            </HighlightText>
          </HighlightBox>
        </InfoContent>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={handleGetStarted}>
          Ahora no
        </Button>
        <Button variant="primary" onClick={handleGetStarted}>
          Comenzar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RecursosLibresInfoModal;