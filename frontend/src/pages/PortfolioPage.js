import React from 'react';
import styled from 'styled-components';
import { Header, Footer } from '../design-system/components';
import ServiceSection from '../components/portfolio/ServiceSection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

const PageWrapper = styled.div``;

const MainContent = styled.main`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

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
    <PageWrapper>
      <Header 
        isAuthenticated={isAuthenticated} 
        userName={userName}
        currentTheme={currentTheme}
        onThemeChange={changeTheme}
      />
      
      <MainContent>
        <ServiceSection />
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

export default PortfolioPage;