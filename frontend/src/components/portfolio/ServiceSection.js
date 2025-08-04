import React, { useState } from 'react';
import styled from 'styled-components';
import { Section, SectionHeader, Grid, Container } from '../../design-system/components';
import { InteraccionCard, InteraccionIcon, InteraccionTitle, InteraccionDescription, InteraccionCTA } from '../../design-system/components/Card/Card.styled';
import { Award, GraduationCap, Target } from 'lucide-react';
import ServicioModal from '../modals/ServicioModal';

// Componentes styled para la navegación
const BackButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateX(-4px);
  }
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
`;

// Componentes para las cards de servicios individuales
const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 8px 25px rgba(236, 38, 143, 0.15);
    transform: translateY(-4px);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
`;

const ServiceCTA = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Categorías principales - 3 categorías como solicitaste
  const categories = [
    {
      id: 'sistemas-gestion',
      icon: Award,
      title: 'Sistemas de Gestión',
      description: 'Diseño e implementación de sistemas de gestión basados en normas internacionales ISO.',
      themeColor: '#2563eb', // Azul profesional
      services: [
        {
          title: "ISO 9001 - Calidad",
          description: "Implementación completa del Sistema de Gestión de Calidad",
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleServiceClick = (service, category) => {
    // Crear el ID para el modal basado en el servicio
    const serviceId = service.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/ñ/g, 'n')
      .replace(/[áéíóú]/g, (match) => {
        const accents = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
        return accents[match];
      });
    
    setSelectedService(serviceId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <Section variant="light" size="large">
      <Container>
        <SectionHeader
          title="Portafolio de Servicios"
          subtitle="Soluciones personalizadas para impulsar el crecimiento sostenible de su organización a través de estrategias integrales y herramientas de gestión innovadoras."
          centered
        />
        
        {!selectedCategory ? (
          // Vista de categorías principales
          <Grid columns={3} tablet={2} mobile={1} gap="large">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <InteraccionCard
                  key={index}
                  themeColor={category.themeColor}
                  onClick={() => handleCategoryClick(category)}
                >
                  <InteraccionIcon themeColor={category.themeColor}>
                    <IconComponent size={32} />
                  </InteraccionIcon>
                  <InteraccionTitle>{category.title}</InteraccionTitle>
                  <InteraccionDescription>{category.description}</InteraccionDescription>
                  <InteraccionCTA>Ver servicios →</InteraccionCTA>
                </InteraccionCard>
              );
            })}
          </Grid>
        ) : (
          // Vista de servicios de la categoría seleccionada
          <div>
            <BackButton onClick={() => setSelectedCategory(null)}>
              ← Volver a categorías
            </BackButton>
            <CategoryTitle>{selectedCategory.title}</CategoryTitle>
            <Grid columns={3} tablet={2} mobile={1} gap="large">
              {selectedCategory.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  onClick={() => handleServiceClick(service, selectedCategory)}
                >
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceCTA>Ver detalles →</ServiceCTA>
                </ServiceCard>
              ))}
            </Grid>
          </div>
        )}

        {/* Modal explicativo */}
        <ServicioModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          servicioId={selectedService}
        />
      </Container>
    </Section>
  );
};

export default ServiceSection;