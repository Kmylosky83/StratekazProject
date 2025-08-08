// DashboardLayout - Layout específico para el ambiente SaaS
// Incluye sidebar, header de dashboard y navegación interna

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Menu, X, Home, Wrench, BarChart3, Building, Calendar, DollarSign, 
  Bell, User, ChevronDown, Sun, Moon, LogOut, Settings
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../themes/ThemeManager';
import { Button } from '../Button';

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors?.surface || '#f8f9fa'};
`;

const Sidebar = styled.aside`
  width: 280px;
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-right: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: ${props => props.theme.zIndex?.sidebar || '1000'};
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    position: static;
    transform: translateX(0);
  }
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    width: 100vw;
    max-width: 320px;
  }
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing?.s6 || '24px'};
  border-bottom: 1px solid ${props => props.theme.colors?.borderSubtle || '#f3f4f6'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3 || '12px'};
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    height: 32px;
    width: auto;
  }
  
  h1 {
    color: ${props => props.theme.colors?.primary || '#ec268f'};
    font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.25rem'};
    font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
    margin: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.backgroundLight || '#f3f4f6'};
    color: ${props => props.theme.colors?.text || '#1f2937'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  flex: 1;
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: ${props => props.theme.spacing?.s6 || '24px'};
`;

const NavSectionTitle = styled.h3`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 ${props => props.theme.spacing?.s3 || '12px'} 0;
  padding: 0 ${props => props.theme.spacing?.s2 || '8px'};
`;

const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3 || '12px'};
  padding: ${props => props.theme.spacing?.s3 || '12px'};
  border: none;
  background: ${props => props.$isActive ? props.theme.colors?.primary || '#ec268f' : 'transparent'};
  color: ${props => props.$isActive ? 'white' : props.theme.colors?.text || '#1f2937'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: ${props => props.$isActive ? props.theme.colors?.primary || '#ec268f' : props.theme.colors?.backgroundLight || '#f3f4f6'};
  }
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    margin-left: 280px;
  }
`;

const TopHeader = styled.header`
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-bottom: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  padding: ${props => props.theme.spacing?.s4 || '16px'} ${props => props.theme.spacing?.s6 || '24px'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex?.sticky || '100'};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s4 || '16px'};
`;

const MenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  color: ${props => props.theme.colors?.text || '#1f2937'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.backgroundLight || '#f3f4f6'};
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
  }
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    display: none;
  }
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.hero || '1.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semiBold || '600'};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints?.mobile || '576px'}) {
    font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.25rem'};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s3 || '12px'};
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
  padding: ${props => props.theme.spacing?.s2 || '8px'} ${props => props.theme.spacing?.s3 || '12px'};
  background: transparent;
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors?.backgroundLight || '#f3f4f6'};
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing?.s6 || '24px'};
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${props => (props.theme.zIndex?.sidebar || 1000) - 1};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: ${props => props.theme.breakpoints?.desktop || '1024px'}) {
    display: none;
  }
`;

// Configuración de navegación
const navigationConfig = [
  {
    section: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    ]
  },
  {
    section: 'Módulos SaaS',
    items: [
      { id: 'herramientas', label: 'Herramientas', icon: Wrench, path: '/dashboard/herramientas' },
      { id: 'inteligencia', label: 'Inteligencia de Negocios', icon: BarChart3, path: '/dashboard/inteligencia' },
      { id: 'empresas', label: 'Gestión Empresarial', icon: Building, path: '/dashboard/empresas' },
      { id: 'ecosistema', label: 'Ecosistema Digital', icon: Calendar, path: '/dashboard/ecosistema' },
      { id: 'finanzas', label: 'Gestión Financiera', icon: DollarSign, path: '/dashboard/finanzas' },
    ]
  },
  {
    section: 'Configuración',
    items: [
      { id: 'settings', label: 'Configuración', icon: Settings, path: '/dashboard/settings' },
    ]
  }
];

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { currentTheme, changeTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/dashboard/herramientas')) return 'Herramientas';
    if (path.startsWith('/dashboard/inteligencia')) return 'Inteligencia de Negocios';
    if (path.startsWith('/dashboard/empresas')) return 'Gestión Empresarial';
    if (path.startsWith('/dashboard/ecosistema')) return 'Ecosistema Digital';
    if (path.startsWith('/dashboard/finanzas')) return 'Gestión Financiera';
    return 'Dashboard';
  };

  const userName = user?.first_name || user?.username || 'Usuario';

  return (
    <DashboardContainer>
      <Overlay $isOpen={sidebarOpen} onClick={closeSidebar} />
      
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo onClick={handleLogoClick}>
            <img 
              src="https://i.postimg.cc/KcnFLv8g/logo-png-1.png" 
              alt="StrateKaz Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTUwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IGZpbGw9IiNlYzI2OGYiIHdpZHRoPSIxNTAiIGhlaWdodD0iNDAiIHJ4PSI4Ii8+PHRleHQgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijc1IiB5PSIyNiI+U3RyYXRlS2F6PC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <h1>StrateKaz</h1>
          </Logo>
          <CloseButton onClick={closeSidebar}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>

        <SidebarNav>
          {navigationConfig.map((section) => (
            <NavSection key={section.section}>
              <NavSectionTitle>{section.section}</NavSectionTitle>
              {section.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                
                return (
                  <NavItem
                    key={item.id}
                    $isActive={isActive}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <IconComponent />
                    {item.label}
                  </NavItem>
                );
              })}
            </NavSection>
          ))}
        </SidebarNav>
      </Sidebar>

      <MainContent>
        <TopHeader>
          <HeaderLeft>
            <MenuToggle onClick={toggleSidebar}>
              <Menu size={20} />
            </MenuToggle>
            <PageTitle>{getCurrentPageTitle()}</PageTitle>
          </HeaderLeft>

          <HeaderRight>
            <Button
              variant="outline"
              size="small"
              icon={currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              onClick={() => changeTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            />
            
            <Button
              variant="outline"
              size="small"
              icon={<Bell size={16} />}
            />

            <UserMenu>
              <UserButton onClick={handleLogout}>
                <User size={16} />
                {userName}
                <LogOut size={16} />
              </UserButton>
            </UserMenu>
          </HeaderRight>
        </TopHeader>

        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;