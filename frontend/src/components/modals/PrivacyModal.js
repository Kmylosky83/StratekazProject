// PrivacyModal - Modal para Política de Privacidad
// Componente para mostrar la política de privacidad de StrateKaz
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { Shield, Lock, Database, Eye, UserCheck, AlertTriangle, Mail } from 'lucide-react';

// Reutilizamos los styled components del TermsModal
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
  background: ${props => props.variant === 'warning' 
    ? props.theme.colors.warning + '08'
    : props.theme.colors.primary + '08'};
  border: 1px solid ${props => props.variant === 'warning'
    ? props.theme.colors.warning + '30'
    : props.theme.colors.primary + '30'};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const InfoIcon = styled.div`
  color: ${props => props.variant === 'warning'
    ? props.theme.colors.warning
    : props.theme.colors.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${props => props.theme.spacing.s3} 0;
  
  th, td {
    padding: ${props => props.theme.spacing.s3};
    text-align: left;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
  
  th {
    background: ${props => props.theme.colors.backgroundLight};
    font-weight: ${props => props.theme.typography.fontWeights.semiBold};
    color: ${props => props.theme.colors.text};
  }
  
  td {
    font-size: ${props => props.theme.typography.fontSizes.sm};
    color: ${props => props.theme.colors.textMuted};
  }
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

const PrivacyModal = ({ isOpen, onClose, onAccept }) => {
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
              <Shield size={28} />
              Política de Privacidad
            </LegalTitle>
            <LegalDate>Última actualización: Enero 2025</LegalDate>
          </LegalHeader>

          <Section>
            <SectionTitle>
              <Lock size={20} />
              1. Compromiso con tu Privacidad
            </SectionTitle>
            <SectionContent>
              <p>
                En StrateKaz, la protección de tus datos personales es nuestra prioridad. Esta política describe 
                cómo recopilamos, usamos, almacenamos y protegemos tu información de acuerdo con las leyes 
                colombianas de protección de datos personales (Ley 1581 de 2012 y sus decretos reglamentarios).
              </p>
              <InfoBox>
                <InfoIcon>
                  <UserCheck size={20} />
                </InfoIcon>
                <InfoText>
                  <strong>Tu control es absoluto:</strong> Tienes derecho a conocer, actualizar, rectificar y 
                  solicitar la supresión de tus datos personales en cualquier momento.
                </InfoText>
              </InfoBox>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Database size={20} />
              2. Información que Recopilamos
            </SectionTitle>
            <SectionContent>
              <p>
                Recopilamos únicamente la información necesaria para brindarte nuestros servicios:
              </p>
              <DataTable>
                <thead>
                  <tr>
                    <th>Tipo de Datos</th>
                    <th>Ejemplos</th>
                    <th>Propósito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Datos de Identificación</strong></td>
                    <td>Nombre, correo electrónico, teléfono</td>
                    <td>Crear y gestionar tu cuenta</td>
                  </tr>
                  <tr>
                    <td><strong>Datos de la Empresa</strong></td>
                    <td>NIT, razón social, sector</td>
                    <td>Personalizar servicios empresariales</td>
                  </tr>
                  <tr>
                    <td><strong>Datos de Uso</strong></td>
                    <td>Páginas visitadas, funciones utilizadas</td>
                    <td>Mejorar la experiencia de usuario</td>
                  </tr>
                  <tr>
                    <td><strong>Datos Técnicos</strong></td>
                    <td>IP, navegador, dispositivo</td>
                    <td>Seguridad y soporte técnico</td>
                  </tr>
                </tbody>
              </DataTable>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Eye size={20} />
              3. Cómo Usamos tu Información
            </SectionTitle>
            <SectionContent>
              <p>
                Utilizamos tus datos personales exclusivamente para:
              </p>
              <ul>
                <li>Proporcionar y mantener nuestros servicios de gestión empresarial</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Enviarte notificaciones importantes sobre tu cuenta</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Prevenir fraudes y garantizar la seguridad</li>
              </ul>
              <InfoBox variant="warning">
                <InfoIcon variant="warning">
                  <AlertTriangle size={20} />
                </InfoIcon>
                <InfoText>
                  <strong>Nunca vendemos tus datos:</strong> No comercializamos, vendemos ni compartimos tus 
                  datos personales con terceros para fines de marketing sin tu consentimiento explícito.
                </InfoText>
              </InfoBox>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Shield size={20} />
              4. Seguridad de los Datos
            </SectionTitle>
            <SectionContent>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas de última generación:
              </p>
              <ul>
                <li><strong>Encriptación:</strong> Todos los datos sensibles se encriptan en tránsito y reposo</li>
                <li><strong>Acceso Restringido:</strong> Solo personal autorizado puede acceder a datos personales</li>
                <li><strong>Monitoreo Continuo:</strong> Sistemas de detección de intrusiones 24/7</li>
                <li><strong>Respaldos Seguros:</strong> Copias de seguridad encriptadas y geográficamente distribuidas</li>
                <li><strong>Auditorías Regulares:</strong> Evaluaciones periódicas de seguridad</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <UserCheck size={20} />
              5. Tus Derechos ARCO
            </SectionTitle>
            <SectionContent>
              <p>
                Como titular de los datos, tienes derecho a:
              </p>
              <ul>
                <li><strong>Acceder:</strong> Conocer qué datos personales tenemos sobre ti</li>
                <li><strong>Rectificar:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Cancelar:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Oponerte:</strong> Oponerte al tratamiento de tus datos para fines específicos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
                <li><strong>Revocar:</strong> Retirar tu consentimiento en cualquier momento</li>
              </ul>
              <p>
                Para ejercer estos derechos, contáctanos en <strong>info@stratekaz.com</strong>
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Database size={20} />
              6. Retención y Eliminación de Datos
            </SectionTitle>
            <SectionContent>
              <p>
                Conservamos tus datos personales solo durante el tiempo necesario:
              </p>
              <ul>
                <li>Mientras mantengas una cuenta activa en StrateKaz</li>
                <li>Para cumplir con obligaciones legales (hasta 10 años para datos contables)</li>
                <li>Para resolver disputas o hacer cumplir nuestros acuerdos</li>
              </ul>
              <p>
                Una vez que ya no sean necesarios, los datos se eliminarán de forma segura o se anonimizarán 
                de manera irreversible.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Mail size={20} />
              7. Comunicaciones y Marketing
            </SectionTitle>
            <SectionContent>
              <p>
                Solo te enviaremos comunicaciones de marketing si has dado tu consentimiento explícito. 
                Puedes darte de baja en cualquier momento usando el enlace en nuestros correos o 
                ajustando tus preferencias en tu cuenta.
              </p>
              <p>
                Las comunicaciones relacionadas con el servicio (como alertas de seguridad o cambios en términos) 
                no pueden desactivarse mientras mantengas una cuenta activa.
              </p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              8. Cambios en esta Política
            </SectionTitle>
            <SectionContent>
              <p>
                Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos 
                por correo electrónico o mediante un aviso destacado en nuestra plataforma. La fecha de 
                "Última actualización" al inicio indica la versión más reciente.
              </p>
            </SectionContent>
          </Section>

          <ContactBox>
            <ContactTitle>Oficial de Protección de Datos</ContactTitle>
            <ContactInfo>
              Para cualquier consulta sobre privacidad: <a href="mailto:info@stratekaz.com">info@stratekaz.com</a>
              <br />
              Teléfono: +57 311 535 1944
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

export default PrivacyModal;