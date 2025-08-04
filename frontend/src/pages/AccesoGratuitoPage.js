// frontend/src/pages/AccesoGratuitoPage.js
import React from 'react';
import styled from 'styled-components';
import { Header, Footer } from '../design-system/components';
import RecursosSection from '../components/acceso-gratuito/RecursosSection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';

const PageWrapper = styled.div``;

const MainContent = styled.main`
  padding-top: ${props => props.theme.spacing.s12};
`;

const AccesoGratuitoPage = () => {
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
        <RecursosSection />
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

export default AccesoGratuitoPage;