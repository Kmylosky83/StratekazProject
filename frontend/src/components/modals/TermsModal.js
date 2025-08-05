// TermsModal - Modal para Términos de Uso
// Componente para mostrar los términos legales de StrateKaz
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { FileText, Shield, Users, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

// Styled Components específicos para contenido legal
const LegalContent = styled.div`
  padding: ${props => props.theme.spacing.s4} 0;
  max-width: 100%;
`;

const LegalHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.s6};
  padding-bottom: ${props => props.theme.spacing.s4};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const LegalTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
`;

const LegalDate = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.primary};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const SectionContent = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.base};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  
  p {
    margin: 0 0 ${props => props.theme.spacing.s3} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    margin: ${props => props.theme.spacing.s2} 0;
    padding-left: ${props => props.theme.spacing.s6};
    
    li {
      margin-bottom: ${props => props.theme.spacing.s2};
      color: ${props => props.theme.colors.text};
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  strong {
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  }
`;

const InfoBox = styled.div`
  background: ${props => props.theme.colors.primary}08;
  border: 1px solid ${props => props.theme.colors.primary}30;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const InfoIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const ContactBox = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin-top: ${props => props.theme.spacing.s5};
  text-align: center;
`;

const ContactTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
`;

const ContactInfo = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModalFooter = styled.div`
  padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s4};
`;

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title=""
      size="large"
      showCloseButton={true}
    >
      <ModalBody>
        <LegalContent>
          <LegalHeader>
            <LegalTitle>
              <FileText size={28} />
              Términos de Uso
            </LegalTitle>
            <LegalDate>Última actualización: Enero 2025</LegalDate>
          </LegalHeader>

          <Section>
            <SectionTitle>
              <Shield size={20} />
              1. Aceptación de Términos
            </SectionTitle>
            <SectionContent>
              <p>
                Al acceder y utilizar la plataforma StrateKaz, usted acepta estar sujeto a estos Términos de Uso 
                y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, 
                no debe utilizar nuestra plataforma.
              </p>
              <InfoBox>
                <InfoIcon>
                  <AlertCircle size={20} />
                </InfoIcon>
                <InfoText>
                  <strong>Importante:</strong> Estos términos constituyen un acuerdo legal vinculante entre usted 
                  y StrateKaz. Le recomendamos leer cuidadosamente este documento antes de utilizar nuestros servicios.
                </InfoText>
              </InfoBox>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Users size={20} />
              2. Uso de la Plataforma
            </SectionTitle>
            <SectionContent>
              <p>
                StrateKaz proporciona herramientas de gestión empresarial y consultoría. El uso de nuestra plataforma 
                está sujeto a las siguientes condiciones:
              </p>
              <ul>
                <li>Debe proporcionar información precisa y completa al registrarse</li>
                <li>Es responsable de mantener la confidencialidad de su cuenta</li>
                <li>No puede usar la plataforma para actividades ilegales o no autorizadas</li>
                <li>Debe respetar los derechos de propiedad intelectual</li>
                <li>No puede intentar acceder sin autorización a otras cuentas o sistemas</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <BookOpen size={20} />
              3. Propiedad Intelectual
            </SectionTitle>
            <SectionContent>
              <p>
                Todo el contenido presente en StrateKaz, incluyendo pero no limitado a texto, gráficos, logos, 
                íconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de 
                StrateKaz o sus proveedores de contenido y está protegido por las leyes de derechos de autor.
              </p>
              <p>
                <strong>Licencia de Uso:</strong> Se le otorga una licencia limitada, no exclusiva y no transferible 
                para acceder y usar la plataforma para su uso personal o empresarial interno.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <CheckCircle size={20} />
              4. Servicios y Suscripciones
            </SectionTitle>
            <SectionContent>
              <p>
                StrateKaz ofrece diferentes niveles de servicio:
              </p>
              <ul>
                <li><strong>Recursos Gratuitos:</strong> Acceso limitado a herramientas básicas</li>
                <li><strong>Plan Profesional:</strong> Acceso completo a herramientas y funcionalidades</li>
                <li><strong>Plan Empresarial:</strong> Soluciones personalizadas y soporte prioritario</li>
              </ul>
              <p>
                Los precios y características de cada plan pueden cambiar con previo aviso. Los cambios no afectarán 
                a las suscripciones activas hasta su renovación.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <AlertCircle size={20} />
              5. Limitación de Responsabilidad
            </SectionTitle>
            <SectionContent>
              <p>
                StrateKaz proporciona la plataforma "tal cual" y "según disponibilidad". No garantizamos que el 
                servicio será ininterrumpido, oportuno, seguro o libre de errores.
              </p>
              <p>
                En ningún caso StrateKaz, sus directores, empleados o afiliados serán responsables por daños 
                indirectos, incidentales, especiales, consecuentes o punitivos resultantes del uso o la imposibilidad 
                de usar la plataforma.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Shield size={20} />
              6. Privacidad y Protección de Datos
            </SectionTitle>
            <SectionContent>
              <p>
                Su privacidad es importante para nosotros. El uso de nuestra plataforma está también gobernado por 
                nuestra Política de Privacidad, que describe cómo recopilamos, usamos y protegemos su información.
              </p>
              <p>
                Cumplimos con todas las regulaciones aplicables de protección de datos, incluyendo las leyes 
                colombianas de protección de datos personales.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              7. Modificaciones a los Términos
            </SectionTitle>
            <SectionContent>
              <p>
                StrateKaz se reserva el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación en la plataforma. Su uso continuado 
                de la plataforma después de dichos cambios constituye su aceptación de los nuevos términos.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              8. Ley Aplicable
            </SectionTitle>
            <SectionContent>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes de la República de Colombia, 
                sin tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
            </SectionContent>
          </Section>

          <ContactBox>
            <ContactTitle>¿Tienes preguntas sobre nuestros términos?</ContactTitle>
            <ContactInfo>
              Contáctanos en: <a href="mailto:info@stratekaz.com">info@stratekaz.com</a>
            </ContactInfo>
          </ContactBox>
        </LegalContent>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button 
          as="a"
          href="/registro"
          variant="primary"
          onClick={() => {
            if (onAccept) onAccept();
            onClose();
            window.scrollTo(0, 0);
          }}
        >
          Continuar al Registro
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TermsModal;