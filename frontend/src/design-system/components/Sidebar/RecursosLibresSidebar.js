// RecursosLibresSidebar - Sidebar específico para el dashboard de recursos libres
// Integrado al design system manteniendo el diseño original

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { X, Home, Award, HardHat, Car, Lightbulb } from 'lucide-react';

// Styled Components usando design system tokens
const Sidebar = styled.aside`
  width: ${props => props.theme.componentMeasures.sidebar.width};
  background: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - ${props => props.theme.componentMeasures.header.height});
  top: ${props => props.theme.componentMeasures.header.height};
  left: 0;
  z-index: ${props => props.theme.zIndex.sticky};
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isOpen ? props.theme.shadows.lg : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    position: fixed;
    transform: translateX(0);
    box-shadow: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100vw;
    max-width: ${props => props.theme.componentMeasures.header.mobileMenuWidth};
    top: 0;
    height: 100vh;
  }
`;

// SidebarHeader eliminado - contenido integrado en NavLabel

// Logo eliminado - no se usa título en el sidebar

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.componentMeasures.sidebar.buttonSize};
  height: ${props => props.theme.componentMeasures.sidebar.buttonSize};
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.textMuted};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: ${props => props.theme.colors.surfaceSubtle};
    color: ${props => props.theme.colors.text};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s4};
  overflow-y: auto;
  position: relative;
`;

const NavSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:first-child {
    position: relative;
  }
`;

const NavLabel = styled.h3`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.small};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  padding: 0 ${props => props.theme.spacing.s3};
  position: relative;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.s2};
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  width: 100%;
  padding: ${props => props.theme.spacing.s3};
  border: none;
  background: ${props => props.$isActive ? 
    props.theme.colors.primarySubtle : 
    'transparent'
  };
  color: ${props => props.$isActive ? 
    props.theme.colors.primary : 
    props.theme.colors.text
  };
  text-align: left;
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.$isActive ? 
    props.theme.typography.fontWeights.medium : 
    props.theme.typography.fontWeights.normal
  };
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$isActive ? 
      props.theme.colors.primarySubtle : 
      props.theme.colors.surfaceSubtle
    };
  }
  
  svg {
    width: ${props => props.theme.componentMeasures.sidebar.iconSize};
    height: ${props => props.theme.componentMeasures.sidebar.iconSize};
    flex-shrink: 0;
  }
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.borderSubtle};
`;

const CorporateCredits = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.passwordBadge};
  font-weight: ${props => props.theme.typography.fontWeights.regular};
  line-height: 1.3;
  padding: ${props => props.theme.spacing.s3};
  margin-top: auto;
  opacity: 0.6;
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

const RecursosLibresSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
  };

  const isActiveRoute = (path) => {
    if (path === '/acceso-gratuito') {
      return location.pathname === '/acceso-gratuito';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar $isOpen={isOpen}>
      <SidebarNav>
        {navigationData.map((section, index) => (
          <NavSection key={section.section}>
            <NavLabel>
              {section.section}
              {index === 0 && (
                <CloseButton onClick={onClose}>
                  <X size={18} />
                </CloseButton>
              )}
            </NavLabel>
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
  );
};

export default RecursosLibresSidebar;