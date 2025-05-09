import React, { useState } from 'react';
import { 
  ArrowRight, Award, Shield, Briefcase, BarChart2, 
  Users, BookOpen, TrendingUp, CheckCircle, 
  Target, PieChart, UserCheck, ChevronRight 
} from 'lucide-react';
import '../../styles/portfolio.css';

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState('consultoria');

  // Datos para sección de servicios
  const servicios = {
    consultoria: [
      {
        icon: <Award size={32} />,
        title: "Sistemas de Gestión",
        description: "Diseño e implementación de sistemas de gestión basados en normas ISO 9001, ISO 45001, ISO 14001 e ISO/IEC 17020.",
        features: [
          "Diagnóstico inicial y planificación",
          "Desarrollo y documentación de sistemas",
          "Ejecucion de auditorias internas",
          "Acompañamiento en auditoría de certificación"
        ]
      },
      {
        icon: <Shield size={32} />,
        title: "SG-SST y PESV",
        description: "Diseño e implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo y Planes Estratégicos de Seguridad Vial.",
        features: [
          "Evaluación del cumplimiento legal",
          "Identificación de peligros y valoración de riesgos",
          "Planes de emergencia y contingencia",
          "Indicadores de gestión y mejora continua"
        ]
      },
      {
        icon: <Briefcase size={32} />,
        title: "Gestión Estratégica",
        description: "Desarrollo de estrategias empresariales para la optimización de procesos y mejora de resultados.",
        features: [
          "Análisis organizacional y diagnóstico",
          "Planificación estratégica",
          "Definición de KPIs y objetivos",
          "Seguimiento y control de resultados"
        ]
      }
    ],
    capacitacion: [
      {
        icon: <BarChart2 size={32} />,
        title: "Análisis de Datos",
        description: "Formación para equipos en extracción de valor de los datos para toma de decisiones basadas en evidencia.",
        features: [
          "Análisis descriptivo y predictivo",
          "Visualización efectiva de datos",
          "Dashboards para control y seguimiento",
          "Interpretación y toma de decisiones"
        ]
      },
      {
        icon: <Users size={32} />,
        title: "Liderazgo y Trabajo en Equipo",
        description: "Desarrollo de habilidades para la gestión eficiente de equipos de alto rendimiento.",
        features: [
          "Liderazgo disruptivo",
          "Comunicación efectiva",
          "Gestión de conflictos",
          "Motivación y engagement"
        ]
      },
      {
        icon: <BookOpen size={32} />,
        title: "Formación en Sistemas de Gestión",
        description: "Capacitación especializada en implementación y auditoría de sistemas de gestión.",
        features: [
          "Interpretación de requisitos normativos",
          "Auditoría interna de sistemas de gestión",
          "Gestión documental eficiente",
          "Medición y seguimiento de procesos"
        ]
      }
    ],
    coaching: [
      {
        icon: <TrendingUp size={32} />,
        title: "Coaching Gerencial",
        description: "Acompañamiento personalizado para directivos y equipos de alta dirección.",
        features: [
          "Definición de visión y metas",
          "Desarrollo de competencias directivas",
          "Gestión del cambio organizacional",
          "Balance vida-trabajo"
        ]
      },
      {
        icon: <CheckCircle size={32} />,
        title: "Coaching en PNL",
        description: "Aplicación de técnicas de Programación Neurolingüística para el desarrollo personal y profesional.",
        features: [
          "Comunicación efectiva",
          "Gestión emocional",
          "Establecimiento y logro de objetivos",
          "Romper limitaciones y creencias"
        ]
      },
      {
        icon: <Target size={32} />,
        title: "Coaching Estratégico",
        description: "Transformación de estrategias personales y organizacionales para potenciar el éxito.",
        features: [
          "Análisis de potencial individual",
          "Diseño de planes de desarrollo",
          "Alineación de objetivos personales y profesionales",
          "Mentoría y acompañamiento continuo"
        ]
      }
    ]
  };

  return (
    <section id="servicios" className="service-section">
      <div className="container mx-auto px-4">
        <div className="services-header">
          <h2 className="titulo-seccion">Portafolio de Servicios</h2>
          <p className="subtitulo-seccion">
            Soluciones personalizadas para impulsar el crecimiento sostenible de su organización
            a través de estrategias integrales y herramientas de gestión innovadoras.
          </p>
        </div>
        
        {/* Tabs de navegación */}
        <div className="tabs-container">
          <div className="tabs-wrapper">
            <button 
              className={`tab-button ${activeTab === 'consultoria' ? 'active' : ''}`}
              onClick={() => setActiveTab('consultoria')}
            >
              Consultoría
            </button>
            <button 
              className={`tab-button mx-2 ${activeTab === 'capacitacion' ? 'active' : ''}`}
              onClick={() => setActiveTab('capacitacion')}
            >
              Capacitación
            </button>
            <button 
              className={`tab-button ${activeTab === 'coaching' ? 'active' : ''}`}
              onClick={() => setActiveTab('coaching')}
            >
              Coaching
            </button>
          </div>
        </div>
        
        {/* Contenido de los tabs */}
        <div className="service-grid">
          {servicios[activeTab].map((servicio, index) => (
            <div key={index} className="tarjeta">
              <div className="icono-estandar-primario">
                {servicio.icon}
              </div>
              <h3 className="titulo-tarjeta">{servicio.title}</h3>
              <p className="subtitulo-tarjeta">{servicio.description}</p>
              <ul className="service-features">
                {servicio.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <ChevronRight className="feature-icon" size={16} />
                    <span className="text-card-feature">{feature}</span>
                  </li>
                ))}
              </ul>              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;