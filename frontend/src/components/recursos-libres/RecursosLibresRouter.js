// RecursosLibresRouter - Sistema de routing para el dashboard de recursos libres
// Manejo de rutas internas del dashboard gratuito con navegación modular

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Loader } from 'lucide-react';

// Importar componentes principales de recursos libres
import RecursosOverview from './RecursosOverview';

// Lazy loading de módulos de pilares para optimización
const ISOModule = React.lazy(() => import('./pilares/ISOModule'));
const SGSSTModule = React.lazy(() => import('./pilares/SGSSTModule'));
const PESVModule = React.lazy(() => import('./pilares/PESVModule'));
const InnovationModule = React.lazy(() => import('./pilares/InnovationModule'));

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
  text-align: center;
`;

const LoadingFallback = ({ moduleName = 'recursos' }) => (
  <LoadingContainer>
    <LoadingSpinner>
      <Loader size={32} />
    </LoadingSpinner>
    <LoadingText>Cargando {moduleName}...</LoadingText>
  </LoadingContainer>
);

// Router principal de recursos libres
const RecursosLibresRouter = () => {
  return (
    <Routes>
      {/* Ruta principal - Vista general de recursos */}
      <Route index element={<RecursosOverview />} />
      
      {/* Rutas de los 4 pilares principales */}
      <Route path="iso" element={
        <Suspense fallback={<LoadingFallback moduleName="recursos ISO" />}>
          <ISOModule />
        </Suspense>
      } />
      
      <Route path="sgsst" element={
        <Suspense fallback={<LoadingFallback moduleName="recursos SG-SST" />}>
          <SGSSTModule />
        </Suspense>
      } />
      
      <Route path="pesv" element={
        <Suspense fallback={<LoadingFallback moduleName="recursos PESV" />}>
          <PESVModule />
        </Suspense>
      } />
      
      <Route path="innovation" element={
        <Suspense fallback={<LoadingFallback moduleName="recursos de Innovación" />}>
          <InnovationModule />
        </Suspense>
      } />

      {/* Redirección para rutas no encontradas dentro de recursos libres */}
      <Route path="*" element={<Navigate to="/acceso-gratuito" replace />} />
    </Routes>
  );
};

export default RecursosLibresRouter;