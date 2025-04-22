// frontend/src/components/dashboard/pilares/herramientas/formacion/FichaFormacion/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Calendar, Share2, ArrowLeft } from 'lucide-react';
import formacionService from '../../../../../../services/herramientas/formacion';

const FichaFormacion = () => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [emailExterno, setEmailExterno] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        setIsLoading(true);
        const response = await formacionService.getFichas();
        if (response.success) {
          setFichas(response.data);
        }
      } catch (error) {
        console.error('Error al cargar fichas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFichas();
  }, []);

  const handleEnviarEnlace = async (e) => {
    e.preventDefault();
    try {
      const response = await formacionService.enviarEnlaceCreacion(emailExterno);
      if (response.success) {
        alert('Enlace enviado correctamente');
        setShowModal(false);
        setEmailExterno("");
        setShowEmailForm(false);
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      alert('Error al enviar el enlace');
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-outline-secondary me-3"
            onClick={() => navigate('/dashboard/herramientas/formacion')}
          >
            <ArrowLeft size={16} className="me-2" />
            Volver
          </button>
          <h2>Fichas de Formación</h2>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} className="me-2" />
          Nueva Ficha
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando fichas de formación...</p>
        </div>
      ) : fichas.length > 0 ? (
        <div className="row">
          {fichas.map(ficha => (
            <div className="col-lg-4 col-md-6 mb-4" key={ficha.id}>
              <div className="card h-100 shadow-sm hover-effect">
                <div className="card-body">
                  <h5 className="card-title">{ficha.titulo}</h5>
                  <p className="card-text text-muted mb-2">
                    <Calendar size={16} className="me-2" />
                    {formatDate(ficha.fecha)}
                  </p>
                  <p className="card-text small">{truncateText(ficha.descripcion, 100)}</p>
                  
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-secondary">{ficha.codigo}</span>
                    <span className="text-muted small">
                      {ficha.asistentes_count || 0} asistentes
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <button 
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => navigate(`/dashboard/herramientas/formacion/ficha-formacion/${ficha.id}`)}
                  >
                    <Eye size={16} className="me-2" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <img 
            src="/images/empty-data.svg" 
            alt="Sin fichas" 
            className="img-fluid mb-3" 
            style={{ maxHeight: '150px' }}
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=Sin+Fichas';
            }}
          />
          <h5>No hay fichas de formación</h5>
          <p className="text-muted">Comienza creando tu primera ficha de formación</p>
        </div>
      )}

      {/* Modal para opciones de nueva ficha */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Nueva Ficha de Formación</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="d-grid gap-3">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    navigate('/dashboard/herramientas/formacion/ficha-formacion/crear');
                  }}
                >
                  <Plus size={16} className="me-2" />
                  Crear nueva ficha
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setShowEmailForm(!showEmailForm)}
                >
                  <Share2 size={16} className="me-2" />
                  Compartir para creación externa
                </button>
                
                {showEmailForm && (
                  <div className="mt-3 p-3 border rounded">
                    <form onSubmit={handleEnviarEnlace}>
                      <div className="mb-3">
                        <label className="form-label">Correo del profesional externo</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={emailExterno}
                          onChange={e => setEmailExterno(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-success">
                        <Share2 size={16} className="me-2" />
                        Enviar enlace
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FichaFormacion;