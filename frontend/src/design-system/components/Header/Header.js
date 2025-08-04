// Header Component - Design System
// Componente unificado que reemplaza todos los headers duplicados

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../icons';
import { Container } from '../Layout';
import { fadeIn, slideInLeft } from '../../animations';
import { Menu, X } from 'lucide-react';

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
  align-items: center;
  text-decoration: none;
  
  img {
    max-height: 54px;
    width: auto;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s6};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none; /* Mobile menu handled separately */
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

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s4};
`;

const WelcomeMessage = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const UserMenu = styled.div`
  position: relative;
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: ${props => props.theme.colors.white};
    border-radius: ${props => props.theme.borderRadius.medium};
    box-shadow: ${props => props.theme.shadows.elevated};
    padding: ${props => props.theme.spacing.s2} 0;
    min-width: 200px;
    z-index: ${props => props.theme.zIndex.dropdown};
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.s2};
    padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: ${props => props.theme.transitions.normal};
    
    &:hover {
      background-color: ${props => props.theme.colors.hover};
      color: ${props => props.theme.colors.primary};
    }
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

// Animaciones para menú móvil
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

// Botón hamburguesa
const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

// Overlay del menú móvil
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: ${props => props.theme.zIndex.modal || 1000};
  animation: ${fadeInOverlay} 0.3s ease-out;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

// Menú móvil
const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  max-width: 80vw;
  background: ${props => props.theme.colors.white};
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  padding: ${props => props.theme.spacing.s6};
  z-index: ${props => props.theme.zIndex.modal + 1 || 1001};
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
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const MobileMenuTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const MobileMenuClose = styled(IconButton)`
  padding: ${props => props.theme.spacing.s1};
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
    transform: translateX(5px);
  }
`;

const MobileUserSection = styled.div`
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const MobileWelcome = styled.div`
  padding: ${props => props.theme.spacing.s4};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.secondary}10);
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.s4};
  text-align: center;
`;

const MobileWelcomeText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-size: ${props => props.theme.typography.fontSizes.sm};
`;

const MobileUserActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s2};
`;

const MobileActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.variant === 'logout' ? props.theme.colors.danger + '10' : 'transparent'};
  border: none;
  color: ${props => props.variant === 'logout' ? props.theme.colors.danger : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: ${props => props.theme.transitions.normal};
  cursor: pointer;
  width: 100%;
  text-align: left;
  
  &:hover {
    background-color: ${props => props.variant === 'logout' ? props.theme.colors.danger + '20' : props.theme.colors.hover};
    transform: translateX(5px);
  }
`;

const Header = ({ 
  isAuthenticated = false, 
  userName = '', 
  onLogout,
  showNavigation = true 
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  
  // Cerrar menús al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.mobile-menu')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Prevenir scroll cuando el menú móvil está abierto
  React.useEffect(() => {
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
          <img 
            src={process.env.PUBLIC_URL + '/images/logo.png'} 
            alt="StrateKaz" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span style={{ display: 'none', fontWeight: 'bold', fontSize: '1.5rem' }}>
            StrateKaz
          </span>
        </Logo>

        {showNavigation && (
          <Navigation>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/portfolio">Servicios</NavLink>
            <NavLink to="/acceso-gratuito">Herramientas</NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard">Dashboard</NavLink>
            )}
          </Navigation>
        )}

        <UserSection>
          {isAuthenticated ? (
            <>
              {userName && (
                <WelcomeMessage>
                  Hola, {userName}
                </WelcomeMessage>
              )}
              <UserMenu className="user-menu">
                <IconButton
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <Icon name="userCircle" size={24} />
                </IconButton>
                
                {showUserMenu && (
                  <div className="dropdown-menu">
                    <Link to="/dashboard" className="dropdown-item">
                      <Icon name="home" size={16} />
                      Dashboard
                    </Link>
                    <Link to="/profile" className="dropdown-item">
                      <Icon name="user" size={16} />
                      Mi Perfil
                    </Link>
                    <button 
                      className="dropdown-item"
                      onClick={onLogout}
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      <Icon name="logout" size={16} />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </UserMenu>
            </>
          ) : (
            <>
              <NavLink to="/login">Iniciar Sesión</NavLink>
              <NavLink to="/register">Registrarse</NavLink>
            </>
          )}
          
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
          <MobileMenu className="mobile-menu">
            <MobileMenuHeader>
              <MobileMenuTitle>Navegación</MobileMenuTitle>
              <MobileMenuClose onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </MobileMenuClose>
            </MobileMenuHeader>
            
            {showNavigation && (
              <MobileNavigation>
                <MobileNavLink 
                  to="/" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="home" size={20} />
                  Inicio
                </MobileNavLink>
                <MobileNavLink 
                  to="/portfolio" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="briefcase" size={20} />
                  Servicios
                </MobileNavLink>
                <MobileNavLink 
                  to="/acceso-gratuito" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Icon name="tool" size={20} />
                  Herramientas
                </MobileNavLink>
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
            
            <MobileUserSection>
              {isAuthenticated ? (
                <>
                  {userName && (
                    <MobileWelcome>
                      <MobileWelcomeText>
                        👋 Hola, {userName}
                      </MobileWelcomeText>
                    </MobileWelcome>
                  )}
                  <MobileUserActions>
                    <MobileActionButton 
                      as={Link}
                      to="/profile"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Icon name="user" size={20} />
                      Mi Perfil
                    </MobileActionButton>
                    <MobileActionButton 
                      variant="logout"
                      onClick={() => {
                        onLogout?.();
                        setShowMobileMenu(false);
                      }}
                    >
                      <Icon name="logout" size={20} />
                      Cerrar Sesión
                    </MobileActionButton>
                  </MobileUserActions>
                </>
              ) : (
                <MobileUserActions>
                  <MobileActionButton 
                    as={Link}
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon name="login" size={20} />
                    Iniciar Sesión
                  </MobileActionButton>
                  <MobileActionButton 
                    as={Link}
                    to="/register"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon name="userPlus" size={20} />
                    Registrarse
                  </MobileActionButton>
                </MobileUserActions>
              )}
            </MobileUserSection>
          </MobileMenu>
        </>
      )}
    </HeaderWrapper>
  );
};

export default Header;