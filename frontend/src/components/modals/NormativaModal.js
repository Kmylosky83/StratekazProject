// frontend/src/components/modals/NormativaModal.js
import React from 'react';
import { Link } from 'react-router-dom';

const NormativaModal = ({ show, handleClose, normativa }) => {
  // Si no debe mostrarse, retornar null
  if (!show) return null;
  
  // Configuración por defecto en caso de que no se pase una normativa
  const defaultNormativa = {
    id: 'default',
    title: 'Normativa',
    icon: 'fa-certificate',
    iconClass: 'iso-icon',
    description: 'Descripción de la normativa.',
    benefits: [
      'Beneficio 1',
      'Beneficio 2',
      'Beneficio 3',
      'Beneficio 4'
    ]
  };

  // Usar los datos de normativa o los por defecto
  const data = normativa || defaultNormativa;

  return (
    <div className="custom-modal-overlay" onClick={handleClose}>
      <div className="custom-modal-container" onClick={e => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">{data.title}</h5>
          <button 
            type="button" 
            className="custom-modal-close-btn" 
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <div className="normativa-modal-content">
            <div className={`normativa-icon ${data.iconClass}`}>
              <i className={`fas ${data.icon}`}></i>
            </div>
            <h4>{data.subtitle || data.title}</h4>
            <p>{data.description}</p>
            <ul>
              {data.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <p>{data.conclusion}</p>
          </div>
        </div>
        <div className="custom-modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleClose}
          >
            Cerrar
          </button>
          <Link to="/registro" className="btn btn-primary">
            Implementar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NormativaModal;