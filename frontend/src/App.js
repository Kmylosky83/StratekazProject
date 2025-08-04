/**
 * App.js minimalista para resolver el problema del Router
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './design-system/themes/SimpleThemeProvider';
import { AuthProvider } from './context/SimpleAuthContext';
import GlobalStyle from './styles/GlobalStyle';
import ErrorBoundary from './components/common/ErrorBoundary';

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
        <ThemeProvider>
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
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;