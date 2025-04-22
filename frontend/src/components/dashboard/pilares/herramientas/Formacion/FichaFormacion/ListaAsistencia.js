// frontend/src/components/dashboard/pilares/herramientas/Formacion/FichaFormacion/ListaAsistencia.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import formacionService from '../../../../../../services/herramientas/formacion';

const ListaAsistencia = () => {
  const { enlace } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [lista, setLista] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo_documento: '',
    documento: '',
    cargo: '',
    telefono: '',
    // Evaluación del capacitador
    dominio_tema: '',
    claridad: '',
    material: '',
    tiempo: '',
    utilidad: '',
    comentarios: ''
  });
  const [respuestasPreguntas, setRespuestasPreguntas] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const sigPad = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Obtener información de la lista por enlace compartible
        const response = await formacionService.getListaByEnlace(enlace);
        if (response.success) {
          setLista(response.data);
          
          // Obtener información de la ficha
          const fichaResponse = await formacionService.getFichaById(response.data.ficha_id);
          if (fichaResponse.success) {
            setFicha(fichaResponse.data);
            
            // Inicializar respuestas a preguntas
            if (fichaResponse.data.preguntas && fichaResponse.data.preguntas.length > 0) {
              const respuestas = {};
              fichaResponse.data.preguntas.forEach(pregunta => {
                respuestas[`pregunta_${pregunta.id}`] = '';
              });
              setRespuestasPreguntas(respuestas);
            }
          }
        } else {
          alert('Enlace de asistencia inválido o expirado');
          navigate('/');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar información de la formación');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [enlace, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePreguntaChange = (preguntaId, valor) => {
    setRespuestasPreguntas({
      ...respuestasPreguntas,
      [`pregunta_${preguntaId}`]: valor
    });
  };

  const clearSignature = () => {
    sigPad.current.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!formData.nombre || !formData.email || !formData.tipo_documento ||
        !formData.documento || !formData.cargo || !formData.telefono ||
        !formData.dominio_tema || !formData.claridad || !formData.material ||
        !formData.tiempo || !formData.utilidad) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Validar firma
    if (sigPad.current.isEmpty()) {
      alert('Por favor, firme antes de enviar el formulario');
      return;
    }
    
    // Obtener datos de firma
    const firmaData = sigPad.current.toDataURL();
    
    // Preparar datos para enviar
    const dataToSend = {
      ...formData,
      lista_id: lista.id,
      firma_data: firmaData,
      respuestas: respuestasPreguntas
    };
    
    try {
      const response = await formacionService.registrarAsistente(dataToSend);
      if (response.success) {
        setShowSuccess(true);
        // Reiniciar formulario
        setFormData({
          nombre: '',
          email: '',
          tipo_documento: '',
          documento: '',
          cargo: '',
          telefono: '',
          dominio_tema: '',
          claridad: '',
          material: '',
          tiempo: '',
          utilidad: '',
          comentarios: ''
        });
        setRespuestasPreguntas({});
        clearSignature();
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
      alert('Error al registrar la asistencia');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando formulario de asistencia...</p>
      </div>
    );
  }

  if (!ficha || !lista) {
    return (
      <div className="text-center py-5">
        <p>No se encontró la información de la formación</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-white py-3 text-center">
              <h3 className="mb-1">Lista de Asistencia</h3>
              <h5 className="text-muted">{ficha.titulo}</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                Complete el formulario para registrar su asistencia a esta actividad.
              </div>
              
              <div className="ficha-info mb-4">
                <h6 className="border-bottom pb-2 mb-3">Información de la Actividad</h6>
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Fecha:</strong> {new Date(ficha.fecha).toLocaleString()}</p>
                    <p className="mb-1"><strong>Lugar:</strong> {ficha.lugar || 'No especificado'}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Formador/Capacitador:</strong> {ficha.responsable}</p>
                    <p className="mb-1"><strong>Duración:</strong> {ficha.duracion || 'No especificada'}</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="lista_id" value={lista.id} />
                
                <h6 className="border-bottom pb-2 mb-3">Datos del Asistente</h6>
                
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Nombre Completo *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nombre" 
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tipo de Documento *</label>
                    <select 
                      className="form-select" 
                      name="tipo_documento"
                      value={formData.tipo_documento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="TI">Tarjeta de Identidad</option>
                      <option value="PP">Pasaporte</option>
                      <option value="NIT">NIT</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Documento de Identidad *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="documento" 
                      pattern="[0-9\-\.]+" 
                      title="Solo números, guiones y puntos"
                      value={formData.documento}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Cargo o Rol *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono de Contacto *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="telefono" 
                      pattern="[0-9]{10}" 
                      maxLength="10" 
                      title="Debe contener 10 dígitos"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                {ficha.preguntas && ficha.preguntas.length > 0 && (
                  <div className="mb-4">
                    <h6 className="border-bottom pb-2 mb-3">Preguntas</h6>
                    
                    {ficha.preguntas.map((pregunta, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label">{pregunta.texto} *</label>
                        
                        {pregunta.tipo === 'texto' && (
                          <textarea 
                            className="form-control" 
                            name={`pregunta_${pregunta.id}`} 
                            rows="2" 
                            value={respuestasPreguntas[`pregunta_${pregunta.id}`] || ''}
                            onChange={(e) => handlePreguntaChange(pregunta.id, e.target.value)}
                            required
                          ></textarea>
                        )}
                        
                        {pregunta.tipo === 'si_no' && (
                          <div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name={`pregunta_${pregunta.id}`} 
                                id={`pregunta_${pregunta.id}_si`} 
                                value="Sí"
                                checked={respuestasPreguntas[`pregunta_${pregunta.id}`] === 'Sí'}
                                onChange={() => handlePreguntaChange(pregunta.id, 'Sí')}
                                required 
                              />
                              <label className="form-check-label" htmlFor={`pregunta_${pregunta.id}_si`}>Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name={`pregunta_${pregunta.id}`} 
                                id={`pregunta_${pregunta.id}_no`} 
                                value="No"
                                checked={respuestasPreguntas[`pregunta_${pregunta.id}`] === 'No'}
                                onChange={() => handlePreguntaChange(pregunta.id, 'No')}
                              />
                              <label className="form-check-label" htmlFor={`pregunta_${pregunta.id}_no`}>No</label>
                            </div>
                          </div>
                        )}
                        
                        {pregunta.tipo === 'opcion_multiple' && pregunta.opciones && (
                          <select 
                            className="form-select" 
                            name={`pregunta_${pregunta.id}`}
                            value={respuestasPreguntas[`pregunta_${pregunta.id}`] || ''}
                            onChange={(e) => handlePreguntaChange(pregunta.id, e.target.value)}
                            required
                          >
                            <option value="">Seleccionar...</option>
                            {pregunta.opciones.map((opcion, i) => (
                              <option key={i} value={opcion}>{opcion}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Sección de evaluación del capacitador */}
                <h6 className="border-bottom pb-2 mb-3">Evaluación del Capacitador *</h6>
                <div className="mb-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Dominio del tema *</label>
                      <select 
                        className="form-select" 
                        name="dominio_tema"
                        value={formData.dominio_tema}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Deficiente</option>
                        <option value="3">3 - Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Claridad de la explicación *</label>
                      <select 
                        className="form-select" 
                        name="claridad"
                        value={formData.claridad}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Deficiente</option>
                        <option value="3">3 - Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Calidad del material *</label>
                      <select 
                        className="form-select" 
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Deficiente</option>
                        <option value="3">3 - Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Manejo del tiempo *</label>
                      <select 
                        className="form-select" 
                        name="tiempo"
                        value={formData.tiempo}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Deficiente</option>
                        <option value="3">3 - Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Utilidad de la formación *</label>
                      <select 
                        className="form-select" 
                        name="utilidad"
                        value={formData.utilidad}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">1 - Deficiente</option>
                        <option value="3">3 - Bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Comentarios adicionales</label>
                      <textarea 
                        className="form-control" 
                        name="comentarios" 
                        rows="2"
                        value={formData.comentarios}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <h6 className="border-bottom pb-2 mb-3">Firma *</h6>
                
                <div className="mb-4">
                  <p className="text-muted small mb-2">Dibuje su firma en el recuadro a continuación:</p>
                  <div className="signature-pad-container mb-2">
                    <SignaturePad 
                      ref={sigPad}
                      canvasProps={{
                        className: 'signature-pad',
                        width: 600,
                        height: 200
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={clearSignature}
                    >
                      <i className="fas fa-eraser me-1"></i>Borrar Firma
                    </button>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-check me-2"></i>Registrar Asistencia
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5 className="modal-title">¡Registro Exitoso!</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowSuccess(false)}
              ></button>
            </div>
            <div className="modal-body text-center py-4">
              <div className="mb-3">
                <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
              </div>
              <h4>¡Gracias por su asistencia!</h4>
              <p className="mb-0">Su registro ha sido completado correctamente.</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button 
                type="button" 
                className="btn btn-outline-primary" 
                onClick={() => setShowSuccess(false)}
              >
                Registrar otra asistencia
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => window.close()}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAsistencia;