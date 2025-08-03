// frontend/src/components/dashboard/pilares/herramientas/formacion/FichaFormacion/VerFicha.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, FileText, ExternalLink, Download, Upload,
  Link as LinkIcon, Copy, PlusCircle
} from '../../../../../../design-system/icons';
import formacionService from '../../../../../../services/herramientas/formacion';

const VerFicha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [lista, setLista] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showConclusionesModal, setShowConclusionesModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const fetchFichaData = async () => {
      try {
        setIsLoading(true);
        const response = await formacionService.getFichaById(id);
        if (response.success) {
          setFicha(response.data);
          
          // Verificar si existe lista de asistencia
          const listaResponse = await formacionService.getListaAsistencia(id);
          if (listaResponse.success) {
            setLista(listaResponse.data);
          }
        } else {
          alert('Error al cargar la ficha');
          navigate('/dashboard/herramientas/formacion/ficha-formacion');
        }
      } catch (error) {
        console.error('Error al cargar datos de la ficha:', error);
        alert('Error al cargar la ficha');
        navigate('/dashboard/herramientas/formacion/ficha-formacion');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFichaData();
  }, [id, navigate]);

  const handleDeleteFicha = async () => {
    if (!deletePassword) {
      alert('Debe ingresar su contraseña para confirmar');
      return;
    }
    
    try {
      const response = await formacionService.eliminarFicha(id, { password: deletePassword });
      if (response.success) {
        alert('Ficha eliminada exitosamente');
        navigate('/dashboard/herramientas/formacion/ficha-formacion');
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar ficha:', error);
      alert('Error al eliminar la ficha');
    }
  };

  const handleCopyLink = () => {
    if (lista && lista.enlace_compartible) {
      navigator.clipboard.writeText(window.location.origin + `/formacion/lista-asistencia/${lista.enlace_compartible}`)
        .then(() => alert('Enlace copiado al portapapeles'))
        .catch(err => console.error('Error al copiar enlace:', err));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando detalles de la ficha...</p>
      </div>
    );
  }

  if (!ficha) {
    return (
      <div className="text-center py-5">
        <p>No se encontró la ficha solicitada</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/dashboard/herramientas/formacion/ficha-formacion')}
        >
          <ArrowLeft size={16} className="me-2" />
          Volver a Fichas
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Cabecera con botones principales */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/dashboard/herramientas/formacion/ficha-formacion')}
        >
          <ArrowLeft size={16} className="me-2" />
          Volver
        </button>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-primary"
            onClick={() => navigate(`/dashboard/herramientas/formacion/ficha-formacion/${id}/editar`)}
          >
            <Edit size={16} className="me-2" />
            Editar Ficha
          </button>
          <button 
            className="btn btn-outline-danger"
            onClick={() => setShowConfirmDelete(true)}
          >
            <Trash2 size={16} className="me-2" />
            Eliminar Ficha
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h3 className="mb-0">{ficha.titulo}</h3>
              <span className="badge bg-secondary">{ficha.codigo}</span>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <p className="mb-1"><strong>Fecha:</strong> {formatDate(ficha.fecha)}</p>
                  <p className="mb-1"><strong>Lugar:</strong> {ficha.lugar || 'No especificado'}</p>
                  <p className="mb-1"><strong>Duración:</strong> {ficha.duracion || 'No especificada'}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>Formador / Capacitador:</strong> {ficha.responsable}</p>
                  {ficha.empresa_id && (
                    <p className="mb-1"><strong>Empresa:</strong> {ficha.empresa?.nombre || 'No especificada'}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <h5>Descripción</h5>
                <p>{ficha.descripcion || 'Sin descripción'}</p>
              </div>
              
              <div className="mb-4">
                <h5>Objetivos</h5>
                {ficha.objetivos ? (
                  <ol className="px-3">
                    {ficha.objetivos.split('\n').map((objetivo, index) => (
                      objetivo.trim() && (
                        <li key={index}>{objetivo.replace('•', '').trim()}</li>
                      )
                    ))}
                  </ol>
                ) : (
                  <p>Sin objetivos definidos</p>
                )}
              </div>
              
              {ficha.preguntas && ficha.preguntas.length > 0 && (
                <div className="mb-4">
                  <h5>Preguntas para Asistentes</h5>
                  <div className="list-group">
                    {ficha.preguntas.map((pregunta, index) => (
                      <div className="list-group-item" key={index}>
                        <h6 className="mb-1">{pregunta.texto}</h6>
                        <p className="mb-0 text-muted small">
                          Tipo: 
                          {pregunta.tipo === 'texto' ? 'Texto libre' : 
                           pregunta.tipo === 'si_no' ? 'Sí/No' : 
                           'Opción múltiple'}
                        </p>
                        
                        {pregunta.tipo === 'opcion_multiple' && pregunta.opciones && (
                          <div className="mt-2">
                            <strong>Opciones:</strong>
                            <ul className="mb-0">
                              {pregunta.opciones.map((opcion, i) => (
                                <li key={i}>{opcion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Lista de Asistencia</h5>
            </div>
            <div className="card-body">
              {lista ? (
                <div className="d-grid gap-3 mb-4">
                  <button className="btn btn-primary" onClick={handleCopyLink}>
                    <Copy size={16} className="me-2" />
                    Copiar Enlace
                  </button>
                  <a href={`/formacion/lista-asistencia/${lista.enlace_compartible}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                    <ExternalLink size={16} className="me-2" />
                    Abrir Formulario
                  </a>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No se ha creado una lista de asistencia para esta ficha</p>
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={async () => {
                      try {
                        const response = await formacionService.crearListaAsistencia(id);
                        if (response.success) {
                          setLista(response.data);
                          alert('Lista de asistencia creada exitosamente');
                        } else {
                          alert(`Error: ${response.message}`);
                        }
                      } catch (error) {
                        console.error('Error al crear lista de asistencia:', error);
                        alert('Error al crear lista de asistencia');
                      }
                    }}
                  >
                    <PlusCircle size={16} className="me-2" />
                    Crear Lista de Asistencia
                  </button>
                </div>
              )}
              
              <h6 className="mt-4">Asistentes Registrados</h6>
              
              {lista && lista.asistentes && lista.asistentes.length > 0 ? (
                <div className="list-group mt-3">
                  {lista.asistentes.slice(0, 5).map((asistente, index) => (
                    <div className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                      <div>
                        <h6 className="mb-0">{asistente.nombre}</h6>
                        <p className="mb-0 text-muted small">{asistente.email}</p>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {new Date(asistente.fecha_registro).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  
                  {lista.asistentes.length > 5 && (
                    <div className="text-center mt-3">
                      <button className="btn btn-sm btn-outline-secondary">
                        Ver todos los asistentes ({lista.asistentes.length})
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <img 
                    src="/images/empty-data.svg" 
                    alt="Sin asistentes" 
                    className="img-fluid mb-3" 
                    style={{ maxHeight: '100px' }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100?text=No+Asistentes';
                    }}
                  />
                  <p className="text-muted mb-0">Aún no hay asistentes registrados</p>
                </div>
              )}
            </div>
          </div>
          
          {lista && lista.asistentes && lista.asistentes.length > 0 && (
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Acta de Formación</h5>
                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={() => setShowConclusionesModal(true)}
                  >
                    <FileText size={16} className="me-2" />
                    Conclusiones
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={() => setShowImageModal(true)}
                  >
                    <Upload size={16} className="me-2" />
                    Imágenes
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/dashboard/herramientas/formacion/ficha-formacion/${id}/acta`)}
                  >
                    <FileText size={16} className="me-2" />
                    Ver Acta
                  </button>
                </div>
              </div>
              <div className="card-body">
                {ficha.logo_personalizado || ficha.imagen_evento1 || ficha.imagen_evento2 ? (
                  <div className="row g-2">
                    {ficha.logo_personalizado && (
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body p-2 text-center">
                            <small className="d-block mb-1 text-muted">Logo</small>
                            <img 
                              src={`/uploads/${ficha.logo_personalizado}`}
                              alt="Logo" 
                              className="img-fluid" 
                              style={{ maxHeight: '150px', objectFit: 'contain' }}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Logo';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {ficha.imagen_evento1 && (
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body p-2 text-center">
                            <small className="d-block mb-1 text-muted">Imagen 1</small>
                            <img 
                              src={`/uploads/${ficha.imagen_evento1}`}
                              alt="Imagen 1" 
                              className="img-fluid" 
                              style={{ maxHeight: '150px', objectFit: 'cover' }}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Imagen+1';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {ficha.imagen_evento2 && (
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className="card-body p-2 text-center">
                            <small className="d-block mb-1 text-muted">Imagen 2</small>
                            <img 
                              src={`/uploads/${ficha.imagen_evento2}`}
                              alt="Imagen 2" 
                              className="img-fluid" 
                              style={{ maxHeight: '150px', objectFit: 'cover' }}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Imagen+2';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-muted">No hay imágenes cargadas para el acta</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showConfirmDelete && (
        <div className="modal-overlay" onClick={() => setShowConfirmDelete(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: '#dc3545', color: 'white' }}>
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setShowConfirmDelete(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-danger">¡Atención! Esta acción eliminará permanentemente la ficha y todos sus datos asociados.</p>
              <div className="mb-3">
                <label className="form-label">Ingrese su contraseña para confirmar:</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={handleDeleteFicha}
              >
                Eliminar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para subir imágenes */}
      {showImageModal && (
        <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: '#ec268f', color: 'white' }}>
              <h5 className="modal-title">Gestionar Imágenes</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setShowImageModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  const formData = new FormData(e.target);
                  
                  try {
                    const response = await formacionService.subirImagenes(id, formData);
                    if (response.success) {
                      alert('Imágenes subidas exitosamente');
                      // Recargar la página para ver las imágenes actualizadas
                      window.location.reload();
                    } else {
                      alert(`Error: ${response.message}`);
                    }
                  } catch (error) {
                    console.error('Error al subir imágenes:', error);
                    alert('Error al subir imágenes');
                  }
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Logo Personalizado</label>
                  <input type="file" className="form-control" name="logo" accept="image/*" />
                  <div className="form-text">Reemplazará el logo predeterminado en el acta.</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Imagen del Evento 1</label>
                  <input type="file" className="form-control" name="imagen1" accept="image/*" />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Imagen del Evento 2</label>
                  <input type="file" className="form-control" name="imagen2" accept="image/*" />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowImageModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn"
                    style={{ backgroundColor: '#ec268f', color: 'white' }}
                  >
                    Guardar Imágenes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para conclusiones */}
      {showConclusionesModal && (
        <div className="modal-overlay" onClick={() => setShowConclusionesModal(false)}>
          <div className="modal-container modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ backgroundColor: '#17a2b8', color: 'white' }}>
              <h5 className="modal-title">Conclusiones y Observaciones</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setShowConclusionesModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  const formData = new FormData(e.target);
                  const conclusiones = formData.get('conclusiones');
                  const observaciones = formData.get('observaciones');
                  const indicadores = Array.from(formData.getAll('indicadores[]'));
                  
                  try {
                    const response = await formacionService.guardarConclusiones(id, {
                      conclusiones,
                      observaciones,
                      indicadores
                    });
                    
                    if (response.success) {
                      alert('Conclusiones guardadas exitosamente');
                      setShowConclusionesModal(false);
                      
                      // Actualizar ficha con nuevos datos
                      setFicha({
                        ...ficha,
                        conclusiones,
                        observaciones,
                        indicadores
                      });
                    } else {
                      alert(`Error: ${response.message}`);
                    }
                  } catch (error) {
                    console.error('Error al guardar conclusiones:', error);
                    alert('Error al guardar conclusiones');
                  }
                }}
              >
                <div className="mb-3">
                  <label className="form-label">Conclusiones de la Capacitación</label>
                  <textarea 
                    className="form-control" 
                    name="conclusiones" 
                    rows="5" 
                    placeholder="Escriba las conclusiones generales de la capacitación..."
                    defaultValue={ficha.conclusiones || ''}
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Observaciones Adicionales</label>
                  <textarea 
                    className="form-control" 
                    name="observaciones" 
                    rows="3" 
                    placeholder="Ingrese observaciones adicionales si las hubiera..."
                    defaultValue={ficha.observaciones || ''}
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Indicadores de Cumplimiento</label>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="indicadores[]" 
                      value="asistencia" 
                      id="ind_asistencia" 
                      defaultChecked={ficha.indicadores && ficha.indicadores.includes('asistencia')}
                    />
                    <label className="form-check-label" htmlFor="ind_asistencia">
                      Cumplimiento de Asistencia
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="indicadores[]" 
                      value="conocimiento" 
                      id="ind_conocimiento"
                      defaultChecked={ficha.indicadores && ficha.indicadores.includes('conocimiento')}
                    />
                    <label className="form-check-label" htmlFor="ind_conocimiento">
                      Adquisición de Conocimientos
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="indicadores[]" 
                      value="participacion" 
                      id="ind_participacion"
                      defaultChecked={ficha.indicadores && ficha.indicadores.includes('participacion')}
                    />
                    <label className="form-check-label" htmlFor="ind_participacion">
                      Nivel de Participación
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="indicadores[]" 
                      value="aplicabilidad" 
                      id="ind_aplicabilidad"
                      defaultChecked={ficha.indicadores && ficha.indicadores.includes('aplicabilidad')}
                    />
                    <label className="form-check-label" htmlFor="ind_aplicabilidad">
                      Aplicabilidad en el Trabajo
                    </label>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowConclusionesModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn"
                    style={{ backgroundColor: '#17a2b8', color: 'white' }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerFicha;