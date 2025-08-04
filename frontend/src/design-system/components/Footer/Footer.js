// Footer Component - Design System
// Componente unificado que reemplaza el Footer de common

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container, Grid, Row, Col } from '../Layout';
import { H6, Text } from '../Typography';
import { Logo_Footer } from '../Logo';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.s12};
  padding: ${props => props.theme.spacing.s12} 0 ${props => props.theme.spacing.s6} 0;
`;

const FooterContent = styled(Container)``;

const FooterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s8};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.s4};
  }
`;

const BrandSection = styled(FooterSection)`
  .description {
    color: ${props => props.theme.colors.muted};
    margin: ${props => props.theme.spacing.s4} 0;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s4};
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.muted};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: ${props => props.theme.borderRadius.full};
  padding: ${props => props.theme.spacing.s2};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.primary}20;
    border-radius: ${props => props.theme.borderRadius.full};
    transform: scale(0);
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transform: translateY(-3px) scale(1.1);
    
    &::before {
      transform: scale(1);
    }
  }
`;

const FooterTitle = styled(H6)`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.muted};
  text-decoration: none;
  display: block;
  margin-bottom: ${props => props.theme.spacing.s2};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.s1} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transform: translateX(5px);
    
    &::after {
      width: 30px;
    }
  }
`;

const FooterExternalLink = styled.a`
  color: ${props => props.theme.colors.muted};
  text-decoration: none;
  display: block;
  margin-bottom: ${props => props.theme.spacing.s2};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.s1} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transform: translateX(5px);
    
    &::after {
      width: 30px;
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.s2};
  color: ${props => props.theme.colors.muted};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.s1} 0;
  border-radius: ${props => props.theme.borderRadius.small};
  
  .icon {
    margin-right: ${props => props.theme.spacing.s2};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
    transform: translateX(3px);
    
    .icon {
      color: ${props => props.theme.colors.primary};
      transform: scale(1.1);
    }
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.s8} 0 ${props => props.theme.spacing.s6} 0;
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
  color: ${props => props.theme.colors.muted};
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s4};
  flex-wrap: wrap;
`;

const LegalLink = styled.a`
  color: ${props => props.theme.colors.muted};
  text-decoration: none;
  font-size: 0.9rem;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Footer = ({ showSocial = true, showContact = true }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'linkedin', href: 'https://linkedin.com/company/stratekaz', label: 'LinkedIn' },
    { name: 'twitter', href: 'https://twitter.com/stratekaz', label: 'Twitter' },
    { name: 'facebook', href: 'https://facebook.com/stratekaz', label: 'Facebook' },
    { name: 'instagram', href: 'https://instagram.com/stratekaz', label: 'Instagram' },
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
  
  const supportLinks = [
    { to: '/ayuda', text: 'Centro de Ayuda', isInternal: true },
    { to: '/documentacion', text: 'Documentación', isInternal: true },
    { to: '/contacto', text: 'Contacto', isInternal: true },
    { href: 'https://status.stratekaz.com', text: 'Estado del Servicio', isInternal: false },
  ];
  
  const contactInfo = [
    { icon: 'mail', text: 'info@stratekaz.com', href: 'mailto:info@stratekaz.com' },
    { icon: 'phone', text: '+57 (1) 234-5678', href: 'tel:+5712345678' },
    { icon: 'mapPin', text: 'Bogotá, Colombia', href: 'https://maps.google.com/?q=Bogota,Colombia' },
  ];
  
  return (
    <FooterWrapper>
      <FooterContent>
        <Row>
          {/* Brand and Description */}
          <Col lg={4}>
            <BrandSection>
              <div style={{ marginBottom: '16px' }}>
                <Logo_Footer 
                  hoverable 
                  onClick={() => window.location.href = '/'} 
                />
              </div>
              <Text className="description">
                Suite empresarial completa para la gestión, optimización y crecimiento 
                de tu negocio. Herramientas profesionales al alcance de todos.
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
                      <Icon name={social.name} size={20} />
                    </SocialLink>
                  ))}
                </SocialLinks>
              )}
            </BrandSection>
          </Col>

          {/* Navigation Links */}
          <Col lg={2} md={6}>
            <FooterSection>
              <FooterTitle>Navegación</FooterTitle>
              {navigationLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterSection>
          </Col>

          {/* Services */}
          <Col lg={2} md={6}>
            <FooterSection>
              <FooterTitle>Servicios</FooterTitle>
              {serviceLinks.map((link, index) => (
                link.isInternal ? (
                  <FooterLink key={index} to={link.to}>
                    {link.text}
                  </FooterLink>
                ) : (
                  <FooterExternalLink key={index} href={link.href}>
                    {link.text}
                  </FooterExternalLink>
                )
              ))}
            </FooterSection>
          </Col>

          {/* Support */}
          <Col lg={2} md={6}>
            <FooterSection>
              <FooterTitle>Soporte</FooterTitle>
              {supportLinks.map((link, index) => (
                link.isInternal ? (
                  <FooterLink key={index} to={link.to}>
                    {link.text}
                  </FooterLink>
                ) : (
                  <FooterExternalLink key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </FooterExternalLink>
                )
              ))}
            </FooterSection>
          </Col>

          {/* Contact */}
          {showContact && (
            <Col lg={2} md={6}>
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
          )}
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