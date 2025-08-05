// PageLayout.js - Layout wrapper with sticky footer
import React from 'react';
import styled from 'styled-components';
import { Header, Footer } from '../index';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PageLayout = ({ 
  children, 
  isAuthenticated = false, 
  userName = '', 
  currentTheme = 'light',
  onThemeChange,
  showNavigation = true,
  showSocial = true,
  showContact = true 
}) => {
  return (
    <LayoutWrapper>
      <Header 
        isAuthenticated={isAuthenticated} 
        userName={userName} 
        showNavigation={showNavigation}
        currentTheme={currentTheme}
        onThemeChange={onThemeChange}
      />
      
      <MainContent>
        {children}
      </MainContent>

      <Footer 
        showSocial={showSocial} 
        showContact={showContact} 
      />
    </LayoutWrapper>
  );
};

export default PageLayout;