import React from 'react';
import styled from 'styled-components';
import { Gift, Download, ShieldCheck, Infinity, Users } from 'lucide-react';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';

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
  background: ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.button};
`;

const InfoTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  text-align: center;
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
`;

const InfoDescription = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  text-align: center;
  margin: 0 0 ${props => props.theme.spacing.s5} 0;
  font-size: ${props => props.theme.typography.fontSizes.base};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s5} 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.spacing.s2};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.buttonPrimary?.background || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
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
  line-height: 1.4;
`;

const HighlightBox = styled.div`
  background: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.spacing.s2};
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
      icon: Download,
      color: '#3498db',
      title: 'Acceso Inmediato',
      description: 'Sin registro obligatorio. Accede directamente a las herramientas básicas.'
    },
    {
      icon: ShieldCheck,
      color: '#27ae60',
      title: 'Datos Seguros',
      description: 'Todo se almacena localmente en tu navegador. Máxima privacidad.'
    },
    {
      icon: Infinity,
      color: '#ec268f',
      title: 'Uso Ilimitado',
      description: 'Sin restricciones de tiempo. Úsalos tantas veces como necesites.'
    },
    {
      icon: Users,
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
              <Gift size={36} />
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
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <FeatureCard key={index}>
                  <FeatureIcon color={feature.color}>
                    <IconComponent size={20} />
                  </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.description}</FeatureText>
                  </FeatureContent>
                </FeatureCard>
              );
            })}
          </FeaturesGrid>

          <HighlightBox>
            <HighlightTitle>
              4 Pilares Disponibles
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
        <Button 
          as="a"
          href="/registro"
          variant="primary"
          onClick={() => {
            handleGetStarted();
            window.scrollTo(0, 0);
          }}
        >
          Ver Planes Profesionales
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RecursosLibresInfoModal;