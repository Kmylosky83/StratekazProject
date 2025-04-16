// frontend/src/components/dashboard/pilares/herramientas/formacion/FichaFormacion/CrearEditarFicha.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import formacionService from '../../../../../../services/herramientas/Formacion';

const CrearEditarFicha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [objetivos, setObjetivos] = useState([{ texto: '' }]);
  const [preguntas, setPreguntas] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    lugar: '',
    duracion: '',
    responsable: '',
    descripcion: '',
    metodologia: '',
    recursos: []
  });

  useEffect(() => {
    const fetchFichaData = async () => {
      if (isEditing) {
        try {
          setIsLoading(true);
          const response = await formacionService.getFichaById(id);
          if (response.success) {
            const ficha = response.data;
            
            // Formatear fecha para input datetime-local
            const fechaObj = new Date(ficha.fecha);
            const fechaFormateada = fechaObj.toISOString().slice(0, 16);
            
            setFormData({
              titulo: ficha.titulo,
              fecha: fechaFormateada,
              lugar: ficha.lugar,
              duracion: ficha.duracion,
              responsable: ficha.responsable,
              descripcion: ficha.descripcion,
              metodologia: ficha.metodologia,
              recursos: ficha.recursos || []
            });
            
            // Formatear objetivos
            if (ficha.objetivos) {
              const objetivosArray = ficha.objetivos
                .split('\n')
                .filter(obj => obj.trim())
                .map(obj => ({ texto: obj.replace('•', '').trim() }));
              
              setObjetivos(objetivosArray.length > 0 ? objetivosArray : [{ texto: '' }]);
            }
            
            // Cargar preguntas si existen
            if (ficha.preguntas && ficha.preguntas.length > 0) {
              setPreguntas(ficha.preguntas);
            }
          }
        } catch (error) {
          console.error('Error al cargar datos de la ficha:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchFichaData();
  }, [id, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRecursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        recursos: [...formData.recursos, value]
      });
    } else {
      setFormData({
        ...formData,
        recursos: formData.recursos.filter(item => item !== value)
      });
    }
  };

  // Gestión de objetivos
  const handleObjetivoChange = (index, value) => {
    const newObjetivos = [...objetivos];
    newObjetivos[index].texto = value;
    setObjetivos(newObjetivos);
  };

  const addObjetivo = () => {
    setObjetivos([...objetivos, { texto: '' }]);
  };

  const removeObjetivo = (index) => {
    const newObjetivos = objetivos.filter((_, i) => i !== index);
    setObjetivos(newObjetivos.length > 0 ? newObjetivos : [{ texto: '' }]);
  };

  // Gestión de preguntas
  const handlePreguntaChange = (index, field, value) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index] = {
      ...newPreguntas[index],
      [field]: value
    };
    setPreguntas(newPreguntas);
  };

  const addPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        texto: '',
        tipo: 'texto',
        opciones: []
      }
    ]);
  };

  const removePregunta = (index) => {
    setPreguntas(preguntas.filter((_, i) => i !== index));
  };

  const handleTipoPreguntaChange = (index, value) => {
    const newPreguntas = [...preguntas];
    
    // Actualizar tipo de pregunta
    newPreguntas[index] = {
      ...newPreguntas[index],
      tipo: value
    };
    
    // Si es opción múltiple y no hay opciones, agregar opciones por defecto
    if (value === 'opcion_multiple' && (!newPreguntas[index].opciones || newPreguntas[index].opciones.length === 0)) {
      newPreguntas[index].opciones = ['Opción 1', 'Opción 2'];
    }
    
    setPreguntas(newPreguntas);
  };

  const addOpcionPregunta = (preguntaIndex) => {
    const newPreguntas = [...preguntas];
    if (!newPreguntas[preguntaIndex].opciones) {
      newPreguntas[preguntaIndex].opciones = [];
    }
    newPreguntas[preguntaIndex].opciones.push(`Opción ${newPreguntas[preguntaIndex].opciones.length + 1}`);
    setPreguntas(newPreguntas);
  };

  const removeOpcionPregunta = (preguntaIndex, opcionIndex) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].opciones = newPreguntas[preguntaIndex].opciones.filter((_, i) => i !== opcionIndex);
    setPreguntas(newPreguntas);
  };

  const handleOpcionPreguntaChange = (preguntaIndex, opcionIndex, value) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].opciones[opcionIndex] = value;
    setPreguntas(newPreguntas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.titulo || !formData.fecha || !formData.lugar || !formData.responsable ||
        !formData.duracion || !formData.descripcion || !formData.metodologia) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    
    // Validar que hay al menos un objetivo con texto
    if (!objetivos.some(obj => obj.texto.trim())) {
      alert('Debe agregar al menos un objetivo');
      return;
    }
    
    // Validar que hay recursos seleccionados
    if (formData.recursos.length === 0) {
      alert('Debe seleccionar al menos un recurso');
      return;
    }
    
    // Preparar datos para enviar
    const objetivosTexto = objetivos
      .filter(obj => obj.texto.trim())
      .map(obj => obj.texto)
      .join('\n');
    
    const dataToSend = {
      ...formData,
      objetivos: objetivosTexto,
      preguntas: preguntas
    };
    
    try {
      setIsLoading(true);
      let response;
      
      if (isEditing) {
        response = await formacionService.actualizarFicha(id, dataToSend);
      } else {
        response = await formacionService.crearFicha(dataToSend);
      }
      
      if (response.success) {
        alert(isEditing ? 'Ficha actualizada exitosamente' : 'Ficha creada exitosamente');
        navigate('/dashboard/herramientas/formacion/ficha-formacion');
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error al guardar ficha:', error);
      alert('Error al guardar la ficha. Por favor intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditing) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando datos de la ficha...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-white py-3">
              <h3 className="card-title mb-0">{isEditing ? 'Editar' : 'Nueva'} Ficha de Formación</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Información básica */}
                  <div className="col-md-12">
                    <label htmlFor="titulo" className="form-label">Título de la Formación *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="titulo" 
                      name="titulo" 
                      value={formData.titulo}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="fecha" className="form-label">Fecha y Hora *</label>
                    <input 
                      type="datetime-local" 
                      className="form-control" 
                      id="fecha" 
                      name="fecha" 
                      value={formData.fecha}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="lugar" className="form-label">Lugar *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lugar" 
                      name="lugar" 
                      value={formData.lugar}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="duracion" className="form-label">Duración *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="duracion" 
                      name="duracion" 
                      placeholder="Ej: 2 horas" 
                      value={formData.duracion}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="responsable" className="form-label">Formador / Capacitador *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="responsable" 
                      name="responsable" 
                      value={formData.responsable}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <textarea 
                      className="form-control" 
                      id="descripcion" 
                      name="descripcion" 
                      rows="3" 
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  
                  {/* Objetivos */}
                  <div className="col-12 mt-4">
                    <h5>Objetivos *</h5>
                    <p className="text-muted small">Agregue los objetivos de la formación</p>
                    
                    {objetivos.map((objetivo, index) => (
                      <div className="card mb-3" key={index}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h6 className="card-title">Objetivo {index + 1}</h6>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeObjetivo(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Texto del objetivo</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={objetivo.texto}
                              onChange={(e) => handleObjetivoChange(index, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-primary mt-3"
                      onClick={addObjetivo}
                    >
                      <Plus size={16} className="me-2" />
                      Agregar Objetivo
                    </button>
                  </div>

                  {/* Metodología */}
                  <div className="col-md-12 mt-3">
                    <label htmlFor="metodologia" className="form-label">Metodología *</label>
                    <select 
                      className="form-select" 
                      id="metodologia" 
                      name="metodologia"
                      value={formData.metodologia}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccione una metodología...</option>
                      <option value="clase_magistral">Clase Magistral</option>
                      <option value="taller_practico">Taller Práctico</option>
                      <option value="exposicion_virtual">Exposición Virtual</option>
                      <option value="discusion_grupal">Discusión Grupal</option>
                      <option value="demostracion">Demostración</option>
                      <option value="juego_roles">Juego de Roles</option>
                      <option value="estudio_caso">Estudio de Caso</option>
                      <option value="aprendizaje_basado_proyectos">Aprendizaje Basado en Proyectos</option>
                    </select>
                  </div>
                  
                  {/* Recursos */}
                  <div className="col-md-12 mt-3">
                    <label className="form-label">Recursos *</label>
                    <div className="border p-3 rounded">
                      <div className="row g-2">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="presentacion" 
                              id="recursos_presentacion"
                              checked={formData.recursos.includes('presentacion')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_presentacion">
                              Presentación/Diapositivas
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="videos" 
                              id="recursos_videos"
                              checked={formData.recursos.includes('videos')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_videos">
                              Videos
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="material_impreso" 
                              id="recursos_material"
                              checked={formData.recursos.includes('material_impreso')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_material">
                              Material Impreso
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="casos_estudio" 
                              id="recursos_casos"
                              checked={formData.recursos.includes('casos_estudio')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_casos">
                              Casos de Estudio
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="software" 
                              id="recursos_software"
                              checked={formData.recursos.includes('software')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_software">
                              Software Especializado
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="equipos" 
                              id="recursos_equipos"
                              checked={formData.recursos.includes('equipos')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_equipos">
                              Equipos/Herramientas
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="recursos_digitales" 
                              id="recursos_digitales"
                              checked={formData.recursos.includes('recursos_digitales')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_digitales">
                              Recursos Digitales
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              name="recursos" 
                              value="libros" 
                              id="recursos_libros"
                              checked={formData.recursos.includes('libros')}
                              onChange={handleRecursoChange}
                            />
                            <label className="form-check-label" htmlFor="recursos_libros">
                              Libros/Manuales
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preguntas para Asistentes */}
                  <div className="col-12 mt-4">
                    <h5>Preguntas para Asistentes</h5>
                    <p className="text-muted small">Agregue preguntas para los asistentes (opcionales)</p>
                    
                    {preguntas.map((pregunta, index) => (
                      <div className="card mb-3" key={index}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h6 className="card-title">Pregunta {index + 1}</h6>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removePregunta(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Texto de la pregunta</label>
                            <input 
                              type="text" 
                              className="form-control"
                              value={pregunta.texto || ''}
                              onChange={(e) => handlePreguntaChange(index, 'texto', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Tipo de respuesta</label>
                            <select 
                              className="form-select"
                              value={pregunta.tipo || 'texto'}
                              onChange={(e) => handleTipoPreguntaChange(index, e.target.value)}
                            >
                              <option value="texto">Texto libre</option>
                              <option value="si_no">Sí/No</option>
                              <option value="opcion_multiple">Opción múltiple</option>
                            </select>
                          </div>
                          
                          {/* Opciones para preguntas de opción múltiple */}
                          {pregunta.tipo === 'opcion_multiple' && (
                            <div className="opciones-container">
                              <label className="form-label">Opciones de respuesta</label>
                              {pregunta.opciones && pregunta.opciones.map((opcion, opcionIndex) => (
                                <div className="input-group mb-2" key={opcionIndex}>
                                  <input 
                                    type="text" 
                                    className="form-control"
                                    value={opcion}
                                    onChange={(e) => handleOpcionPreguntaChange(index, opcionIndex, e.target.value)}
                                    placeholder={`Opción ${opcionIndex + 1}`}
                                  />
                                  <button 
                                    className="btn btn-outline-danger" 
                                    type="button"
                                    onClick={() => removeOpcionPregunta(index, opcionIndex)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                              <button 
                                type="button" 
                                className="btn btn-sm btn-outline-secondary mt-2"
                                onClick={() => addOpcionPregunta(index)}
                              >
                                <Plus size={16} className="me-1" />
                                Agregar Opción
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-primary mt-3"
                      onClick={addPregunta}
                    >
                      <Plus size={16} className="me-2" />
                      Agregar Pregunta
                    </button>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="col-12 mt-4 d-flex justify-content-between">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/dashboard/herramientas/formacion/ficha-formacion')}
                    >
                      <ArrowLeft size={16} className="me-2" />
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {isEditing ? 'Actualizando...' : 'Guardando...'}
                        </>
                      ) : (
                        <>
                          <Plus size={16} className="me-2" />
                          {isEditing ? 'Actualizar Ficha' : 'Guardar Ficha'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEditarFicha;