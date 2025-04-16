// frontend/src/services/herramientas/formacion/index.js
const formacionService = {
    // Obtener todas las fichas de formación
    getFichas: async () => {
      try {
        // Para desarrollo, usamos datos simulados
        // En producción, esto sería una llamada a la API
        return {
          success: true,
          data: [
            {
              id: 1,
              titulo: 'Capacitación SG-SST Básico',
              fecha: '2025-04-15',
              descripcion: 'Formación básica en Sistema de Gestión de Seguridad y Salud en el Trabajo...',
              codigo: 'F-2025-001',
              asistentes_count: 18
            },
            {
              id: 2,
              titulo: 'Inducción Nuevos Empleados',
              fecha: '2025-04-10',
              descripcion: 'Inducción corporativa para personal nuevo que se incorpora a la empresa...',
              codigo: 'F-2025-002',
              asistentes_count: 5
            },
            {
              id: 3,
              titulo: 'Formación ISO 9001',
              fecha: '2025-04-05',
              descripcion: 'Conceptos fundamentales del Sistema de Gestión de Calidad basado en ISO 9001:2015...',
              codigo: 'F-2025-003',
              asistentes_count: 12
            }
          ]
        };
      } catch (error) {
        console.error('Error en getFichas:', error);
        throw error;
      }
    },
  
    // Obtener detalle de una ficha
    getFichaById: async (id) => {
      try {
        // Simulación para desarrollo
        return {
          success: true,
          data: {
            id: id,
            titulo: 'Capacitación SG-SST Básico',
            fecha: '2025-04-15T10:00',
            descripcion: 'Formación básica en Sistema de Gestión de Seguridad y Salud en el Trabajo...',
            lugar: 'Sala de Conferencias A',
            duracion: '2 horas',
            responsable: 'Carlos Mendoza',
            codigo: 'F-2025-001',
            objetivos: 'Conocer los conceptos básicos del SG-SST\nIdentificar peligros y riesgos en el entorno laboral\nComprender el marco normativo del SG-SST',
            metodologia: 'clase_magistral',
            recursos: ['presentacion', 'material_impreso', 'videos']
          }
        };
      } catch (error) {
        console.error('Error en getFichaById:', error);
        throw error;
      }
    },
  
    // Crear nueva ficha
    crearFicha: async (data) => {
      try {
        console.log('Datos enviados para crear ficha:', data);
        // Simulación para desarrollo
        return {
          success: true,
          message: 'Ficha creada exitosamente',
          data: {
            id: Math.floor(Math.random() * 1000) + 4 // ID aleatorio
          }
        };
      } catch (error) {
        console.error('Error en crearFicha:', error);
        throw error;
      }
    },
  
    // Actualizar ficha existente - NUEVO MÉTODO AGREGADO
    actualizarFicha: async (id, data) => {
      try {
        console.log('Datos enviados para actualizar ficha:', data);
        // Simulación para desarrollo
        return {
          success: true,
          message: 'Ficha actualizada exitosamente'
        };
      } catch (error) {
        console.error('Error en actualizarFicha:', error);
        throw error;
      }
    },
  
    // Enviar enlace de creación externa
    enviarEnlaceCreacion: async (email) => {
      try {
        console.log('Enviando enlace de creación a:', email);
        // Simulación para desarrollo
        return {
          success: true,
          message: 'Enlace enviado correctamente'
        };
      } catch (error) {
        console.error('Error en enviarEnlaceCreacion:', error);
        throw error;
      }
    },

    // Agregar al archivo frontend/src/services/herramientas/formacion/index.js
    getListaAsistencia: async (fichaId) => {
        try {
        // Simulación para desarrollo
        return {
            success: true,
            data: {
            id: 1,
            ficha_id: fichaId,
            enlace_compartible: 'abc123xyz456',
            asistentes: [
                {
                id: 1,
                nombre: 'Carlos Martínez',
                email: 'carlos@ejemplo.com',
                cargo: 'Supervisor de Seguridad',
                fecha_registro: '2025-04-15T15:30:00'
                },
                {
                id: 2,
                nombre: 'Ana López',
                email: 'ana@ejemplo.com',
                cargo: 'Jefa de Operaciones',
                fecha_registro: '2025-04-15T16:15:00'
                }
            ]
            }
        };
        } catch (error) {
        console.error('Error en getListaAsistencia:', error);
        throw error;
        }
    },
    
    crearListaAsistencia: async (fichaId) => {
        try {
        // Simulación para desarrollo
        return {
            success: true,
            message: 'Lista de asistencia creada exitosamente',
            data: {
            id: Math.floor(Math.random() * 1000) + 1,
            ficha_id: fichaId,
            enlace_compartible: Math.random().toString(36).substring(2, 15),
            asistentes: []
            }
        };
        } catch (error) {
        console.error('Error en crearListaAsistencia:', error);
        throw error;
        }
    },
    
    eliminarFicha: async (id, data) => {
        try {
        console.log(`Eliminando ficha ${id} con contraseña ${data.password}`);
        // Simulación para desarrollo
        return {
            success: true,
            message: 'Ficha eliminada exitosamente'
        };
        } catch (error) {
        console.error('Error en eliminarFicha:', error);
        throw error;
        }
    },
    
    subirImagenes: async (fichaId, formData) => {
        try {
        console.log(`Subiendo imágenes para ficha ${fichaId}`, formData);
        // Simulación para desarrollo
        return {
            success: true,
            message: 'Imágenes subidas exitosamente'
        };
        } catch (error) {
        console.error('Error en subirImagenes:', error);
        throw error;
        }
    },
    
    guardarConclusiones: async (fichaId, data) => {
        try {
        console.log(`Guardando conclusiones para ficha ${fichaId}`, data);
        // Simulación para desarrollo
        return {
            success: true,
            message: 'Conclusiones guardadas exitosamente'
        };
        } catch (error) {
        console.error('Error en guardarConclusiones:', error);
        throw error;
        }
    },

    // Agregar a frontend/src/services/herramientas/Formacion/index.js
  getListaByEnlace: async (enlace) => {
    try {
      // Simulación para desarrollo
      return {
        success: true,
        data: {
          id: 1,
          ficha_id: 1,  // Usamos el ID 1 como ejemplo
          enlace_compartible: enlace,
          asistentes: []
        }
      };
    } catch (error) {
      console.error('Error en getListaByEnlace:', error);
      throw error;
    }
  },

  registrarAsistente: async (data) => {
    try {
      console.log('Datos de asistente:', data);
      // Simulación para desarrollo
      return {
        success: true,
        message: 'Asistencia registrada exitosamente'
      };
    } catch (error) {
      console.error('Error en registrarAsistente:', error);
      throw error;
    }
  },
  };
  
  export default formacionService;