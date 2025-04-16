const empresasService = {
    getEmpresas: async () => {
      try {
        // En producción, esto sería una llamada a la API
        // Por ahora, devolvemos datos de ejemplo
        return {
          success: true,
          data: [
            {
              id: 1,
              nombre: 'Empresa Alpha',
              nit: '900.123.456-7',
              created_at: '15/04/2023',
              progreso: 75
            },
            {
              id: 2,
              nombre: 'Constructora Beta',
              nit: '901.234.567-8',
              created_at: '03/06/2023',
              progreso: 45
            },
            {
              id: 3,
              nombre: 'Logística Delta',
              nit: '902.345.678-9',
              created_at: '22/08/2023',
              progreso: 60
            }
          ]
        };
      } catch (error) {
        console.error('Error en getEmpresas:', error);
        throw error;
      }
    }
  };
  
  export default empresasService;