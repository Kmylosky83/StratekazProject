// frontend/src/components/dashboard/pilares/herramientas/formacion/FichaFormacion/VistaActa.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from '../../../../../../design-system/icons';
import formacionService from '../../../../../../services/herramientas/formacion';

const VistaActa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState(null);
  const [lista, setLista] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await formacionService.getFichaById(id);
        if (response.success) {
          setFicha(response.data);
          
          // Cargar lista de asistencia
          const listaResponse = await formacionService.getListaAsistencia(id);
          if (listaResponse.success) {
            setLista(listaResponse.data);
          }
        } else {
          alert('Error al cargar la ficha');
          navigate('/dashboard/herramientas/formacion/ficha-formacion');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar la ficha');
        navigate('/dashboard/herramientas/formacion/ficha-formacion');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  const handleDescargarPDF = async () => {
    try {
      // Redirigir a la ruta de descarga
      window.location.href = `/api/formacion/ficha/${id}/acta/pdf`;
    } catch (error) {
      console.error('Error al descargar acta:', error);
      alert('Error al descargar el acta en PDF');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando datos del acta...</p>
      </div>
    );
  }

  if (!ficha || !lista) {
    return (
      <div className="text-center py-5">
        <p>No se encontró la información necesaria para generar el acta</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate(`/dashboard/herramientas/formacion/ficha-formacion/${id}`)}
        >
          <ArrowLeft size={16} className="me-2" />
          Volver a la Ficha
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Acta de Formación</h3>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/dashboard/herramientas/formacion/ficha-formacion/${id}`)}
                >
                  <ArrowLeft size={16} className="me-2" />
                  Volver
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleDescargarPDF}
                >
                  <Download size={16} className="me-2" />
                  Descargar PDF
                </button>
              </div>
            </div>
            <div className="card-body" id="acta-contenido">
              {/* Cabecera del documento */}
              <div className="acta-header mb-4">
                <div className="row align-items-center mb-3">
                  <div className="col-6">
                    {ficha.logo_personalizado ? (
                      <img 
                        src={`/uploads/${ficha.logo_personalizado}`} 
                        alt="Logo" 
                        className="img-fluid" 
                        style={{ maxHeight: '50px' }}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = '/images/logo.png';
                        }}
                      />
                    ) : (
                      <img src="/images/logo.png" alt="StrateKaz" className="img-fluid" style={{ maxHeight: '50px' }} />
                    )}
                  </div>
                  <div className="col-6 text-end">
                    <p className="mb-0"><strong>Código:</strong> {ficha.codigo}</p>
                    <p className="mb-0"><strong>Fecha:</strong> {new Date(ficha.fecha).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="acta-title text-center mb-3">
                  <h4 className="mb-1">ACTA DE FORMACIÓN</h4>
                  <h5>{ficha.titulo}</h5>
                </div>
              </div>
              
              {/* Información de la formación */}
              <div className="acta-info mb-4">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th style={{ width: '30%' }}>Responsable:</th>
                      <td>{ficha.responsable}</td>
                    </tr>
                    <tr>
                      <th>Fecha y Hora:</th>
                      <td>{new Date(ficha.fecha).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>Lugar:</th>
                      <td>{ficha.lugar || 'No especificado'}</td>
                    </tr>
                    <tr>
                      <th>Duración:</th>
                      <td>{ficha.duracion || 'No especificada'}</td>
                    </tr>
                    {ficha.empresa && (
                      <tr>
                        <th>Empresa:</th>
                        <td>{ficha.empresa.nombre}</td>
                      </tr>
                    )}
                    <tr>
                      <th>Objetivos:</th>
                      <td>
                        {ficha.objetivos ? (
                          <ol className="mb-0">
                            {ficha.objetivos.split('\n').map((objetivo, index) => (
                              objetivo.trim() && (
                                <li key={index}>{objetivo.replace('•', '').trim()}</li>
                              )
                            ))}
                          </ol>
                        ) : 'No especificados'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Registro fotográfico */}
              {(ficha.imagen_evento1 || ficha.imagen_evento2) && (
                <div className="registro-fotografico mb-4">
                  <h5>Registro Fotográfico</h5>
                  <div className="row">
                    {ficha.imagen_evento1 && (
                      <div className="col-md-6">
                        <div className="image-container">
                          <img 
                            src={`/uploads/${ficha.imagen_evento1}`} 
                            alt="Imagen del evento"
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {ficha.imagen_evento2 && (
                      <div className="col-md-6">
                        <div className="image-container">
                          <img 
                            src={`/uploads/${ficha.imagen_evento2}`} 
                            alt="Imagen del evento"
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+No+Disponible';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lista de asistentes */}
              <div className="acta-asistentes mb-4">
                <h5 className="mb-3">Listado de Asistentes</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Correo Electrónico</th>
                      <th>Cargo</th>
                      <th>Firma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.asistentes.map((asistente, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{asistente.nombre}</td>
                        <td>{asistente.email}</td>
                        <td>{asistente.cargo || '-'}</td>
                        <td style={{ textAlign: 'center' }}>
                          {asistente.firma_data ? (
                            <img 
                              src={asistente.firma_data} 
                              alt="Firma" 
                              style={{ maxHeight: '50px' }}
                            />
                          ) : (
                            <span>Sin firma</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Conclusiones */}
              {(ficha.conclusiones || ficha.observaciones || ficha.indicadores) && (
                <div className="acta-conclusiones mb-4">
                  <h5 className="mb-3">Conclusiones y Resultados</h5>
                  
                  {ficha.conclusiones && (
                    <div className="mb-3">
                      <h6>Conclusiones de la Capacitación</h6>
                      <div className="border p-3">
                        <p>{ficha.conclusiones}</p>
                      </div>
                    </div>
                  )}
                  
                  {ficha.observaciones && (
                    <div className="mb-3">
                      <h6>Observaciones Adicionales</h6>
                      <div className="border p-3">
                        <p>{ficha.observaciones}</p>
                      </div>
                    </div>
                  )}
                  
                  {ficha.indicadores && (
                    <div className="mb-3">
                      <h6>Indicadores de Cumplimiento</h6>
                      <div className="border p-3">
                        <ul className="mb-0">
                          {ficha.indicadores.map((indicador, index) => (
                            <li key={index}>
                              {indicador === 'asistencia' ? 'Cumplimiento de Asistencia' :
                               indicador === 'conocimiento' ? 'Adquisición de Conocimientos' :
                               indicador === 'participacion' ? 'Nivel de Participación' :
                               indicador === 'aplicabilidad' ? 'Aplicabilidad en el Trabajo' :
                               indicador}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaActa;