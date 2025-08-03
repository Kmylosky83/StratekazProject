import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus } from '../../../../design-system/icons';
import empresasService from '../../../../services/empresas';

const RedClientes = ({ userType }) => {
  const [empresas, setEmpresas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setIsLoading(true);
        const response = await empresasService.getEmpresas();
        if (response.success) {
          setEmpresas(response.data);
        }
      } catch (error) {
        console.error('Error al cargar empresas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando empresas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Red de Clientes</h2>
          <p className="text-sm text-gray-600">Gestiona tus empresas y clientes</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Agregar Empresa
        </button>
      </div>
      
      {empresas && empresas.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progreso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empresas.map((empresa, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="company-avatar">
                          {empresa.nombre ? empresa.nombre[0] : 'E'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{empresa.nombre}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{empresa.nit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {empresa.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${empresa.progreso || 0}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{empresa.progreso || 0}% completado</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <img 
            src="/images/empty-company.svg" 
            alt="No hay empresas" 
            className="mx-auto h-32 mb-4"
            onError={(e) => {e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Empresas'}}
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes empresas registradas</h3>
          <p className="text-gray-500 mb-4">Registra tu primera empresa para comenzar</p>
          <button className="btn btn-primary flex items-center mx-auto">
            <Plus size={16} className="mr-2" />
            Agregar Empresa
          </button>
        </div>
      )}
    </div>
  );
};

export default RedClientes;