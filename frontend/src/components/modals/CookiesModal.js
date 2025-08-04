// CookiesModal - Modal para Política de Cookies
// Componente para mostrar la política de cookies de StrateKaz
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { Cookie, Settings, Shield, BarChart, Target, AlertCircle, CheckCircle } from 'lucide-react';

// Reutilizamos los styled components
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

const CookieCard = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s3} 0;
`;

const CookieHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.s2};
`;

const CookieTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const CookieBadge = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'necessary': return props.theme.colors.success + '20';
      case 'functional': return props.theme.colors.primary + '20';
      case 'analytics': return props.theme.colors.warning + '20';
      case 'marketing': return props.theme.colors.info + '20';
      default: return props.theme.colors.neutral + '20';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'necessary': return props.theme.colors.success;
      case 'functional': return props.theme.colors.primary;
      case 'analytics': return props.theme.colors.warning;
      case 'marketing': return props.theme.colors.info || props.theme.colors.primary;
      default: return props.theme.colors.neutral;
    }
  }};
  padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.typography.fontSizes.xs};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const CookieDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const CookieTable = styled.table`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSizes.xs};
  margin-top: ${props => props.theme.spacing.s2};
  
  td {
    padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    
    &:first-child {
      font-weight: ${props => props.theme.typography.fontWeights.medium};
      color: ${props => props.theme.colors.text};
      width: 30%;
    }
    
    &:last-child {
      color: ${props => props.theme.colors.textMuted};
    }
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

const CookiesModal = ({ isOpen, onClose, onAccept, onManage }) => {
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
              <Cookie size={28} />
              Política de Cookies
            </LegalTitle>
            <LegalDate>Última actualización: Enero 2025</LegalDate>
          </LegalHeader>

          <Section>
            <SectionTitle>
              <Cookie size={20} />
              1. ¿Qué son las Cookies?
            </SectionTitle>
            <SectionContent>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas 
                nuestro sitio web. Nos ayudan a mejorar tu experiencia, recordar tus preferencias y entender 
                cómo interactúas con nuestra plataforma.
              </p>
              <InfoBox>
                <InfoIcon>
                  <CheckCircle size={20} />
                </InfoIcon>
                <InfoText>
                  <strong>Tu privacidad primero:</strong> Usamos cookies de manera responsable y transparente. 
                  Puedes controlar qué cookies aceptas y cambiar tus preferencias en cualquier momento.
                </InfoText>
              </InfoBox>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Settings size={20} />
              2. Tipos de Cookies que Utilizamos
            </SectionTitle>
            <SectionContent>
              <CookieCard>
                <CookieHeader>
                  <CookieTitle>
                    <Shield size={18} />
                    Cookies Esenciales
                  </CookieTitle>
                  <CookieBadge type="necessary">Siempre Activas</CookieBadge>
                </CookieHeader>
                <CookieDescription>
                  Necesarias para el funcionamiento básico del sitio. Sin ellas, no podrías navegar por 
                  nuestra plataforma o usar funciones esenciales.
                </CookieDescription>
                <CookieTable>
                  <tbody>
                    <tr>
                      <td>session_id</td>
                      <td>Mantiene tu sesión activa mientras navegas</td>
                    </tr>
                    <tr>
                      <td>csrf_token</td>
                      <td>Protege contra ataques de falsificación de solicitudes</td>
                    </tr>
                    <tr>
                      <td>cookie_consent</td>
                      <td>Recuerda tus preferencias de cookies</td>
                    </tr>
                  </tbody>
                </CookieTable>
              </CookieCard>

              <CookieCard>
                <CookieHeader>
                  <CookieTitle>
                    <Settings size={18} />
                    Cookies Funcionales
                  </CookieTitle>
                  <CookieBadge type="functional">Recomendadas</CookieBadge>
                </CookieHeader>
                <CookieDescription>
                  Mejoran tu experiencia recordando tus preferencias y configuraciones personalizadas.
                </CookieDescription>
                <CookieTable>
                  <tbody>
                    <tr>
                      <td>language</td>
                      <td>Recuerda tu idioma preferido</td>
                    </tr>
                    <tr>
                      <td>theme</td>
                      <td>Guarda tu preferencia de tema (claro/oscuro)</td>
                    </tr>
                    <tr>
                      <td>dashboard_layout</td>
                      <td>Mantiene tu configuración del dashboard</td>
                    </tr>
                  </tbody>
                </CookieTable>
              </CookieCard>

              <CookieCard>
                <CookieHeader>
                  <CookieTitle>
                    <BarChart size={18} />
                    Cookies Analíticas
                  </CookieTitle>
                  <CookieBadge type="analytics">Opcionales</CookieBadge>
                </CookieHeader>
                <CookieDescription>
                  Nos ayudan a entender cómo los usuarios interactúan con nuestra plataforma para mejorarla 
                  continuamente.
                </CookieDescription>
                <CookieTable>
                  <tbody>
                    <tr>
                      <td>_ga</td>
                      <td>Google Analytics - Distingue usuarios únicos</td>
                    </tr>
                    <tr>
                      <td>_gid</td>
                      <td>Google Analytics - Identifica sesiones</td>
                    </tr>
                    <tr>
                      <td>_hotjar</td>
                      <td>Análisis de comportamiento y mapas de calor</td>
                    </tr>
                  </tbody>
                </CookieTable>
              </CookieCard>

              <CookieCard>
                <CookieHeader>
                  <CookieTitle>
                    <Target size={18} />
                    Cookies de Marketing
                  </CookieTitle>
                  <CookieBadge type="marketing">Opcionales</CookieBadge>
                </CookieHeader>
                <CookieDescription>
                  Se utilizan para mostrar contenido y anuncios relevantes, limitando la frecuencia de 
                  los anuncios y midiendo su efectividad.
                </CookieDescription>
                <CookieTable>
                  <tbody>
                    <tr>
                      <td>_fbp</td>
                      <td>Facebook Pixel - Seguimiento de conversiones</td>
                    </tr>
                    <tr>
                      <td>_gcl_au</td>
                      <td>Google Ads - Atribución de conversiones</td>
                    </tr>
                    <tr>
                      <td>linkedin_insights</td>
                      <td>LinkedIn - Análisis de campañas</td>
                    </tr>
                  </tbody>
                </CookieTable>
              </CookieCard>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Settings size={20} />
              3. Cómo Gestionar las Cookies
            </SectionTitle>
            <SectionContent>
              <p>
                Tienes control total sobre las cookies que aceptas:
              </p>
              <ul>
                <li>
                  <strong>Configuración del navegador:</strong> Puedes configurar tu navegador para rechazar 
                  todas las cookies o para avisarte cuando se envía una cookie.
                </li>
                <li>
                  <strong>Panel de preferencias:</strong> Usa nuestro panel de configuración de cookies para 
                  elegir qué tipos de cookies aceptas.
                </li>
                <li>
                  <strong>Eliminar cookies:</strong> Puedes eliminar las cookies existentes desde la 
                  configuración de tu navegador.
                </li>
              </ul>
              <InfoBox>
                <InfoIcon>
                  <AlertCircle size={20} />
                </InfoIcon>
                <InfoText>
                  <strong>Nota importante:</strong> Desactivar las cookies esenciales puede afectar 
                  significativamente la funcionalidad del sitio y algunos servicios pueden no estar disponibles.
                </InfoText>
              </InfoBox>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <Shield size={20} />
              4. Cookies de Terceros
            </SectionTitle>
            <SectionContent>
              <p>
                Algunos de nuestros socios pueden establecer cookies en tu dispositivo. Estos terceros tienen 
                sus propias políticas de privacidad y no tenemos control sobre sus cookies. Los principales 
                terceros que utilizamos son:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
                <li><strong>Hotjar:</strong> Para análisis de comportamiento de usuarios</li>
                <li><strong>Stripe:</strong> Para procesamiento seguro de pagos</li>
                <li><strong>Intercom:</strong> Para soporte al cliente</li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              5. Duración de las Cookies
            </SectionTitle>
            <SectionContent>
              <p>
                Las cookies pueden ser de sesión o persistentes:
              </p>
              <ul>
                <li>
                  <strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierras el navegador.
                </li>
                <li>
                  <strong>Cookies persistentes:</strong> Permanecen en tu dispositivo hasta que expiran o 
                  las eliminas manualmente. La duración varía según el tipo (desde 30 días hasta 2 años).
                </li>
              </ul>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              6. Actualizaciones de esta Política
            </SectionTitle>
            <SectionContent>
              <p>
                Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras 
                prácticas o por razones operativas, legales o regulatorias. Te notificaremos sobre cambios 
                significativos mediante un aviso en nuestra plataforma.
              </p>
            </SectionContent>
          </Section>

          <ContactBox>
            <ContactTitle>¿Preguntas sobre cookies?</ContactTitle>
            <ContactInfo>
              Contáctanos en: <a href="mailto:info@stratekaz.com">info@stratekaz.com</a>
            </ContactInfo>
          </ContactBox>
        </LegalContent>
      </ModalBody>
      
      <ModalFooter>
        {onAccept ? (
          <>
            {onManage && (
              <Button variant="outline" onClick={onManage}>
                Configurar Cookies
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Rechazar Opcionales
            </Button>
            <Button variant="primary" onClick={onAccept}>
              Aceptar Todas
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={onClose}>
            Cerrar
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default CookiesModal;