// RecursosLibresLayout - Layout tipo dashboard para el ambiente gratuito
// Proporciona una experiencia similar al dashboard real pero sin autenticación

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Menu, X, Home, Award, HardHat, Car, Lightbulb, 
  Sun, Moon, Sparkles, HelpCircle, Palette
} from 'lucide-react';
import { useTheme } from '../../themes/ThemeManager';
import { Button } from '../Button';
import RecursosLibresInfoModal from '../../../components/modals/RecursosLibresInfoModal';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors?.surface};
`;

const Sidebar = styled.aside`
  width: ${props => props.theme.componentMeasures?.sidebar?.width || '280px'};
  background: ${props => props.theme.colors?.white};
  border-right: 1px solid ${props => props.theme.colors?.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndex?.sticky || '1020'};
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isOpen ? props.theme.shadows?.lg : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    position: fixed;
    transform: translateX(0);
    box-shadow: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    width: 100vw;
    max-width: 320px;
  }
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing?.s6};
  border-bottom: 1px solid ${props => props.theme.colors?.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3};
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  h1 {
    color: ${props => props.theme.colors?.primary};
    font-size: ${props => props.theme.typography?.fontSizes?.cardTitle};
    font-weight: ${props => props.theme.typography?.fontWeights?.bold};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.componentMeasures?.sidebar?.buttonSize};
  height: ${props => props.theme.componentMeasures?.sidebar?.buttonSize};
  border: none;
  background: transparent;
  color: ${props => props.theme.colors?.textMuted};
  border-radius: ${props => props.theme.borderRadius?.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.surfaceSubtle};
    color: ${props => props.theme.colors?.text};
  }
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop}) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: ${props => props.theme.spacing?.s4};
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: ${props => props.theme.spacing?.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NavLabel = styled.h3`
  color: ${props => props.theme.colors?.textMuted};
  font-size: ${props => props.theme.typography?.fontSizes?.small};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 ${props => props.theme.spacing?.s3} 0;
  padding: 0 ${props => props.theme.spacing?.s3};
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing?.s2};
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3};
  width: 100%;
  padding: ${props => props.theme.spacing?.s3};
  border: none;
  background: ${props => props.$isActive ? 
    props.theme.colors?.primarySubtle : 
    'transparent'
  };
  color: ${props => props.$isActive ? 
    props.theme.colors?.primary : 
    props.theme.colors?.text
  };
  text-align: left;
  font-size: ${props => props.theme.typography?.fontSizes?.base};
  font-weight: ${props => props.$isActive ? 
    props.theme.typography?.fontWeights?.medium : 
    props.theme.typography?.fontWeights?.normal
  };
  border-radius: ${props => props.theme.borderRadius?.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isActive ? 
      props.theme.colors?.primarySubtle : 
      props.theme.colors?.surfaceSubtle
    };
  }
  
  svg {
    width: ${props => props.theme.componentMeasures?.sidebar?.iconSize};
    height: ${props => props.theme.componentMeasures?.sidebar?.iconSize};
    flex-shrink: 0;
  }
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing?.s4};
  border-top: 1px solid ${props => props.theme.colors?.borderSubtle};
`;

const CorporateCredits = styled.div`
  text-align: center;
  color: ${props => props.theme.colors?.textMuted};
  font-size: ${props => props.theme.typography?.fontSizes?.passwordBadge || '0.75rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.regular};
  line-height: 1.3;
  padding: ${props => props.theme.spacing?.s3};
  border-top: 1px solid ${props => props.theme.colors?.borderSubtle};
  margin-top: auto;
  opacity: 0.7;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    margin-left: 280px;
  }
`;

const TopBar = styled.header`
  background: ${props => props.theme.header?.background || props.theme.colors?.white};
  border-bottom: 1px solid ${props => props.theme.header?.border || props.theme.colors?.border};
  padding: ${props => props.theme.spacing?.s4 || '16px'} ${props => props.theme.spacing?.s6 || '24px'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${props => props.theme.zIndex?.fixed || '1030'};
  transition: ${props => props.theme.transitions?.normal};
  box-shadow: ${props => props.theme.shadows?.card};
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    position: sticky;
    box-shadow: ${props => props.theme.shadows?.elevated};
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows?.ctaHover ? 
      props.theme.shadows.ctaHover(props.theme.colors.primary) : 
      props.theme.shadows?.cardHover || props.theme.shadows?.elevated
    };
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    padding-left: ${props => props.theme.componentMeasures?.sidebar?.width || '280px'};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors?.text || '#374151'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.surfaceSubtle || '#f3f4f6'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    display: none;
  }
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors?.text || '#111827'};
  font-size: ${props => props.theme.typography?.fontSizes?.pageTitle || '1.5rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold || '600'};
  margin: 0;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3};
`;

// Hamburger Menu Button
const HamburgerMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors?.text};
  border-radius: ${props => props.theme.borderRadius?.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.surfaceSubtle};
    color: ${props => props.theme.colors?.primary};
  }
`;

// Mobile Menu Overlay and Panel (similar to Header)
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.componentMeasures?.header?.overlayBackground || 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(${props => props.theme.componentMeasures?.header?.blurRadius || '4px'});
  z-index: ${props => props.theme.zIndex?.modal || '1000'};
  animation: fadeInOverlay 0.3s ease-out;
  
  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${props => props.theme.componentMeasures?.header?.mobileMenuWidth || '320px'};
  max-width: ${props => props.theme.componentMeasures?.header?.mobileMenuMaxWidth || '90vw'};
  background: ${props => props.theme.colors?.white};
  box-shadow: ${props => props.theme.shadows?.lg};
  padding: ${props => props.theme.spacing?.s6};
  z-index: ${props => props.theme.zIndex?.modal + 1 || '1001'};
  animation: slideInRight 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing?.s6};
  padding-bottom: ${props => props.theme.spacing?.s4};
  border-bottom: 1px solid ${props => props.theme.colors?.border};
`;

const MobileMenuTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.semiBold};
`;

const MobileMenuSection = styled.div`
  margin-bottom: ${props => props.theme.spacing?.s6};
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors?.border};
    padding-bottom: ${props => props.theme.spacing?.s4};
  }
`;

const ThemeSelector = styled.div`
  padding: ${props => props.theme.spacing?.s2} 0;
`;

const ThemeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s2};
  font-size: ${props => props.theme.typography?.fontSizes?.note};
  color: ${props => props.theme.colors?.textMuted};
  margin-bottom: ${props => props.theme.spacing?.s3};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium};
`;

const ThemeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing?.s1};
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3};
  padding: ${props => props.theme.spacing?.s2} ${props => props.theme.spacing?.s3};
  background: ${props => props.$active ? props.theme.colors.primary + '10' : 'transparent'};
  border: 1px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  border-radius: ${props => props.theme.borderRadius?.small};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text};
  font-size: ${props => props.theme.typography?.fontSizes?.note};
  cursor: pointer;
  transition: ${props => props.theme.transitions?.normal};
  width: 100%;
  text-align: left;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary + '20' : props.theme.colors.hover};
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const MobileMenuButton = styled(Button)`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing?.s3};
  justify-content: flex-start;
  gap: ${props => props.theme.spacing?.s2};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CloseButtonMobile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors?.textMuted};
  border-radius: ${props => props.theme.borderRadius?.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.surfaceSubtle};
    color: ${props => props.theme.colors?.text};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing?.s6 || '24px'};
  overflow-y: auto;
  margin-top: 72px; /* Espacio para TopBar fijo en móvil */
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    margin-top: 0; /* TopBar sticky en desktop no necesita margen */
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors?.overlay};
  z-index: ${props => props.theme.zIndex?.overlay || '999'};
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    display: none;
  }
`;

// Datos de navegación para los pilares
const navigationData = [
  {
    section: 'Pilares de Gestión',
    items: [
      {
        id: 'resumen',
        name: 'Resumen General',
        icon: Home,
        path: '/acceso-gratuito',
        description: 'Vista general de todos los recursos'
      },
      {
        id: 'iso',
        name: 'ISO',
        icon: Award,
        path: '/acceso-gratuito/iso',
        description: 'Normas ISO 9001, 45001, 14001'
      },
      {
        id: 'sgsst',
        name: 'SG-SST',
        icon: HardHat,
        path: '/acceso-gratuito/sgsst',
        description: 'Sistema de Gestión SST'
      },
      {
        id: 'pesv',
        name: 'PESV',
        icon: Car,
        path: '/acceso-gratuito/pesv',
        description: 'Plan Estratégico Seguridad Vial'
      },
      {
        id: 'innovation',
        name: 'Innovación',
        icon: Lightbulb,
        path: '/acceso-gratuito/innovation',
        description: 'Herramientas de innovación'
      }
    ]
  }
];

const RecursosLibresLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, changeTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Obtener el título de la página actual
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === '/acceso-gratuito') return 'Recursos Libres';
    if (path.includes('/iso')) return 'ISO - Recursos Libres';
    if (path.includes('/sgsst')) return 'SG-SST - Recursos Libres';
    if (path.includes('/pesv')) return 'PESV - Recursos Libres';
    if (path.includes('/innovation')) return 'Innovación - Recursos Libres';
    return 'Recursos Libres';
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleThemeChange = (themeName) => {
    // This will be handled by the theme context
    if (themeName !== currentTheme) {
      changeTheme(themeName);
    }
    setShowMobileMenu(false);
  };

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'light': return Sun;
      case 'black': return Moon;
      case 'arkane': return Sparkles;
      default: return Sun;
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case 'light': return 'Claro';
      case 'black': return 'Black';
      case 'arkane': return 'Arkane';
      default: return 'Claro';
    }
  };

  // Close mobile menu when clicking outside
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

  const isActiveRoute = (path) => {
    if (path === '/acceso-gratuito') {
      return location.pathname === '/acceso-gratuito';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <DashboardContainer>
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo onClick={() => navigate('/')}>
            <h1>StrateKaz</h1>
          </Logo>
          <CloseButton onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarNav>
          {navigationData.map((section) => (
            <NavSection key={section.section}>
              <NavLabel>{section.section}</NavLabel>
              <NavList>
                {section.items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <NavItem key={item.id}>
                      <NavLink
                        $isActive={isActiveRoute(item.path)}
                        onClick={() => handleNavigation(item.path)}
                        title={item.description}
                      >
                        <IconComponent />
                        {item.name}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </NavList>
            </NavSection>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <CorporateCredits>
            Creado por Stratekaz, Una Marca Kmylosky
            <br />
            © 2025. Todos los derechos reservados.
          </CorporateCredits>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <TopBar>
          <TopBarLeft>
            <MenuButton onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </MenuButton>
            <PageTitle>{getCurrentPageTitle()}</PageTitle>
          </TopBarLeft>

          <TopBarRight>
            <HamburgerMenuButton
              onClick={() => setShowMobileMenu(true)}
              title="Menú"
            >
              <Menu size={20} />
            </HamburgerMenuButton>
          </TopBarRight>
        </TopBar>

        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>

      {/* Mobile Hamburger Menu */}
      {showMobileMenu && (
        <>
          <MobileMenuOverlay onClick={() => setShowMobileMenu(false)} />
          <MobileMenu>
            <MobileMenuHeader>
              <MobileMenuTitle>Opciones</MobileMenuTitle>
              <CloseButtonMobile onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </CloseButtonMobile>
            </MobileMenuHeader>
            
            {/* Theme Selector */}
            <MobileMenuSection>
              <ThemeSelector>
                <ThemeLabel>
                  <Palette size={16} />
                  <span>Tema</span>
                </ThemeLabel>
                <ThemeOptions>
                  {['light', 'black', 'arkane'].map((themeName) => {
                    const ThemeIcon = getThemeIcon(themeName);
                    return (
                      <ThemeOption
                        key={themeName}
                        $active={currentTheme === themeName}
                        onClick={() => handleThemeChange(themeName)}
                      >
                        <ThemeIcon size={18} />
                        <span>{getThemeLabel(themeName)}</span>
                      </ThemeOption>
                    );
                  })}
                </ThemeOptions>
              </ThemeSelector>
            </MobileMenuSection>

            {/* Info Button */}
            <MobileMenuSection>
              <MobileMenuButton
                variant="outline"
                size="medium"
                onClick={() => {
                  setInfoModalOpen(true);
                  setShowMobileMenu(false);
                }}
              >
                <HelpCircle size={16} />
                ¿Cómo funcionan?
              </MobileMenuButton>
            </MobileMenuSection>

            {/* Corporate Credits */}
            <CorporateCredits>
              Creado por Stratekaz, Una Marca Kmylosky
              <br />
              © 2025. Todos los derechos reservados.
            </CorporateCredits>
          </MobileMenu>
        </>
      )}

      {/* Modal explicativo de recursos libres */}
      <RecursosLibresInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </DashboardContainer>
  );
};

export default RecursosLibresLayout;