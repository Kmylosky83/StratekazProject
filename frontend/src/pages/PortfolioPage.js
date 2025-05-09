import React from 'react';
import HeroSection from '../components/portfolio/HeroSection';
import ServiceSection from '../components/portfolio/ServiceSection';
import CasesSection from '../components/portfolio/CasesSection';
import TestimonialSection from '../components/portfolio/TestimonialSection';
import MethodologySection from '../components/portfolio/MethodologySection';
import CTASection from '../components/portfolio/CTASection';
import '../styles/variables.css';
import '../styles/portfolio.css';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />   
      <ServiceSection />
      <CasesSection />
      <TestimonialSection />
      <MethodologySection />
      <CTASection />     
    </div>
  );
};

export default PortfolioPage;

