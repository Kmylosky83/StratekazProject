// frontend/src/pages/Home.js
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import NormativasSection from '../components/home/NormativasSection';
import CaracteristicasSection from '../components/home/CaracteristicasSection';
import MethodologySection from '../components/portfolio/MethodologySection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const isAuthenticated = false; // This should come from AuthContext
  const userName = ""; // This should come from AuthContext
  
  return (
    <div className="home-page">
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <main className="main-content">
        <HeroSection />
        <NormativasSection />
        <CaracteristicasSection />
        <MethodologySection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;