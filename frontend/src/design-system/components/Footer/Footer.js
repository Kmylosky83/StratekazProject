// Footer Component - Design System
// Componente unificado que reemplaza el Footer de common

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container, Row, Col } from '../Layout';
import { H6, Text } from '../Typography';
import { Logo_Footer } from '../Logo';
import TermsModal from '../../../components/modals/TermsModal';
import PrivacyModal from '../../../components/modals/PrivacyModal';
import CookiesModal from '../../../components/modals/CookiesModal';
import NormativaModal from '../../../components/modals/NormativaModal';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.backgroundLight} 0%, 
    ${props => props.theme.colors.white} 100%
  );
  position: relative;
  padding: ${props => props.theme.spacing.s8} 0 ${props => props.theme.spacing.s6} 0;
  transition: ${props => props.theme.transitions.normal};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%,
      ${props => props.theme.colors.primary}20 20%,
      ${props => props.theme.colors.borderSubtle} 30%,
      ${props => props.theme.colors.borderSubtle} 70%,
      ${props => props.theme.colors.primary}20 80%,
      transparent 100%
    );
    opacity: 0.6;
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
    background: linear-gradient(90deg, 
      transparent 0%,
      ${props => props.theme.colors.primary}40 15%,
      ${props => props.theme.colors.primary} 25%,
      ${props => props.theme.colors.primary} 75%,
      ${props => props.theme.colors.primary}40 85%,
      transparent 100%
    );
    box-shadow: 0 0 8px ${props => props.theme.colors.primary}30;
  }
`;

const FooterContent = styled(Container)``;

const FooterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s4};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.s4};
  }
`;

const BrandSection = styled(FooterSection)`
  .description {
    color: ${props => props.theme.colors.textMuted};
    margin: ${props => props.theme.spacing.s3} 0 ${props => props.theme.spacing.s4} 0;
    line-height: ${props => props.theme.typography.lineHeights.relaxed || 1.6};
    font-size: ${props => props.theme.typography.fontSizes.base || '1rem'};
    font-weight: ${props => props.theme.typography.fontWeights.normal || 400};
    font-family: ${props => props.theme.typography.fontFamilies.secondary};
    max-width: 320px;
    letter-spacing: 0.01em;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s2};
  margin-top: ${props => props.theme.spacing.s2};
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.textMuted};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px ${props => props.theme.colors.primary}30;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const FooterTitle = styled(H6)`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold || 600};
  font-size: ${props => props.theme.typography.fontSizes.lg || '1.125rem'};
  margin-bottom: ${props => props.theme.spacing.s4};
  text-transform: none;
  letter-spacing: -0.01em;
  position: relative;
  padding-bottom: ${props => props.theme.spacing.s2};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.primary} 0%, 
      ${props => props.theme.colors.primary}60 100%
    );
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textMuted};
  text-decoration: none;
  display: block;
  margin-bottom: ${props => props.theme.spacing.s2};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.theme.spacing.s1} 0;
  position: relative;
  font-size: ${props => props.theme.typography.fontSizes.base || '1rem'};
  font-weight: ${props => props.theme.typography.fontWeights.normal || 400};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  border-radius: ${props => props.theme.borderRadius.small};
  
  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: all 0.25s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    padding-left: ${props => props.theme.spacing.s4};
    background: ${props => props.theme.colors.primary}05;
    
    &::before {
      opacity: 1;
    }
  }
`;

const FooterExternalLink = styled.a`
  color: ${props => props.theme.colors.textMuted};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.base || '1rem'};
  font-weight: ${props => props.theme.typography.fontWeights.normal || 400};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    background: ${props => props.theme.colors.primary}05;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.s2};
  color: ${props => props.theme.colors.textMutedLight};
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  transition: all 0.25s ease;
  padding: ${props => props.theme.spacing.s1} 0;
  border-radius: ${props => props.theme.borderRadius.small};
  
  .icon {
    margin-right: ${props => props.theme.spacing.s3};
    margin-top: 2px;
    color: ${props => props.theme.colors.primary};
    transition: all 0.25s ease;
    flex-shrink: 0;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
    
    .icon {
      transform: scale(1.05);
    }
  }
`;

const FooterDivider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%,
    ${props => props.theme.colors.primary}15 15%,
    ${props => props.theme.colors.borderSubtle} 25%,
    ${props => props.theme.colors.borderSubtle} 75%,
    ${props => props.theme.colors.primary}15 85%,
    transparent 100%
  );
  margin: ${props => props.theme.spacing.s5} 0 ${props => props.theme.spacing.s4} 0;
  opacity: 0.6;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled(Text)`
  color: ${props => props.theme.colors.textMutedLight};
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s4};
  flex-wrap: wrap;
`;

const LegalLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMutedLight};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  transition: all 0.25s ease;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Footer = ({ showSocial = true, showContact = true }) => {
  const currentYear = new Date().getFullYear();
  
  // Estados para los modales legales
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  
  // Estados para los modales de servicios
  const [selectedNormativa, setSelectedNormativa] = useState(null);
  const [normativaModalOpen, setNormativaModalOpen] = useState(false);
  
  const socialLinks = [
    { name: 'x', href: 'https://x.com/Kmylosky', label: 'X (Twitter)' },
    { name: 'facebook', href: 'https://web.facebook.com/Kmylosky', label: 'Facebook' },
    { name: 'instagram', href: 'https://www.instagram.com/kmylosky', label: 'Instagram' },
    { name: 'whatsapp', href: 'https://wa.me/573115351944', label: 'WhatsApp' },
    { name: 'tiktok', href: 'https://www.tiktok.com/@kmylosky', label: 'TikTok' },
  ];
  
  const navigationLinks = [
    { to: '/#hero', text: 'Inicio' },
    { to: '/acceso-gratuito#hero', text: 'Acceso Gratuito' },
    { to: '/portfolio#hero', text: 'Portafolio' },
    { to: '/registro#hero', text: 'Crear Cuenta' },
  ];
  
  const serviceLinks = [
    { id: 'iso', text: 'ISO 9001 | 45001 | 14001' },
    { id: 'sgsst', text: 'SG-SST' },
    { id: 'pesv', text: 'PESV' },
    { id: 'innovation', text: 'Innovación' },
  ];
  
  const handleServiceClick = (serviceId) => {
    setSelectedNormativa(serviceId);
    setNormativaModalOpen(true);
  };
  
  
  const contactInfo = [
    { icon: 'mail', text: 'info@stratekaz.com', href: 'https://wa.me/573115351944?text=Hola, me interesa conocer más sobre los servicios de StrateKaz' },
    { icon: 'phone', text: '+57 311 535 1944', href: 'https://wa.me/573115351944?text=Hola, me gustaría solicitar información sobre sus servicios' },
    { icon: 'mapPin', text: 'Cúcuta, Colombia', href: 'https://wa.me/573115351944?text=Hola, me interesa contactar con StrateKaz desde Cúcuta' },
  ];
  
  return (
    <FooterWrapper>
      <FooterContent>
        <Row>
          {/* Columna 1: Brand + Logo + Redes */}
          <Col lg={3} md={6} sm={12}>
            <BrandSection>
              <div style={{ marginBottom: '16px' }}>
                <Logo_Footer 
                  hoverable 
                  clickable
                  onClick={() => window.location.href = '/'} 
                />
              </div>
              <Text className="description">
                Transformamos organizaciones a través de metodologías innovadoras en gestión empresarial, formación especializada y coaching estratégico. Más de 200 empresas confían en nuestras soluciones para optimizar procesos, desarrollar talento y acelerar su crecimiento sostenible.
              </Text>
              {showSocial && (
                <SocialLinks>
                  {socialLinks.map((social) => (
                    <SocialLink 
                      key={social.name}
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon name={social.name} size={20} />
                    </SocialLink>
                  ))}
                </SocialLinks>
              )}
            </BrandSection>
          </Col>

          {/* Columna 2: Enlaces Principales */}
          <Col lg={3} md={6} sm={12}>
            <FooterSection>
              <FooterTitle>Navegación</FooterTitle>
              {navigationLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterSection>
          </Col>

          {/* Columna 3: Servicios */}
          <Col lg={3} md={6} sm={12}>
            <FooterSection>
              <FooterTitle>Servicios</FooterTitle>
              {serviceLinks.map((link, index) => (
                <FooterLink 
                  key={index} 
                  as="button"
                  onClick={() => handleServiceClick(link.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  {link.text}
                </FooterLink>
              ))}
            </FooterSection>
          </Col>

          {/* Columna 4: Contacto */}
          <Col lg={3} md={6} sm={12}>
            <FooterSection>
              <FooterTitle>Contacto</FooterTitle>
              {contactInfo.map((item, index) => (
                <ContactItem key={index}>
                  <Icon name={item.icon} size={16} className="icon" />
                  {item.href ? (
                    <FooterExternalLink 
                      href={item.href}
                      target={item.icon === 'mapPin' ? '_blank' : '_self'}
                      rel={item.icon === 'mapPin' ? 'noopener noreferrer' : undefined}
                      style={{ display: 'inline', margin: 0 }}
                    >
                      {item.text}
                    </FooterExternalLink>
                  ) : (
                    item.text
                  )}
                </ContactItem>
              ))}
            </FooterSection>
          </Col>
        </Row>

        <FooterDivider />

        {/* Bottom section */}
        <BottomSection>
          <Copyright>
            &copy; {currentYear} StrateKaz. Todos los derechos reservados.
          </Copyright>
          <LegalLinks>
            <LegalLink onClick={() => setTermsOpen(true)}>Términos de Uso</LegalLink>
            <LegalLink onClick={() => setPrivacyOpen(true)}>Política de Privacidad</LegalLink>
            <LegalLink onClick={() => setCookiesOpen(true)}>Cookies</LegalLink>
          </LegalLinks>
        </BottomSection>
      </FooterContent>
      
      {/* Modales Legales */}
      <TermsModal 
        isOpen={termsOpen} 
        onClose={() => setTermsOpen(false)} 
      />
      
      <PrivacyModal 
        isOpen={privacyOpen} 
        onClose={() => setPrivacyOpen(false)} 
      />
      
      <CookiesModal 
        isOpen={cookiesOpen} 
        onClose={() => setCookiesOpen(false)} 
      />
      
      {/* Modal de Normativas/Servicios */}
      <NormativaModal
        isOpen={normativaModalOpen}
        onClose={() => {
          setNormativaModalOpen(false);
          setSelectedNormativa(null);
        }}
        normativaId={selectedNormativa}
      />
    </FooterWrapper>
  );
};

export default Footer;