// features/dashboard/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboardService';

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [configData, statsData] = await Promise.all([
        dashboardService.getDashboardConfig(),
        dashboardService.getDashboardStats()
      ]);

      if (configData) {
        setDashboardData(configData);
      }
      
      if (statsData) {
        setStats(statsData);
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Error cargando el dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const refreshDashboard = useCallback(() => {
    loadDashboard();
  }, [loadDashboard]);

  const getPillarConfig = useCallback(() => {
    return dashboardService.getPillarConfig();
  }, []);

  const getStatsConfig = useCallback(() => {
    return dashboardService.getStatsConfig();
  }, []);

  return {
    dashboardData,
    stats,
    loading,
    error,
    refreshDashboard,
    getPillarConfig,
    getStatsConfig
  };
}