import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Tool, Building, Globe, Menu, 
  Bell, Search, User, ChevronDown,
  LineChart
} from 'lucide-react';
import '../../styles/dashboard.css';
import '../../styles/dark-theme.css';

// Importamos los componentes de cada pilar
import HerramientasProductividad from '../../components/dashboard/pilares/herramientas';
import InteligenciaNegocios from '../../components/dashboard/pilares/inteligencia';
import RedClientes from '../../components/dashboard/pilares/empresas';
import EcosistemaEmpresarial from '../../components/dashboard/pilares/ecosistema';

// Servicio para obtener datos del dashboard
import authService from '../../services/AuthService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('herramientas');
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Obtener perfil de usuario del servicio de autenticación
        const userProfile = await authService.getUserProfile();
        
        if (userProfile.success) {
          setUserType(userProfile.data.user_type);
          setUserData(userProfile.data);
        } else {
          // Si hay error al obtener el perfil, redireccionar al login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Determinar qué pestañas mostrar según el tipo de usuario
  const getTabs = () => {
    // Pestañas comunes para todos los tipos de usuario
    const commonTabs = [
      {
        id: 'herramientas',
        name: 'Herramientas de Productividad',
        icon: <LineChart className="h-5 w-5 mr-2" />
      },
      {
        id: 'inteligencia',
        name: 'Inteligencia de Negocios',
        icon: <Activity className="h-5 w-5 mr-2" />
      },
      {
        id: 'ecosistema',
        name: 'Ecosistema Empresarial',
        icon: <Globe className="h-5 w-5 mr-2" />
      }
    ];
    
    // Si es Profesional Independiente o Empresa Consultora, agregar pestaña de Red de Clientes
    if (userType === 'professional' || userType === 'consultant_company') {
      return [
        ...commonTabs.slice(0, 2), // Primero Herramientas e Inteligencia
        {
          id: 'empresas',
          name: 'Red de Clientes',
          icon: <Building className="h-5 w-5 mr-2" />
        },
        commonTabs[2] // Luego Ecosistema
      ];
    }
    
    // Para Empresa Directa, solo las pestañas comunes (sin Red de Clientes)
    return commonTabs;
  };
  
  // Título según tipo de usuario
  const getDashboardTitle = () => {
    switch(userType) {
      case 'professional':
        return 'Dashboard Profesional';
      case 'consultant_company':
        return 'Dashboard Consultora';
      case 'direct_company':
        return 'Dashboard Empresarial';
      default:
        return 'Dashboard';
    }
  };

  // Renderizar el contenido según la pestaña activa
  const renderTabContent = () => {
    switch(activeTab) {
      case 'herramientas':
        return <HerramientasProductividad userType={userType} />;
      case 'inteligencia':
        return <InteligenciaNegocios userType={userType} />;
      case 'empresas':
        return <RedClientes userType={userType} />;
      case 'ecosistema':
        return <EcosistemaEmpresarial userType={userType} />;
      default:
        return <HerramientasProductividad userType={userType} />;
    }
  };

  // Mostrar indicador de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="loading-container dark-theme">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando tu dashboard...</p>
      </div>
    );
  }

  const tabs = getTabs();

  return (
    <div className="dashboard-container dark-theme">
      {/* Navegación superior */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Menu className="menu-icon hover-glow" />
            <h1 className="dashboard-title">{getDashboardTitle()}</h1>
          </div>
          <div className="header-right">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar..."
                className="search-input strategaz-input"
              />
            </div>
            <button className="notifications-btn hover-glow">
              <Bell className="icon" />
            </button>
            <div className="user-profile">
              <div className="user-avatar">
                <User className="icon" />
              </div>
              <span className="user-name">
                {userData.first_name || userData.username}
              </span>
              <ChevronDown className="dropdown-icon" />
            </div>
          </div>
        </div>
        
        {/* Navegación de tabs/pestañas */}
        <div className="tabs-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${
                activeTab === tab.id ? 'active-tab' : 'inactive-tab'
              } hover-glow`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido principal - cambia según la pestaña activa */}
      <main className="dashboard-main">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;