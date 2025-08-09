// ISO9001Sidebar - Sidebar específico para la herramienta de Diagnóstico ISO 9001
// Navegación entre Dashboard y Diagnóstico de la herramienta

import React, { useState, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Home, ClipboardList, ArrowLeft, X, Pin, PinOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: ${props => {
    if (props.$isMobile) return props.theme.componentMeasures.header.mobileMenuWidth;
    if (props.$isCollapsed && !props.$isExpanded) return props.theme.componentMeasures.sidebar.widthCollapsed;
    return props.theme.componentMeasures.sidebar.width;
  }};
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
  transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
  box-shadow: ${props => props.$isOpen ? props.theme.shadows.lg : 'none'};
  overflow: hidden;
  
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
    /* En móvil siempre mostrar expanded, ignorar estados de colapso */
  }
`;

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
  transition: all ${props => props.theme.transitions.fast} ease;
  z-index: ${props => props.theme.zIndex.modal};
  
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
  overflow: hidden;
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
  letter-spacing: ${props => props.theme.typography.letterSpacing?.wide || '0.05em'};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  padding: 0 ${props => props.theme.spacing.s3};
  position: relative;
  opacity: ${props => props.$isCollapsed && !props.$isExpanded ? '0' : '1'};
  transform: translateX(${props => props.$isCollapsed && !props.$isExpanded ? '-10px' : '0'});
  transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
  transition-delay: ${props => props.$isCollapsed && !props.$isExpanded ? '0ms' : '50ms'};
  white-space: nowrap;
  overflow: hidden;
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
  padding: ${props => {
    if (props.$isCollapsed && !props.$isExpanded) return props.theme.componentMeasures.sidebar.collapsedPadding;
    return props.theme.spacing.s3;
  }};
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
  transition: all ${props => props.theme.transitions.button};
  justify-content: ${props => props.$isCollapsed && !props.$isExpanded ? 'center' : 'flex-start'};
  position: relative;
  
  &:hover {
    background: ${props => props.$isActive ? 
      props.theme.colors.primarySubtle : 
      props.theme.colors.surfaceSubtle
    };
  }
  
  svg {
    width: ${props => props.$isCollapsed && !props.$isExpanded ? 
      props.theme.componentMeasures.sidebar.iconSizeCollapsed :
      props.theme.componentMeasures.sidebar.iconSize
    };
    height: ${props => props.$isCollapsed && !props.$isExpanded ? 
      props.theme.componentMeasures.sidebar.iconSizeCollapsed :
      props.theme.componentMeasures.sidebar.iconSize
    };
    flex-shrink: 0;
    transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ease;
  }
  
  span {
    opacity: ${props => props.$isCollapsed && !props.$isExpanded ? '0' : '1'};
    transform: translateX(${props => props.$isCollapsed && !props.$isExpanded ? '-10px' : '0'});
    transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
    transition-delay: ${props => props.$isCollapsed && !props.$isExpanded ? '0ms' : '50ms'};
    white-space: nowrap;
    overflow: hidden;
  }
`;

// Pin Button para toggle del estado colapsado
const PinButton = styled.button`
  position: absolute;
  top: 0;
  right: ${props => props.theme.spacing.s4};
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
  transition: all ${props => props.theme.transitions.button};
  opacity: ${props => props.$isCollapsed && !props.$isExpanded ? '0' : '1'};
  transform: translateX(${props => props.$isCollapsed && !props.$isExpanded ? '10px' : '0'});
  transition-delay: ${props => props.$isCollapsed && !props.$isExpanded ? '0ms' : '100ms'};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceSubtle};
    color: ${props => props.theme.colors.text};
  }
  
  svg {
    width: ${props => props.theme.componentMeasures.sidebar.pinIconSize};
    height: ${props => props.theme.componentMeasures.sidebar.pinIconSize};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.s4};
  border-top: 1px solid ${props => props.theme.colors.borderSubtle};
  opacity: ${props => props.$isCollapsed && !props.$isExpanded ? '0' : '1'};
  transform: translateY(${props => props.$isCollapsed && !props.$isExpanded ? '10px' : '0'});
  transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
  transition-delay: ${props => props.$isCollapsed && !props.$isExpanded ? '0ms' : '100ms'};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  width: 100%;
  padding: ${props => {
    if (props.$isCollapsed && !props.$isExpanded) return props.theme.componentMeasures.sidebar.collapsedPadding;
    return props.theme.spacing.s3;
  }};
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  text-align: left;
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.normal};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.button};
  justify-content: ${props => props.$isCollapsed && !props.$isExpanded ? 'center' : 'flex-start'};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceSubtle};
  }
  
  svg {
    width: ${props => props.$isCollapsed && !props.$isExpanded ? 
      props.theme.componentMeasures.sidebar.iconSizeCollapsed :
      props.theme.componentMeasures.sidebar.iconSize
    };
    height: ${props => props.$isCollapsed && !props.$isExpanded ? 
      props.theme.componentMeasures.sidebar.iconSizeCollapsed :
      props.theme.componentMeasures.sidebar.iconSize
    };
    flex-shrink: 0;
    transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ease;
  }
  
  span {
    opacity: ${props => props.$isCollapsed && !props.$isExpanded ? '0' : '1'};
    transform: translateX(${props => props.$isCollapsed && !props.$isExpanded ? '-10px' : '0'});
    transition: all ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
    transition-delay: ${props => props.$isCollapsed && !props.$isExpanded ? '0ms' : '50ms'};
    white-space: nowrap;
    overflow: hidden;
  }
`;

// Constantes
const RECURSOS_LIBRES_PATH = '/acceso-gratuito';

const ISO9001Sidebar = ({ isOpen, onClose, activeModule, onModuleChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isCollapsed] = useState(true); // Siempre colapsado por defecto
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(() => {
    const saved = localStorage.getItem('sidebarPinned');
    return saved ? JSON.parse(saved) : false;
  });
  const hoverTimeoutRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si es móvil
  useEffect(() => {
    const tabletBreakpoint = parseInt(theme.breakpoints.tablet);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= tabletBreakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [theme.breakpoints.tablet]);
  
  // Guardar preferencias en localStorage  
  useEffect(() => {
    localStorage.setItem('sidebarPinned', JSON.stringify(isPinned));
  }, [isPinned]);

  // Debug logs detallados
  // React.useEffect(() => {
  //   console.log('🔧 ISO9001Sidebar renderizado:');
  //   console.log('  - isOpen:', isOpen);
  //   console.log('  - activeModule:', activeModule);
  //   console.log('  - onClose:', typeof onClose);
  //   console.log('  - onModuleChange:', typeof onModuleChange);
  // }, [isOpen, activeModule, onClose, onModuleChange]);

  const handleBackToResources = () => {
    navigate(RECURSOS_LIBRES_PATH);
    onClose();
  };

  const handleModuleChange = (moduleId) => {
    onModuleChange(moduleId);
    onClose(); // Cerrar sidebar en mobile tras selección
  };
  
  // Handlers para hover en desktop
  const handleMouseEnter = () => {
    if (isMobile || isPinned) return;
    
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, parseInt(theme.componentMeasures.sidebar.hoverDelay));
  };
  
  const handleMouseLeave = () => {
    if (isMobile || isPinned) return;
    
    clearTimeout(hoverTimeoutRef.current);
    setIsExpanded(false);
  };
  
  // Handler para toggle pin/unpin
  const handlePinToggle = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    
    if (newPinnedState) {
      // Si se ancla, mantener expandido
      setIsExpanded(true);
    }
    // Si se desancla, el hover se encargará del comportamiento
  };
  
  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  // Determinar el estado final del sidebar
  const shouldShowCollapsed = !isMobile && isCollapsed;
  const shouldShowExpanded = !isMobile && (isExpanded || isPinned || !isCollapsed);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Vista general y métricas'
    },
    {
      id: 'diagnostic',
      label: 'Diagnóstico',
      icon: ClipboardList,
      description: 'Evaluación por secciones ISO'
    }
  ];

  // console.log('🎨 ISO9001Sidebar - Renderizando componente visual');
  
  return (
    <SidebarContainer 
      $isOpen={isOpen}
      $isCollapsed={shouldShowCollapsed}
      $isExpanded={shouldShowExpanded}
      $isMobile={isMobile}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarNav>
        <NavSection>
          <NavLabel 
            $isCollapsed={shouldShowCollapsed}
            $isExpanded={shouldShowExpanded}
          >
            ISO 9001:2015
            <CloseButton onClick={onClose}>
              <X size={18} />
            </CloseButton>
            {!isMobile && (
              <PinButton
                onClick={handlePinToggle}
                title={isPinned ? "Desanclar sidebar" : "Anclar sidebar"}
                $isCollapsed={shouldShowCollapsed}
                $isExpanded={shouldShowExpanded}
              >
                {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
              </PinButton>
            )}
          </NavLabel>
          <NavList>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              
              return (
                <NavItem key={item.id}>
                  <NavLink
                    $isActive={isActive}
                    $isCollapsed={shouldShowCollapsed}
                    $isExpanded={shouldShowExpanded}
                    onClick={() => handleModuleChange(item.id)}
                    title={shouldShowCollapsed && !shouldShowExpanded ? item.description : undefined}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </NavLink>
                </NavItem>
              );
            })}
          </NavList>
        </NavSection>
      </SidebarNav>

      <SidebarFooter 
        $isCollapsed={shouldShowCollapsed}
        $isExpanded={shouldShowExpanded}
      >
        <BackButton
          $isCollapsed={shouldShowCollapsed}
          $isExpanded={shouldShowExpanded}
          onClick={handleBackToResources}
          title={shouldShowCollapsed && !shouldShowExpanded ? "Volver a Recursos Libres" : undefined}
        >
          <ArrowLeft />
          <span>Volver a Recursos Libres</span>
        </BackButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default ISO9001Sidebar;