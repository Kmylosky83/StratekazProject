// PolicyModal - Migrado al Design System StrateKaz
// Componente especializado para mostrar términos y condiciones / política de privacidad
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';

// Styled Components específicos para PolicyModal
const PolicyContent = styled.div`
  padding: ${props => props.theme.spacing.s2} 0;
  max-height: 60vh;
  overflow-y: auto;
`;

const PolicySection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PolicyTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.s3};
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const PolicyText = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin-bottom: ${props => props.theme.spacing.s3};
  text-align: justify;
`;

const PolicyList = styled.ul`
  color: ${props => props.theme.colors.textMuted};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin: ${props => props.theme.spacing.s3} 0;
  padding-left: ${props => props.theme.spacing.s5};
  
  li {
    margin-bottom: ${props => props.theme.spacing.s2};
  }
`;

const PolicyModal = ({ 
  isOpen, 
  onClose, 
  type = 'terms',
  // Props de compatibilidad con versión anterior
  show, 
  handleClose 
}) => {
  // Soporte para props de la versión anterior
  const modalIsOpen = isOpen ?? show;
  const modalOnClose = onClose ?? handleClose;
  
  const modalTitle = type === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad';

  const renderTermsContent = () => (
    <PolicyContent>
      <PolicySection>
        <PolicyTitle>1. Aceptación de los Términos</PolicyTitle>
        <PolicyText>
          Al registrarse y utilizar StrateKaz, usted acepta estar sujeto a estos términos y condiciones. 
          Si no está de acuerdo con alguna parte de estos términos, no podrá usar nuestros servicios.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>2. Uso del Servicio</PolicyTitle>
        <PolicyText>
          El servicio debe utilizarse de acuerdo con todas las leyes aplicables y de manera ética. 
          Está prohibido usar el servicio para actividades ilegales o no autorizadas.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>3. Cuenta de Usuario</PolicyTitle>
        <PolicyText>
          Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. 
          Debe notificar inmediatamente cualquier uso no autorizado de su cuenta.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>4. Privacidad y Datos</PolicyTitle>
        <PolicyText>
          La información proporcionada será tratada según nuestra política de privacidad. 
          Nos comprometemos a proteger su información personal.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>5. Propiedad Intelectual</PolicyTitle>
        <PolicyText>
          Todo el contenido y materiales disponibles en StrateKaz están protegidos por derechos de autor 
          y otras leyes de propiedad intelectual.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>6. Limitación de Responsabilidad</PolicyTitle>
        <PolicyText>
          StrateKaz no será responsable por daños indirectos, incidentales o consecuentes que surjan 
          del uso del servicio.
        </PolicyText>
      </PolicySection>
    </PolicyContent>
  );

  const renderPrivacyContent = () => (
    <PolicyContent>
      <PolicySection>
        <PolicyTitle>1. Información que Recopilamos</PolicyTitle>
        <PolicyText>
          Recopilamos información personal que usted nos proporciona directamente, incluyendo nombre, 
          correo electrónico, y datos profesionales o empresariales.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>2. Uso de la Información</PolicyTitle>
        <PolicyText>Utilizamos su información para:</PolicyText>
        <PolicyList>
          <li>Proporcionar y mantener nuestros servicios</li>
          <li>Personalizar su experiencia</li>
          <li>Enviar comunicaciones importantes</li>
          <li>Mejorar nuestros servicios</li>
        </PolicyList>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>3. Protección de Datos</PolicyTitle>
        <PolicyText>
          Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal 
          contra acceso no autorizado o pérdida.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>4. Compartir Información</PolicyTitle>
        <PolicyText>
          No vendemos ni compartimos su información personal con terceros, excepto cuando sea necesario 
          para proporcionar nuestros servicios o cuando lo exija la ley.
        </PolicyText>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>5. Sus Derechos</PolicyTitle>
        <PolicyText>Tiene derecho a:</PolicyText>
        <PolicyList>
          <li>Acceder a su información personal</li>
          <li>Corregir datos inexactos</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Oponerse al procesamiento de sus datos</li>
        </PolicyList>
      </PolicySection>

      <PolicySection>
        <PolicyTitle>6. Cambios en la Política</PolicyTitle>
        <PolicyText>
          Podemos actualizar esta política ocasionalmente. Le notificaremos cualquier cambio material 
          en el procesamiento de información personal.
        </PolicyText>
      </PolicySection>
    </PolicyContent>
  );

  return (
    <Modal 
      isOpen={modalIsOpen} 
      onClose={modalOnClose} 
      title={modalTitle}
      size="large"
    >
      <ModalBody noPadding>
        <div style={{ padding: '0 1.5rem' }}>
          {type === 'terms' ? renderTermsContent() : renderPrivacyContent()}
        </div>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="primary" onClick={modalOnClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PolicyModal;