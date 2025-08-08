// DashboardRouter - Sistema de routing para el ambiente SaaS
// Manejo de rutas internas del dashboard con navegación modular

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Loader } from 'lucide-react';

// Importar componentes principales del dashboard
import Dashboard from './dashboard';
import CompleteProfile from '../../components/profile/CompleteProfile';

// Lazy loading de módulos SaaS para optimización
const HerramientasModule = React.lazy(() => import('../../components/dashboard/pilares/herramientas'));
const InteligenciaModule = React.lazy(() => import('../../components/dashboard/pilares/inteligencia_negocios'));
const EmpresasModule = React.lazy(() => import('../../components/dashboard/pilares/empresas'));
const EcosistemaModule = React.lazy(() => import('../../components/dashboard/pilares/ecosistema'));
const FinanzasModule = React.lazy(() => import('../../components/dashboard/pilares/finanzas'));

// Componente de loading
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  flex-direction: column;
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  font-family: ${props => props.theme.typography?.fontFamilies?.secondary || 'system-ui'};
  margin: 0;
`;

const LoadingFallback = ({ moduleName = 'módulo' }) => (
  <LoadingContainer>
    <LoadingSpinner>
      <Loader size={32} />
    </LoadingSpinner>
    <LoadingText>Cargando {moduleName}...</LoadingText>
  </LoadingContainer>
);

// Router de módulos de herramientas
const HerramientasRouter = () => (
  <Routes>
    <Route index element={<HerramientasModule />} />
    <Route path="formacion/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Formación" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="documentacion/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Documentación" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="analisis/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Análisis" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="comunicacion/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Comunicación" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="diagnostico/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Diagnóstico" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="inspecciones/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Inspecciones" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="matrices/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Matrices" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="planificacion/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Planificación" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="reportes/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Reportes" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="seguimiento/*" element={
      <Suspense fallback={<LoadingFallback moduleName="Seguimiento" />}>
        <HerramientasModule />
      </Suspense>
    } />
    <Route path="*" element={<Navigate to="/dashboard/herramientas" replace />} />
  </Routes>
);

// Router principal del dashboard
const DashboardRouter = () => {
  return (
    <Routes>
      {/* Ruta principal del dashboard */}
      <Route index element={<Dashboard />} />
      
      {/* Rutas de los 5 pilares principales */}
      <Route path="herramientas/*" element={<HerramientasRouter />} />
      
      <Route path="inteligencia/*" element={
        <Suspense fallback={<LoadingFallback moduleName="Inteligencia de Negocios" />}>
          <InteligenciaModule />
        </Suspense>
      } />
      
      <Route path="empresas/*" element={
        <Suspense fallback={<LoadingFallback moduleName="Gestión Empresarial" />}>
          <EmpresasModule />
        </Suspense>
      } />
      
      <Route path="ecosistema/*" element={
        <Suspense fallback={<LoadingFallback moduleName="Ecosistema Digital" />}>
          <EcosistemaModule />
        </Suspense>
      } />
      
      <Route path="finanzas/*" element={
        <Suspense fallback={<LoadingFallback moduleName="Gestión Financiera" />}>
          <FinanzasModule />
        </Suspense>
      } />

      {/* Ruta de configuración de perfil */}
      <Route path="profile/*" element={<CompleteProfile />} />
      
      {/* Redirección para rutas no encontradas dentro del dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardRouter;