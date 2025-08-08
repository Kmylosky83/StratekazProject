// HerramientaPage - Página principal para herramientas SPA
// Manejo de routing dinámico y navegación entre herramientas

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ToolContainer from '../components/recursos-libres/ToolContainer';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

// Animación para el spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #EC268F;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 16px;
`;

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
    // Renderizar sin PageLayout para mantener consistencia con recursos gratuitos
    return (
      <div style={{ 
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        gap: '20px',
        padding: '20px'
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
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            ':hover': {
              background: '#EC268F',
              color: 'white'
            }
          }}
        >
          Volver a Recursos Libres
        </button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/acceso-gratuito');
  };

  if (loading) {
    // Renderizar sin PageLayout para mantener consistencia con recursos gratuitos
    return (
      <div style={{ 
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <SpinnerDiv />
          Cargando herramienta...
        </div>
      </div>
    );
  }

  // Los recursos gratuitos se renderizan sin PageLayout (sin header/footer)
  return (
    <ToolContainer
      pillar={pillar}
      toolId={toolId}
      toolName={toolConfig.name}
      toolDescription={toolConfig.description}
      onBack={handleBack}
    />
  );
};

export default HerramientaPage;