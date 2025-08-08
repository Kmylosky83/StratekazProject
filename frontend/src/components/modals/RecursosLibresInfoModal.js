import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Gift, Download, ShieldCheck, Infinity, Users, Database, 
  Upload, ArrowRight, AlertTriangle, CheckCircle, Info
} from 'lucide-react';
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

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.s2};
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  transition: all 0.3s ease;
`;

const StepContent = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const StepTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.base};
  line-height: 1.6;
  margin: 0 0 ${props => props.theme.spacing.s5} 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
`;

const WarningBox = styled.div`
  background: ${props => props.theme.colors.warningLight};
  border: 1px solid ${props => props.theme.colors.warning};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const WarningIcon = styled.div`
  color: ${props => props.theme.colors.warning};
  flex-shrink: 0;
  margin-top: 2px;
`;

const WarningText = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.small};
  line-height: 1.5;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const RecursosLibresInfoModal = ({ 
  isOpen, 
  onClose 
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "¿Qué son los Recursos Libres?",
      icon: Gift,
      content: {
        description: "Herramientas profesionales de gestión empresarial completamente gratuitas, sin registro obligatorio y sin limitaciones.",
        features: [
          {
            icon: Download,
            title: 'Acceso Inmediato',
            description: 'Sin registro obligatorio. Comienza a usar las herramientas al instante.'
          },
          {
            icon: Infinity,
            title: 'Uso Ilimitado',
            description: 'Sin restricciones de tiempo. Úsalos tantas veces como necesites.'
          },
          {
            icon: Users,
            title: 'Uso Comercial',
            description: 'Permitido para uso empresarial. Implementa en tu organización.'
          }
        ]
      }
    },
    {
      title: "Almacenamiento Local",
      icon: Database,
      content: {
        description: "Todos tus datos se almacenan ÚNICAMENTE en tu navegador utilizando localStorage. Nosotros NO tenemos acceso a tu información.",
        features: [
          {
            icon: ShieldCheck,
            title: 'Máxima Privacidad',
            description: 'Tus datos nunca salen de tu computadora. Sin servidores externos.'
          },
          {
            icon: Database,
            title: 'Local Storage',
            description: 'Utiliza la tecnología localStorage de tu navegador para guardar.'
          },
          {
            icon: AlertTriangle,
            title: 'Tu Responsabilidad',
            description: 'Eres 100% responsable de hacer respaldo de tus datos importantes.'
          }
        ]
      }
    },
    {
      title: "Import y Export",
      icon: Upload,
      content: {
        description: "Cada herramienta incluye funciones de importar y exportar para que puedas respaldar y transferir tus datos fácilmente.",
        features: [
          {
            icon: Download,
            title: 'Exportar Datos',
            description: 'Descarga tus resultados en formatos estándar (JSON, CSV, PDF).'
          },
          {
            icon: Upload,
            title: 'Importar Datos',
            description: 'Sube información existente desde archivos compatibles.'
          },
          {
            icon: Database,
            title: 'Respaldo Manual',
            description: 'Usa export/import como sistema de respaldo entre dispositivos.'
          }
        ]
      }
    },
    {
      title: "Importante: Responsabilidad",
      icon: AlertTriangle,
      content: {
        description: "Al usar estos recursos, aceptas que eres completamente responsable de la veracidad, respaldo y uso de los datos que ingreses.",
        features: [
          {
            icon: AlertTriangle,
            title: 'Datos Bajo Tu Control',
            description: 'Solo tú tienes acceso y control sobre la información que ingresas.'
          },
          {
            icon: CheckCircle,
            title: 'Sin Garantías',
            description: 'Las herramientas se proporcionan "tal como están" sin garantías.'
          },
          {
            icon: Info,
            title: 'Uso Profesional',
            description: 'Valida siempre los resultados con profesionales especializados.'
          }
        ]
      }
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenRecursosLibresIntro', 'true');
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleGetStarted} 
      title={`Recursos Libres - ${currentStep + 1} de ${steps.length}`}
      size="large"
    >
      <ModalBody>
        <InfoContent>
          <StepIndicator>
            {steps.map((_, index) => (
              <StepDot key={index} $active={index === currentStep} />
            ))}
          </StepIndicator>

          <StepContent>
            <StepTitle>
              <currentStepData.icon size={28} />
              {currentStepData.title}
            </StepTitle>
            
            <StepDescription>
              {currentStepData.content.description}
            </StepDescription>

            {/* Advertencia especial para el paso de responsabilidad */}
            {currentStep === 3 && (
              <WarningBox>
                <WarningIcon>
                  <AlertTriangle size={20} />
                </WarningIcon>
                <WarningText>
                  <strong>IMPORTANTE:</strong> Al continuar, confirmas que entiendes que eres 
                  completamente responsable del uso y manejo de los datos en estas herramientas.
                </WarningText>
              </WarningBox>
            )}
          </StepContent>

          <FeaturesGrid>
            {currentStepData.content.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <FeatureCard key={index}>
                  <FeatureIcon color={
                    currentStep === 1 && feature.title === 'Tu Responsabilidad' ? '#e74c3c' :
                    currentStep === 3 ? '#e74c3c' : '#ec268f'
                  }>
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

          {currentStep === 0 && (
            <HighlightBox>
              <HighlightTitle>
                4 Pilares Disponibles
              </HighlightTitle>
              <HighlightText>
                ISO 9001/45001/14001 • SG-SST • PESV • Innovación
              </HighlightText>
            </HighlightBox>
          )}
        </InfoContent>
      </ModalBody>
      
      <ModalFooter>
        <NavigationButtons>
          <div>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Anterior
              </Button>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" onClick={handleGetStarted}>
              Saltar Tutorial
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Siguiente
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleGetStarted}>
                <CheckCircle size={16} />
                Entendido, Comenzar
              </Button>
            )}
          </div>
        </NavigationButtons>
      </ModalFooter>
    </Modal>
  );
};

export default RecursosLibresInfoModal;