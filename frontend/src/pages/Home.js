// frontend/src/pages/home.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import NormativasSection from '../components/home/NormativasSection';
import CaracteristicasSection from '../components/home/CaracteristicasSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const isAuthenticated = false;
  const userName = "";
  
  return (
    <div>
      
      <div className="main-content">
        <HeroSection />
        <NormativasSection />
        <CaracteristicasSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;