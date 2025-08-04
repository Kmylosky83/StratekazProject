// Footer Component - Design System
// Componente unificado que reemplaza el Footer de common

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container, Row, Col } from '../Layout';
import { H6, Text } from '../Typography';
import { Logo_Footer } from '../Logo';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.backgroundLight} 0%, 
    ${props => props.theme.colors.white} 100%
  );
  position: relative;
  padding: ${props => props.theme.spacing.s12} 0 ${props => props.theme.spacing.s8} 0;
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
  margin-bottom: ${props => props.theme.spacing.s6};
  position: relative;
  padding-right: ${props => props.theme.spacing.s4};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        ${props => props.theme.colors.primary}15 15%, 
        ${props => props.theme.colors.borderSubtle} 20%, 
        ${props => props.theme.colors.borderSubtle} 80%, 
        ${props => props.theme.colors.primary}15 85%, 
        transparent 100%
      );
      opacity: 0.6;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.s6};
    padding-right: 0;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const BrandSection = styled(FooterSection)`
  .description {
    color: ${props => props.theme.colors.textMutedLight};
    margin: ${props => props.theme.spacing.s4} 0 ${props => props.theme.spacing.s5} 0;
    line-height: ${props => props.theme.typography.lineHeights.relaxed || 1.6};
    font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
    font-weight: ${props => props.theme.typography.fontWeights.normal || 400};
    font-family: ${props => props.theme.typography.fontFamilies.secondary};
    max-width: 280px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s4};
  justify-content: flex-start;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.borderVeryLight};
  color: ${props => props.theme.colors.muted};
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  border: 2px solid transparent;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.theme.colors.primary}40;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FooterTitle = styled(H6)`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  font-weight: ${props => props.theme.typography.fontWeights.bold || 700};
  font-size: ${props => props.theme.typography.fontSizes.base || '1rem'};
  margin-bottom: ${props => props.theme.spacing.s4};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  position: relative;
  padding-bottom: ${props => props.theme.spacing.s2};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    border-radius: 1px;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textMutedLight};
  text-decoration: none;
  display: block;
  margin-bottom: ${props => props.theme.spacing.s2};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.theme.spacing.s1} 0;
  position: relative;
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-weight: ${props => props.theme.typography.fontWeights.medium || 500};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid ${props => props.theme.colors.primary};
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    opacity: 0;
    transition: all 0.25s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    padding-left: ${props => props.theme.spacing.s2};
    
    &::before {
      opacity: 1;
    }
  }
`;

const FooterExternalLink = styled.a`
  color: ${props => props.theme.colors.textMutedLight};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-weight: ${props => props.theme.typography.fontWeights.medium || 500};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.s3};
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
  margin: ${props => props.theme.spacing.s8} 0 ${props => props.theme.spacing.s6} 0;
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

const LegalLink = styled.a`
  color: ${props => props.theme.colors.textMutedLight};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSizes.note || '0.875rem'};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  transition: all 0.25s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Footer = ({ showSocial = true, showContact = true }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'x', href: '#', label: 'X (Twitter)' },
    { name: 'facebook', href: '#', label: 'Facebook' },
    { name: 'instagram', href: '#', label: 'Instagram' },
    { name: 'whatsapp', href: '#', label: 'WhatsApp' },
    { name: 'tiktok', href: '#', label: 'TikTok' },
  ];
  
  const navigationLinks = [
    { to: '/', text: 'Inicio' },
    { to: '/acceso-gratuito', text: 'Acceso Gratuito' },
    { to: '/portfolio', text: 'Portafolio' },
    { to: '/register', text: 'Crear Cuenta' },
  ];
  
  const serviceLinks = [
    { to: '/servicios/iso-9001', text: 'ISO 9001', isInternal: true },
    { to: '/servicios/sg-sst', text: 'SG-SST', isInternal: true },
    { to: '/servicios/pesv', text: 'PESV', isInternal: true },
    { to: '/servicios/innovacion', text: 'Innovación', isInternal: true },
  ];
  
  
  const contactInfo = [
    { icon: 'mail', text: 'info@stratekaz.com', href: 'mailto:info@stratekaz.com' },
    { icon: 'phone', text: '+57 311 535 1944', href: 'tel:+573115351944' },
    { icon: 'mapPin', text: 'Cúcuta, Colombia', href: 'https://maps.google.com/?q=Cucuta,Colombia' },
  ];
  
  return (
    <FooterWrapper>
      <FooterContent>
        <Row>
          {/* Columna 1: Brand + Logo + Redes */}
          <Col lg={3} md={6} sm={12}>
            <BrandSection>
              <div style={{ marginBottom: '20px' }}>
                <Logo_Footer 
                  hoverable 
                  clickable
                  onClick={() => window.location.href = '/'} 
                />
              </div>
              <Text className="description">
                Soluciones profesionales para el crecimiento empresarial.
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
                    >
                      <Icon name={social.name} size={18} />
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
                <FooterLink key={index} to={link.to}>
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
            <LegalLink as={Link} to="/terminos">Términos de Uso</LegalLink>
            <LegalLink as={Link} to="/privacidad">Política de Privacidad</LegalLink>
            <LegalLink as={Link} to="/cookies">Cookies</LegalLink>
          </LegalLinks>
        </BottomSection>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;