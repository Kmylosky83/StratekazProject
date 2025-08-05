import React from 'react';
import { PageLayout } from '../design-system/components';
import ServiceSection from '../components/portfolio/ServiceSection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

const PortfolioPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { currentTheme, changeTheme } = useTheme();
  const userName = user?.first_name || user?.username || "";
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <PageLayout
      isAuthenticated={isAuthenticated} 
      userName={userName}
      currentTheme={currentTheme}
      onThemeChange={changeTheme}
    >
      <ServiceSection />
    </PageLayout>
  );
};

export default PortfolioPage;