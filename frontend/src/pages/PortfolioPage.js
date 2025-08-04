import React from 'react';
import styled from 'styled-components';
import { Header, Footer, Container } from '../design-system/components';
import ServiceSection from '../components/portfolio/ServiceSection';

const PageWrapper = styled.div``;

const MainContent = styled.main`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.s12} 0;
`;

const PortfolioPage = () => {
  const isAuthenticated = false; // This should come from AuthContext
  const userName = ""; // This should come from AuthContext

  return (
    <PageWrapper>
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <MainContent>
        <Container>
          <ServiceSection />
        </Container>
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

export default PortfolioPage;