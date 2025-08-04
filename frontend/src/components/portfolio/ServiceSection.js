import React, { useState } from 'react';
import styled from 'styled-components';
import { Section, SectionHeader, Grid, Container } from '../../design-system/components';
import { InteraccionCard, InteraccionIcon, InteraccionTitle, InteraccionDescription, InteraccionCTA } from '../../design-system/components/Card/Card.styled';
import { Award, GraduationCap, Target, ArrowLeft, Shield, Briefcase, BarChart2, Users, BookOpen, TrendingUp, CheckCircle, Settings, FileCheck, Leaf } from 'lucide-react';
import ServicioModal from '../modals/ServicioModal';

// Contenedor principal estilo dashboard
const PortfolioContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.colors.border};
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
`;

const PortfolioHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundLight} 0%, ${props => props.theme.colors.white} 100%);
  padding: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

const PortfolioTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.01em;
`;

const PortfolioSubtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
`;

// Contenedor de tabs estilo dashboard
const TabsContainer = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.textMuted};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 140px;
  justify-content: center;
  
  &:hover:not(.active) {
    background: ${props => props.theme.colors.hover};
    border-color: ${props => props.theme.colors.borderDark};
    transform: translateY(-1px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

// Contenido de servicios (fuera del contenedor)
const ServicesContent = styled.div`
  margin-top: 3rem;
  max-width: 100%;
  overflow-x: hidden;
  padding: 1rem 0 2rem 0; /* Padding para permitir elevación de cards */
`;

// Status indicator para mostrar categoría activa
const StatusIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  
  ${PortfolioContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceSection = () => {
  const [activeCategory, setActiveCategory] = useState('sistemas-gestion');
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Categorías principales - 3 categorías como solicitaste
  const categories = [
    {
      id: 'sistemas-gestion',
      icon: Settings,
      title: 'Sistemas de Gestión',
      description: 'Diseño e implementación de sistemas de gestión basados en normas internacionales ISO.',
      themeColor: '#2563eb', // Azul profesional
      services: [
        {
          title: "ISO 9001 - Calidad",
          description: "Implementación completa del Sistema de Gestión de Calidad",
          icon: Award,
          iconColor: '#f59e0b', // Dorado para calidad
          features: [
            "Diagnóstico inicial y planificación",
            "Desarrollo y documentación de procesos",
            "Formación del equipo interno",
            "Acompañamiento en auditoría de certificación"
          ]
        },
        {
          title: "ISO 45001 - Seguridad",
          description: "Sistema de Gestión de Seguridad y Salud en el Trabajo",
          icon: Shield,
          iconColor: '#dc2626', // Rojo para seguridad
          features: [
            "Identificación de peligros y riesgos",
            "Planes de emergencia y contingencia",
            "Evaluación del cumplimiento legal",
            "Indicadores de gestión y mejora continua"
          ]
        },
        {
          title: "ISO 14001 - Ambiental",
          description: "Gestión Ambiental para organizaciones sostenibles",
          icon: Leaf,
          iconColor: '#10b981', // Verde para ambiental
          features: [
            "Aspectos e impactos ambientales",
            "Cumplimiento legal ambiental",
            "Programas de gestión ambiental",
            "Monitoreo y medición ambiental"
          ]
        }
      ]
    },
    {
      id: 'formacion',
      icon: GraduationCap,
      title: 'Formación',
      description: 'Capacitación especializada para el desarrollo de competencias técnicas y directivas.',
      themeColor: '#059669', // Verde crecimiento
      services: [
        {
          title: "Análisis de Datos",
          description: "Formación en extracción de valor de datos para decisiones basadas en evidencia",
          icon: BarChart2,
          iconColor: '#3b82f6', // Azul para datos
          features: [
            "Análisis descriptivo y predictivo",
            "Visualización efectiva de datos",
            "Dashboards para control y seguimiento",
            "Interpretación y toma de decisiones"
          ]
        },
        {
          title: "Liderazgo y Equipos",
          description: "Desarrollo de habilidades para gestión de equipos de alto rendimiento",
          icon: Users,
          iconColor: '#8b5cf6', // Púrpura para liderazgo
          features: [
            "Liderazgo disruptivo",
            "Comunicación efectiva",
            "Gestión de conflictos",
            "Motivación y engagement"
          ]
        },
        {
          title: "Auditoría Interna",
          description: "Capacitación especializada en auditoría de sistemas de gestión",
          icon: FileCheck,
          iconColor: '#059669', // Verde para auditoría
          features: [
            "Interpretación de requisitos normativos",
            "Técnicas de auditoría efectiva",
            "Gestión documental eficiente",
            "Medición y seguimiento de procesos"
          ]
        }
      ]
    },
    {
      id: 'coaching',
      icon: Target,
      title: 'Coaching',
      description: 'Acompañamiento personalizado para el desarrollo personal y organizacional.',
      themeColor: '#dc2626', // Rojo impacto
      services: [
        {
          title: "Coaching Gerencial",
          description: "Acompañamiento personalizado para directivos y equipos de alta dirección",
          icon: TrendingUp,
          iconColor: '#0ea5e9', // Azul cielo para gerencial
          features: [
            "Definición de visión y metas",
            "Desarrollo de competencias directivas",
            "Gestión del cambio organizacional",
            "Balance vida-trabajo"
          ]
        },
        {
          title: "Coaching en PNL",
          description: "Programación Neurolingüística para desarrollo personal y profesional",
          icon: CheckCircle,
          iconColor: '#ec4899', // Rosa para PNL
          features: [
            "Comunicación efectiva",
            "Gestión emocional",
            "Establecimiento y logro de objetivos",
            "Romper limitaciones y creencias"
          ]
        },
        {
          title: "Coaching Estratégico",
          description: "Transformación de estrategias personales y organizacionales",
          icon: Target,
          iconColor: '#f59e0b', // Dorado para estratégico
          features: [
            "Análisis de potencial individual",
            "Diseño de planes de desarrollo",
            "Alineación de objetivos personales y profesionales",
            "Mentoría y acompañamiento continuo"
          ]
        }
      ]
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleServiceClick = (service, category) => {
    // Mapeo directo de servicios a IDs del modal
    const serviceIdMap = {
      // Sistemas de Gestión
      'ISO 9001 - Calidad': 'sistemas-gestion',
      'ISO 45001 - Seguridad': 'iso-45001',
      'ISO 14001 - Ambiental': 'iso-14001',
      
      // Formación
      'Análisis de Datos': 'analisis-datos',
      'Liderazgo y Equipos': 'liderazgo-equipos',
      'Auditoría Interna': 'formacion-sistemas',
      
      // Coaching
      'Coaching Gerencial': 'coaching-gerencial',
      'Coaching en PNL': 'coaching-pnl',
      'Coaching Estratégico': 'coaching-estrategico'
    };
    
    const serviceId = serviceIdMap[service.title];
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  // Obtener la categoría activa
  const activeCategories = categories.find(cat => cat.id === activeCategory);

  return (
    <Section variant="light" size="large">
      <Container>
        {/* Contenedor principal estilo dashboard */}
        <PortfolioContainer>
          {/* Header del contenedor - simplificado */}
          <PortfolioHeader>
            <PortfolioTitle>Categorías de Servicios</PortfolioTitle>
          </PortfolioHeader>

          {/* Tabs de categorías */}
          <TabsContainer>
            <TabsWrapper>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabButton
                    key={category.id}
                    active={activeCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <IconComponent size={18} />
                    {category.title}
                  </TabButton>
                );
              })}
            </TabsWrapper>
          </TabsContainer>
        </PortfolioContainer>
      </Container>

      {/* Contenido de servicios - completamente fuera del Container */}
      <ServicesContent>
        <Container>
          <Grid columns={3} tablet={2} mobile={1} gap="large">
            {activeCategories?.services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <InteraccionCard
                  key={index}
                  themeColor={service.iconColor}
                  onClick={() => handleServiceClick(service, activeCategories)}
                >
                  <InteraccionIcon themeColor={service.iconColor}>
                    <ServiceIcon size={32} />
                  </InteraccionIcon>
                  <InteraccionTitle>{service.title}</InteraccionTitle>
                  <InteraccionDescription>{service.description}</InteraccionDescription>
                  <InteraccionCTA>Ver detalles →</InteraccionCTA>
                </InteraccionCard>
              );
            })}
          </Grid>
        </Container>
      </ServicesContent>

      {/* Modal explicativo */}
      <ServicioModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        servicioId={selectedService}
      />
    </Section>
  );
};

export default ServiceSection;