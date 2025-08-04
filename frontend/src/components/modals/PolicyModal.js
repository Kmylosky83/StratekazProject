// frontend/src/components/modals/PolicyModal.js
import React from 'react';

const PolicyModal = ({ show, handleClose, type }) => {
  // Si no debe mostrarse, retornar null
  if (!show) return null;

  return (
    <div className="custom-modal-overlay" onClick={handleClose}>
      <div className="custom-modal-container custom-modal-lg" onClick={e => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">
            {type === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad'}
          </h5>
          <button 
            type="button" 
            className="custom-modal-close-btn" 
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          {type === 'terms' ? (
            <div className="terms-content">
              <h4>1. Aceptación de los Términos</h4>
              <p>Al registrarse y utilizar StrateKaz, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá usar nuestros servicios.</p>
            
              <h4>2. Uso del Servicio</h4>
              <p>El servicio debe utilizarse de acuerdo con todas las leyes aplicables y de manera ética. Está prohibido usar el servicio para actividades ilegales o no autorizadas.</p>
            
              <h4>3. Cuenta de Usuario</h4>
              <p>Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Debe notificar inmediatamente cualquier uso no autorizado de su cuenta.</p>
            
              <h4>4. Privacidad y Datos</h4>
              <p>La información proporcionada será tratada según nuestra política de privacidad. Nos comprometemos a proteger su información personal.</p>
            
              <h4>5. Propiedad Intelectual</h4>
              <p>Todo el contenido y materiales disponibles en StrateKaz están protegidos por derechos de autor y otras leyes de propiedad intelectual.</p>
            
              <h4>6. Limitación de Responsabilidad</h4>
              <p>StrateKaz no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso del servicio.</p>
            </div>
          ) : (
            <div className="privacy-content">
              <h4>1. Información que Recopilamos</h4>
              <p>Recopilamos información personal que usted nos proporciona directamente, incluyendo nombre, correo electrónico, y datos profesionales o empresariales.</p>
            
              <h4>2. Uso de la Información</h4>
              <p>Utilizamos su información para:
                <ul>
                  <li>Proporcionar y mantener nuestros servicios</li>
                  <li>Personalizar su experiencia</li>
                  <li>Enviar comunicaciones importantes</li>
                  <li>Mejorar nuestros servicios</li>
                </ul>
              </p>
            
              <h4>3. Protección de Datos</h4>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado o pérdida.</p>
            
              <h4>4. Compartir Información</h4>
              <p>No vendemos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando lo exija la ley.</p>
            
              <h4>5. Sus Derechos</h4>
              <p>Tiene derecho a:
                <ul>
                  <li>Acceder a su información personal</li>
                  <li>Corregir datos inexactos</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Oponerse al procesamiento de sus datos</li>
                </ul>
              </p>
            
              <h4>6. Cambios en la Política</h4>
              <p>Podemos actualizar esta política ocasionalmente. Le notificaremos cualquier cambio material en el procesamiento de información personal.</p>
            </div>
          )}
        </div>
        <div className="custom-modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;