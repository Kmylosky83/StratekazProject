import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Páginas principales
import Home from './pages/home'; 
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import CompleteProfile from './components/profile/CompleteProfile';
import Dashboard from './pages/dashboard/dashboard';
import PortfolioPage from './pages/PortfolioPage';
import { AuthProvider } from './context/AuthContext';

// Componentes de formación
import FormacionIndex from './components/dashboard/pilares/herramientas/formacion/index';
import FichaFormacion from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/index';
import CrearEditarFicha from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/CrearEditarFicha';
import VerFicha from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/VerFicha';
import VistaActa from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/VistaActa';
import ListaAsistencia from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/ListaAsistencia';

// Componentes de estructura y seguridad
import ProtectedRoute from './components/ProtectedRoute';

// Botón para cambiar tema
const ThemeToggler = ({ isDarkTheme, toggleTheme }) => (
  <button 
    onClick={toggleTheme} 
    className="theme-toggle-btn"
    style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      backgroundColor: isDarkTheme ? '#00F5D4' : '#ec268f',
      color: 'black',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
  >
    {isDarkTheme ? 'Modo Claro' : 'Modo Oscuro'}
  </button>
);

const App = () => {
  // Estado para manejar el tema
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Aplicar/quitar clase de tema oscuro
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  // Cambiar el tema
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeToggler isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portfolio" element={<PortfolioPage />} /> {/* Ruta para el portafolio */}
          
          {/* Rutas protegidas */}
          <Route path="/complete-profile" element={
            <ProtectedRoute>
              <CompleteProfile />
            </ProtectedRoute>
          } />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Página principal de Formación */}
          <Route path="/dashboard/herramientas/formacion" element={
            <ProtectedRoute>
              <FormacionIndex />
            </ProtectedRoute>
          } />

          {/* Rutas de herramientas/formación */}
          <Route path="/dashboard/herramientas/formacion/FichaFormacion" element={
            <ProtectedRoute>
              <FichaFormacion />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/herramientas/formacion/FichaFormacion/crear" element={
            <ProtectedRoute>
              <CrearEditarFicha />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/herramientas/formacion/FichaFormacion/:id/editar" element={
            <ProtectedRoute>
              <CrearEditarFicha />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/herramientas/formacion/FichaFormacion/:id" element={
            <ProtectedRoute>
              <VerFicha />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/herramientas/formacion/FichaFormacion/:id/acta" element={
            <ProtectedRoute>
              <VistaActa />
            </ProtectedRoute>
          } />

          <Route path="/formacion/ListaAsistencia/:enlace" element={<ListaAsistencia />} />
          
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;