import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Tool, Building, Globe, Menu, 
  Bell, Search, User, ChevronDown
} from 'lucide-react';
import '../../styles/dashboard.css';

// Importamos los componentes de cada pilar
import HerramientasProductividad from '../../components/dashboard/pilares/herramientas';
import InteligenciaNegocios from '../../components/dashboard/pilares/inteligencia';
import RedClientes from '../../components/dashboard/pilares/empresas';
import EcosistemaEmpresarial from '../../components/dashboard/pilares/ecosistema';

// Servicio para obtener datos del dashboard
import authService from '../../services/authService';

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
        icon: <Tool className="h-5 w-5 mr-2" />
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
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando tu dashboard...</p>
      </div>
    );
  }

  const tabs = getTabs();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navegación superior */}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 mr-4" />
            <h1 className="text-xl font-semibold text-blue-600">{getDashboardTitle()}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <span className="ml-2 text-sm font-medium">
                {userData.first_name || userData.username}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
            </div>
          </div>
        </div>
        
        {/* Navegación de tabs/pestañas */}
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex items-center px-6 py-3 text-sm font-medium ${
                activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido principal - cambia según la pestaña activa */}
      <main className="flex-1 p-6">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;