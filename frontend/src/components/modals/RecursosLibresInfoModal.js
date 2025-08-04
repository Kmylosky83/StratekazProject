import React from 'react';
import styled from 'styled-components';
import { Gift, Download, ShieldCheck, Infinity, Users } from 'lucide-react';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

const InfoContent = styled.div`
  padding: ${spacing.s2} 0;
`;

const InfoHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.s5};
`;

const InfoIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.success}, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.s4};
  color: ${colors.white};
  box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
`;

const InfoTitle = styled(H4)`
  color: ${colors.text};
  margin: 0 0 ${spacing.s3} 0;
  text-align: center;
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.bold};
`;

const InfoDescription = styled(Text)`
  color: ${colors.textMuted};
  line-height: 1.6;
  text-align: center;
  margin: 0 0 ${spacing.s5} 0;
  font-size: ${typography.fontSizes.base};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.s4};
  margin: ${spacing.s5} 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.s3};
  padding: ${spacing.s4};
  background: ${colors.backgroundLight};
  border-radius: ${spacing.s2};
  border: 1px solid ${colors.border};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.div`
  color: ${colors.text};
  font-weight: ${typography.fontWeights.semiBold};
  font-size: ${typography.fontSizes.base};
  margin-bottom: ${spacing.s1};
`;

const FeatureText = styled.div`
  color: ${colors.textMuted};
  font-size: ${typography.fontSizes.note};
  line-height: 1.4;
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, ${colors.success}, #2ecc71);
  color: ${colors.white};
  border-radius: ${spacing.s2};
  padding: ${spacing.s4};
  text-align: center;
  margin: ${spacing.s4} 0;
`;

const HighlightTitle = styled.div`
  font-weight: ${typography.fontWeights.bold};
  font-size: ${typography.fontSizes.cardTitle};
  margin-bottom: ${spacing.s2};
`;

const HighlightText = styled.div`
  font-size: ${typography.fontSizes.base};
  opacity: 0.95;
`;

const RecursosLibresInfoModal = ({ 
  isOpen, 
  onClose 
}) => {
  const features = [
    {
      icon: Download,
      color: colors.info,
      title: 'Acceso Inmediato',
      description: 'Sin registro obligatorio. Accede directamente a las herramientas básicas.'
    },
    {
      icon: ShieldCheck,
      color: colors.success,
      title: 'Datos Seguros',
      description: 'Todo se almacena localmente en tu navegador. Máxima privacidad.'
    },
    {
      icon: Infinity,
      color: colors.primary,
      title: 'Uso Ilimitado',
      description: 'Sin restricciones de tiempo. Úsalos tantas veces como necesites.'
    },
    {
      icon: Users,
      color: colors.danger,
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