import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ServiceSection from '../components/portfolio/ServiceSection';

const PortfolioPage = () => {
  const isAuthenticated = false; // This should come from AuthContext
  const userName = ""; // This should come from AuthContext

  return (
    <div className="portfolio-page">
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <main className="min-h-screen bg-gray-50 py-5">
        <div className="container">
          <ServiceSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;