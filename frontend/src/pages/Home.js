// frontend/src/pages/Home.js
import React from 'react';
import { PageLayout } from '../design-system/components';
import HeroSection from '../components/home/HeroSection';
import NormativasSection from '../components/home/NormativasSection';
import CaracteristicasSection from '../components/home/CaracteristicasSection';
import MethodologySection from '../components/home/MethodologySection';
import CTASection from '../components/home/CTASection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

const Home = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { currentTheme, changeTheme } = useTheme();
  const userName = user?.first_name || user?.username || "";
  
  // Mostrar loading spinner mientras se verifica la autenticación
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
      <HeroSection />
      <NormativasSection />
      <CaracteristicasSection />
      <MethodologySection />
      <CTASection />
    </PageLayout>
  );
};

export default Home;