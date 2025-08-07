import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Section, SectionHeader, Grid, Container } from '../../design-system/components';
import { InteraccionCard, InteraccionIcon, InteraccionTitle, InteraccionDescription, InteraccionCTA } from '../../design-system/components/Card/Card.styled';
import { Award, GraduationCap, Target, ArrowLeft, Shield, Briefcase, BarChart2, Users, BookOpen, TrendingUp, CheckCircle, Settings, FileCheck, Leaf } from 'lucide-react';
import ServicioModal from '../modals/ServicioModal';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

// Función para obtener colores según el tema
const getThemeColors = (theme) => ({
  sistemas: theme.buttonPrimary?.background || theme.colors.primary,
  formacion: theme.colors.success || '#059669',
  consultoria: theme.colors.danger || '#dc2626',
  calidad: theme.colors.warning || '#f59e0b',
  seguridad: theme.colors.danger || '#dc2626',
  ambiental: theme.colors.success || '#10b981',
  datos: theme.colors.info || '#3b82f6',
  liderazgo: theme.colors.secondary || '#8b5cf6',
  auditoria: theme.colors.success || '#059669',
  gerencial: theme.colors.info || '#0ea5e9',
  pnl: theme.colors.accent || '#ec4899',
  estrategico: theme.colors.warning || '#f59e0b'
});

const PortfolioContainer = styled.div`
  background: ${props => props.theme.card?.background || colors.white};
  border-radius: ${spacing.s4};
  box-shadow: ${props => props.theme.card?.shadow || '0 4px 20px rgba(0, 0, 0, 0.08)'};
  overflow: hidden;
  margin: ${spacing.s8} 0;
  border: 1px solid ${props => props.theme.card?.border || colors.border};
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
`;

const PortfolioHeader = styled.div`
  background: ${props => props.theme.colors.backgroundLight || colors.backgroundLight};
  padding: ${spacing.s8};
  border-bottom: 1px solid ${props => props.theme.colors.border || colors.border};
  text-align: center;
`;

const PortfolioTitle = styled.h2`
  font-size: ${typography.fontSizes.sectionTitle};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${spacing.s2} 0;
  letter-spacing: -0.01em;
`;

const PortfolioSubtitle = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
`;

const TabsContainer = styled.div`
  background: ${props => props.theme.colors.backgroundLight || colors.backgroundLight};
  padding: ${spacing.s4} ${spacing.s8};
  border-bottom: 1px solid ${props => props.theme.colors.border || colors.border};
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: ${spacing.s2};
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.s3};
  }
`;

const TabButton = styled.button`
  background: ${props => props.active ? (props.theme.buttonPrimary?.background || props.theme.colors.primary || colors.primary) : 'transparent'};
  color: ${props => props.active ? (props.theme.buttonPrimary?.text || colors.white) : (props.theme.colors.textMuted || colors.textMuted)};
  border: 1px solid ${props => props.active ? (props.theme.colors.primary || colors.primary) : (props.theme.colors.border || colors.border)};
  border-radius: ${spacing.s2};
  padding: ${spacing.s3} ${spacing.s6};
  font-weight: ${typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: ${spacing.s2};
  min-width: 140px;
  justify-content: center;
  
  &:hover:not(.active) {
    background: ${props => props.theme.colors.hover || colors.hover};
    border-color: ${props => props.theme.colors.borderDark || colors.borderDark};
    transform: translateY(-1px);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1);
  }
`;

const ServicesContent = styled.div`
  margin-top: ${spacing.s12};
  max-width: 100%;
  overflow-x: hidden;
  padding: ${spacing.s4} 0 ${spacing.s8} 0;
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: ${spacing.s4};
  right: ${spacing.s4};
  background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
  padding: ${spacing.s1} ${spacing.s3};
  border-radius: ${spacing.s3};
  font-size: ${typography.fontSizes.note};
  font-weight: ${typography.fontWeights.medium};
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  
  ${PortfolioContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceSection = () => {
  const theme = useTheme();
  const themeColors = getThemeColors(theme);
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
      themeColor: themeColors.sistemas,
      services: [
        {
          title: "ISO 9001 - Calidad",
          description: "Implementación completa del Sistema de Gestión de Calidad",
          icon: Award,
          iconColor: themeColors.calidad,
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
          iconColor: themeColors.seguridad,
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
          iconColor: themeColors.ambiental,
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
      themeColor: themeColors.formacion,
      services: [
        {
          title: "Análisis de Datos",
          description: "Formación en extracción de valor de datos para decisiones basadas en evidencia",
          icon: BarChart2,
          iconColor: themeColors.datos,
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
          iconColor: themeColors.liderazgo,
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
          iconColor: themeColors.auditoria,
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
      themeColor: themeColors.consultoria,
      services: [
        {
          title: "Coaching Gerencial",
          description: "Acompañamiento personalizado para directivos y equipos de alta dirección",
          icon: TrendingUp,
          iconColor: themeColors.gerencial,
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
          iconColor: themeColors.pnl,
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
          iconColor: themeColors.estrategico,
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