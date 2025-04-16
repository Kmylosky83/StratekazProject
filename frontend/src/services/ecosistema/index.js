const ecosistemaService = {
    getEcosistemaData: async () => {
      try {
        // En producción, esto sería una llamada a la API
        // Por ahora, devolvemos datos de ejemplo
        return {
          success: true,
          data: {
            pendientes: [
              {
                id: 1,
                title: 'Actualizar plan de seguridad',
                priority: 'alta',
                dueDate: '2025-04-18'
              },
              {
                id: 2,
                title: 'Revisar informes financieros',
                priority: 'media',
                dueDate: '2025-04-20'
              },
              {
                id: 3,
                title: 'Preparar reunión con proveedores',
                priority: 'baja',
                dueDate: '2025-04-23'
              }
            ],
            recentActivity: [
              {
                id: 1,
                text: 'Carlos M. actualizó el informe de seguridad',
                time: 'Hace 1 hora',
                icon: 'fas fa-file-alt'
              },
              {
                id: 2,
                text: 'Ana L. completó la capacitación obligatoria',
                time: 'Hace 3 horas',
                icon: 'fas fa-graduation-cap'
              },
              {
                id: 3,
                text: 'Rodrigo S. agregó un nuevo proyecto',
                time: 'Hace 5 horas',
                icon: 'fas fa-project-diagram'
              }
            ],
            upcomingEvents: [
              {
                id: 1,
                title: 'Feria Empresarial',
                date: '15 Abr, 2025 • 9:00-18:00',
                location: 'Centro de Convenciones'
              },
              {
                id: 2,
                title: 'Capacitación de Seguridad',
                date: '18 Abr, 2025 • 14:00-16:00',
                location: 'Sala de Conferencias A'
              },
              {
                id: 3,
                title: 'Reunión de Directorio',
                date: '22 Abr, 2025 • 10:00-12:00',
                location: 'Sala de Juntas Principal'
              }
            ]
          }
        };
      } catch (error) {
        console.error('Error en getEcosistemaData:', error);
        throw error;
      }
    }
  };
  
  export default ecosistemaService;