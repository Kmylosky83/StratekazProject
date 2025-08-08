// HerramientaPage - Página principal para herramientas SPA
// Manejo de routing dinámico y navegación entre herramientas

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../design-system/components';
import ToolContainer from '../components/recursos-libres/ToolContainer';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

// Configuración de herramientas
const TOOLS_CONFIG = {
  iso: {
    name: 'ISO 9001 | 45001 | 14001',
    description: 'Sistemas de gestión de calidad, seguridad y ambiente',
    tools: {
      'diagnostico-9001': {
        name: 'Diagnóstico ISO 9001:2015',
        description: 'Evalúa el cumplimiento de tu Sistema de Gestión de Calidad'
      },
      'matriz-riesgos': {
        name: 'Matriz de Riesgos',
        description: 'Identifica y evalúa los riesgos de tu organización'
      },
      'auditoria-interna': {
        name: 'Auditoría Interna',
        description: 'Planifica y ejecuta auditorías internas de calidad'
      }
    }
  },
  sgsst: {
    name: 'SG-SST',
    description: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    tools: {
      'matriz-peligros': {
        name: 'Matriz de Peligros',
        description: 'Identifica peligros y evalúa riesgos laborales'
      },
      'investigacion-accidentes': {
        name: 'Investigación de Accidentes',
        description: 'Investiga y analiza accidentes e incidentes'
      }
    }
  },
  pesv: {
    name: 'PESV',
    description: 'Plan Estratégico de Seguridad Vial',
    tools: {
      'diagnostico-pesv': {
        name: 'Diagnóstico PESV',
        description: 'Evalúa el estado actual de seguridad vial'
      },
      'plan-accion': {
        name: 'Plan de Acción',
        description: 'Define objetivos y acciones de seguridad vial'
      }
    }
  },
  innovation: {
    name: 'Innovación',
    description: 'Herramientas de gestión de la innovación',
    tools: {
      'canvas-innovacion': {
        name: 'Canvas de Innovación',
        description: 'Estructura tus ideas innovadoras'
      },
      'matriz-priorizacion': {
        name: 'Matriz de Priorización',
        description: 'Prioriza proyectos de innovación'
      }
    }
  }
};

const HerramientaPage = () => {
  const { pillar, toolId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const { currentTheme, changeTheme } = useTheme();

  const userName = user?.first_name || user?.username || "";

  // Validar que el pilar y herramienta existan
  const pillarConfig = TOOLS_CONFIG[pillar];
  const toolConfig = pillarConfig?.tools[toolId];

  if (!pillarConfig || !toolConfig) {
    return (
      <PageLayout
        isAuthenticated={isAuthenticated} 
        userName={userName}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh',
          textAlign: 'center',
          gap: '20px'
        }}>
          <h2>Herramienta no encontrada</h2>
          <p>La herramienta "{toolId}" no existe en el pilar "{pillar}"</p>
          <button 
            onClick={() => navigate('/acceso-gratuito')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #EC268F',
              background: 'transparent',
              color: '#EC268F',
              cursor: 'pointer'
            }}
          >
            Volver a Recursos Libres
          </button>
        </div>
      </PageLayout>
    );
  }

  const handleBack = () => {
    navigate('/acceso-gratuito');
  };

  if (loading) {
    return (
      <PageLayout
        isAuthenticated={isAuthenticated} 
        userName={userName}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh' 
        }}>
          Cargando...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      isAuthenticated={isAuthenticated} 
      userName={userName}
      currentTheme={currentTheme}
      onThemeChange={changeTheme}
      showNavigation={false} // Ocultar navegación para herramientas
    >
      <ToolContainer
        pillar={pillar}
        toolId={toolId}
        toolName={toolConfig.name}
        toolDescription={toolConfig.description}
        onBack={handleBack}
      />
    </PageLayout>
  );
};

export default HerramientaPage;