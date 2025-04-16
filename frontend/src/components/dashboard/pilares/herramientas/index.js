import React from 'react';

const HerramientasProductividad = ({ userType }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Herramientas de Productividad</h2>
      <p className="text-sm text-gray-600">Gestiona tus actividades y procesos empresariales con nuestras herramientas.</p>
      
      {/* Aquí irán las tarjetas de los diferentes módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Formación */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#ec268f' }}>
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
          </div>
          <h3 className="tool-title">Formación</h3>
          <p className="tool-desc">Gestiona capacitaciones, asistencia y formación de personal</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
        
        {/* Planeación */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#4287f5' }}>
              <i className="fas fa-tasks"></i>
            </div>
          </div>
          <h3 className="tool-title">Planeación</h3>
          <p className="tool-desc">Planifica proyectos y gestiona tareas eficientemente</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
        
        {/* Documentación */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#42f5a7' }}>
              <i className="fas fa-file-alt"></i>
            </div>
          </div>
          <h3 className="tool-title">Documentación</h3>
          <p className="tool-desc">Crea y gestiona documentos, controla versiones</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
        
        {/* Más módulos (podemos agregar los demás) */}
      </div>
    </div>
  );
};

export default HerramientasProductividad;