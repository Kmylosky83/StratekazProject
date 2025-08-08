/**
 * App.js - Sistema de routing completo para ambos ambientes
 * Ambiente 1: Landing/Marketing (público)
 * Ambiente 2: Dashboard/SaaS (protegido)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeManager } from './design-system/themes/ThemeManager';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import { ErrorBoundary } from './design-system/components';

// Componentes de protección de rutas
import ProtectedRoute from './components/ProtectedRoute';

// Páginas del Ambiente 1: Landing/Marketing (Público)
import Home from './pages/Home'; 
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PortfolioPage from './pages/PortfolioPage';
import AccesoGratuitoPage from './pages/AccesoGratuitoPage';
import HerramientaPage from './pages/HerramientaPage';

// Páginas del Ambiente 2: Dashboard/SaaS (Protegido)
import DashboardRouter from './pages/dashboard/DashboardRouter';
import DashboardLayout from './design-system/components/Layout/DashboardLayout';
import CompleteProfile from './components/profile/CompleteProfile';

// Componente wrapper para el dashboard con layout
const DashboardWithLayout = () => (
  <DashboardLayout>
    <DashboardRouter />
  </DashboardLayout>
);

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeManager>
          <AuthProvider>
            <GlobalStyle />
            <Routes>
              {/* ==================== AMBIENTE 1: LANDING/MARKETING (PÚBLICO) ==================== */}
              
              {/* Páginas principales */}
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              
              {/* Sistema de recursos libres con dashboard */}
              <Route path="/acceso-gratuito/*" element={<AccesoGratuitoPage />} />
              
              {/* Autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Herramientas gratuitas (sin autenticación) */}
              <Route path="/herramientas/:pillar/:toolId" element={<HerramientaPage />} />
              
              {/* ==================== AMBIENTE 2: DASHBOARD/SAAS (PROTEGIDO) ==================== */}
              
              {/* Completar perfil (requiere autenticación pero perfil incompleto) */}
              <Route 
                path="/complete-profile" 
                element={
                  <ProtectedRoute requiresIncompleteProfile={true}>
                    <CompleteProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Dashboard principal y todos sus submódulos */}
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <DashboardWithLayout />
                  </ProtectedRoute>
                } 
              />
              
              {/* ==================== REDIRECCIONES Y ERRORES ==================== */}
              
              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeManager>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;