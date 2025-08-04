import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Menu, Wrench, BarChart3, Building, Calendar, DollarSign, Search, Bell, 
  User, ChevronDown, Sun, Moon, GraduationCap, FileText, ClipboardList, 
  ClipboardCheck, MessageSquare, Database, Table, GitBranch
} from 'lucide-react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';
import { Button } from '../../design-system/components';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('herramientas');
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Obtener información del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.username || 'Usuario');
    
    // Verificar si hay preferencia de tema guardada
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(savedTheme === 'true');
    }
  }, []);

  useEffect(() => {
    // Aplicar clase de tema oscuro al body
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DashboardContainer $darkMode={darkMode}>
      <MainHeader>
        <HeaderLeft>
          <Menu size={20} />
          <Brand>StrateKaz</Brand>
          <SuiteTag>Suite Empresarial</SuiteTag>
        </HeaderLeft>
        
        <HeaderCenter>
          <TabsWrapper>
            <TabButton 
              $active={activeTab === 'herramientas'}
              onClick={() => setActiveTab('herramientas')}
            >
              <Wrench size={16} /> Herramientas
            </TabButton>
            <TabButton 
              $active={activeTab === 'inteligencia'}
              onClick={() => setActiveTab('inteligencia')}
            >
              <BarChart3 size={16} /> Inteligencia
            </TabButton>
            <TabButton 
              $active={activeTab === 'empresas'}
              onClick={() => setActiveTab('empresas')}
            >
              <Building size={16} /> Empresas
            </TabButton>
            <TabButton 
              $active={activeTab === 'ecosistema'}
              onClick={() => setActiveTab('ecosistema')}
            >
              <Calendar size={16} /> Ecosistema
            </TabButton>
            <TabButton 
              $active={activeTab === 'finanzas'}
              onClick={() => setActiveTab('finanzas')}
            >
              <DollarSign size={16} /> Finanzas
            </TabButton>
          </TabsWrapper>
        </HeaderCenter>
        
        <HeaderRight>
          <SearchContainer>
            <Search size={16} />
            <SearchInput type="text" placeholder="Buscar..." />
          </SearchContainer>
          <NotificationButton>
            <Bell size={20} />
          </NotificationButton>
          <UserProfile>
            <Avatar>
              <User size={16} />
            </Avatar>
            <Username>{userName}</Username>
            <ChevronDown size={16} />
          </UserProfile>
          <ThemeToggle onClick={toggleDarkMode}>
            {darkMode ? <><Sun size={16} /> Modo Claro</> : <><Moon size={16} /> Modo Oscuro</>}
          </ThemeToggle>
        </HeaderRight>
      </MainHeader>
      
      <DashboardContent>
        {activeTab === 'herramientas' && (
          <ModuleContainer>
            <SectionTitle>Herramientas de Productividad</SectionTitle>
            <SectionSubtitle>Gestiona tus actividades y procesos empresariales con nuestras herramientas.</SectionSubtitle>
            
            <ToolsGrid>
            <ToolCard>
              <IconContainer $variant="primary">
                <GraduationCap size={24} />
              </IconContainer>
              <CardTitle>Formación</CardTitle>
              <CardSubtitle>Gestiona capacitaciones, asistencia y formación de personal</CardSubtitle>
              <Link to="/dashboard/herramientas/formacion">
                <Button variant="primary" size="medium">Acceder</Button>
              </Link>
            </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <FileText size={24} />
                </IconContainer>
                <CardTitle>Documentación</CardTitle>
                <CardSubtitle>Control documental, firma electrónica y gestión de documentos</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <ClipboardList size={24} />
                </IconContainer>
                <CardTitle>Planificación</CardTitle>
                <CardSubtitle>Gestión de proyectos, tareas y planificación empresarial</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <ClipboardCheck size={24} />
                </IconContainer>
                <CardTitle>Inspecciones</CardTitle>
                <CardSubtitle>Auditorías, evaluaciones y formularios de inspección</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <MessageSquare size={24} />
                </IconContainer>
                <CardTitle>Comunicación</CardTitle>
                <CardSubtitle>Generador de actas y difusión de información</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <BarChart3 size={24} />
                </IconContainer>
                <CardTitle>Diagnóstico</CardTitle>
                <CardSubtitle>Contexto empresarial, BSC, PCI y POAM</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <Database size={24} />
                </IconContainer>
                <CardTitle>Análisis de Datos</CardTitle>
                <CardSubtitle>Analizador de datos, Power BI y Looker Studio</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
              
              <ToolCard $disabled>
                <IconContainer $variant="disabled">
                  <Table size={24} />
                </IconContainer>
                <CardTitle>Matrices</CardTitle>
                <CardSubtitle>Constructor de matrices para gestión de riesgos y procesos</CardSubtitle>
                <Button variant="secondary" size="medium" disabled>Próximamente</Button>
              </ToolCard>
            </ToolsGrid>
          </ModuleContainer>
        )}
        
        {activeTab !== 'herramientas' && (
          <ModuleContainer>
            <SectionTitle>
              {activeTab === 'inteligencia' ? 'Inteligencia de Negocios' : 
               activeTab === 'empresas' ? 'Mis Empresas' : 
               activeTab === 'ecosistema' ? 'Ecosistema Empresarial' : 'Finanzas'}
            </SectionTitle>
            <SectionSubtitle>
              {activeTab === 'inteligencia' ? 'Gestiona sistemas integrados y normativas para tu organización.' : 
               activeTab === 'empresas' ? 'Gestiona tus empresas y organizaciones.' : 
               activeTab === 'ecosistema' ? 'Administra tu ecosistema empresarial y colaboradores.' : 
               'Controla tus finanzas y recursos económicos.'}
            </SectionSubtitle>
            
            <ComingSoonCard>
              <IconContainer $variant="primary" $large>
                <GitBranch size={48} />
              </IconContainer>
              <CardTitle>Módulo en Desarrollo</CardTitle>
              <CardSubtitle>Estamos trabajando para ofrecerte las mejores herramientas de gestión.</CardSubtitle>
              <Button variant="primary" size="medium">
                <Bell size={20} /> Notificarme cuando esté disponible
              </Button>
            </ComingSoonCard>
          </ModuleContainer>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
  ${({ $darkMode }) => $darkMode && `
    background-color: ${colors.text};
    color: ${colors.white};
  `}
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.medium} ${spacing.large};
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.medium};
`;

const Brand = styled.h1`
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.primary};
  margin: 0;
`;

const SuiteTag = styled.span`
  background-color: ${colors.accent};
  color: ${colors.text};
  padding: ${spacing.s1} ${spacing.small};
  border-radius: ${spacing.s1};
  font-size: ${typography.fontSizes.note};
  font-weight: ${typography.fontWeights.medium};
`;

const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: ${spacing.s1};
  background-color: ${colors.surface};
  padding: ${spacing.s1};
  border-radius: ${spacing.small};
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.s1};
  padding: ${spacing.small} ${spacing.medium};
  border: none;
  border-radius: ${spacing.s1};
  background-color: ${({ $active }) => $active ? colors.primary : 'transparent'};
  color: ${({ $active }) => $active ? colors.white : colors.text};
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $active }) => $active ? colors.primaryDark : colors.hover};
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.medium};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s1};
  background-color: ${colors.surface};
  padding: ${spacing.small} ${spacing.medium};
  border-radius: ${spacing.small};
  border: 1px solid ${colors.border};
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: ${typography.fontSizes.base};
  color: ${colors.text};
  width: 200px;
  
  &::placeholder {
    color: ${colors.textMuted};
  }
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: ${spacing.small};
  border-radius: ${spacing.s1};
  color: ${colors.text};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colors.hover};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;

const Username = styled.span`
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.medium};
  color: ${colors.text};
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.s1};
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${colors.border};
  border-radius: ${spacing.s1};
  background-color: ${colors.white};
  color: ${colors.text};
  font-size: ${typography.fontSizes.note};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${colors.hover};
  }
`;

const DashboardContent = styled.main`
  padding: ${spacing.large};
`;

const ModuleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: ${typography.fontSizes.sectionTitle};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.text};
  margin-bottom: ${spacing.small};
`;

const SectionSubtitle = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${colors.textMuted};
  margin-bottom: ${spacing.xlarge};
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.large};
`;

const ToolCard = styled.div`
  background-color: ${colors.white};
  padding: ${spacing.large};
  border-radius: ${spacing.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  ${({ $disabled }) => $disabled ? `
    opacity: 0.6;
    cursor: not-allowed;
  ` : `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
  `}
`;

const IconContainer = styled.div`
  width: ${({ $large }) => $large ? '80px' : '60px'};
  height: ${({ $large }) => $large ? '80px' : '60px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.medium};
  
  ${({ $variant }) => {
    if ($variant === 'primary') return `
      background-color: ${colors.primary};
      color: ${colors.white};
    `;
    if ($variant === 'disabled') return `
      background-color: ${colors.disabled};
      color: ${colors.textMuted};
    `;
    return `
      background-color: ${colors.surface};
      color: ${colors.text};
    `;
  }}
`;

const CardTitle = styled.h3`
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.text};
  margin-bottom: ${spacing.small};
`;

const CardSubtitle = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${colors.textMuted};
  margin-bottom: ${spacing.large};
  line-height: 1.5;
`;

const ComingSoonCard = styled(ToolCard)`
  max-width: 400px;
  margin: 0 auto;
`;

export default Dashboard;