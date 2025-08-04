/**
 * App.js minimalista para resolver el problema del Router
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeManager } from './design-system/themes/ThemeManager';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import { ErrorBoundary } from './design-system/components';

// Solo importar las páginas principales inicialmente
import Home from './pages/Home'; 
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PortfolioPage from './pages/PortfolioPage';
import AccesoGratuitoPage from './pages/AccesoGratuitoPage';

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeManager>
          <AuthProvider>
            <GlobalStyle />
            <Routes>
              {/* Rutas públicas básicas */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/acceso-gratuito" element={<AccesoGratuitoPage />} />
              
              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </ThemeManager>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;