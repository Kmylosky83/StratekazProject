// ServicioModal - Modal para mostrar detalles de servicios del portafolio
// Componente especializado para mostrar información detallada de servicios de consultoría
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { H4, Text } from '../../design-system/components/Typography';
import { CheckCircle, GitBranch, Clock, Award, Shield, Briefcase, BarChart2, Users, BookOpen, TrendingUp, Target } from 'lucide-react';

// Styled Components específicos para ServicioModal
const ServicioContent = styled.div`
  padding: ${props => props.theme.spacing.s4} 0;
`;

const ServicioHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const ServicioIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.s4};
  color: ${props => props.theme.colors.white};
  font-size: 2rem;
`;

const ServicioTitle = styled(H4)`
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  text-align: center;
`;

const ServicioDescription = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin-bottom: ${props => props.theme.spacing.s5};
  text-align: center;
`;

const FeaturesSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s5};
`;

const SectionTitle = styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  margin-bottom: ${props => props.theme.spacing.s3};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.s2};
    padding: ${props => props.theme.spacing.s2} 0;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    
    &::before {
      content: '';
      width: 16px;
      height: 16px;
      background: ${props => props.theme.colors.success};
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 2px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 4px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`;

const ProcessSection = styled.div`
  background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
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
`;

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.s1};
`;

const StepDescription = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.xs};
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const TimelineBox = styled.div`
  background: ${props => props.theme.colors.primary}10;
  border: 1px solid ${props => props.theme.colors.primary}30;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s3};
  margin: ${props => props.theme.spacing.s4} 0;
  text-align: center;
`;

// Mapeo de iconos
const iconMap = {
  award: Award,
  shield: Shield,
  briefcase: Briefcase,
  'bar-chart-2': BarChart2,
  users: Users,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  target: Target
};

// Datos detallados de servicios
const serviciosDetallados = {
  // CONSULTORÍA
  'sistemas-gestion': {
    title: 'Sistemas de Gestión',
    icon: 'award',
    description: 'Diseño e implementación completa de sistemas de gestión basados en normas internacionales ISO 9001, ISO 45001, ISO 14001 e ISO/IEC 17020.',
    features: [
      'Diagnóstico inicial y análisis de brechas',
      'Planificación estratégica del sistema',
      'Desarrollo y documentación completa',
      'Capacitación integral del personal',
      'Ejecución de auditorías internas',
      'Acompañamiento en auditoría de certificación',
      'Seguimiento post-implementación'
    ],
    proceso: [
      {
        titulo: 'Diagnóstico Inicial',
        descripcion: 'Evaluación completa del estado actual de la organización'
      },
      {
        titulo: 'Diseño del Sistema',
        descripcion: 'Desarrollo de documentación y procedimientos específicos'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Puesta en marcha del sistema con capacitación incluida'
      },
      {
        titulo: 'Auditoría Interna',
        descripcion: 'Verificación del cumplimiento y identificación de mejoras'
      },
      {
        titulo: 'Certificación',
        descripcion: 'Acompañamiento durante el proceso de auditoría externa'
      }
    ],
    duracion: '4-8 meses según complejidad',
    garantia: 'Seguimiento gratuito por 6 meses post-certificación'
  },
  'sgsst-pesv': {
    title: 'SG-SST y PESV',
    icon: 'shield',
    description: 'Implementación completa de Sistemas de Gestión de Seguridad y Salud en el Trabajo y Planes Estratégicos de Seguridad Vial conforme a la normatividad colombiana.',
    features: [
      'Evaluación del cumplimiento legal actualizado',
      'Identificación de peligros y valoración de riesgos',
      'Desarrollo de política y objetivos SST',
      'Planes de emergencia y contingencia',
      'Indicadores de gestión y mejora continua',
      'Capacitación en seguridad vial',
      'Implementación de controles operacionales'
    ],
    proceso: [
      {
        titulo: 'Evaluación Legal',
        descripcion: 'Verificación del cumplimiento normativo actual'
      },
      {
        titulo: 'Identificación de Riesgos',
        descripcion: 'Matriz completa de peligros y valoración de riesgos'
      },
      {
        titulo: 'Diseño del Sistema',
        descripcion: 'Desarrollo de políticas, procedimientos y controles'
      },
      {
        titulo: 'Capacitación',
        descripcion: 'Formación integral en SST y seguridad vial'
      },
      {
        titulo: 'Monitoreo',
        descripcion: 'Implementación de indicadores y seguimiento continuo'
      }
    ],
    duracion: '3-6 meses según tamaño de la empresa',
    garantia: 'Cumplimiento normativo garantizado'
  },
  'gestion-estrategica': {
    title: 'Gestión Estratégica',
    icon: 'briefcase',
    description: 'Desarrollo de estrategias empresariales personalizadas para la optimización de procesos y maximización de resultados organizacionales.',
    features: [
      'Análisis organizacional profundo',
      'Planificación estratégica a 3-5 años',
      'Definición de KPIs y objetivos SMART',
      'Mapeo de procesos críticos',
      'Implementación de mejora continua',
      'Dashboard de control y seguimiento',
      'Coaching gerencial incluido'
    ],
    proceso: [
      {
        titulo: 'Análisis Situacional',
        descripcion: 'DOFA completo y análisis del entorno competitivo'
      },
      {
        titulo: 'Definición Estratégica',
        descripcion: 'Visión, misión, valores y objetivos estratégicos'
      },
      {
        titulo: 'Plan de Acción',
        descripcion: 'Roadmap detallado con responsables y tiempos'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Ejecución controlada con seguimiento continuo'
      },
      {
        titulo: 'Monitoreo',
        descripcion: 'Dashboard de KPIs y reuniones de seguimiento'
      }
    ],
    duracion: '2-4 meses para diseño + implementación continua',
    garantia: 'ROI medible en los primeros 12 meses'
  },

  // CAPACITACIÓN
  'analisis-datos': {
    title: 'Análisis de Datos',
    icon: 'bar-chart-2',
    description: 'Formación especializada para equipos en extracción de valor de los datos para toma de decisiones basadas en evidencia y mejora continua.',
    features: [
      'Fundamentos de análisis estadístico',
      'Análisis descriptivo y predictivo',
      'Visualización efectiva de datos',
      'Dashboards interactivos',
      'Interpretación y comunicación de resultados',
      'Herramientas de BI modernas',
      'Casos prácticos del sector'
    ],
    proceso: [
      {
        titulo: 'Diagnóstico de Necesidades',
        descripcion: 'Evaluación del nivel actual del equipo'
      },
      {
        titulo: 'Fundamentos Teóricos',
        descripcion: 'Conceptos estadísticos y metodologías'
      },
      {
        titulo: 'Herramientas Prácticas',
        descripcion: 'Uso de software especializado'
      },
      {
        titulo: 'Casos Reales',
        descripcion: 'Aplicación en datos de la empresa'
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
        descripcion: 'Evaluación 360° del estilo de liderazgo actual'
      },
      {
        titulo: 'Competencias Core',
        descripcion: 'Desarrollo de habilidades directivas fundamentales'
      },
      {
        titulo: 'Práctica Supervisada',
        descripcion: 'Aplicación con casos reales y retroalimentación'
      },
      {
        titulo: 'Plan Personal',
        descripcion: 'Desarrollo de plan individual de liderazgo'
      },
      {
        titulo: 'Seguimiento',
        descripcion: 'Coaching grupal y evaluación de progreso'
      }
    ],
    duracion: '32 horas (8 semanas)',
    garantia: 'Mejora medible en indicadores de clima laboral'
  },
  'formacion-sistemas': {
    title: 'Formación en Sistemas de Gestión',
    icon: 'book-open',
    description: 'Capacitación especializada en implementación, mantenimiento y auditoría de sistemas de gestión basados en normas internacionales.',
    features: [
      'Interpretación de requisitos normativos',
      'Metodología de implementación',
      'Auditoría interna certificada',
      'Gestión documental eficiente',
      'Medición y seguimiento de procesos',
      'No conformidades y acciones correctivas',
      'Preparación para auditorías externas'
    ],
    proceso: [
      {
        titulo: 'Fundamentos Normativos',
        descripcion: 'Comprensión profunda de requisitos ISO'
      },
      {
        titulo: 'Implementación Práctica',
        descripcion: 'Metodología paso a paso con ejemplos'
      },
      {
        titulo: 'Técnicas de Auditoría',
        descripcion: 'Planificación, ejecución y reporte de auditorías'
      },
      {
        titulo: 'Casos Prácticos',
        descripcion: 'Simulacros de auditoría en entornos reales'
      },
      {
        titulo: 'Certificación',
        descripcion: 'Examen y certificación como auditor interno'
      }
    ],
    duracion: '24 horas (6 semanas)',
    garantia: 'Certificación internacional como auditor interno'
  },

  // COACHING
  'coaching-gerencial': {
    title: 'Coaching Gerencial',
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
        titulo: 'Assessment Inicial',
        descripcion: 'Evaluación integral de fortalezas y oportunidades'
      },
      {
        titulo: 'Plan de Desarrollo',
        descripcion: 'Objetivos específicos y plan de acción personalizado'
      },
      {
        titulo: 'Sesiones Individuales',
        descripcion: 'Coaching uno a uno con técnicas especializadas'
      },
      {
        titulo: 'Implementación',
        descripcion: 'Aplicación práctica en el entorno laboral'
      },
      {
        titulo: 'Evaluación y Cierre',
        descripcion: 'Medición de resultados y plan de sostenibilidad'
      }
    ],
    duracion: '3-6 meses (sesiones quincenales)',
    garantia: 'Mejora medible en indicadores de desempeño gerencial'
  },
  'coaching-pnl': {
    title: 'Coaching en PNL',
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
        descripcion: 'Identificación de patrones y creencias limitantes'
      },
      {
        titulo: 'Técnicas PNL',
        descripcion: 'Aprendizaje y práctica de herramientas específicas'
      },
      {
        titulo: 'Reprogramación',
        descripcion: 'Instalación de nuevos patrones de excelencia'
      },
      {
        titulo: 'Integración',
        descripcion: 'Aplicación en contextos reales y específicos'
      },
      {
        titulo: 'Master Coaching',
        descripcion: 'Dominio avanzado y autonomía en las técnicas'
      }
    ],
    duracion: '2-4 meses (sesiones semanales)',
    garantia: 'Transformación verificable en 90 días'
  },
  'coaching-estrategico': {
    title: 'Coaching Estratégico',
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
        titulo: 'Análisis Estratégico',
        descripcion: 'DOFA personal y profesional completo'
      },
      {
        titulo: 'Visión y Propósito',
        descripcion: 'Definición de misión de vida y carrera'
      },
      {
        titulo: 'Roadmap Estratégico',
        descripcion: 'Plan detallado a corto, medio y largo plazo'
      },
      {
        titulo: 'Ejecución Controlada',
        descripcion: 'Implementación con métricas y seguimiento'
      },
      {
        titulo: 'Optimización',
        descripcion: 'Ajustes estratégicos y mejora continua'
      }
    ],
    duracion: '6-12 meses (sesiones mensuales)',
    garantia: 'Crecimiento profesional medible y sostenible'
  }
};

const ServicioModal = ({ 
  isOpen, 
  onClose, 
  servicioId
}) => {
  const servicio = serviciosDetallados[servicioId];

  if (!servicio) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Detalle del Servicio"
      size="large"
    >
      <ModalBody>
        <ServicioContent>
          <ServicioHeader>
            <ServicioIcon>
              {React.createElement(iconMap[servicio.icon], { size: 32 })}
            </ServicioIcon>
            
            <ServicioTitle>
              {servicio.title}
            </ServicioTitle>
            
            <ServicioDescription>
              {servicio.description}
            </ServicioDescription>
          </ServicioHeader>

          <FeaturesSection>
            <SectionTitle>
              <CheckCircle size={20} />
              Incluye
            </SectionTitle>
            <FeaturesList>
              {servicio.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </FeaturesList>
          </FeaturesSection>

          <ProcessSection>
            <SectionTitle>
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
            <SectionTitle style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <Clock size={20} />
              Duración: {servicio.duracion}
            </SectionTitle>
            <div style={{ color: '#27ae60', fontSize: '0.875rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} />
              {servicio.garantia}
            </div>
          </TimelineBox>
        </ServicioContent>
      </ModalBody>
      
      <ModalFooter spaceBetween>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button 
            as={Link} 
            to="/registro" 
            variant="outline"
            onClick={onClose}
          >
            Solicitar Información
          </Button>
          <Button 
            as={Link} 
            to="/registro" 
            variant="primary"
            onClick={onClose}
          >
            Contratar Servicio
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ServicioModal;