// En C:\Proyectos\StratekazProject\frontend\src\pages\dashboard\dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';
import '../../styles/variables.css';

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
    <div className={`dashboard-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Header principal */}
      <header className="main-header">
        <div className="header-left">
          <i className="fas fa-bars menu-icon"></i>
          <h1 className="brand">StrateKaz</h1>
          <span className="suite-tag">Suite Empresarial</span>
        </div>
        
        <div className="header-center">
          <div className="tabs-wrapper">
            <button 
              className={`tab-button ${activeTab === 'herramientas' ? 'active' : ''}`}
              onClick={() => setActiveTab('herramientas')}
            >
              <i className="fas fa-tools fa-sm"></i> Herramientas
            </button>
            <button 
              className={`tab-button ${activeTab === 'inteligencia' ? 'active' : ''}`}
              onClick={() => setActiveTab('inteligencia')}
            >
              <i className="fas fa-chart-line fa-sm"></i> Inteligencia
            </button>
            <button 
              className={`tab-button ${activeTab === 'empresas' ? 'active' : ''}`}
              onClick={() => setActiveTab('empresas')}
            >
              <i className="fas fa-building fa-sm"></i> Empresas
            </button>
            <button 
              className={`tab-button ${activeTab === 'ecosistema' ? 'active' : ''}`}
              onClick={() => setActiveTab('ecosistema')}
            >
              <i className="fas fa-calendar-alt fa-sm"></i> Ecosistema
            </button>
            <button 
              className={`tab-button ${activeTab === 'finanzas' ? 'active' : ''}`}
              onClick={() => setActiveTab('finanzas')}
            >
              <i className="fas fa-dollar-sign fa-sm"></i> Finanzas
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Buscar..." className="search-input" />
          </div>
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
          </button>
          <div className="user-profile">
            <div className="avatar">
              <i className="fas fa-user"></i>
            </div>
            <span className="username">{userName}</span>
            <i className="fas fa-chevron-down down-icon"></i>
          </div>
          <button 
            className="boton-secundario boton-pequeno"
            onClick={toggleDarkMode}
          >
            {darkMode ? <><i className="fas fa-sun"></i> Modo Claro</> : <><i className="fas fa-moon"></i> Modo Oscuro</>}
          </button>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="dashboard-content">
        {activeTab === 'herramientas' && (
          <div className="module-container">
            <h2 className="titulo-seccion">Herramientas de Productividad</h2>
            <p className="subtitulo-seccion">Gestiona tus actividades y procesos empresariales con nuestras herramientas.</p>
            
            <div className="tools-grid">
            <div className="tarjeta tool-card">
              <div className="icono-estandar-rosa">
                <i className="fas fa-chalkboard-teacher fa-lg"></i>
              </div>
              <h3 className="titulo-tarjeta">Formación</h3>
              <p className="subtitulo-tarjeta">Gestiona capacitaciones, asistencia y formación de personal</p>
              <Link to="/dashboard/herramientas/formacion" className="boton-primario">Acceder</Link>
            </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-file-alt fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Documentación</h3>
                <p className="subtitulo-tarjeta">Control documental, firma electrónica y gestión de documentos</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-tasks fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Planificación</h3>
                <p className="subtitulo-tarjeta">Gestión de proyectos, tareas y planificación empresarial</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-clipboard-check fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Inspecciones</h3>
                <p className="subtitulo-tarjeta">Auditorías, evaluaciones y formularios de inspección</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-comments fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Comunicación</h3>
                <p className="subtitulo-tarjeta">Generador de actas y difusión de información</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-chart-bar fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Diagnóstico</h3>
                <p className="subtitulo-tarjeta">Contexto empresarial, BSC, PCI y POAM</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-database fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Análisis de Datos</h3>
                <p className="subtitulo-tarjeta">Analizador de datos, Power BI y Looker Studio</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
              
              <div className="tarjeta tool-card disabled">
                <div className="icono-estandar-gris">
                  <i className="fas fa-table fa-lg"></i>
                </div>
                <h3 className="titulo-tarjeta">Matrices</h3>
                <p className="subtitulo-tarjeta">Constructor de matrices para gestión de riesgos y procesos</p>
                <button className="boton-secundario disabled">Próximamente</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'herramientas' && (
          <div className="module-container">
            <h2 className="titulo-seccion">
              {activeTab === 'inteligencia' ? 'Inteligencia de Negocios' : 
               activeTab === 'empresas' ? 'Mis Empresas' : 
               activeTab === 'ecosistema' ? 'Ecosistema Empresarial' : 'Finanzas'}
            </h2>
            <p className="subtitulo-seccion">
              {activeTab === 'inteligencia' ? 'Gestiona sistemas integrados y normativas para tu organización.' : 
               activeTab === 'empresas' ? 'Gestiona tus empresas y organizaciones.' : 
               activeTab === 'ecosistema' ? 'Administra tu ecosistema empresarial y colaboradores.' : 
               'Controla tus finanzas y recursos económicos.'}
            </p>
            
            <div className="tarjeta coming-soon">
              <div className="icono-grande-primario">
                <i className="fas fa-code-branch fa-2x"></i>
              </div>
              <h3 className="titulo-tarjeta">Módulo en Desarrollo</h3>
              <p className="texto-base">Estamos trabajando para ofrecerte las mejores herramientas de gestión.</p>
              <button className="boton-primario">
                <i className="fas fa-bell"></i> Notificarme cuando esté disponible
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;