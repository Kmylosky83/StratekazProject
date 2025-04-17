import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home'; 
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import CompleteProfile from './components/profile/CompleteProfile';
import Dashboard from './pages/dashboard/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import FichaFormacion from './components/dashboard/pilares/herramientas/formacion/FichaFormacion';
import CrearEditarFicha from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/CrearEditarFicha';
import VerFicha from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/VerFicha';
import VistaActa from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/VistaActa';
import ListaAsistencia from './components/dashboard/pilares/herramientas/formacion/FichaFormacion/ListaAsistencia';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/complete-profile" element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        } />
        
        {/* Dashboard y rutas anidadas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
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

        // En App.js
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
  );
};

export default App;