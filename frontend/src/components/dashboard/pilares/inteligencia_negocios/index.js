import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

const InteligenciaNegocios = ({ userType }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Inteligencia de Negocios</h2>
      <p className="text-sm text-gray-600">Implementa y gestiona sistemas normativos y de cumplimiento.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sistemas de Gestión */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#f5a742' }}>
            <FontAwesomeIcon icon={faCertificate} />
            </div>
          </div>
          <h3 className="tool-title">Sistemas de Gestión</h3>
          <p className="tool-desc">Implementa y gestiona sistemas ISO 9001, 14001 y 45001</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
        
        {/* Seguridad y Salud en el Trabajo */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#f54242' }}>
              <i className="fas fa-hard-hat"></i>
            </div>
          </div>
          <h3 className="tool-title">SG-SST</h3>
          <p className="tool-desc">Gestiona la seguridad y salud en el trabajo con estándares</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
        
        {/* PESV */}
        <div className="tool-card">
          <div className="tool-icon-container">
            <div className="tool-icon" style={{ backgroundColor: '#424242' }}>
              <i className="fas fa-car"></i>
            </div>
          </div>
          <h3 className="tool-title">PESV</h3>
          <p className="tool-desc">Plan estratégico de seguridad vial para tu organización</p>
          <button className="btn btn-rounded tool-button">Acceder</button>
        </div>
      </div>
    </div>
  );
};

export default InteligenciaNegocios;