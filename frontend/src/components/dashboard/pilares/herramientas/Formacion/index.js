// C:\Proyectos\StratekazProject\frontend\src\components\dashboard\pilares\herramientas\formacion\index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FormacionIndex = () => {
  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <Link to="/dashboard" className="btn btn-outline-secondary me-3">
          <i className="fas fa-arrow-left me-2"></i>
          Volver al Dashboard
        </Link>
        <h2>Formación</h2>
      </div>
      
      <p className="subtitulo-seccion mb-4">
        Gestiona capacitaciones, asistencia y formación de personal con nuestras herramientas especializadas
      </p>
      
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="tarjeta h-100">
            <div className="icono-estandar-rosa">
              <i className="fas fa-file-alt fa-lg"></i>
            </div>
            <h3 className="titulo-tarjeta">Fichas de Formación</h3>
            <p className="subtitulo-tarjeta">
              Crea y administra fichas para tus actividades de capacitación,
              incluyendo objetivos, metodología y recursos necesarios.
            </p>
            <Link to="/dashboard/herramientas/formacion/FichaFormacion" className="boton-primario">
              Acceder
            </Link>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="tarjeta h-100">
            <div className="icono-estandar-rosa">
              <i className="fas fa-clipboard-list fa-lg"></i>
            </div>
            <h3 className="titulo-tarjeta">Listas de Asistencia</h3>
            <p className="subtitulo-tarjeta">
              Genera listas para tus eventos de capacitación y comparte enlaces
              para que los asistentes registren su participación.
            </p>
            <Link to="/dashboard/herramientas/formacion/listas-asistencia" className="boton-primario">
              Acceder
            </Link>
          </div>
        </div>
        
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="tarjeta h-100">
            <div className="icono-estandar-rosa">
              <i className="fas fa-laptop fa-lg"></i>
            </div>
            <h3 className="titulo-tarjeta">Capacitación Virtual</h3>
            <p className="subtitulo-tarjeta">
              Crea y gestiona cursos en línea, carga materiales de estudio
              y monitorea el progreso de los participantes.
            </p>
            <div className="coming-soon-badge">
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <div className="tarjeta p-4">
            <h4 className="mb-3">Estadísticas de Formación</h4>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="stat-card">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Fichas Activas</div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="stat-card">
                  <div className="stat-value">35</div>
                  <div className="stat-label">Asistentes Registrados</div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="stat-card">
                  <div className="stat-value">6</div>
                  <div className="stat-label">Horas de Formación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormacionIndex;