// frontend/src/pages/home.js
import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import HeroSection from '../components/home/HeroSection';
import NormativasSection from '../components/home/NormativasSection';
import ComoFuncionaSection from '../components/home/ComoFuncionaSection';
import CaracteristicasSection from '../components/home/CaracteristicasSection';
import CTASection from '../components/home/CTASection';
import '../styles/variables.css';
import '../styles/home.css';

const Home = () => {
  const isAuthenticated = false;
  const userName = "";
  
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <div className="main-content">
        <HeroSection />
        <NormativasSection />
        <ComoFuncionaSection />
        <CaracteristicasSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;