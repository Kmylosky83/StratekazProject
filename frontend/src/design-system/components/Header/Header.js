// Header Component - Design System (Clean Version)
// Sin valores hardcodeados - usa solo tokens del design system

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container } from '../Layout';
import { fadeIn } from '../../animations';
import { Menu, X, ChevronDown, Sun, Moon, Sparkles, Home, UserPlus, Palette } from 'lucide-react';

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.card};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.fixed};
  padding: ${props => props.theme.spacing.s3} 0;
  width: 100%;
  transition: ${props => props.theme.transitions.normal};
  animation: ${fadeIn} 0.3s ease-in-out;

  &:hover {
    box-shadow: ${props => props.theme.shadows.hover};
  }
`;

const HeaderContent = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  line-height: 1;
  
  .logo-main {
    font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    color: ${props => props.theme.colors.primary};
    letter-spacing: -0.02em;
  }
  
  .logo-sub {
    font-size: ${props => props.theme.typography.fontSizes.note};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    color: ${props => props.theme.colors.textMuted};
    margin-top: ${props => props.theme.componentMeasures.header.logoSubMargin};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s6};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

// Animación moderna y atractiva para Acceso Gratuito
const modernGlow = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 2px 8px rgba(236, 38, 143, 0.15),
      0 0 0 0 rgba(236, 38, 143, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 
      0 4px 16px rgba(236, 38, 143, 0.25),
      0 0 0 2px rgba(236, 38, 143, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const AccesoGratuitoLink = styled(NavLink)`
  position: relative;
  padding: 10px 20px;
  border-radius: 8px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white} !important;
  border: none;
  font-weight: 600;
  overflow: hidden;
  animation: ${modernGlow} 2.5s ease-in-out infinite;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Efecto shimmer */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }
  
  /* Efecto de highlight interno */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  }
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primaryDark} 0%, #b91c6b 100%);
    animation-play-state: paused;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 24px rgba(236, 38, 143, 0.35),
      0 0 0 3px rgba(236, 38, 143, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    color: ${props => props.theme.colors.white} !important;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s4};
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s3};
  background: ${props => props.theme.colors.surface};
  border: ${props => props.theme.componentMeasures.header.borderWidth} solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    border-color: ${props => props.theme.colors.primary};
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &.active svg:last-child {
    transform: rotate(180deg);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + ${props => props.theme.componentMeasures.header.dropdownOffset});
  right: 0;
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.componentMeasures.header.borderWidth} solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.elevated};
  padding: ${props => props.theme.spacing.s2};
  min-width: ${props => props.theme.componentMeasures.header.dropdownMinWidth};
  z-index: ${props => props.theme.zIndex.dropdown};
  animation: ${fadeIn} 0.2s ease-out;
`;

const DropdownSection = styled.div`
  padding: ${props => props.theme.spacing.s2} 0;
  
  &:not(:last-child) {
    border-bottom: ${props => props.theme.componentMeasures.header.borderWidth} solid ${props => props.theme.colors.border};
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s3};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    width: ${props => props.theme.componentMeasures.header.iconSize};
    height: ${props => props.theme.componentMeasures.header.iconSize};
  }
`;

const ThemeSelector = styled.div`
  padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s3};
`;

const ThemeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  font-size: ${props => props.theme.typography.fontSizes.note};
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: ${props => props.theme.spacing.s3};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  
  svg {
    width: ${props => props.theme.componentMeasures.header.iconSizeSmall};
    height: ${props => props.theme.componentMeasures.header.iconSizeSmall};
  }
`;

const ThemeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s1};
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s3};
  background: ${props => props.active ? props.theme.colors.primary + '10' : 'transparent'};
  border: ${props => props.theme.componentMeasures.header.borderWidth} solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.note};
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  width: 100%;
  text-align: left;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary + '20' : props.theme.colors.hover};
  }
  
  svg {
    width: ${props => props.theme.componentMeasures.header.iconSize};
    height: ${props => props.theme.componentMeasures.header.iconSize};
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

// Animaciones para menú móvil usando keyframes del design system
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.componentMeasures.header.overlayBackground};
  backdrop-filter: blur(${props => props.theme.componentMeasures.header.blurRadius});
  z-index: ${props => props.theme.zIndex.modal};
  animation: ${fadeInOverlay} 0.3s ease-out;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${props => props.theme.componentMeasures.header.mobileMenuWidth};
  max-width: ${props => props.theme.componentMeasures.header.mobileMenuMaxWidth};
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.componentMeasures.header.shadowMobile};
  padding: ${props => props.theme.spacing.s6};
  z-index: ${props => props.theme.zIndex.modal + 1};
  animation: ${slideInRight} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.s6};
  padding-bottom: ${props => props.theme.spacing.s4};
  border-bottom: ${props => props.theme.componentMeasures.header.borderWidth} solid ${props => props.theme.colors.border};
`;

const MobileMenuTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s1};
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.primary};
    transform: translateX(${props => props.theme.componentMeasures.header.translateHover});
  }
`;

const AccesoGratuitoMobileLink = styled(MobileNavLink)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: ${props => props.theme.colors.white} !important;
  border: none;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  animation: ${modernGlow} 2.5s ease-in-out infinite;
  
  /* Efecto shimmer para móvil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primaryDark} 0%, #b91c6b 100%);
    animation-play-state: paused;
    color: ${props => props.theme.colors.white} !important;
    transform: translateX(${props => props.theme.componentMeasures.header.translateHover}) scale(1.02);
    box-shadow: 0 4px 16px rgba(236, 38, 143, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const Header = ({ 
  isAuthenticated = false, 
  userName = '', 
  onLogout,
  showNavigation = true,
  currentTheme = 'light',
  onThemeChange
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo to="/">
          <span className="logo-main">StrateKaz</span>
          <span className="logo-sub">Suite Empresarial</span>
        </Logo>

        {showNavigation && (
          <Navigation>
            <NavLink to="/portfolio">Portafolio</NavLink>
            <AccesoGratuitoLink to="/acceso-gratuito">Acceso Gratuito</AccesoGratuitoLink>
            {isAuthenticated && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}
          </Navigation>
        )}

        <UserSection>
          {/* Dropdown para usuario y temas */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <DropdownButton 
              onClick={() => setShowDropdown(!showDropdown)}
              className={showDropdown ? 'active' : ''}
            >
              <Icon name="menu" size={20} />
              <ChevronDown size={16} />
            </DropdownButton>
            
            {showDropdown && (
              <DropdownMenu>
                {/* Sección de navegación */}
                <DropdownSection>
                  <DropdownItem to="/login">
                    <Icon name="login" size={18} />
                    <span>Inicio de Sesión</span>
                  </DropdownItem>
                  {!isAuthenticated && (
                    <DropdownItem to="/register">
                      <UserPlus size={18} />
                      <span>Registrarse</span>
                    </DropdownItem>
                  )}
                </DropdownSection>
                
                {/* Selector de tema */}
                <DropdownSection>
                  <ThemeSelector>
                    <ThemeLabel>
                      <Palette size={16} />
                      <span>Tema</span>
                    </ThemeLabel>
                    <ThemeOptions>
                      <ThemeOption 
                        active={currentTheme === 'light'}
                        onClick={() => onThemeChange?.('light')}
                      >
                        <Sun size={18} />
                        <span>Claro</span>
                      </ThemeOption>
                      <ThemeOption 
                        active={currentTheme === 'black'}
                        onClick={() => onThemeChange?.('black')}
                      >
                        <Moon size={18} />
                        <span>Black</span>
                      </ThemeOption>
                      <ThemeOption 
                        active={currentTheme === 'arkane'}
                        onClick={() => onThemeChange?.('arkane')}
                      >
                        <Sparkles size={18} />
                        <span>Arkane</span>
                      </ThemeOption>
                    </ThemeOptions>
                  </ThemeSelector>
                </DropdownSection>
              </DropdownMenu>
            )}
          </div>
          
          {/* Botón del menú móvil */}
          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu size={24} />
          </MobileMenuButton>
        </UserSection>
      </HeaderContent>
      
      {/* Menú móvil */}
      {showMobileMenu && (
        <>
          <MobileMenuOverlay onClick={() => setShowMobileMenu(false)} />
          <MobileMenu>
            <MobileMenuHeader>
              <MobileMenuTitle>Navegación</MobileMenuTitle>
              <IconButton onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </IconButton>
            </MobileMenuHeader>
            
            {showNavigation && (
              <MobileNavigation>
                <MobileNavLink 
                  to="/login" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="login" size={20} />
                  Inicio de Sesión
                </MobileNavLink>
                <MobileNavLink 
                  to="/portfolio" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="briefcase" size={20} />
                  Portafolio
                </MobileNavLink>
                <AccesoGratuitoMobileLink 
                  to="/acceso-gratuito" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="tool" size={20} />
                  Acceso Gratuito
                </AccesoGratuitoMobileLink>
                {isAuthenticated && (
                  <MobileNavLink 
                    to="/dashboard" 
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon name="dashboard" size={20} />
                    Dashboard
                  </MobileNavLink>
                )}
              </MobileNavigation>
            )}
          </MobileMenu>
        </>
      )}
    </HeaderWrapper>
  );
};

export default Header;