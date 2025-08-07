// frontend/src/pages/AccesoGratuitoPage.js
import React from 'react';
import { PageLayout } from '../design-system/components';
import { Text } from '../design-system/components/Typography';
import RecursosSection from '../components/acceso-gratuito/RecursosSection';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../design-system/themes/ThemeManager';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AccesoGratuitoPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const { currentTheme, changeTheme } = useTheme();
  const userName = user?.first_name || user?.username || "";
  
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
      <RecursosSection />
    </PageLayout>
  );
};

export default AccesoGratuitoPage;