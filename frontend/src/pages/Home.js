// frontend/src/pages/Home.js
import React from 'react';
import { PageLayout, Container } from '../design-system/components';
import { Text } from '../design-system/components/Typography';
import HeroSection from '../components/home/HeroSection';
import NormativasSection from '../components/home/NormativasSection';
import CaracteristicasSection from '../components/home/CaracteristicasSection';
import MethodologySection from '../components/home/MethodologySection';
import CTASection from '../components/home/CTASection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Home = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { currentTheme, changeTheme } = useTheme();
  const userName = user?.first_name || user?.username || "";
  
  // Mostrar loading spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <LoadingWrapper>
        <Text>Cargando...</Text>
      </LoadingWrapper>
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