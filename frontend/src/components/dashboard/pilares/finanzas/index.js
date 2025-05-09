import React from 'react';

const Finanzas = ({ userType }) => {
  return (
    <div className="dashboard-content">
      <h2 className="dashboard-content-title">Módulo Financiero</h2>
      <div className="dashboard-content-body">
        <div className="alert alert-info">
          <p>El módulo financiero está en desarrollo. Próximamente podrás gestionar:</p>
          <ul className="mt-3">
            <li>Gestión financiera básica</li>
            <li>Informes financieros</li>
            <li>Facturación y cobros</li>
            <li>Integración con otros módulos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Finanzas;