import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody } from '../../design-system/components/Modal/Modal';
import { Button } from '../../design-system/components/Button';
import { Award, Shield, Car, Lightbulb, CheckCircle, Target, Clock, FileText, Users, BarChart, Leaf } from 'lucide-react';
import { colors } from '../../design-system/tokens/colors';
import { spacing } from '../../design-system/tokens/spacing';
import { typography } from '../../design-system/tokens/typography';

const LegalContent = styled.div`
  padding: ${spacing.s4} 0;
  max-width: 100%;
`;

const LegalHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.s6};
  padding-bottom: ${spacing.s4};
  border-bottom: 2px solid ${colors.border};
`;

const LegalTitle = styled.h2`
  font-size: ${typography.fontSizes.sectionTitle};
  font-weight: ${typography.fontWeights.bold};
  color: ${colors.text};
  margin: 0 0 ${spacing.s2} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.s3};
`;

const LegalSubtitle = styled.p`
  font-size: ${typography.fontSizes.base};
  color: ${colors.textMuted};
  margin: 0;
  line-height: 1.4;
`;

const Section = styled.section`
  margin-bottom: ${spacing.s6};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${typography.fontSizes.cardTitle};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.primary};
  margin: 0 0 ${spacing.s3} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.s2};
`;

const SectionContent = styled.div`
  font-size: ${typography.fontSizes.base};
  color: ${colors.text};
  line-height: 1.6;
  
  p {
    margin: 0 0 ${spacing.s3} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    margin: ${spacing.s2} 0;
    padding-left: ${spacing.s6};
    
    li {
      margin-bottom: ${spacing.s2};
      color: ${colors.text};
      position: relative;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &::marker {
        color: ${colors.primary};
      }
    }
  }
  
  strong {
    color: ${colors.text};
    font-weight: ${typography.fontWeights.semiBold};
  }
`;

const FeatureCard = styled.div`
  background: ${colors.backgroundLight};
  border: 1px solid ${colors.border};
  border-radius: ${spacing.s2};
  padding: ${spacing.s4};
  margin: ${spacing.s3} 0;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s3};
  margin-bottom: ${spacing.s2};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.themeColor || colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.themeColor || colors.primary};
  flex-shrink: 0;
`;

const FeatureTitle = styled.h4`
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.text};
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-size: ${typography.fontSizes.note};
  color: ${colors.textMuted};
  margin: 0;
  line-height: 1.4;
`;

const InfoBox = styled.div`
  background: ${props => props.variant === 'success' 
    ? colors.success + '08'
    : props.variant === 'warning'
    ? colors.warning + '08'
    : colors.primary + '08'};
  border: 1px solid ${props => props.variant === 'success'
    ? colors.success + '30'
    : props.variant === 'warning'
    ? colors.warning + '30'
    : colors.primary + '30'};
  border-radius: ${spacing.s2};
  padding: ${spacing.s4};
  margin: ${spacing.s4} 0;
  display: flex;
  align-items: flex-start;
  gap: ${spacing.s3};
`;

const InfoIcon = styled.div`
  color: ${props => props.variant === 'success'
    ? colors.success
    : props.variant === 'warning'
    ? colors.warning
    : colors.primary};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
  font-size: ${typography.fontSizes.note};
  color: ${colors.text};
  line-height: 1.4;
`;

const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing.s3};
  margin: ${spacing.s4} 0;
`;

const BenefitCard = styled.div`
  background: white;
  border: 1px solid ${colors.border};
  border-radius: ${spacing.s2};
  padding: ${spacing.s3};
  display: flex;
  align-items: flex-start;
  gap: ${spacing.s2};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.primary}40;
    background: ${colors.primary}02;
  }
`;

const BenefitIcon = styled.div`
  color: ${colors.success};
  flex-shrink: 0;
  margin-top: 2px;
`;

const BenefitText = styled.div`
  flex: 1;
  font-size: ${typography.fontSizes.note};
  color: ${colors.text};
  line-height: 1.4;
`;

const TimelineBox = styled.div`
  background: linear-gradient(135deg, 
    ${colors.primary}08 0%, 
    ${colors.primary}03 100%
  );
  border: 1px solid ${colors.primary}20;
  border-radius: ${spacing.s2};
  padding: ${spacing.s4};
  margin: ${spacing.s4} 0;
  text-align: center;
`;

const TimelineTitle = styled.h4`
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.text};
  margin: 0 0 ${spacing.s2} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.s2};
`;

const TimelineText = styled.p`
  font-size: ${typography.fontSizes.note};
  color: ${colors.primary};
  margin: 0;
  font-weight: ${typography.fontWeights.medium};
`;

const ContactBox = styled.div`
  background: ${colors.backgroundLight};
  border-radius: ${spacing.s2};
  padding: ${spacing.s4};
  margin-top: ${spacing.s5};
  text-align: center;
`;

const ContactTitle = styled.h4`
  font-size: ${typography.fontSizes.base};
  font-weight: ${typography.fontWeights.semiBold};
  color: ${colors.text};
  margin: 0 0 ${spacing.s2} 0;
`;

const ContactInfo = styled.p`
  font-size: ${typography.fontSizes.note};
  color: ${colors.textMuted};
  margin: 0;
  
  a {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: ${typography.fontWeights.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModalFooter = styled.div`
  padding: ${spacing.s4} ${spacing.s6} ${spacing.s6};
  border-top: 1px solid ${colors.border};
  display: flex;
  justify-content: center;
  gap: ${spacing.s3};
  margin-top: ${spacing.s4};
`;

// Datos de las normativas
const normativasData = {
  'iso': {
    title: 'Normas ISO',
    subtitle: 'Sistemas de Gestión Integrados',
    icon: Award,
    color: '#3498db',
    description: 'Implementación integral de las principales normas ISO para sistemas de gestión: Calidad (ISO 9001), Seguridad y Salud (ISO 45001) y Gestión Ambiental (ISO 14001).',
    sections: [
      {
        title: 'ISO 9001:2015 - Sistema de Gestión de Calidad',
        icon: Target,
        content: `El estándar internacional más reconocido para Sistemas de Gestión de Calidad. 
        Proporciona un marco para asegurar que productos y servicios cumplan consistentemente 
        con los requisitos del cliente y las regulaciones aplicables.`,
        benefits: [
          'Mayor satisfacción del cliente',
          'Mejora continua de procesos',
          'Reducción de costos operativos',
          'Acceso a nuevos mercados',
          'Ventaja competitiva sostenible',
          'Toma de decisiones basada en evidencia'
        ]
      },
      {
        title: 'ISO 45001:2018 - Seguridad y Salud en el Trabajo',
        icon: Shield,
        content: `Marco internacional para la gestión de la seguridad y salud ocupacional. 
        Ayuda a las organizaciones a proporcionar lugares de trabajo seguros y saludables, 
        previniendo lesiones y problemas de salud relacionados con el trabajo.`,
        benefits: [
          'Reducción de accidentes laborales',
          'Mejora del bienestar de los trabajadores',
          'Cumplimiento de requisitos legales',
          'Reducción de costos por siniestros',
          'Mejora de la imagen corporativa',
          'Cultura de seguridad organizacional'
        ]
      },
      {
        title: 'ISO 14001:2015 - Gestión Ambiental',
        icon: Leaf,
        content: `Estándar internacional para sistemas de gestión ambiental. Proporciona un marco 
        que una organización puede seguir para establecer un sistema efectivo de gestión ambiental 
        y demostrar su compromiso con la sostenibilidad.`,
        benefits: [
          'Reducción del impacto ambiental',
          'Cumplimiento de requisitos legales ambientales',
          'Mejora de la eficiencia de recursos',
          'Reducción de costos operativos',
          'Ventaja competitiva sostenible',
          'Mejora de la reputación corporativa'
        ]
      },
      {
        title: 'Implementación Integrada',
        icon: CheckCircle,
        features: [
          { 
            title: 'Contexto de la Organización',
            description: 'Análisis integral del entorno interno y externo'
          },
          {
            title: 'Liderazgo y Compromiso',
            description: 'Participación activa en calidad, seguridad y ambiente'
          },
          {
            title: 'Planificación Integrada',
            description: 'Gestión unificada de riesgos y oportunidades'
          },
          {
            title: 'Operación Controlada',
            description: 'Procesos integrados de calidad, seguridad y ambiente'
          },
          {
            title: 'Evaluación del Desempeño',
            description: 'Monitoreo integral de los tres sistemas'
          },
          {
            title: 'Mejora Continua',
            description: 'Optimización constante del sistema integrado'
          }
        ]
      }
    ],
    timeline: '6-12 meses para implementación integrada',
    certification: 'Triple certificación ISO válida por 3 años'
  },
  
  'sgsst': {
    title: 'SG-SST',
    subtitle: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    icon: Shield,
    color: '#e74c3c',
    description: 'Sistema obligatorio en Colombia que busca anticipar, reconocer, evaluar y controlar los riesgos que puedan afectar la seguridad y salud en el trabajo.',
    sections: [
      {
        title: 'Marco Legal Colombiano',
        icon: FileText,
        content: `El SG-SST es obligatorio para todas las empresas en Colombia según el Decreto 1072 de 2015 
        y la Resolución 0312 de 2019. Su implementación es fundamental para proteger a los trabajadores 
        y cumplir con la normatividad nacional.`
      },
      {
        title: 'Beneficios de Implementación',
        icon: Target,
        benefits: [
          'Cumplimiento legal obligatorio',
          'Reducción de accidentes laborales',
          'Disminución del ausentismo',
          'Mejora del clima laboral',
          'Reducción de costos por siniestros',
          'Protección integral del trabajador'
        ]
      },
      {
        title: 'Componentes del Sistema',
        icon: CheckCircle,
        features: [
          {
            title: 'Política de SST',
            description: 'Compromiso de la dirección con la seguridad'
          },
          {
            title: 'Identificación de Peligros',
            description: 'Matriz de riesgos y valoración'
          },
          {
            title: 'Plan de Trabajo Anual',
            description: 'Actividades programadas de SST'
          },
          {
            title: 'Programa de Capacitación',
            description: 'Formación continua en seguridad'
          },
          {
            title: 'Preparación para Emergencias',
            description: 'Planes de evacuación y contingencia'
          },
          {
            title: 'Indicadores de Gestión',
            description: 'Medición y seguimiento del sistema'
          }
        ]
      }
    ],
    timeline: '3-4 meses de implementación',
    certification: 'Cumplimiento verificado por el Ministerio del Trabajo'
  },
  
  'pesv': {
    title: 'PESV',
    subtitle: 'Plan Estratégico de Seguridad Vial',
    icon: Car,
    color: '#9b59b6',
    description: 'Plan obligatorio para organizaciones con flota vehicular que busca reducir la siniestralidad vial de Colombia mediante la gestión de riesgos en seguridad vial.',
    sections: [
      {
        title: 'Normatividad Aplicable',
        icon: FileText,
        content: `El PESV es obligatorio según la Resolución 40595 de 2022 para organizaciones con 10 o más 
        vehículos (propios o contratados) o que contraten/administren conductores. Es fundamental para 
        la prevención de accidentes de tránsito relacionados con la operación empresarial.`
      },
      {
        title: 'Beneficios del PESV',
        icon: Target,
        benefits: [
          'Cumplimiento normativo obligatorio',
          'Reducción de accidentes viales',
          'Disminución de costos operativos',
          'Protección de conductores y peatones',
          'Mejora de la imagen corporativa',
          'Cultura de seguridad vial'
        ]
      },
      {
        title: 'Pilares Fundamentales',
        icon: CheckCircle,
        features: [
          {
            title: 'Gestión Organizacional',
            description: 'Política y objetivos de seguridad vial'
          },
          {
            title: 'Comportamiento Humano',
            description: 'Selección y capacitación de conductores'
          },
          {
            title: 'Vehículos Seguros',
            description: 'Mantenimiento preventivo y correctivo'
          },
          {
            title: 'Infraestructura Segura',
            description: 'Rutas y entornos físicos seguros'
          },
          {
            title: 'Atención a Víctimas',
            description: 'Protocolos de respuesta ante accidentes'
          },
          {
            title: 'Datos y Evidencias',
            description: 'Indicadores y seguimiento continuo'
          }
        ]
      }
    ],
    timeline: '2-3 meses de implementación',
    certification: 'Aval del Ministerio de Transporte'
  },
  
  'innovation': {
    title: 'Innovación Empresarial',
    subtitle: 'Transformación y Crecimiento Sostenible',
    icon: Lightbulb,
    color: '#f39c12',
    description: 'Metodologías y herramientas para impulsar la innovación sistemática en las organizaciones, generando ventajas competitivas sostenibles.',
    sections: [
      {
        title: 'Enfoque de Innovación',
        icon: FileText,
        content: `La innovación empresarial es un proceso sistemático que permite a las organizaciones 
        desarrollar nuevos productos, servicios, procesos o modelos de negocio que generen valor 
        diferencial y ventajas competitivas sostenibles en el mercado.`
      },
      {
        title: 'Beneficios de la Innovación',
        icon: Target,
        benefits: [
          'Diferenciación en el mercado',
          'Nuevas fuentes de ingresos',
          'Optimización de procesos',
          'Atracción de talento',
          'Adaptación al cambio',
          'Crecimiento sostenible'
        ]
      },
      {
        title: 'Áreas de Innovación',
        icon: CheckCircle,
        features: [
          {
            title: 'Innovación de Producto',
            description: 'Desarrollo de nuevos productos o mejoras'
          },
          {
            title: 'Innovación de Proceso',
            description: 'Optimización y digitalización'
          },
          {
            title: 'Innovación de Modelo de Negocio',
            description: 'Nuevas formas de generar valor'
          },
          {
            title: 'Innovación Organizacional',
            description: 'Cultura y estructura innovadora'
          },
          {
            title: 'Innovación en Marketing',
            description: 'Nuevos canales y experiencias'
          },
          {
            title: 'Innovación Social',
            description: 'Impacto positivo en la sociedad'
          }
        ]
      }
    ],
    timeline: 'Proceso continuo con hitos trimestrales',
    certification: 'Certificación en gestión de la innovación'
  }
};

const NormativaModal = ({ isOpen, onClose, normativaId }) => {
  const normativa = normativasData[normativaId];
  
  if (!normativa) return null;
  
  const IconComponent = normativa.icon;
  
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
              {normativa.title}
            </LegalTitle>
            <LegalSubtitle>{normativa.subtitle}</LegalSubtitle>
          </LegalHeader>
          
          <Section>
            <SectionContent>
              <p>{normativa.description}</p>
            </SectionContent>
          </Section>
          
          {normativa.sections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <Section key={index}>
                <SectionTitle>
                  <SectionIcon size={20} />
                  {section.title}
                </SectionTitle>
              
              {section.content && (
                <SectionContent>
                  <p>{section.content}</p>
                </SectionContent>
              )}
              
              {section.benefits && (
                <BenefitsList>
                  {section.benefits.map((benefit, idx) => (
                    <BenefitCard key={idx}>
                      <BenefitIcon>
                        <CheckCircle size={16} />
                      </BenefitIcon>
                      <BenefitText>{benefit}</BenefitText>
                    </BenefitCard>
                  ))}
                </BenefitsList>
              )}
              
              {section.features && (
                <div>
                  {section.features.map((feature, idx) => (
                    <FeatureCard key={idx}>
                      <FeatureHeader>
                        <FeatureIcon themeColor={normativa.color}>
                          <CheckCircle size={20} />
                        </FeatureIcon>
                        <div>
                          <FeatureTitle>{feature.title}</FeatureTitle>
                          <FeatureDescription>{feature.description}</FeatureDescription>
                        </div>
                      </FeatureHeader>
                    </FeatureCard>
                  ))}
                </div>
              )}
              </Section>
            );
          })}
          
          <TimelineBox>
            <TimelineTitle>
              <Clock size={20} />
              Tiempo de Implementación
            </TimelineTitle>
            <TimelineText>{normativa.timeline}</TimelineText>
            {normativa.certification && (
              <TimelineText style={{ marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.9 }}>
                {normativa.certification}
              </TimelineText>
            )}
          </TimelineBox>
          
          <InfoBox variant="success">
            <InfoIcon variant="success">
              <CheckCircle size={20} />
            </InfoIcon>
            <InfoText>
              <strong>Acompañamiento Completo:</strong> En StrateKaz te guiamos en todo el proceso 
              de implementación, desde el diagnóstico inicial hasta la certificación, con herramientas 
              digitales y consultoría especializada.
            </InfoText>
          </InfoBox>
          
          <ContactBox>
            <ContactTitle>
              {normativaId === 'iso' 
                ? '¿Listo para implementar ISO 9001, 45001 y 14001?' 
                : `¿Listo para implementar ${normativa.title}?`
              }
            </ContactTitle>
            <ContactInfo>
              Contáctanos: <a href="mailto:info@stratekaz.com">info@stratekaz.com</a>
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
          href="/registro"
          variant="primary"
          onClick={onClose}
        >
          Iniciar Implementación
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NormativaModal;