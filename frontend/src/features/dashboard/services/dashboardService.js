// features/dashboard/services/dashboardService.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class DashboardService {
  constructor() {
    this.baseURL = `${API_BASE}/api/v1/dashboard`;
  }

  async getDashboardConfig() {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard config fetch error:', error);
      return null;
    }
  }

  async getDashboardStats() {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/stats/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard stats fetch error:', error);
      return {
        total_projects: 0,
        active_companies: 0,
        pending_tasks: 0,
        this_month_activity: 0,
        notifications: []
      };
    }
  }

  getPillarConfig() {
    // Configuración estática de pilares para el frontend
    return {
      herramientas_productividad: {
        name: 'Herramientas de Productividad',
        description: 'Suite completa de herramientas para la gestión empresarial',
        icon: 'tools',
        color: '#3B82F6',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        modules: [
          { id: 'formacion', name: 'Formación', icon: 'graduation-cap' },
          { id: 'documentacion', name: 'Documentación', icon: 'file-text' },
          { id: 'analisis', name: 'Análisis', icon: 'bar-chart-3' },
          { id: 'comunicacion', name: 'Comunicación', icon: 'message-circle' },
          { id: 'diagnostico', name: 'Diagnóstico', icon: 'stethoscope' },
          { id: 'inspecciones', name: 'Inspecciones', icon: 'search' },
          { id: 'matrices', name: 'Matrices', icon: 'grid-3x3' },
          { id: 'planificacion', name: 'Planificación', icon: 'calendar' }
        ]
      },
      inteligencia_negocios: {
        name: 'Inteligencia de Negocios',
        description: 'Análisis y reportes para la toma de decisiones',
        icon: 'analytics',
        color: '#10B981',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        modules: [
          { id: 'normas_iso', name: 'Normas ISO', icon: 'award' },
          { id: 'sst', name: 'SST', icon: 'shield' },
          { id: 'pesv', name: 'PESV', icon: 'truck' }
        ]
      },
      mis_empresas: {
        name: 'Mis Empresas',
        description: 'Gestión de empresas clientes',
        icon: 'building',
        color: '#F59E0B',
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        modules: [
          { id: 'gestion_empresas', name: 'Gestión de Empresas', icon: 'building-2' },
          { id: 'contratos', name: 'Contratos', icon: 'file-contract' },
          { id: 'proyectos', name: 'Proyectos', icon: 'folder' }
        ]
      },
      ecosistema_empresarial: {
        name: 'Ecosistema Empresarial',
        description: 'Red de conexiones y oportunidades',
        icon: 'network',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        modules: [
          { id: 'directorio', name: 'Directorio', icon: 'users' },
          { id: 'oportunidades', name: 'Oportunidades', icon: 'target' },
          { id: 'colaboraciones', name: 'Colaboraciones', icon: 'handshake' }
        ]
      },
      finanzas: {
        name: 'Finanzas',
        description: 'Gestión financiera y facturación',
        icon: 'money',
        color: '#EF4444',
        gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        modules: [
          { id: 'facturacion', name: 'Facturación', icon: 'receipt' },
          { id: 'reportes_financieros', name: 'Reportes Financieros', icon: 'trending-up' },
          { id: 'presupuestos', name: 'Presupuestos', icon: 'calculator' }
        ]
      }
    };
  }

  getStatsConfig() {
    // Configuración de estadísticas para cards
    return [
      {
        id: 'total_projects',
        name: 'Proyectos Totales',
        icon: 'folder',
        color: '#3B82F6'
      },
      {
        id: 'active_companies',
        name: 'Empresas Activas',
        icon: 'building-2',
        color: '#10B981'
      },
      {
        id: 'pending_tasks',
        name: 'Tareas Pendientes',
        icon: 'check-circle',
        color: '#F59E0B'
      },
      {
        id: 'this_month_activity',
        name: 'Actividad del Mes',
        icon: 'activity',
        color: '#8B5CF6'
      }
    ];
  }
}

export default new DashboardService();