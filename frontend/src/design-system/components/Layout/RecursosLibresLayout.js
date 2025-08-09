// RecursosLibresLayout - Layout tipo dashboard para el ambiente gratuito
// Proporciona una experiencia similar al dashboard real pero sin autenticación

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from 'lucide-react';
import { useTheme } from '../../themes/ThemeManager';
import { Button } from '../Button';
import Header from '../Header/Header';
import { RecursosLibresSidebar } from '../Sidebar';
import RecursosLibresInfoModal from '../../../components/modals/RecursosLibresInfoModal';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
`;

// Sidebar movido a design-system/components/Sidebar

// SidebarHeader movido al componente Sidebar

// Logo movido al componente Sidebar

// CloseButton movido al componente Sidebar

// SidebarNav movido al componente Sidebar

// NavSection movido al componente Sidebar

// NavLabel movido al componente Sidebar

// NavList movido al componente Sidebar

// NavItem movido al componente Sidebar

// NavLink movido al componente Sidebar

// SidebarFooter movido al componente Sidebar

// CorporateCredits movido al componente Sidebar

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.componentMeasures.header.height}; /* Espacio para el header fijo */
  transition: margin-left ${props => props.theme.componentMeasures.sidebar.transitionDuration} ${props => props.theme.componentMeasures.sidebar.transitionEasing};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    margin-left: ${props => {
      // Determinar el ancho del sidebar basado en el estado colapsado
      const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
      const isCollapsed = sidebarCollapsed ? JSON.parse(sidebarCollapsed) : false;
      
      if (props.$sidebarWidth) {
        return props.$sidebarWidth;
      }
      
      return isCollapsed ? 
        props.theme.componentMeasures.sidebar.widthCollapsed : 
        props.theme.componentMeasures.sidebar.width;
    }};
  }
`;

// Eliminar TopBar - usaremos el Header principal

// Eliminar TopBarLeft - usaremos el Header principal

// Eliminar MenuButton - lo integraremos al Header

// Eliminar PageTitle - lo integraremos al Header

// Eliminar TopBarRight - usaremos el Header principal

// Hamburger Menu Button - Eliminado, se usa el del Header

// Mobile Menu Overlay - Eliminado, se usa el del Header

// MobileMenu - Eliminado, se usa el del Header

// MobileMenuHeader - Eliminado

// MobileMenuTitle - Eliminado

// MobileMenuSection - Eliminado

// ThemeSelector - Eliminado, se usa el del Header

// ThemeLabel - Eliminado

// ThemeOptions - Eliminado

// ThemeOption - Eliminado

// MobileMenuButton - Eliminado

// CloseButtonMobile - Eliminado

const ContentArea = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.s6};
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.overlay};
  z-index: ${props => props.theme.zIndex.overlay};
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

// navigationData movido al componente Sidebar

const RecursosLibresLayout = ({ 
  children, 
  customSidebar = null, 
  pageTitle = "Recursos Libres",
  pageSubtitle = "Herramientas gratuitas de gestión empresarial",
  renderCustomSidebar = null
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, changeTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  // showMobileMenu eliminado - se maneja en Header
  
  // Verificar si es el primer ingreso y mostrar modal
  useEffect(() => {
    const hasVisitedRecursos = localStorage.getItem('hasVisitedRecursosLibres');
    if (!hasVisitedRecursos) {
      setInfoModalOpen(true);
      localStorage.setItem('hasVisitedRecursosLibres', 'true');
    }
  }, []);

  // Función para mostrar el modal de ayuda desde el header si es necesario
  const handleShowInfoModal = () => {
    setInfoModalOpen(true);
  };

  // Debug log para verificar sidebar personalizado
  // useEffect(() => {
  //   console.log('🔧 RecursosLibresLayout Debug:');
  //   console.log('  - customSidebar:', !!customSidebar);
  //   console.log('  - renderCustomSidebar:', !!renderCustomSidebar);
  //   console.log('  - sidebarOpen:', sidebarOpen);
  // }, [customSidebar, renderCustomSidebar, sidebarOpen]);

  // Funciones movidas al sidebar
  // Funciones eliminadas - el Header maneja los temas y menú móvil

  return (
    <DashboardContainer>
      {/* Header Principal */}
      <Header 
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
        showNavigation={false} // No mostrar navegación principal en dashboard
        showSidebarToggle={true}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        showHelpButton={true}
        onHelpClick={() => setInfoModalOpen(true)}
      />
      
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      {/* Sidebar personalizado o sidebar por defecto */}
      {renderCustomSidebar ? (
        renderCustomSidebar({
          isOpen: sidebarOpen,
          onClose: () => setSidebarOpen(false)
        })
      ) : customSidebar ? (
        React.cloneElement(customSidebar, {
          isOpen: sidebarOpen,
          onClose: () => setSidebarOpen(false),
          key: 'custom-sidebar'
        })
      ) : (
        <RecursosLibresSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          key="default-sidebar"
        />
      )}

      <MainContent>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>

      {/* El Header ya tiene su propio menú móvil con temas y opciones */}

      {/* Modal explicativo de recursos libres */}
      <RecursosLibresInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
      />
    </DashboardContainer>
  );
};

export default RecursosLibresLayout;