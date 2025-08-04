// ServicioModal - Modal para mostrar detalles de servicios del portafolio
// Componente con diseño profesional y moderno
import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { 
  CheckCircle, GitBranch, Clock, Award, Shield, Briefcase, 
  BarChart2, Users, BookOpen, TrendingUp, Target, Settings,
  FileCheck, Leaf, AlertCircle, Star
} from 'lucide-react';

// Styled Components con diseño profesional
const LegalContent = styled.div`
  padding: ${props => props.theme.spacing.s4} 0;
  max-width: 100%;
`;

const LegalHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.s6};
  padding-bottom: ${props => props.theme.spacing.s4};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const LegalTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
`;

const LegalSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.base};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.primary};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const SectionContent = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.base};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  
  p {
    margin: 0 0 ${props => props.theme.spacing.s3} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FeaturesList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s3};
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s3};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary}30;
  }
`;

const FeatureIcon = styled.div`
  color: ${props => props.theme.colors.success};
  flex-shrink: 0;
  margin-top: 2px;
`;

const FeatureText = styled.div`
  flex: 1;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const ProcessSection = styled.div`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.backgroundLight} 0%, 
    ${props => props.theme.colors.white} 100%
  );
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
`;

const ProcessSteps = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.s3};
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s2} 0;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 12px;
    top: 40px;
    bottom: -20px;
    width: 2px;
    background: ${props => props.theme.colors.border};
  }
`;

const StepNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  flex-shrink: 0;
  z-index: 1;
  position: relative;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-size: ${props => props.theme.typography.fontSizes.base};
  margin-bottom: ${props => props.theme.spacing.s1};
`;

const StepDescription = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const InfoBox = styled.div`
  background: ${props => props.variant === 'warning' 
    ? props.theme.colors.warning + '08'
    : props.variant === 'success'
    ? props.theme.colors.success + '08'
    : props.theme.colors.primary + '08'};
  border: 1px solid ${props => props.variant === 'warning'
    ? props.theme.colors.warning + '30'
    : props.variant === 'success'
    ? props.theme.colors.success + '30'
    : props.theme.colors.primary + '30'};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const InfoIcon = styled.div`
  color: ${props => props.variant === 'warning'
    ? props.theme.colors.warning
    : props.variant === 'success'
    ? props.theme.colors.success
    : props.theme.colors.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const TimelineBox = styled.div`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}08 0%, 
    ${props => props.theme.colors.primary}03 100%
  );
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin: ${props => props.theme.spacing.s4} 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const TimelineTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const TimelineText = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const GuaranteeBox = styled.div`
  background: ${props => props.theme.colors.success}08;
  border: 1px solid ${props => props.theme.colors.success}30;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s2};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s2};
`;

const GuaranteeText = styled.span`
  color: ${props => props.theme.colors.success};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const ContactBox = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin-top: ${props => props.theme.spacing.s5};
  text-align: center;
`;

const ContactTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
`;

const ContactInfo = styled.p`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: ${props => props.theme.typography.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModalFooter = styled.div`
  padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s4};
`;

// Mapeo de iconos
const iconMap = {
  award: Award,
  shield: Shield,
  leaf: Leaf,
  settings: Settings,
  briefcase: Briefcase,
  'bar-chart-2': BarChart2,
  users: Users,
  'book-open': BookOpen,
  'file-check': FileCheck,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  target: Target
};

// Datos detallados de servicios
const serviciosDetallados = {
  // SISTEMAS DE GESTIÓN
  'sistemas-gestion': {
    title: 'ISO 9001 - Sistema de Gestión de Calidad',
    subtitle: 'Calidad y satisfacción del cliente',
    icon: 'award',
    description: 'Implementación completa de ISO 9001:2015 para establecer un sistema de gestión de calidad eficaz que mejore la satisfacción del cliente y la eficiencia operativa.',
    features: [
      'Diagnóstico inicial y análisis de brechas de calidad',
      'Desarrollo de política y objetivos de calidad',
      'Mapeo y documentación de procesos clave',
      'Implementación de controles de calidad',
      'Capacitación en gestión de calidad',
      'Auditorías internas de calidad',
      'Acompañamiento en certificación ISO 9001'
    ],
    proceso: [
      {
        titulo: 'Diagnóstico de Calidad',
        descripcion: 'Evaluación del sistema actual vs requisitos ISO 9001'
      },
      {
        titulo: 'Diseño del SGC',
        descripcion: 'Desarrollo del Sistema de Gestión de Calidad'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Puesta en marcha con enfoque en procesos'
      },
      {
        titulo: 'Auditoría Interna',
        descripcion: 'Verificación del cumplimiento ISO 9001'
      },
      {
        titulo: 'Certificación',
        descripcion: 'Acompañamiento en auditoría de certificación'
      }
    ],
    duracion: '4-6 meses de implementación',
    garantia: 'Certificación ISO 9001 garantizada'
  },
  
  'iso-45001': {
    title: 'ISO 45001 - Seguridad y Salud en el Trabajo',
    subtitle: 'Sistema internacional de gestión SST',
    icon: 'shield',
    description: 'Implementación de ISO 45001:2018, el estándar internacional para sistemas de gestión de seguridad y salud en el trabajo que proporciona un marco sólido para prevenir lesiones y problemas de salud.',
    features: [
      'Identificación de peligros y evaluación de riesgos',
      'Desarrollo de política y objetivos de SST',
      'Participación activa de los trabajadores',
      'Consulta y comunicación efectiva',
      'Controles operacionales especializados',
      'Preparación y respuesta ante emergencias',
      'Monitoreo del desempeño en SST'
    ],
    proceso: [
      {
        titulo: 'Contexto y Partes Interesadas',
        descripcion: 'Análisis del contexto organizacional en SST'
      },
      {
        titulo: 'Identificación de Peligros',
        descripcion: 'Metodología sistemática de identificación de riesgos'
      },
      {
        titulo: 'Planificación',
        descripcion: 'Objetivos, metas y programas de SST'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Controles operacionales y competencias'
      },
      {
        titulo: 'Evaluación',
        descripcion: 'Auditoría interna y revisión por la dirección'
      }
    ],
    duracion: '4-6 meses de implementación',
    garantia: 'Certificación ISO 45001 garantizada'
  },
  
  'iso-14001': {
    title: 'ISO 14001 - Sistema de Gestión Ambiental',
    subtitle: 'Sostenibilidad y responsabilidad ambiental',
    icon: 'leaf',
    description: 'Implementación de ISO 14001:2015 para establecer un sistema eficaz de gestión ambiental que permita a la organización lograr los resultados previstos de su sistema de gestión ambiental.',
    features: [
      'Identificación de aspectos e impactos ambientales',
      'Desarrollo de política y objetivos ambientales',
      'Evaluación del cumplimiento legal ambiental',
      'Programas de gestión ambiental',
      'Competencia y sensibilización ambiental',
      'Comunicación ambiental interna y externa',
      'Monitoreo y medición del desempeño ambiental'
    ],
    proceso: [
      {
        titulo: 'Contexto Ambiental',
        descripcion: 'Análisis del contexto y partes interesadas ambientales'
      },
      {
        titulo: 'Aspectos Ambientales',
        descripcion: 'Identificación y evaluación de impactos ambientales'
      },
      {
        titulo: 'Planificación Ambiental',
        descripcion: 'Objetivos, metas y programas ambientales'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Controles operacionales ambientales'
      },
      {
        titulo: 'Evaluación',
        descripcion: 'Auditoría ambiental y revisión por la dirección'
      }
    ],
    duracion: '4-6 meses de implementación',
    garantia: 'Certificación ISO 14001 garantizada'
  },

  // FORMACIÓN
  'analisis-datos': {
    title: 'Análisis de Datos',
    subtitle: 'Inteligencia de negocios y analítica',
    icon: 'bar-chart-2',
    description: 'Formación especializada para equipos en extracción de valor de los datos, visualización efectiva y toma de decisiones basadas en evidencia.',
    features: [
      'Fundamentos de análisis estadístico',
      'Análisis descriptivo y predictivo',
      'Visualización efectiva de datos',
      'Dashboards interactivos profesionales',
      'Interpretación y comunicación de resultados',
      'Herramientas de BI modernas',
      'Casos prácticos del sector'
    ],
    proceso: [
      {
        titulo: 'Diagnóstico',
        descripcion: 'Evaluación del nivel actual del equipo'
      },
      {
        titulo: 'Fundamentos',
        descripcion: 'Conceptos estadísticos y metodologías'
      },
      {
        titulo: 'Herramientas',
        descripcion: 'Software especializado de análisis'
      },
      {
        titulo: 'Casos Reales',
        descripcion: 'Aplicación con datos de la empresa'
      },
      {
        titulo: 'Proyecto Final',
        descripcion: 'Dashboard completo para la organización'
      }
    ],
    duracion: '40 horas (8 semanas)',
    garantia: 'Certificado de competencias en análisis de datos'
  },
  
  'liderazgo-equipos': {
    title: 'Liderazgo y Trabajo en Equipo',
    subtitle: 'Desarrollo de habilidades directivas',
    icon: 'users',
    description: 'Desarrollo integral de habilidades directivas para la gestión eficiente de equipos de alto rendimiento y liderazgo transformacional.',
    features: [
      'Liderazgo disruptivo y adaptativo',
      'Comunicación efectiva y asertiva',
      'Gestión inteligente de conflictos',
      'Motivación y engagement del equipo',
      'Delegación y empoderamiento',
      'Feedback constructivo y coaching',
      'Desarrollo de cultura organizacional'
    ],
    proceso: [
      {
        titulo: 'Autodiagnóstico',
        descripcion: 'Evaluación 360° del estilo de liderazgo'
      },
      {
        titulo: 'Competencias Core',
        descripcion: 'Habilidades directivas fundamentales'
      },
      {
        titulo: 'Práctica',
        descripcion: 'Aplicación con casos reales'
      },
      {
        titulo: 'Plan Personal',
        descripcion: 'Desarrollo individual de liderazgo'
      },
      {
        titulo: 'Seguimiento',
        descripcion: 'Coaching grupal y evaluación'
      }
    ],
    duracion: '32 horas (8 semanas)',
    garantia: 'Mejora medible en indicadores de clima laboral'
  },
  
  'formacion-sistemas': {
    title: 'Formación en Sistemas de Gestión',
    subtitle: 'Capacitación especializada ISO',
    icon: 'book-open',
    description: 'Capacitación especializada en implementación, mantenimiento y auditoría de sistemas de gestión basados en normas internacionales.',
    features: [
      'Interpretación de requisitos normativos',
      'Metodología de implementación paso a paso',
      'Auditoría interna certificada',
      'Gestión documental eficiente',
      'Medición y seguimiento de procesos',
      'No conformidades y acciones correctivas',
      'Preparación para auditorías externas'
    ],
    proceso: [
      {
        titulo: 'Fundamentos',
        descripcion: 'Comprensión profunda de requisitos ISO'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Metodología práctica con ejemplos'
      },
      {
        titulo: 'Auditoría',
        descripcion: 'Técnicas de auditoría efectiva'
      },
      {
        titulo: 'Casos Prácticos',
        descripcion: 'Simulacros en entornos reales'
      },
      {
        titulo: 'Certificación',
        descripcion: 'Examen como auditor interno'
      }
    ],
    duracion: '24 horas (6 semanas)',
    garantia: 'Certificación internacional como auditor interno'
  },

  // COACHING
  'coaching-gerencial': {
    title: 'Coaching Gerencial',
    subtitle: 'Desarrollo ejecutivo personalizado',
    icon: 'trending-up',
    description: 'Acompañamiento personalizado para directivos y equipos de alta dirección en el desarrollo de competencias gerenciales y liderazgo estratégico.',
    features: [
      'Definición de visión y metas personales',
      'Desarrollo de competencias directivas',
      'Gestión efectiva del cambio organizacional',
      'Balance vida-trabajo sostenible',
      'Toma de decisiones estratégicas',
      'Inteligencia emocional ejecutiva',
      'Network y relacionamiento estratégico'
    ],
    proceso: [
      {
        titulo: 'Assessment',
        descripcion: 'Evaluación integral de fortalezas'
      },
      {
        titulo: 'Plan de Desarrollo',
        descripcion: 'Objetivos y plan personalizado'
      },
      {
        titulo: 'Sesiones 1:1',
        descripcion: 'Coaching con técnicas especializadas'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Aplicación en el entorno laboral'
      },
      {
        titulo: 'Evaluación',
        descripcion: 'Medición de resultados y cierre'
      }
    ],
    duracion: '3-6 meses (sesiones quincenales)',
    garantia: 'Mejora medible en indicadores de desempeño'
  },
  
  'coaching-pnl': {
    title: 'Coaching en PNL',
    subtitle: 'Programación Neurolingüística aplicada',
    icon: 'check-circle',
    description: 'Aplicación de técnicas avanzadas de Programación Neurolingüística para el desarrollo personal y profesional acelerado.',
    features: [
      'Comunicación efectiva y persuasiva',
      'Gestión emocional avanzada',
      'Establecimiento y logro de objetivos',
      'Superación de limitaciones y creencias',
      'Técnicas de anclaje y modelado',
      'Rapport y calibración interpersonal',
      'Transformación de patrones limitantes'
    ],
    proceso: [
      {
        titulo: 'Mapeo Mental',
        descripcion: 'Identificación de patrones limitantes'
      },
      {
        titulo: 'Técnicas PNL',
        descripcion: 'Aprendizaje de herramientas específicas'
      },
      {
        titulo: 'Reprogramación',
        descripcion: 'Instalación de patrones de excelencia'
      },
      {
        titulo: 'Integración',
        descripcion: 'Aplicación en contextos reales'
      },
      {
        titulo: 'Maestría',
        descripcion: 'Dominio avanzado de técnicas'
      }
    ],
    duracion: '2-4 meses (sesiones semanales)',
    garantia: 'Transformación verificable en 90 días'
  },
  
  'coaching-estrategico': {
    title: 'Coaching Estratégico',
    subtitle: 'Transformación personal y organizacional',
    icon: 'target',
    description: 'Transformación integral de estrategias personales y organizacionales para potenciar el éxito y el crecimiento sostenible.',
    features: [
      'Análisis de potencial individual',
      'Diseño de planes de desarrollo integral',
      'Alineación de objetivos personales y profesionales',
      'Mentoría ejecutiva especializada',
      'Desarrollo de visión estratégica',
      'Implementación de sistemas de alto rendimiento',
      'Medición y optimización continua'
    ],
    proceso: [
      {
        titulo: 'Análisis DOFA',
        descripcion: 'Personal y profesional completo'
      },
      {
        titulo: 'Visión y Propósito',
        descripcion: 'Definición de misión de vida'
      },
      {
        titulo: 'Roadmap',
        descripcion: 'Plan a corto, medio y largo plazo'
      },
      {
        titulo: 'Ejecución',
        descripcion: 'Implementación con métricas'
      },
      {
        titulo: 'Optimización',
        descripcion: 'Ajustes y mejora continua'
      }
    ],
    duracion: '6-12 meses (sesiones mensuales)',
    garantia: 'Crecimiento profesional medible y sostenible'
  }
};

const ServicioModal = ({ isOpen, onClose, servicioId }) => {
  const servicio = serviciosDetallados[servicioId];

  if (!servicio) return null;

  const IconComponent = iconMap[servicio.icon] || Award;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title=""
      size="large"
      showCloseButton={true}
    >
      <ModalBody>
        <LegalContent>
          <LegalHeader>
            <LegalTitle>
              <IconComponent size={28} />
              {servicio.title}
            </LegalTitle>
            <LegalSubtitle>{servicio.subtitle}</LegalSubtitle>
          </LegalHeader>

          <Section>
            <SectionContent>
              <p>{servicio.description}</p>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <CheckCircle size={20} />
              ¿Qué incluye este servicio?
            </SectionTitle>
            <FeaturesList>
              {servicio.features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>
                    <CheckCircle size={16} />
                  </FeatureIcon>
                  <FeatureText>{feature}</FeatureText>
                </FeatureCard>
              ))}
            </FeaturesList>
          </Section>

          <ProcessSection>
            <SectionTitle style={{ marginBottom: '1.5rem' }}>
              <GitBranch size={20} />
              Proceso de Implementación
            </SectionTitle>
            <ProcessSteps>
              {servicio.proceso.map((step, index) => (
                <ProcessStep key={index}>
                  <StepNumber>{index + 1}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.titulo}</StepTitle>
                    <StepDescription>{step.descripcion}</StepDescription>
                  </StepContent>
                </ProcessStep>
              ))}
            </ProcessSteps>
          </ProcessSection>

          <TimelineBox>
            <TimelineTitle>
              <Clock size={20} />
              Duración Estimada
            </TimelineTitle>
            <TimelineText>{servicio.duracion}</TimelineText>
            
            {servicio.garantia && (
              <GuaranteeBox>
                <Star size={16} />
                <GuaranteeText>{servicio.garantia}</GuaranteeText>
              </GuaranteeBox>
            )}
          </TimelineBox>

          <InfoBox variant="primary">
            <InfoIcon variant="primary">
              <AlertCircle size={20} />
            </InfoIcon>
            <InfoText>
              <strong>Metodología StrateKaz:</strong> Combinamos consultoría presencial con herramientas 
              digitales avanzadas para garantizar resultados medibles y sostenibles. Nuestro equipo de 
              expertos te acompaña en cada etapa del proceso.
            </InfoText>
          </InfoBox>

          <ContactBox>
            <ContactTitle>¿Listo para transformar tu organización?</ContactTitle>
            <ContactInfo>
              Solicita una consulta gratuita: <a href="mailto:info@stratekaz.com">info@stratekaz.com</a>
              <br />
              WhatsApp: <a href="https://wa.me/573115351944">+57 311 535 1944</a>
            </ContactInfo>
          </ContactBox>
        </LegalContent>
      </ModalBody>
      
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button 
          as="a"
          href="https://wa.me/573115351944?text=Hola, me interesa obtener información sobre los servicios de StrateKaz"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          Solicitar Información
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ServicioModal;