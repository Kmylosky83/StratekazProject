import React, { useState, useEffect } from 'react';
import { CheckSquare, Calendar, Activity } from 'lucide-react';
import ecosistemaService from '../../../../services/ecosistema';

const EcosistemaEmpresarial = ({ userType }) => {
  const [data, setData] = useState({
    pendientes: [],
    recentActivity: [],
    upcomingEvents: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ecosistemaService.getEcosistemaData();
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error al cargar datos del ecosistema:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando datos del ecosistema...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Ecosistema Empresarial</h2>
      <p className="text-sm text-gray-600">Tu entorno de trabajo y actividades</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="flex items-center text-md font-medium mb-4">
            <Activity size={18} className="mr-2 text-blue-500" />
            🚀 Actividad Reciente
          </h3>
          
          {data.recentActivity && data.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="activity-icon">
                    <i className={activity.icon}></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <img 
                src="/images/no-activity.svg" 
                alt="No hay actividad" 
                className="mx-auto h-24 mb-3"
                onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Actividad'}}
              />
              <h5 className="text-base font-medium mb-1">No hay actividad reciente</h5>
              <p className="text-sm text-gray-500">Tu actividad reciente aparecerá aquí</p>
            </div>
          )}
        </div>
        
        {/* Próximos Eventos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="flex items-center text-md font-medium mb-4">
            <Calendar size={18} className="mr-2 text-green-500" />
            📅 Próximos Eventos
          </h3>
          
          {data.upcomingEvents && data.upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {data.upcomingEvents.map((event, index) => (
                <div key={index} className="event-item border-l-4 border-green-500 pl-3 py-2">
                  <h6 className="text-sm font-medium">{event.title}</h6>
                  <p className="text-xs text-gray-500">{event.date}</p>
                  <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <img 
                src="/images/no-events.svg" 
                alt="No hay eventos" 
                className="mx-auto h-24 mb-3"
                onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Eventos'}}
              />
              <h5 className="text-base font-medium mb-1">No hay eventos próximos</h5>
              <p className="text-sm text-gray-500">Los eventos programados aparecerán aquí</p>
            </div>
          )}
        </div>
        
        {/* Tareas Pendientes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="flex items-center text-md font-medium mb-4">
            <CheckSquare size={18} className="mr-2 text-purple-500" />
            ⏳ Tareas Pendientes
          </h3>
          
          {data.pendientes && data.pendientes.length > 0 ? (
            <div className="space-y-3">
              {data.pendientes.map((tarea, index) => (
                <div key={index} className="task-item flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id={`tarea${index}`} />
                    <label className="form-check-label ml-2" htmlFor={`tarea${index}`}>
                      {tarea.title}
                    </label>
                  </div>
                  <span className={`badge px-2 py-1 rounded-full text-xs ${
                    tarea.priority === 'alta' ? 'bg-red-100 text-red-800' : 
                    tarea.priority === 'media' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {tarea.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <img 
                src="/images/no-tasks.svg" 
                alt="No hay tareas" 
                className="mx-auto h-24 mb-3"
                onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Tareas'}}
              />
              <h5 className="text-base font-medium mb-1">No hay tareas pendientes</h5>
              <p className="text-sm text-gray-500">¡Excelente! Has completado todas tus tareas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcosistemaEmpresarial;